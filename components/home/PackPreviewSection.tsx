// 무료-유료 차이와 집중팩 메인 상품 안내 섹션
import Link from 'next/link'
import { getEffectivePackProduct, isLaunchPromoActive } from '@/lib/products'

export default function PackPreviewSection() {
  const product = getEffectivePackProduct('dev')
  const promoActive = isLaunchPromoActive('dev')

  return (
    <section>
      <div className="px-4 py-10 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-4 text-center uppercase tracking-wide">
          무료 결과 다음 단계
        </p>

        <h2 className="text-lg font-bold text-gray-900 leading-snug text-center mb-2">
          무료 작업지시서 1개로 시작하고,<br />
          무료 결과를 써보고,<br />
          필요한 분야의 집중팩으로 이어가세요
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed text-center mb-6">
          AI시킴은 분야별로 바로 써먹을 수 있는 작업 흐름을 준비하고 있습니다.
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
            <p className="text-xs font-medium text-indigo-500 mb-2">현재 구매 가능</p>
            <ul className="space-y-1 mb-2">
              <li className="text-xs font-medium text-gray-800">아이디어·MVP 정리</li>
              <li className="text-xs text-gray-700">개발·오류 수정·검수</li>
              <li className="text-xs text-gray-700">판매·출시 콘텐츠</li>
            </ul>
            <p className="text-xs text-gray-500">앱·웹서비스를 만들고 공개하는 흐름</p>
            {promoActive ? (
              <p className="text-xs font-bold text-indigo-600 mt-2">
                🎉 런칭 특가 {product.priceText} <span className="text-gray-400 line-through font-normal">9,900원</span>
              </p>
            ) : (
              <p className="text-xs font-bold text-indigo-600 mt-2">{product.priceText}</p>
            )}
          </div>
        </div>

        <ul className="border-y border-gray-100 py-4 mb-5 space-y-2">
          <li className="flex gap-2 text-xs text-gray-600"><span className="text-indigo-500">✓</span>아이디어와 MVP 범위 정리</li>
          <li className="flex gap-2 text-xs text-gray-600"><span className="text-indigo-500">✓</span>개발·오류 수정·모바일 검수</li>
          <li className="flex gap-2 text-xs text-gray-600"><span className="text-indigo-500">✓</span>판매 페이지와 Threads 출시 콘텐츠</li>
          <li className="flex gap-2 text-xs text-gray-600"><span className="text-indigo-500">✓</span>PDF로 받아 바로 복사해 사용</li>
        </ul>

        <a
          href="/focused-pack/dev"
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-3"
        >
          앱·웹 개발 집중팩 자세히 보기 →
        </a>

        {/* 통합 스타터팩 번들 — 하위 노출 */}
        <div className="border border-gray-100 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-gray-400 mb-1">더 넓게 써보고 싶다면</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            블로그·콘텐츠와 업무·보고서 집중팩, 여러 분야를 묶은 통합 스타터팩을 순차적으로 선보일 예정입니다.
          </p>
        </div>

        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
        >
          전체 상품 구성 보기
        </Link>
      </div>
    </section>
  )
}
