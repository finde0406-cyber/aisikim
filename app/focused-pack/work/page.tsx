// 업무/보고서 집중팩 상세 페이지
import Link from 'next/link'

const PACK_ITEMS = [
  { name: '보고서 초안', desc: '목적·현황·문제·해결책·다음 단계 구조로 초안 잡기' },
  { name: '요약본', desc: '긴 내용을 핵심만 간결하게 정리하는 지시' },
  { name: '실행안', desc: '해야 할 일을 순서와 담당자 중심으로 정리하는 지시' },
  { name: '체크리스트', desc: '놓치기 쉬운 항목을 사전에 점검하는 목록 만들기' },
  { name: '이메일 작성', desc: '목적에 맞게 간결하고 단정한 이메일 초안 만들기' },
  { name: '회의록 정리', desc: '회의 내용을 결정사항·액션아이템 중심으로 정리하기' },
]

const FLOW_STEPS = [
  {
    step: 1,
    title: '첫 질문',
    desc: '보고서나 실무 문서의 방향과 목적을 AI에게 먼저 잡아주는 질문',
  },
  {
    step: 2,
    title: '후속 질문',
    desc: '첫 초안을 더 단정하고 직장인 문체에 맞게 발전시키는 질문',
  },
  {
    step: 3,
    title: '수정 요청',
    desc: '원하는 방향으로 내용과 문체를 조정하는 수정 지시',
  },
  {
    step: 4,
    title: '검수 질문',
    desc: '보고 전 어색한 표현·논리 흐름을 마지막으로 확인하는 검수',
  },
]

const PROBLEMS = [
  '보고서를 어디서부터 시작해야 할지 모르겠어요',
  '초안은 썼는데 문장이 너무 허술하고 직장인 문체가 아닌 것 같아요',
  '핵심만 짧게 정리하는 게 어렵고 시간이 많이 걸려요',
]

const SAMPLE_TEXT = `## 작업 상황
업무 문서 작성 중입니다.
보고서 초안 형태의 결과물을 만들어야 합니다.

## 막힌 부분과 요청
보고서를 어디서 시작해야 할지 모르겠습니다.
핵심 내용을 먼저 파악하고, 단락 구조를 잡아주세요.

## 원하는 결과물
유형: 보고서 초안
목적·현황·문제·해결책·다음 단계 순서로 정리해주세요.

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 보고서의 목적과 보는 사람
- 보고할 핵심 내용
- 분량이나 형식 제약 ...`

const FAQ = [
  {
    q: '어떤 업무 상황에서 쓸 수 있나요?',
    a: '보고서, 요약본, 실행안, 이메일, 회의록 등 직장인이 자주 마주치는 실무 문서 작성에 모두 쓸 수 있어요. 사무직, 기획자, 팀장, 프리랜서 등 문서 작업이 필요한 분께 맞아요.',
  },
  {
    q: '어떤 형태로 제공되나요?',
    a: 'PDF 파일과 Notion 보조 링크로 제공돼요. PDF는 전달과 보관이 쉽고, Notion은 내용을 탐색하고 복사하기 편해요.',
  },
  {
    q: '환불은 어떻게 되나요?',
    a: '본 상품은 디지털 자료 상품이에요. 자료가 전달된 이후에는 상품 특성상 환불이 제한될 수 있어요. 상세 환불 기준은 결제 페이지에서 확인할 수 있어요.',
  },
]

export default function WorkFocusedPackPage() {
  const paymentUrl = process.env.NEXT_PUBLIC_WORK_PACK_URL ?? null

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>

        {/* 섹션 1: 히어로 */}
        <p className="text-xs font-medium text-indigo-500 mb-3">업무/보고서 집중팩</p>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          보고서, 실행안, 이메일을<br />더 빠르고 단정하게<br />정리할 수 있어요
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          보고서 초안부터 요약본, 이메일, 회의록까지<br />
          실무에 바로 붙는 문서 흐름 전체를 담았어요.
        </p>

        {/* 섹션 2: 문제 상황 */}
        <div className="mb-10 border-t border-gray-100 pt-8">
          <p className="text-xs font-medium text-gray-400 mb-3">이런 상황에서 필요해요</p>
          <div className="space-y-3">
            {PROBLEMS.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="text-indigo-300 flex-shrink-0 mt-0.5">·</span>
                <p className="text-sm text-gray-600">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 섹션 3: 포함 구성 */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">포함 구성</p>
          <h2 className="text-base font-bold text-gray-900 mb-5">
            보고·요약·실행·정리 실무 문서 흐름 전체
          </h2>
          <div className="space-y-3">
            {PACK_ITEMS.map((item) => (
              <div key={item.name} className="border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{item.name}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 섹션 4: 완성 흐름 4단계 */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">작업 흐름</p>
          <h2 className="text-base font-bold text-gray-900 mb-5">
            초안부터 보고 전 검수까지, 실무 문서 흐름을 담았어요
          </h2>
          <div className="space-y-4">
            {FLOW_STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 섹션 5: 예시 미리보기 */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">예시 미리보기</p>
          <h2 className="text-base font-bold text-gray-900 mb-4">
            이런 식으로 만들어져요
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4">
              <p className="text-[10px] font-medium text-gray-400 mb-3">보고서 초안 예시</p>
              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {SAMPLE_TEXT}
              </p>
            </div>
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">ChatGPT · Claude · Gemini에 바로 사용</p>
              <span className="text-xs font-semibold text-indigo-600">복사하기 →</span>
            </div>
          </div>
        </div>

        {/* 섹션 6: 무료 vs 유료 비교 */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-4">무료와 유료의 차이</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3 font-medium">무료 진단 결과</p>
              <ul className="space-y-2">
                <li className="text-xs text-gray-600">기본 작업지시서 1개</li>
                <li className="text-xs text-gray-400">단일 질문 구조</li>
                <li className="text-xs text-gray-400">흐름 없음</li>
              </ul>
            </div>
            <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
              <p className="text-xs font-medium text-indigo-500 mb-3">업무 집중팩</p>
              <ul className="space-y-2">
                <li className="text-xs font-medium text-gray-800">보고·요약·실행 흐름</li>
                <li className="text-xs text-gray-600">후속·수정·검수 포함</li>
                <li className="text-xs text-gray-600">직장인 실무 문체</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 섹션 7: FAQ */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-4">자주 묻는 질문</p>
          <div className="space-y-2">
            {FAQ.map((item) => (
              <details key={item.q} className="border border-gray-200 rounded-xl overflow-hidden">
                <summary className="px-4 py-4 text-sm font-medium text-gray-800 cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-gray-400 text-xs ml-2 flex-shrink-0">펼치기</span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* 섹션 8: 구매 CTA */}
        <div className="mb-10">
          {paymentUrl ? (
            <>
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px]"
              >
                업무 집중팩 구매하기
              </a>
              <p className="text-xs text-gray-400 text-center mt-3">
                PDF + Notion 링크로 제공돼요
              </p>
            </>
          ) : (
            <>
              <div className="border border-gray-100 rounded-xl py-5 px-4 text-center mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  먼저 무료 샘플팩으로 확인해보세요
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  내 작업에 맞는지 먼저 확인한 뒤 선택할 수 있어요.
                </p>
              </div>
              <Link
                href="/quiz"
                className="flex items-center justify-center w-full border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-50"
              >
                무료 진단 후 샘플팩 신청하기
              </Link>
            </>
          )}
        </div>

        {/* 하단 번들 링크 */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400 mb-2">여러 분야를 넓게 써보고 싶다면</p>
          <Link href="/starter-pack" className="text-sm text-gray-500 underline underline-offset-2">
            통합 스타터팩 번들 보기
          </Link>
        </div>

      </div>
    </main>
  )
}
