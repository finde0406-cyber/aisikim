// 결제 완료 안내 페이지 — 나이스페이 승인 + 자동 발송 후 도착
import type { Metadata } from 'next'
import Link from 'next/link'
import { PACK_PRODUCTS, isPackType } from '@/lib/products'

export const metadata: Metadata = {
  title: '결제 완료 | AI시킴',
  robots: { index: false, follow: false },
}

export default async function PurchaseCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const packType = typeof params.pack === 'string' ? params.pack : ''
  const orderId = typeof params.orderId === 'string' ? params.orderId : ''
  const deliveryPending = params.delivery === 'pending'
  const packLabel = isPackType(packType) ? PACK_PRODUCTS[packType].label : '작업지시서팩'

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-sm mx-auto w-full text-center">
        <span className="inline-flex w-14 h-14 rounded-full bg-indigo-600 text-white items-center justify-center text-2xl mb-6">
          ✓
        </span>
        <h1 className="text-xl font-bold text-gray-900 mb-3">결제가 완료됐어요</h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          <strong className="text-gray-900">{packLabel}</strong>
        </p>

        {deliveryPending ? (
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            자료 발송이 잠시 지연되고 있어요.<br />
            확인 후 입력하신 이메일로 곧 보내드릴게요.<br />
            1시간 안에 도착하지 않으면 아래로 문의해주세요.
          </p>
        ) : (
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            입력하신 이메일로 자료를 보내드렸어요.<br />
            메일이 보이지 않으면 스팸함도 함께 확인해주세요.
          </p>
        )}

        {orderId && (
          <p className="text-xs text-gray-400 mb-8">주문번호: {orderId}</p>
        )}

        {/* 업셀 — 구매 직후가 다음 제안의 최적 시점 */}
        {isPackType(packType) && packType !== 'starter_bundle' ? (
          <Link
            href="/starter-pack"
            className="block border border-indigo-200 bg-indigo-50 rounded-xl p-4 text-left mb-6"
          >
            <p className="text-xs font-semibold text-indigo-600 mb-1">이 팩이 잘 맞았다면</p>
            <p className="text-sm font-medium text-gray-800 mb-1">통합 스타터팩 번들 — 24,900원</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              지금 분야를 포함해 5개 분야 × 10개, 작업지시서 50개를 한 번에.
            </p>
            <p className="text-xs font-semibold text-indigo-500 mt-2">번들 보기 →</p>
          </Link>
        ) : isPackType(packType) ? (
          <Link
            href="/focused-pack/dev"
            className="block border border-indigo-200 bg-indigo-50 rounded-xl p-4 text-left mb-6"
          >
            <p className="text-xs font-semibold text-indigo-600 mb-1">번들과 함께 보면 좋은 것</p>
            <p className="text-sm font-medium text-gray-800 mb-1">바이브코딩 웹서비스 출시 작업지시서팩 — 9,900원</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              아이디어부터 실제 출시·홍보까지, 번들에 없는 심화 실행 흐름 15개.
            </p>
            <p className="text-xs font-semibold text-indigo-500 mt-2">자세히 보기 →</p>
          </Link>
        ) : null}

        <Link
          href="/"
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-4"
        >
          홈으로 돌아가기
        </Link>

        <p className="text-xs text-gray-400 leading-relaxed">
          문의: hello@aisikim.com / 0502-1940-2233
        </p>
      </div>
    </main>
  )
}
