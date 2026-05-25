// 무료와 유료 차이 비교 섹션
export default function FreeVsPaidSection() {
  return (
    <section>
      <div className="px-4 py-10 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          무료와 유료의 차이
        </h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-200 px-4 py-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              무료
            </p>
            <p className="font-semibold text-gray-900 text-sm mb-1">
              기본 작업지시서 1개
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI에게 처음 보낼 시작 질문 1개를 만들어드립니다.
            </p>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-5">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
              유료 스타터팩
            </p>
            <p className="font-semibold text-gray-900 text-sm mb-1">
              단계별 작업지시서 50개
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              시작 질문부터 후속 질문, 수정 요청, 결과물 검수까지
              실제 결과물을 완성하기 위한 전체 흐름을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
