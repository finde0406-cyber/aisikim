// 복사-붙여넣기-결과확인 3단계 초간단 사용 가이드 — 사용 장벽 해소

const GUIDE_STEPS = [
  {
    number: '1',
    title: '복사',
    desc: '만들어진 작업지시서를 버튼 하나로 복사해요',
  },
  {
    number: '2',
    title: '붙여넣기',
    desc: 'ChatGPT, Claude, Gemini 채팅창에 그대로 붙여넣어요',
  },
  {
    number: '3',
    title: '결과 확인',
    desc: 'AI가 바로 원하는 내용을 만들어줘요',
  },
]

export default function QuickGuideSection() {
  return (
    <section>
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-2 text-center uppercase tracking-wide">
          이렇게 쓰면 돼요
        </p>
        <h2 className="text-base font-bold text-gray-900 mb-5 text-center">
          생각보다 훨씬 쉬워요
        </h2>

        {/* 모바일: 세로 스택 / sm 이상: 가로 3단 */}
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-2 mb-4">
          {GUIDE_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-4 sm:flex-col sm:items-center sm:text-center sm:gap-2 sm:p-3"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold inline-flex items-center justify-center">
                {step.number}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-0.5">{step.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center">
          복사해서 붙여넣기만 하면 AI가 바로 답해줘요
        </p>
      </div>
    </section>
  )
}
