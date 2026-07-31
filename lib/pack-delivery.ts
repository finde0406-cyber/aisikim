// 유료팩 자료 발송 공용 로직 — payment-webhook과 나이스페이 return 라우트가 함께 사용
// 자료 URL은 환경변수로만 관리한다.

import { sendEmail } from '@/lib/mailer'
import { packDeliveryEmailHtml, adminNotifyHtml } from '@/lib/mail-templates'
import { PACK_PRODUCTS, type PackType } from '@/lib/products'

export function getPackUrls(packType: PackType) {
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

export interface DeliveryResult {
  ok: boolean
  error?: string
}

// 구매자에게 자료 메일 발송 + 관리자 알림
export async function deliverPack(params: {
  email: string
  packType: PackType
  orderId?: string
}): Promise<DeliveryResult> {
  const { email, packType, orderId } = params
  const urls = getPackUrls(packType)

  const userResult = await sendEmail({
    to: email,
    subject: `AI시킴 ${PACK_PRODUCTS[packType].label} 안내`,
    html: packDeliveryEmailHtml({
      email,
      packType,
      ...urls,
    }),
  })

  if (!userResult.ok) {
    console.error('[pack-delivery] 팩 발송 실패:', email, packType, userResult.error)
    return { ok: false, error: userResult.error ?? 'delivery_failed' }
  }

  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `[AI시킴] 결제 완료: ${PACK_PRODUCTS[packType].label} — ${email}`,
      html: adminNotifyHtml({
        email,
        type: 'pack_delivery',
        packType,
        orderId,
      }),
    }).catch((err) => {
      console.error('[pack-delivery] 관리자 알림 실패:', err)
    })
  }

  return { ok: true }
}

// 발송 실패 등 운영자 확인이 필요한 상황 알림
export async function notifyAdminIssue(subject: string, html: string): Promise<void> {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL
  if (!adminEmail) return
  await sendEmail({ to: adminEmail, subject, html }).catch((err) => {
    console.error('[pack-delivery] 운영자 이슈 알림 실패:', err)
  })
}
