// 이용약관 페이지 — 디지털 콘텐츠(작업지시서팩) 판매 기준
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '이용약관 | AI시킴',
  robots: { index: false, follow: true },
}

const SECTIONS = [
  {
    title: '제1조 (목적)',
    body: '이 약관은 에이치앤에이치(이하 "회사")가 운영하는 AI시킴(aisikim.com)에서 제공하는 디지털 콘텐츠 판매 서비스의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정합니다.',
  },
  {
    title: '제2조 (서비스 내용)',
    body: 'AI시킴은 AI에게 일을 시키기 위한 작업지시서 모음(PDF 등 디지털 콘텐츠)을 판매합니다. 무료 진단·무료 샘플팩을 통해 구매 전에 콘텐츠의 품질과 형식을 확인할 수 있습니다.',
  },
  {
    title: '제3조 (구매 및 결제)',
    body: '이용자는 회원가입 없이 상품을 구매할 수 있습니다. 결제는 나이스페이먼츠의 전자결제 서비스를 통해 처리되며, 회사는 카드 정보를 저장하지 않습니다. 구매 시 입력한 이메일 주소로 자료가 발송되므로 정확하게 입력해야 하며, 잘못 입력된 이메일로 인한 미수신은 문의 시 확인 후 재발송해 드립니다.',
  },
  {
    title: '제4조 (콘텐츠 제공)',
    body: '결제가 완료되면 구매 시 입력한 이메일로 자료가 자동 발송됩니다. 결제 후 1시간 이내에 메일을 받지 못한 경우(스팸함 포함) 하단 문의처로 연락 주시면 확인 후 즉시 재발송해 드립니다.',
  },
  {
    title: '제5조 (청약철회 및 환불)',
    body: '본 상품은 디지털 콘텐츠로, 전자상거래 등에서의 소비자보호에 관한 법률 제17조 제2항에 따라 콘텐츠 제공이 개시된 후에는 청약철회(환불)가 제한됩니다. 회사는 이를 위해 구매 전 무료 샘플팩으로 콘텐츠를 미리 확인할 수 있는 기회를 제공하고 있으며, 판매 페이지와 결제 화면에 환불 제한을 표시합니다. 다만 다음의 경우에는 환불 또는 재발송이 가능합니다: ① 자료가 발송되기 전 철회를 요청한 경우 ② 결제한 상품과 다른 자료가 발송된 경우 ③ 파일 손상 등으로 정상 이용이 불가능하고 재발송으로도 해결되지 않는 경우 ④ 중복 결제가 발생한 경우.',
  },
  {
    title: '제6조 (지식재산권)',
    body: '판매되는 콘텐츠의 저작권은 회사에 있습니다. 구매한 콘텐츠는 구매자 본인의 업무·학습 목적으로만 이용할 수 있으며, 재판매·재배포·무단 공유·2차 판매용 가공은 금지됩니다.',
  },
  {
    title: '제7조 (책임의 한계)',
    body: '본 콘텐츠는 AI 활용을 돕는 참고 자료이며, 이용 결과(수익, 성과 등)를 보장하지 않습니다. 회사는 천재지변, 결제사·통신사 장애 등 회사의 합리적 통제를 벗어난 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.',
  },
  {
    title: '제8조 (문의처)',
    body: '상호: 에이치앤에이치 / 대표: 황정식 / 사업자등록번호: 601-34-91221 / 주소: 서울 강남구 논현로115길 28, 가동 201호 / 이메일: hello@aisikim.com / 전화: 0502-1940-2233',
  },
]

export default function TermsPage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">
        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>
        <h1 className="text-xl font-bold text-gray-900 mb-2">이용약관</h1>
        <p className="text-xs text-gray-400 mb-8">시행일: 2026년 7월 31일</p>

        <div className="space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-sm font-semibold text-gray-800 mb-2">{s.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10 leading-relaxed">
          이 약관에 정하지 않은 사항은 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령을 따릅니다.
        </p>
      </div>
    </main>
  )
}
