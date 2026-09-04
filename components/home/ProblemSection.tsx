// 문제 공감 섹션 - AI 초보자가 겪는 주요 막힘 상황
const PROBLEMS = [
  '아이디어는 있는데 첫 기능을 어디서부터 만들어야 할지 막막해요',
  'AI에게 기능을 시켰는데 결과가 엉키고 수정할수록 망가져요',
  '만들기는 했는데 모바일 검수와 출시 준비에서 멈춰요',
  '판매 페이지와 홍보 글을 어떻게 시작할지 모르겠어요',
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
          막히는 단계가 달라도,{' '}
          <strong className="text-gray-700">지금 필요한 순서부터</strong> 시작할 수 있어요.
          무료 결과는 시작점이고, 유료팩은 만들고 공개하는 전체 흐름을 이어줍니다.
        </p>
      </div>
    </section>
  )
}
