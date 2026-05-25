// 작동 방식 3단계 설명 섹션
const STEPS = [
  {
    number: '1',
    title: '선택만 하세요',
    desc: '목적, 막힌 이유, 원하는 결과물을 선택지에서 고르면 됩니다. 직접 쓰지 않아도 됩니다.',
  },
  {
    number: '2',
    title: '작업지시서 자동 생성',
    desc: '선택한 내용으로 AI에게 바로 넣을 수 있는 작업지시서를 만들어드립니다.',
  },
  {
    number: '3',
    title: 'AI에 바로 붙여넣기',
    desc: 'ChatGPT, Claude, Gemini 등 원하는 AI에 복사해서 넣으면 끝입니다.',
  },
]

export default function HowItWorksSection() {
  return (
    <section>
      <div className="px-4 py-10 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
          선택만으로 3분 완성
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          긴 설명을 쓰지 않아도 됩니다.
        </p>
        <ol className="space-y-5">
          {STEPS.map((step) => (
            <li key={step.number} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                {step.number}
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
