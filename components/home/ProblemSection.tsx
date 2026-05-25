// 문제 공감 섹션 - AI 초보자가 겪는 주요 막힘 상황 3가지
const PROBLEMS = [
  'AI를 열었는데 무엇부터 물어봐야 할지 막막했다.',
  '질문을 넣어봤는데 답변이 너무 뻔하게 나왔다.',
  '더 좋은 결과를 받고 싶은데 어떻게 다시 써야 할지 모르겠다.',
]

export default function ProblemSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-10 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          이런 경험, 있으신가요?
        </h2>
        <ul className="space-y-3">
          {PROBLEMS.map((problem, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-white rounded-xl px-4 py-4 shadow-sm"
            >
              <span className="text-indigo-400 mt-0.5 flex-shrink-0 font-bold">✓</span>
              <span className="text-gray-700 text-sm leading-relaxed">{problem}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-gray-500 text-sm leading-relaxed">
          AI시킴은 이 문제를 자유 입력이 아닌<br />
          <strong className="text-gray-700">선택 반응형 구조</strong>로 해결합니다.
        </p>
      </div>
    </section>
  )
}
