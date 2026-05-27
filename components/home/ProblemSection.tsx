// 문제 공감 섹션 - AI 초보자가 겪는 주요 막힘 상황
const PROBLEMS = [
  'AI를 열었는데 뭐부터 물어봐야 할지 막막하다',
  '질문을 넣어봤는데 답변이 너무 뻔하게 나온다',
  '수정 요청을 어떻게 써야 할지 모르겠다',
  '결국 "AI도 별거 없네" 하고 꺼버린다',
]

export default function ProblemSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-sm font-semibold text-gray-900 mb-4">이런 경험, 있으신가요?</p>
        <ul className="space-y-2 mb-5">
          {PROBLEMS.map((problem, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-indigo-300 flex-shrink-0 mt-0.5 font-bold">·</span>
              {problem}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 leading-relaxed">
          AI시킴은 자유 입력이 아닌{' '}
          <strong className="text-gray-700">선택 반응형</strong>으로 이 과정을 해결합니다.
        </p>
      </div>
    </section>
  )
}
