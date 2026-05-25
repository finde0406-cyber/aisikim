// 유료 스타터팩 상세 페이지 - Sprint 5에서 구현 예정
import Link from 'next/link'

const packItems = [
  '블로그/콘텐츠 작업지시서 10개',
  '업무/보고서 작업지시서 10개',
  '앱/웹사이트 개발 작업지시서 10개',
  '결과물 검수/수정 작업지시서 10개',
  '공통 AI 활용/작업설계 작업지시서 10개',
]

export default function StarterPackPage() {
  return (
    <main className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-sm mx-auto w-full">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium mb-4">
          구매 신청 준비 중
        </span>
        <h1 className="text-xl font-bold text-gray-900 mb-1">AI시킴 스타터팩</h1>
        <p className="text-2xl font-bold text-indigo-600 mb-4">9,900원</p>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          분야별 검증된 작업지시서 50개를<br />PDF + Notion 템플릿으로 제공합니다.
        </p>

        <ul className="space-y-2 mb-8">
          {packItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-0.5 text-indigo-500 font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-400 mb-6 text-center">현재 구매 신청 준비 중입니다. 오픈 알림을 받으려면 홈에서 이메일을 남겨주세요.</p>
        <Link
          href="/"
          className="block w-full text-center border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl px-6 py-4 text-sm"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
