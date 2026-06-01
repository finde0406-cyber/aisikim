// 샘플팩 신청 API — 이메일 수집 + 발송 처리
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { samplePackEmailHtml, adminNotifyHtml } from '@/lib/mail-templates'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { email, agreed, category } = body as {
    email?: string
    agreed?: boolean
    category?: string
  }

  // 이메일 검증
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  // 동의 여부 서버 검증
  if (agreed !== true) {
    return NextResponse.json({ error: 'consent_required' }, { status: 400 })
  }

  const cleanEmail = email.trim().toLowerCase()

  // 사용자에게 샘플팩 발송
  const userResult = await sendEmail({
    to: cleanEmail,
    subject: 'AI시킴 무료 샘플팩 안내',
    html: samplePackEmailHtml({ email: cleanEmail, category }),
  })

  // mock 모드: 실제 발송 설정이 없는 상태
  if (userResult.mock) {
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 503 })
  }

  // 실제 발송 실패
  if (!userResult.ok) {
    console.error('[sample-pack] 사용자 메일 발송 실패:', cleanEmail, userResult.error)
    return NextResponse.json({ error: 'delivery_failed' }, { status: 500 })
  }

  // 관리자 알림 (선택적 — env 설정 시 발송, 실패해도 신청 성공 처리)
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `[AI시킴] 샘플팩 신청: ${cleanEmail}`,
      html: adminNotifyHtml({ email: cleanEmail, category, type: 'sample_pack' }),
    }).catch((err) => {
      console.error('[sample-pack] 관리자 알림 실패:', err)
    })
  }

  return NextResponse.json({ success: true })
}
