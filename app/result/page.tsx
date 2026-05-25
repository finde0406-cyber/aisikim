// 무료 결과 페이지 - Sprint 3에서 구현 예정
import Link from 'next/link'

export default function ResultPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-sm mx-auto">
        <p className="text-sm font-medium text-gray-700 mb-2">작업지시서 결과</p>
        <p className="text-gray-400 text-sm mb-6">결과 페이지는 준비 중입니다.</p>
        <Link href="/quiz" className="text-indigo-600 text-sm underline underline-offset-2">
          진단 다시 하기
        </Link>
      </div>
    </main>
  )
}
