// 이메일 HTML 템플릿 생성 함수 — 샘플팩·유료팩·관리자 알림

const CATEGORY_LABEL: Record<string, string> = {
  blog: '블로그/콘텐츠',
  work: '업무/보고서',
  dev: '앱/웹사이트 개발',
}

const PACK_LABEL: Record<string, string> = {
  dev: '바이브코딩 웹서비스 출시 작업지시서팩',
  work: '업무/보고서 집중팩',
  blog: '블로그/콘텐츠 집중팩',
  starter_bundle: '통합 스타터팩 번들',
}

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:480px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:#4f46e5;padding:20px 24px;">
      <span style="color:#fff;font-size:18px;font-weight:700;">AI시킴</span>
    </div>
    <div style="padding:24px;">
      ${content}
    </div>
    <div style="padding:16px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;">
      <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
        이 메일은 AI시킴 서비스 신청에 의해 발송됐어요.<br />
        수신을 원하지 않으시면 언제든지 거부할 수 있어요.
      </p>
    </div>
  </div>
</body>
</html>`
}

// ── 샘플팩 신청 확인 (사용자)
export function samplePackEmailHtml(data: {
  email: string
  category?: string
}): string {
  const categoryLabel = (data.category && CATEGORY_LABEL[data.category]) ?? '전체'
  const pdfUrl = process.env.SAMPLE_PACK_PDF_URL
  const notionUrl = process.env.SAMPLE_PACK_NOTION_URL

  const links =
    pdfUrl || notionUrl
      ? `<div style="margin:20px 0;">
          ${pdfUrl ? `<a href="${pdfUrl}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;margin-right:8px;">PDF 받기</a>` : ''}
          ${notionUrl ? `<a href="${notionUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;">Notion 보기</a>` : ''}
        </div>`
      : `<p style="color:#6b7280;font-size:13px;">샘플팩 링크는 영업일 기준 1~2일 내로 별도 안내드릴게요.</p>`

  return baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">무료 샘플팩이 준비됐어요</h2>
    <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.7;">
      신청해주셔서 감사해요.<br />
      관심 분야: <strong>${categoryLabel}</strong>
    </p>
    <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151;">샘플팩 구성 5개</p>
      <ul style="margin:0;padding:0 0 0 16px;font-size:13px;color:#4b5563;line-height:2;">
        <li>블로그 글 초안 만들기</li>
        <li>업무 보고서 초안 정리</li>
        <li>앱/웹사이트 기능 정의 요청하기</li>
        <li>공통 AI 활용/작업설계 시작하기</li>
        <li>AI 결과물 수정 및 검수 요청하기</li>
      </ul>
    </div>
    ${links}
    <p style="margin:16px 0 0;font-size:13px;color:#6b7280;line-height:1.7;">
      샘플팩을 써보신 뒤, 더 깊게 활용하고 싶은 분야가 생기면<br />
      카테고리 집중팩으로 이어가실 수 있어요.
    </p>
  `)
}

// ── 유료팩 구매 완료 발송 (사용자)
export function packDeliveryEmailHtml(data: {
  email: string
  packType: string
  pdfUrl?: string
  notionUrl?: string
  guideUrl?: string
}): string {
  const packLabel = PACK_LABEL[data.packType] ?? '작업지시서팩'

  const links = [
    data.pdfUrl
      ? `<a href="${data.pdfUrl}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;margin-right:8px;">PDF 받기</a>`
      : '',
    data.notionUrl
      ? `<a href="${data.notionUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;margin-right:8px;">Notion 보기</a>`
      : '',
    data.guideUrl
      ? `<a href="${data.guideUrl}" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;">사용 가이드</a>`
      : '',
  ]
    .filter(Boolean)
    .join('')

  return baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">구매해주셔서 감사해요</h2>
    <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.7;">
      <strong>${packLabel}</strong> 자료가 준비됐어요.<br />
      아래 링크에서 바로 받아보실 수 있어요.
    </p>
    ${links ? `<div style="margin:20px 0;">${links}</div>` : '<p style="color:#6b7280;font-size:13px;">자료 링크는 영업일 기준 1~2일 내로 별도 안내드릴게요.</p>'}
    <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-top:16px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#374151;">이렇게 쓰면 돼요</p>
      <ol style="margin:0;padding:0 0 0 16px;font-size:13px;color:#4b5563;line-height:2;">
        <li>PDF 또는 Notion에서 필요한 작업지시서를 찾아요</li>
        <li>ChatGPT, Claude, Gemini 채팅창에 붙여넣어요</li>
        <li>상황에 맞게 변수(서비스명, 주제 등)만 바꾸면 돼요</li>
      </ol>
    </div>
  `)
}

// ── 관리자 알림
export function adminNotifyHtml(data: {
  email: string
  category?: string
  type: 'sample_pack' | 'pack_delivery'
  packType?: string
  orderId?: string
}): string {
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const typeLabel = data.type === 'sample_pack' ? '샘플팩 신청' : '유료팩 구매'
  const detail =
    data.type === 'pack_delivery' && data.packType
      ? `<tr><td style="padding:6px 12px;color:#6b7280;">팩 종류</td><td style="padding:6px 12px;">${PACK_LABEL[data.packType] ?? data.packType}</td></tr>`
      : ''
  const orderRow = data.orderId
    ? `<tr><td style="padding:6px 12px;color:#6b7280;">주문 ID</td><td style="padding:6px 12px;">${data.orderId}</td></tr>`
    : ''

  return baseLayout(`
    <h2 style="margin:0 0 16px;font-size:18px;color:#111827;">[AI시킴] ${typeLabel}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 12px;color:#6b7280;">이메일</td><td style="padding:6px 12px;">${data.email}</td></tr>
      <tr><td style="padding:6px 12px;color:#6b7280;">관심 분야</td><td style="padding:6px 12px;">${(data.category && CATEGORY_LABEL[data.category]) ?? '미확인'}</td></tr>
      ${detail}${orderRow}
      <tr><td style="padding:6px 12px;color:#6b7280;">시각</td><td style="padding:6px 12px;">${now}</td></tr>
    </table>
  `)
}

// ── 구매 의향 접수 관리자 알림 (결제 전 정보 수집)
export function purchaseIntentAdminHtml(data: {
  email: string
  name: string
  phone?: string
  packType: string
}): string {
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const phoneRow = data.phone
    ? `<tr><td style="padding:6px 12px;color:#6b7280;">연락처</td><td style="padding:6px 12px;">${data.phone}</td></tr>`
    : ''

  return baseLayout(`
    <h2 style="margin:0 0 16px;font-size:18px;color:#111827;">[AI시킴] 유료팩 구매 의향 접수</h2>
    <p style="margin:0 0 12px;font-size:13px;color:#4b5563;">결제 단계로 이동한 구매자 정보입니다. 아직 결제 전이며, 결제가 완료되면 별도의 결제 완료 알림이 도착합니다.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 12px;color:#6b7280;">이름</td><td style="padding:6px 12px;">${data.name}</td></tr>
      <tr><td style="padding:6px 12px;color:#6b7280;">이메일</td><td style="padding:6px 12px;">${data.email}</td></tr>
      ${phoneRow}
      <tr><td style="padding:6px 12px;color:#6b7280;">상품</td><td style="padding:6px 12px;font-weight:600;">${PACK_LABEL[data.packType] ?? data.packType}</td></tr>
      <tr><td style="padding:6px 12px;color:#6b7280;">접수 시각</td><td style="padding:6px 12px;">${now}</td></tr>
    </table>
    <div style="margin-top:16px;padding:12px;background:#f0fdf4;border-radius:8px;font-size:13px;color:#166534;">
      결제가 완료되면 자료가 이메일로 자동 발송됩니다. 별도 조치는 필요 없어요.<br />
      단, 결제 완료 알림에 발송 실패 안내가 있을 때만 /internal/send-pack 에서 수동 발송해주세요.
    </div>
  `)
}
