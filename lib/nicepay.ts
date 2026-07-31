// 나이스페이 신모듈(결제창 + 서버 승인) 서버 전용 헬퍼
// 공식 매뉴얼: https://github.com/nicepayments/nicepay-manual (api/payment-window-server.md)
// 시크릿 키는 이 파일을 통해서만 사용하고 클라이언트로 절대 노출하지 않는다.

import { createHash, createHmac, timingSafeEqual } from 'crypto'

const SANDBOX_API_BASE = 'https://sandbox-api.nicepay.co.kr'
const PRODUCTION_API_BASE = 'https://api.nicepay.co.kr'

function sha256Hex(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex')
}

export function getNicepayConfig() {
  const clientKey = process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY
  const secretKey = process.env.NICEPAY_SECRET_KEY
  const env = process.env.NICEPAY_ENV === 'production' ? 'production' : 'sandbox'

  if (!clientKey || !secretKey) return null

  return {
    clientKey,
    secretKey,
    env,
    apiBase: env === 'production' ? PRODUCTION_API_BASE : SANDBOX_API_BASE,
  }
}

// 인증 결과 signature 검증: sha256(authToken + clientId + amount + secretKey)
export function verifyAuthSignature(params: {
  authToken: string
  clientId: string
  amount: string
  secretKey: string
  signature: string
}): boolean {
  const expected = sha256Hex(
    params.authToken + params.clientId + params.amount + params.secretKey
  )
  return expected === params.signature
}

// 승인 응답 signature 검증: sha256(tid + amount + ediDate + secretKey)
export function verifyApprovalSignature(params: {
  tid: string
  amount: string | number
  ediDate: string
  secretKey: string
  signature: string
}): boolean {
  const expected = sha256Hex(
    String(params.tid) + String(params.amount) + params.ediDate + params.secretKey
  )
  return expected === params.signature
}

// ─── 서버 발급 주문 정보 ───────────────────────────────
// 상품·이메일을 클라이언트 입력에 의존하지 않도록, 결제 전 서버가 HMAC 서명한
// mallReserved 문자열을 발급하고 return 라우트에서 재검증한다.
// 형식: v1.{packType}.{hex(email)}.{hmac} — 나이스페이 mallReserved의
// 큰따옴표 사용 제한을 피하기 위해 JSON 대신 [A-Za-z0-9.] 문자만 사용한다.

function orderHmac(orderId: string, packType: string, email: string, secretKey: string): string {
  return createHmac('sha256', secretKey)
    .update(`${orderId}|${packType}|${email}`, 'utf8')
    .digest('hex')
}

export function makeOrderId(packType: string): string {
  const ts = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
  const rand = Math.random().toString(36).slice(2, 8)
  return `aisikim-${packType}-${ts}-${rand}`
}

export function buildMallReserved(orderId: string, packType: string, email: string): string | null {
  const config = getNicepayConfig()
  if (!config) return null
  const emailHex = Buffer.from(email, 'utf8').toString('hex')
  const token = orderHmac(orderId, packType, email, config.secretKey)
  return `v1.${packType}.${emailHex}.${token}`
}

export interface ParsedOrder {
  packType: string
  email: string
}

// mallReserved 파싱 + HMAC 검증 — 실패 시 null (승인 호출 전 중단용)
export function parseAndVerifyMallReserved(
  mallReserved: string,
  orderId: string
): ParsedOrder | null {
  const config = getNicepayConfig()
  if (!config) return null

  const parts = mallReserved.split('.')
  if (parts.length !== 4 || parts[0] !== 'v1') return null

  const [, packType, emailHex, token] = parts
  if (!/^[0-9a-f]+$/.test(emailHex) || !/^[0-9a-f]{64}$/.test(token)) return null

  let email: string
  try {
    email = Buffer.from(emailHex, 'hex').toString('utf8')
  } catch {
    return null
  }

  const expected = orderHmac(orderId, packType, email, config.secretKey)
  const expectedBuf = Buffer.from(expected, 'utf8')
  const tokenBuf = Buffer.from(token, 'utf8')
  if (expectedBuf.length !== tokenBuf.length || !timingSafeEqual(expectedBuf, tokenBuf)) {
    return null
  }

  return { packType, email }
}

export interface ApprovalResult {
  ok: boolean
  resultCode?: string
  resultMsg?: string
  status?: string
  tid?: string
  orderId?: string
  amount?: number
  ediDate?: string
  signature?: string
  error?: string
}

// 서버 승인 API 호출 — 인증 성공(authResultCode=0000) 후에만 호출한다
export async function approvePayment(tid: string, amount: number): Promise<ApprovalResult> {
  const config = getNicepayConfig()
  if (!config) return { ok: false, error: 'not_configured' }

  const basicToken = Buffer.from(`${config.clientKey}:${config.secretKey}`).toString('base64')

  let res: Response
  try {
    res = await fetch(`${config.apiBase}/v1/payments/${tid}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
  } catch (err) {
    console.error('[nicepay] 승인 API 네트워크 오류:', err)
    return { ok: false, error: 'network_error' }
  }

  let data: Record<string, unknown>
  try {
    data = await res.json()
  } catch {
    console.error('[nicepay] 승인 API 응답 파싱 실패:', res.status)
    return { ok: false, error: 'invalid_response' }
  }

  const resultCode = String(data.resultCode ?? '')
  const status = String(data.status ?? '')
  const approved = resultCode === '0000' && status === 'paid'

  if (!approved) {
    console.error('[nicepay] 승인 실패:', resultCode, data.resultMsg, 'status:', status)
  }

  return {
    ok: approved,
    resultCode,
    resultMsg: String(data.resultMsg ?? ''),
    status,
    tid: String(data.tid ?? ''),
    orderId: String(data.orderId ?? ''),
    amount: Number(data.amount ?? 0),
    ediDate: String(data.ediDate ?? ''),
    signature: String(data.signature ?? ''),
  }
}
