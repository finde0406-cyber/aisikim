// 무료-유료 차이와 스타터팩 예고를 하나로 압축한 섹션
import Link from 'next/link'

export default function PackPreviewSection() {
  return (
    <section>
      <div className="px-4 py-10 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-4 text-center uppercase tracking-wide">
          더 완성된 결과물이 필요하다면
        </p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">무료</p>
            <p className="text-sm font-semibold text-gray-800 leading-snug">
              기본 작업지시서<br />1개
            </p>
            <p className="text-xs text-gray-400 mt-1">시작 질문 1개</p>
          </div>
          <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
            <p className="text-xs font-medium text-indigo-500 mb-2">유료 스타터팩</p>
            <p className="text-sm font-semibold text-gray-800 leading-snug">
              단계별 작업지시서<br />50개
            </p>
            <p className="text-xs font-semibold text-indigo-600 mt-1">9,900원</p>
          </div>
        </div>
        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
        >
          스타터팩 자세히 보기
        </Link>
      </div>
    </section>
  )
}
