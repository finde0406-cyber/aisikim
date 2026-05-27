// 작동 방식 3단계 설명 섹션
const STEPS = [
  {
    number: '1',
    title: '선택만 하세요',
    desc: '목적, 막힌 이유, 원하는 결과물을 선택지에서 골라요.',
  },
  {
    number: '2',
    title: '작업지시서 자동 생성',
    desc: 'AI에 바로 넣을 수 있는 작업지시서가 만들어져요.',
  },
  {
    number: '3',
    title: 'AI에 바로 붙여넣기',
    desc: 'ChatGPT, Claude, Gemini 등 원하는 AI에 복사하면 돼요.',
  },
]

export default function HowItWorksSection() {
  return (
    <section>
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-5 text-center uppercase tracking-wide">
          사용 방법
        </p>
        <ol className="space-y-4">
          {STEPS.map((step) => (
            <li key={step.number} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                {step.number}
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
