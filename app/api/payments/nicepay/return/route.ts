// 나이스페이 결제창 인증 결과 수신 라우트 (returnUrl)
// 검증 순서 (docs/nicepay-integration-checklist-v1.md 6장):
//   인증 결과코드 → 인증 signature → 상품·금액 검증 → 승인 API → 승인 결과코드
//   → 승인 signature → 자료 자동 발송 → 관리자 알림
// 검증에 하나라도 실패하면 승인 API를 호출하지 않으므로 과금이 발생하지 않는다.

import { NextRequest, NextResponse } from 'next/server'
import {
  getNicepayConfig,
  verifyAuthSignature,
  verifyApprovalSignature,
  approvePayment,
  parseAndVerifyMallReserved,
} from '@/lib/nicepay'
import { PACK_PRODUCTS, isPackType, getEffectivePackProduct } from '@/lib/products'
import { deliverPack, notifyAdminIssue } from '@/lib/pack-delivery'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function redirectTo(req: NextRequest, path: string, params: Record<string, string>) {
  const url = new URL(path, req.nextUrl.origin)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return NextResponse.redirect(url, 303)
}

export async function POST(req: NextRequest) {
  const config = getNicepayConfig()
  if (!config) {
    return redirectTo(req, '/purchase/failed', { reason: 'not_configured' })
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return redirectTo(req, '/purchase/failed', { reason: 'invalid_request' })
  }

  const field = (name: string) => String(form.get(name) ?? '')

  const authResultCode = field('authResultCode')
  const tid = field('tid')
  const orderId = field('orderId')
  const amount = field('amount')
  const authToken = field('authToken')
  const signature = field('signature')
  const mallReserved = field('mallReserved')

  // 1. 인증 결과코드 확인 — 사용자가 결제창을 닫은 경우도 여기로 온다
  if (authResultCode !== '0000') {
    console.warn('[nicepay-return] 인증 실패/중단:', authResultCode, field('authResultMsg'))
    return redirectTo(req, '/purchase/failed', { reason: 'auth', code: authResultCode })
  }

  if (!tid || !orderId || !amount || !authToken) {
    return redirectTo(req, '/purchase/failed', { reason: 'invalid_request' })
  }

  // 2. 인증 결과 위변조 검증
  const authValid = verifyAuthSignature({
    authToken,
    clientId: config.clientKey,
    amount,
    secretKey: config.secretKey,
    signature,
  })
  if (!authValid) {
    console.error('[nicepay-return] 인증 signature 불일치:', orderId)
    return redirectTo(req, '/purchase/failed', { reason: 'signature' })
  }

  // 3. 상품·금액 검증 — 서버가 결제 전 발급한 서명된 주문 정보(mallReserved)를 재검증.
  //    HMAC이 orderId·packType·email을 묶고 있어 클라이언트 단독 위변조가 불가능하다.
  const parsed = parseAndVerifyMallReserved(mallReserved, orderId)
  if (!parsed) {
    console.error('[nicepay-return] 주문 정보 검증 실패:', orderId)
    return redirectTo(req, '/purchase/failed', { reason: 'invalid_order' })
  }

  const { packType, email } = parsed
  if (!isPackType(packType) || !EMAIL_REGEX.test(email)) {
    console.error('[nicepay-return] 상품/이메일 정보 불량:', orderId, packType)
    return redirectTo(req, '/purchase/failed', { reason: 'invalid_order' })
  }

  const expectedAmount = getEffectivePackProduct(packType).amount
  if (Number(amount) !== expectedAmount) {
    console.error('[nicepay-return] 금액 불일치:', orderId, amount, '기대값:', expectedAmount)
    return redirectTo(req, '/purchase/failed', { reason: 'amount_mismatch' })
  }

  // 4~5. 승인 API 호출 + 결과코드 확인
  const approval = await approvePayment(tid, expectedAmount)
  if (!approval.ok) {
    return redirectTo(req, '/purchase/failed', {
      reason: 'approval',
      code: approval.resultCode ?? approval.error ?? '',
    })
  }

  // 6. 승인 응답 필수 검증 — signature·ediDate·orderId·amount·tid가 모두 존재하고
  //    일치해야만 발송한다. 하나라도 어긋나면 발송을 막고 운영자가 확인 후 처리.
  const approvalMismatch =
    !approval.signature ||
    !approval.ediDate ||
    approval.orderId !== orderId ||
    Number(approval.amount) !== expectedAmount ||
    approval.tid !== tid ||
    !verifyApprovalSignature({
      tid: approval.tid ?? '',
      amount: approval.amount ?? 0,
      ediDate: approval.ediDate ?? '',
      secretKey: config.secretKey,
      signature: approval.signature ?? '',
    })

  if (approvalMismatch) {
    console.error(
      '[nicepay-return] 승인 응답 검증 실패:',
      orderId,
      'tid:', tid, '/', approval.tid,
      'amount:', expectedAmount, '/', approval.amount,
      'orderId:', approval.orderId,
      'sig/ediDate 존재:', Boolean(approval.signature), Boolean(approval.ediDate)
    )
    await notifyAdminIssue(
      `[AI시킴] 승인 응답 검증 실패 — 확인 필요 (${orderId})`,
      `<p>주문 ${orderId} / tid ${tid} 승인은 완료됐지만 응답 검증(signature·금액·주문번호 일치)에 실패했습니다. 나이스페이 관리자 화면에서 거래를 확인한 뒤 수동 발송 또는 취소를 진행하세요.</p>`
    )
    return redirectTo(req, '/purchase/failed', { reason: 'verify' })
  }

  // 7~8. 자료 자동 발송 + 관리자 알림
  const delivery = await deliverPack({ email, packType, orderId })
  if (!delivery.ok) {
    // 결제는 성공 — 구매자에게는 완료 화면을 보여주되 발송 지연 안내, 운영자에게 백업 발송 요청
    await notifyAdminIssue(
      `[AI시킴] 결제 성공·자동 발송 실패 — 수동 발송 필요 (${orderId})`,
      `<p>주문 ${orderId} / ${PACK_PRODUCTS[packType].label} / ${email}</p><p>자동 발송이 실패했습니다. /internal/send-pack 에서 수동 발송해주세요.</p>`
    )
    return redirectTo(req, '/purchase/complete', {
      orderId,
      pack: packType,
      delivery: 'pending',
    })
  }

  return redirectTo(req, '/purchase/complete', { orderId, pack: packType })
}
