// 운영자용 유료팩 발송 API — INTERNAL_ACCESS_KEY로 보호
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { packDeliveryEmailHtml } from '@/lib/mail-templates'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_PACK_TYPES = ['dev', 'work', 'blog', 'starter_bundle']

const PACK_LABEL: Record<string, string> = {
  dev: '앱/웹사이트 개발 집중팩',
  work: '업무/보고서 집중팩',
  blog: '블로그/콘텐츠 집중팩',
  starter_bundle: '통합 스타터팩 번들',
}

function getPackUrls(packType: string) {
  switch (packType) {
    case 'dev':
      return { pdfUrl: process.env.DEV_PACK_PDF_URL, notionUrl: process.env.DEV_PACK_NOTION_URL }
    case 'work':
      return { pdfUrl: process.env.WORK_PACK_PDF_URL, notionUrl: process.env.WORK_PACK_NOTION_URL }
    case 'blog':
      return { pdfUrl: process.env.BLOG_PACK_PDF_URL, notionUrl: process.env.BLOG_PACK_NOTION_URL }
    case 'starter_bundle':
      return {
        pdfUrl: process.env.STARTER_BUNDLE_PDF_URL,
        notionUrl: process.env.STARTER_BUNDLE_NOTION_URL,
        guideUrl: process.env.STARTER_BUNDLE_GUIDE_URL,
      }
    default:
      return {}
  }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 })
  }

  const { accessKey, email, name, packType } = body as {
    accessKey?: string
    email?: string
    name?: string
    packType?: string
  }

  // 접근 키 검증
  const expectedKey = process.env.INTERNAL_ACCESS_KEY
  if (!expectedKey || accessKey !== expectedKey) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }
  if (!packType || !VALID_PACK_TYPES.includes(packType)) {
    return NextResponse.json({ error: 'invalid_pack_type' }, { status: 400 })
  }

  const cleanEmail = email.trim().toLowerCase()
  const urls = getPackUrls(packType)

  // 자료 링크가 하나도 없으면 발송 차단 (빈 메일 방지)
  const hasAnyUrl = Object.values(urls).some((v) => !!v)
  if (!hasAnyUrl) {
    console.warn('[internal/send-pack] 자료 링크 미설정:', packType)
    return NextResponse.json({ error: 'pack_assets_not_configured' }, { status: 503 })
  }

  const result = await sendEmail({
    to: cleanEmail,
    subject: `AI시킴 ${PACK_LABEL[packType]} 안내`,
    html: packDeliveryEmailHtml({
      email: cleanEmail,
      packType,
      ...urls,
    }),
  })

  if (result.mock) {
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 503 })
  }
  if (!result.ok) {
    return NextResponse.json({ error: 'delivery_failed' }, { status: 500 })
  }

  console.log('[internal/send-pack] 발송 완료:', cleanEmail, packType, name ?? '')
  return NextResponse.json({ success: true, email: cleanEmail, packType })
}
