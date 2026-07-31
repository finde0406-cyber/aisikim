// 결제 완료 웹훅 핸들러 — provider-agnostic (백업 경로)
// 카드 단건 결제는 /api/payments/nicepay/return 에서 승인·발송까지 처리하므로
// 이 라우트는 가상계좌 등 비동기 통보 수단을 추가할 때 확장한다.
//   { packType: 'dev' | 'work' | 'blog' | 'starter_bundle', email: string, orderId?: string }

import { NextRequest, NextResponse } from 'next/server'
import { isPackType } from '@/lib/products'
import { deliverPack } from '@/lib/pack-delivery'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  // 웹훅 시크릿 검증 (PAYMENT_WEBHOOK_SECRET 설정 시)
  const secret = process.env.PAYMENT_WEBHOOK_SECRET
  if (secret) {
    const sig = req.headers.get('x-webhook-secret')
    if (sig !== secret) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { packType, email, orderId } = body as {
    packType?: string
    email?: string
    orderId?: string
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!isPackType(packType)) {
    return NextResponse.json({ error: 'invalid_pack_type' }, { status: 400 })
  }

  const result = await deliverPack({
    email: email.trim().toLowerCase(),
    packType,
    orderId,
  })

  if (!result.ok) {
    return NextResponse.json({ error: 'delivery_failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
