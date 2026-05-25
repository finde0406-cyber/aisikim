// 선택형 진단 페이지 - Sprint 2에서 구현 예정
import Link from 'next/link'

const categories = [
  { label: '블로그·콘텐츠', desc: '블로그 글, SNS 게시물, 유튜브 스크립트' },
  { label: '업무·보고서', desc: '회의록, 이메일, 기획서, 보고서' },
  { label: '앱·웹사이트 개발', desc: '코드 작성, 리뷰, 버그 수정, API 연동' },
]

export default function QuizPage() {
  return (
    <main className="min-h-screen flex flex-col px-4 py-12">
      <div className="max-w-sm mx-auto w-full">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium mb-4">
          곧 오픈
        </span>
        <h1 className="text-xl font-bold text-gray-900 mb-2">선택형 진단</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          5단계 선택만으로 내 상황에 딱 맞는<br />작업지시서를 바로 완성합니다.
        </p>

        <div className="space-y-3 mb-8">
          {categories.map((c) => (
            <div key={c.label} className="border border-gray-200 rounded-xl px-4 py-4 text-left">
              <p className="text-sm font-semibold text-gray-800 mb-1">{c.label}</p>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-6 text-center">현재 준비 중입니다. 오픈 알림을 받으려면 홈에서 이메일을 남겨주세요.</p>
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
