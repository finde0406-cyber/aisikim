// 이메일 발송 추상화 레이어 — provider-agnostic
// MAIL_PROVIDER 환경변수로 provider 전환 가능

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export interface SendEmailResult {
  ok: boolean
  mock?: boolean   // 실제 발송 없이 mock으로 처리된 경우 true
  error?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const provider = process.env.MAIL_PROVIDER

  if (!provider) {
    console.log(
      '[mailer] MAIL_PROVIDER 미설정 — mock (실제 발송 없음):',
      options.to,
      '|',
      options.subject
    )
    return { ok: false, mock: true }
  }

  switch (provider) {
    case 'resend':
      return sendViaResend(options)
    default:
      console.warn('[mailer] 알 수 없는 provider:', provider, '— mock (실제 발송 없음)')
      return { ok: false, mock: true }
  }
}

async function sendViaResend(options: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM ?? 'noreply@aisikim.com'

  if (!apiKey) {
    console.warn('[mailer] RESEND_API_KEY 미설정 — mock (실제 발송 없음)')
    return { ok: false, mock: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[mailer] Resend 오류:', res.status, body)
      return { ok: false, error: `resend_${res.status}` }
    }

    return { ok: true }
  } catch (err) {
    console.error('[mailer] 네트워크 오류:', err)
    return { ok: false, error: 'network_error' }
  }
}
