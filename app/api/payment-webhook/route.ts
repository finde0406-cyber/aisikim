// 결제 완료 웹훅 핸들러 — provider-agnostic
// 결제 provider에서 POST 요청으로 아래 형식의 payload를 전달:
//   { packType: 'dev' | 'work' | 'blog' | 'starter_bundle', email: string, orderId?: string }
//
// 실제 연결 시: provider의 서명 검증 헤더를 PAYMENT_WEBHOOK_SECRET 환경변수와 비교 추가 필요

import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { packDeliveryEmailHtml, adminNotifyHtml } from '@/lib/mail-templates'

type PackType = 'dev' | 'work' | 'blog' | 'starter_bundle'

const PACK_LABEL: Record<PackType, string> = {
  dev: '앱/웹사이트 개발 집중팩',
  work: '업무/보고서 집중팩',
  blog: '블로그/콘텐츠 집중팩',
  starter_bundle: '통합 스타터팩 번들',
}

function getPackUrls(packType: PackType) {
  switch (packType) {
    case 'dev':
      return {
        pdfUrl: process.env.DEV_PACK_PDF_URL,
        notionUrl: process.env.DEV_PACK_NOTION_URL,
      }
    case 'work':
      return {
        pdfUrl: process.env.WORK_PACK_PDF_URL,
        notionUrl: process.env.WORK_PACK_NOTION_URL,
      }
    case 'blog':
      return {
        pdfUrl: process.env.BLOG_PACK_PDF_URL,
        notionUrl: process.env.BLOG_PACK_NOTION_URL,
      }
    case 'starter_bundle':
      return {
        pdfUrl: process.env.STARTER_BUNDLE_PDF_URL,
        notionUrl: process.env.STARTER_BUNDLE_NOTION_URL,
        guideUrl: process.env.STARTER_BUNDLE_GUIDE_URL,
      }
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_PACK_TYPES: PackType[] = ['dev', 'work', 'blog', 'starter_bundle']

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

  if (!packType || !VALID_PACK_TYPES.includes(packType as PackType)) {
    return NextResponse.json({ error: 'invalid_pack_type' }, { status: 400 })
  }

  const cleanEmail = email.trim().toLowerCase()
  const validPackType = packType as PackType
  const urls = getPackUrls(validPackType)

  // 구매자에게 팩 전달 메일 발송
  const userResult = await sendEmail({
    to: cleanEmail,
    subject: `AI시킴 ${PACK_LABEL[validPackType]} 안내`,
    html: packDeliveryEmailHtml({
      email: cleanEmail,
      packType: validPackType,
      ...urls,
    }),
  })

  if (!userResult.ok) {
    console.error('[payment-webhook] 팩 발송 실패:', cleanEmail, validPackType, userResult.error)
    return NextResponse.json({ error: 'delivery_failed' }, { status: 500 })
  }

  // 관리자 알림
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `[AI시킴] 결제 완료: ${PACK_LABEL[validPackType]} — ${cleanEmail}`,
      html: adminNotifyHtml({
        email: cleanEmail,
        type: 'pack_delivery',
        packType: validPackType,
        orderId,
      }),
    }).catch((err) => {
      console.error('[payment-webhook] 관리자 알림 실패:', err)
    })
  }

  return NextResponse.json({ success: true })
}
