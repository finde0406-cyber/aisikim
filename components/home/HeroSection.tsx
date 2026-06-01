// 랜딩 히어로 섹션 - 선택형 서비스 미리보기 포함 구조
import Button from '@/components/ui/Button'

const DEMO_ROWS = [
  {
    label: '어떤 작업이에요?',
    chips: ['블로그 글쓰기', '업무/보고서', '앱/웹 개발'],
    selected: 0,
  },
  {
    label: '어디서 막히나요?',
    chips: ['시작을 모르겠어요', 'AI 답변이 뻔해요', '설명이 어려워요'],
    selected: 0,
  },
  {
    label: '어떤 결과물?',
    chips: ['글 초안', '보고서', '기획서'],
    selected: 0,
  },
]

const DEMO_RESULT = `## 작업 상황
블로그 글 작업 중입니다.
어디서 시작할지 먼저 잡아드릴게요.

## 막힌 부분과 요청
아직 어디서 시작해야 할지 모르겠습니다.
필요한 것들을 먼저 물어봐 주세요.`

export default function HeroSection() {
  return (
    <section>
      <div className="px-4 pt-12 pb-8 max-w-sm mx-auto">

        {/* 카피 + CTA */}
        <div className="text-center mb-6">
          <h1 className="text-[1.875rem] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-4">
            AI에게 뭘 시켜야 할지<br />
            모르겠다면,<br />
            <span className="text-indigo-600">직접 쓰지 말고<br />선택하세요.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            목적·상황·결과물을 고르면<br />
            바로 써볼 작업지시서를 만들어드려요.
          </p>
          <Button href="/quiz" className="w-full">
            무료 작업지시서 만들기 →
          </Button>
          <p className="mt-3 text-xs text-gray-400">
            이메일·회원가입 없이 시작
          </p>
        </div>

        {/* 선택 미리보기 블록 */}
        <div
          className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
          aria-hidden="true"
        >
          <p className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            이렇게 선택하면
          </p>

          <div className="space-y-4 mb-5">
            {DEMO_ROWS.map((row) => (
              <div key={row.label}>
                <p className="text-xs text-gray-400 mb-2">{row.label}</p>
                <div className="flex flex-wrap gap-2">
                  {row.chips.map((chip, i) => (
                    <span
                      key={chip}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        i === row.selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-500'
                      }`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
              이런 작업지시서가 만들어져요
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {DEMO_RESULT}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
