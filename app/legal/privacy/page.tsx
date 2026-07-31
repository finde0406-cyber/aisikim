// 개인정보 처리방침 페이지
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보 처리방침 | AI시킴',
  robots: { index: false, follow: true },
}

const SECTIONS = [
  {
    title: '1. 수집하는 개인정보 항목',
    body: '무료 샘플팩 신청 시: 이메일. 유료 상품 구매 시: 이름, 이메일, 연락처. 결제 과정의 카드 정보는 결제대행사(나이스페이먼츠)가 처리하며 회사는 저장하지 않습니다.',
  },
  {
    title: '2. 수집 및 이용 목적',
    body: '① 구매 자료 및 샘플 자료의 이메일 발송 ② 결제 확인과 구매 문의 응대 ③ 발송 실패 시 연락 ④ 동의한 경우에 한해 서비스 안내. 수신은 언제든지 거부할 수 있습니다.',
  },
  {
    title: '3. 보유 및 이용 기간',
    body: '전자상거래 등에서의 소비자보호에 관한 법률에 따라 계약·결제·재화 공급 기록은 5년, 소비자 불만·분쟁 처리 기록은 3년간 보관 후 파기합니다. 그 외 정보는 목적 달성 후 지체 없이 파기합니다.',
  },
  {
    title: '4. 처리 위탁 및 국외 이전',
    body: '결제 처리: 나이스페이먼츠(주). 이메일 발송: Resend, Inc.(미국). 웹사이트 호스팅: Vercel Inc.(미국). 위 해외 사업자에게는 서비스 제공에 필요한 최소한의 정보(이메일 등)가 전송·보관될 수 있습니다.',
  },
  {
    title: '5. 이용자의 권리',
    body: '이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있습니다. 요청은 hello@aisikim.com 으로 접수되며 지체 없이 처리합니다.',
  },
  {
    title: '6. 파기 절차 및 방법',
    body: '보유 기간이 지난 개인정보는 전자적 파일 형태의 경우 복구 불가능한 방법으로 삭제합니다.',
  },
  {
    title: '7. 개인정보 보호책임자',
    body: '책임자: 황정식 (에이치앤에이치 대표) / 문의: hello@aisikim.com / 전화: 0502-1940-2233',
  },
]

export default function PrivacyPage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">
        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>
        <h1 className="text-xl font-bold text-gray-900 mb-2">개인정보 처리방침</h1>
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
          이 방침은 관련 법령 또는 서비스 변경에 따라 개정될 수 있으며, 개정 시 본 페이지에 게시합니다.
        </p>
      </div>
    </main>
  )
}
