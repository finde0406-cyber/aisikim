// 유료팩 구매 의향 수집 API — 결제 이동 전 연락처 기록
// 저장: console.log(Vercel 로그) + 관리자 이메일 알림(필수)
// ADMIN_NOTIFY_EMAIL 미설정 시: 로그만 기록 후 success
// ADMIN_NOTIFY_EMAIL 설정 시: 알림 실패 = error 반환 (운영 누락 방지)
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { purchaseIntentAdminHtml } from '@/lib/mail-templates'
import { getNicepayConfig, makeOrderId, buildMallReserved } from '@/lib/nicepay'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_PACK_TYPES = ['dev', 'work', 'blog', 'starter_bundle']

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { email, name, phone, packType, agreed } = body as {
    email?: string
    name?: string
    phone?: string
    packType?: string
    agreed?: boolean
  }

  // 입력 검증
  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (!name || name.trim().length < 1) {
    return NextResponse.json({ error: 'name_required' }, { status: 400 })
  }
  if (!phone || phone.trim().length < 1) {
    return NextResponse.json({ error: 'phone_required' }, { status: 400 })
  }
  if (!packType || !VALID_PACK_TYPES.includes(packType)) {
    return NextResponse.json({ error: 'invalid_pack_type' }, { status: 400 })
  }
  if (agreed !== true) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 })
  }

  const cleanEmail = email.trim().toLowerCase()
  const cleanName = name.trim()
  const cleanPhone = phone.trim()
  const now = new Date().toISOString()

  // Vercel 로그에 포착 (항상)
  console.log('[purchase-intent]', JSON.stringify({
    packType,
    email: cleanEmail,
    name: cleanName,
    phone: cleanPhone,
    timestamp: now,
  }))

  // 관리자 알림 이메일
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL

  if (!adminEmail) {
    // ADMIN_NOTIFY_EMAIL 미설정: 관리자 알림 없이는 구매 의향 보장 불가
    console.error('[purchase-intent] ADMIN_NOTIFY_EMAIL 미설정 — 구매 의향 수신 불가')
    return NextResponse.json({ error: 'notify_not_configured' }, { status: 503 })
  }

  // ADMIN_NOTIFY_EMAIL 설정된 경우: 알림 발송 성공이 success의 핵심 조건
  const notifyResult = await sendEmail({
    to: adminEmail,
    subject: `[AI시킴] 구매 의향 접수: ${cleanName} — ${packType}`,
    html: purchaseIntentAdminHtml({
      email: cleanEmail,
      name: cleanName,
      phone: cleanPhone,
      packType,
    }),
  })

  if (notifyResult.mock) {
    // 메일 발송 설정 없음 — 운영 시 MAIL_PROVIDER 설정 필요
    console.warn('[purchase-intent] MAIL_PROVIDER 미설정 — 관리자 알림 미발송')
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 503 })
  }

  if (!notifyResult.ok) {
    console.error('[purchase-intent] 관리자 알림 발송 실패:', notifyResult.error)
    return NextResponse.json({ error: 'notify_failed' }, { status: 500 })
  }

  // 나이스페이 사용 시: 서버가 주문번호 + 서명된 주문 정보(mallReserved)를 발급.
  // 상품·이메일이 결제 과정에서 바뀌면 return 라우트의 HMAC 검증에서 차단된다.
  if (getNicepayConfig()) {
    const orderId = makeOrderId(packType)
    const mallReserved = buildMallReserved(orderId, packType, cleanEmail)
    if (mallReserved) {
      return NextResponse.json({
        success: true,
        pay: { orderId, mallReserved, buyerEmail: cleanEmail },
      })
    }
  }

  return NextResponse.json({ success: true })
}
