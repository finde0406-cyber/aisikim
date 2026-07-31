// 결제 실패/중단 안내 페이지
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '결제 미완료 | AI시킴',
  robots: { index: false, follow: false },
}

const REASON_MESSAGES: Record<string, string> = {
  auth: '결제가 중단됐어요. 결제창을 닫으셨거나 인증에 실패했어요.',
  approval: '카드사 승인에 실패했어요. 다른 카드로 다시 시도해주세요.',
  amount_mismatch: '결제 금액 확인에 실패해 결제를 진행하지 않았어요.',
  signature: '결제 정보 확인에 실패해 결제를 진행하지 않았어요.',
  invalid_order: '주문 정보 확인에 실패해 결제를 진행하지 않았어요.',
  invalid_request: '잘못된 요청이에요. 상품 페이지에서 다시 시도해주세요.',
  not_configured: '지금은 결제를 받을 수 없어요. 잠시 후 다시 시도해주세요.',
  verify: '결제 확인 중 문제가 생겼어요. 아래 연락처로 문의해주시면 바로 처리해드릴게요.',
}

export default async function PurchaseFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const reason = typeof params.reason === 'string' ? params.reason : ''
  const message =
    REASON_MESSAGES[reason] ?? '결제가 완료되지 않았어요. 다시 시도해주세요.'

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-sm mx-auto w-full text-center">
        <span className="inline-flex w-14 h-14 rounded-full bg-gray-200 text-gray-500 items-center justify-center text-2xl mb-6">
          !
        </span>
        <h1 className="text-xl font-bold text-gray-900 mb-3">결제가 완료되지 않았어요</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">{message}</p>

        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-3"
        >
          상품 페이지로 돌아가기
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50 mb-4"
        >
          홈으로
        </Link>

        <p className="text-xs text-gray-400 leading-relaxed">
          결제 금액이 청구됐는데 자료를 받지 못하셨다면<br />
          hello@aisikim.com / 0502-1940-2233 으로 알려주세요.
        </p>
      </div>
    </main>
  )
}
