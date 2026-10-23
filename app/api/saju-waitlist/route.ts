// Hanji Saju 전체 리포트 대기 신청 — 관리자 알림 메일로 집계 (DB 없음)
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { STEMS, STEM_ROMAN } from '@/lib/saju/calc'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`)

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }
  const { email, dayMaster } = body as { email?: string; dayMaster?: number }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.length > 200) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  const clean = email.trim().toLowerCase()
  const dm = Number.isInteger(dayMaster) && dayMaster! >= 0 && dayMaster! < 10 ? `${STEMS[dayMaster!]} ${STEM_ROMAN[dayMaster!]}` : '-'

  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
  if (!adminEmail) {
    console.log('[saju-waitlist] ADMIN_NOTIFY_EMAIL 미설정:', clean, dm)
    return NextResponse.json({ success: true })
  }

  const result = await sendEmail({
    to: adminEmail,
    subject: `[Hanji Saju] 대기 신청: ${clean}`,
    html: `<p>Hanji Saju 전체 리포트 대기 신청</p><p>이메일: ${esc(clean)}<br/>일간: ${esc(dm)}<br/>시각: ${new Date().toISOString()}</p>`,
  })
  if (!result.ok && !result.mock) {
    console.error('[saju-waitlist] 관리자 알림 실패:', result.error)
    return NextResponse.json({ error: 'delivery_failed' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
