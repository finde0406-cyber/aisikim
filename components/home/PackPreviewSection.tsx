// 무료-유료 차이와 집중팩 메인 상품 안내 섹션
import Link from 'next/link'

export default function PackPreviewSection() {
  return (
    <section>
      <div className="px-4 py-10 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-4 text-center uppercase tracking-wide">
          더 완성된 결과물이 필요하다면
        </p>

        {/* 무료 vs 집중팩 비교 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">무료</p>
            <p className="text-sm font-semibold text-gray-800 leading-snug">
              기본 작업지시서<br />1개
            </p>
            <p className="text-xs text-gray-400 mt-1">시작 질문 1개</p>
          </div>
          <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
            <p className="text-xs font-medium text-indigo-500 mb-2">카테고리 집중팩</p>
            <ul className="space-y-1 mb-2">
              <li className="text-xs font-medium text-gray-800">앱/웹사이트 개발</li>
              <li className="text-xs text-gray-700">업무/보고서</li>
              <li className="text-xs text-gray-700">블로그/콘텐츠</li>
            </ul>
            <p className="text-xs text-gray-500">첫 질문·후속·수정·검수 포함</p>
            <p className="text-[10px] text-indigo-500 mt-1.5">필요한 분야만 선택해 바로 활용할 수 있어요</p>
          </div>
        </div>

        {/* 통합 스타터팩 번들 — 하위 노출 */}
        <div className="border border-gray-100 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-gray-400 mb-1">더 넓게 써보고 싶다면</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            여러 분야를 한번에 체험할 수 있는 통합 스타터팩 50개 번들도 있어요.
          </p>
        </div>

        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
        >
          통합 스타터팩 번들 보기
        </Link>
      </div>
    </section>
  )
}
