// 랜딩 히어로 섹션 — B안: 공감 선입 + Before/After + 선택 미리보기
const DEMO_ROWS = [
  {
    label: '어떤 작업이에요?',
    chips: ['블로그 글쓰기', '업무/보고서', '앱/웹 개발'],
    selected: 2,
  },
  {
    label: '어디서 막히나요?',
    chips: ['시작을 모르겠어요', 'AI 답변이 뻔해요', '설명이 어려워요'],
    selected: 1,
  },
  {
    label: '어떤 결과물?',
    chips: ['첫 화면과 기능', '오류 수정', '출시 준비'],
    selected: 0,
  },
]

const DEMO_RESULT = `## 작업 상황
AI로 앱을 만들어보고 싶지만
무엇부터 시작해야 할지 모르겠습니다.

## 막힌 부분과 요청
AI에게 무엇부터 시켜야 할지 모르겠습니다.
이번 작업의 범위와 완료 기준부터 잡아주세요.`

export default function HeroSection() {
  return (
    <section>
      <div className="px-4 pt-12 pb-8 max-w-sm mx-auto">

        {/* ── 1. 서비스 레이블 ── */}
        <p className="text-xs font-bold text-indigo-500 tracking-widest uppercase mb-5">
          AI 작업지시서
        </p>

        {/* ── 2. 공감 헤드라인 ── */}
        <h1 className="text-[1.75rem] font-extrabold text-gray-900 leading-[1.3] tracking-tight mb-4">
          AI에게 뭘 시켜야 할지<br />
          막막해서 그냥 닫은 적<br />
          있나요?
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          블로그 글쓰기, 업무·보고서, 앱·웹 개발 중<br />
          지금 필요한 작업지시서를 선택만으로 시작해보세요.
        </p>

        {/* ── 3. Before / After 대비 카드 ── */}
        <div className="grid grid-cols-2 gap-3 mb-8" aria-hidden="true">

          {/* Before: 핑크 계열 */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-sm font-bold text-red-400 mb-3">지금까지</p>
            <ul className="space-y-2">
              <li className="text-xs font-medium text-red-400 flex items-start gap-1.5">
                <span className="flex-shrink-0 mt-0.5">·</span>빈 입력창 앞에 막막함
              </li>
              <li className="text-xs font-medium text-red-400 flex items-start gap-1.5">
                <span className="flex-shrink-0 mt-0.5">·</span>뻔한 답변, 재시도 반복
              </li>
              <li className="text-xs font-medium text-red-400 flex items-start gap-1.5">
                <span className="flex-shrink-0 mt-0.5">·</span>&ldquo;AI도 별거 없네&rdquo;
              </li>
            </ul>
          </div>

          {/* After: 연인디고 배경 + 진한 인디고 테두리 */}
          <div className="bg-indigo-50 border-2 border-indigo-500 rounded-2xl p-4">
            <p className="text-sm font-bold text-indigo-500 mb-3">AI시킴</p>
            <ul className="space-y-2">
              <li className="text-xs font-medium text-indigo-700 flex items-start gap-1.5">
                <span className="text-indigo-400 flex-shrink-0 mt-0.5">·</span>선택 3번으로 시작
              </li>
              <li className="text-xs font-medium text-indigo-700 flex items-start gap-1.5">
                <span className="text-indigo-400 flex-shrink-0 mt-0.5">·</span>후속·수정·검수까지 이어짐
              </li>
              <li className="text-xs font-bold text-indigo-800 flex items-start gap-1.5">
                <span className="text-indigo-500 flex-shrink-0 mt-0.5">·</span>만들고 공개하는 흐름
              </li>
            </ul>
          </div>
        </div>

        {/* ── 4. 선택 미리보기 카드 ── */}
        <div
          className="border border-gray-200 rounded-2xl overflow-hidden mb-8"
          aria-hidden="true"
        >
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              선택 예시 → 작업지시서 생성
            </p>
          </div>

          <div className="bg-white px-4 pt-4 pb-0 space-y-4">
            {DEMO_ROWS.map((row) => (
              <div key={row.label}>
                <p className="text-xs font-semibold text-gray-400 mb-2">{row.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {row.chips.map((chip, i) => (
                    <span
                      key={chip}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        i === row.selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-4">
            <p className="text-xs font-semibold text-gray-400 mb-2">이런 작업지시서가 만들어져요</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {DEMO_RESULT}
              </p>
            </div>
          </div>
        </div>

        {/* ── 5. CTA — 다크 네이비 ── */}
        <a
          href="/quiz"
          className="flex items-center justify-center w-full bg-gray-900 text-white font-semibold rounded-xl px-6 py-4 text-base min-h-[52px] active:bg-gray-800"
        >
          무료 작업지시서 만들기 →
        </a>
        <p className="mt-3 text-xs text-gray-500 text-center">
          이메일과 회원가입 없이 먼저 결과를 확인해요
        </p>

      </div>
    </section>
  )
}
