// 앱/웹사이트 개발 집중팩 상세 페이지
import Link from 'next/link'
import PrePaymentForm from '@/components/purchase/PrePaymentForm'

const PACK_ITEMS = [
  { name: '기능 정의 요청', desc: '화면 단위로 기능 목적·동작·예외를 정리하는 지시' },
  { name: '화면 흐름 설명', desc: '사용자가 어떻게 움직이는지 흐름을 AI에게 전달하는 지시' },
  { name: '요구사항 정리', desc: '개발자에게 전달 가능한 수준의 요구사항 문서 만들기' },
  { name: 'API 연동 설명', desc: '외부 서비스 연동 목적과 방식을 설명하는 지시' },
  { name: '버그 설명 및 재현', desc: '버그 상황을 구체적으로 설명해 빠른 수정을 요청하는 지시' },
  { name: '단계별 개발 지시', desc: '작업 순서를 나눠 순차적으로 요청하는 지시 흐름' },
  { name: '최종 검수', desc: '개발 결과물의 누락·모호함·일관성을 점검하는 검수 질문' },
]

const FLOW_STEPS = [
  {
    step: 1,
    title: '첫 질문',
    desc: 'AI에게 기능의 목적과 범위를 정확히 전달하는 시작 질문',
  },
  {
    step: 2,
    title: '후속 질문',
    desc: '화면 흐름이나 예외 상황을 더 구체화하는 질문',
  },
  {
    step: 3,
    title: '수정 요청',
    desc: '모호하거나 빠진 부분을 개발 전달 수준으로 보완하는 지시',
  },
  {
    step: 4,
    title: '검수 질문',
    desc: '완성된 요구사항의 누락·모호함을 잡아내는 마무리 검수',
  },
]

const PROBLEMS = [
  '기능을 설명했는데 개발자가 엉뚱하게 이해할까 봐 불안해요',
  '아이디어는 있는데 어떻게 구조화해서 전달해야 할지 모르겠어요',
  'AI에게 개발 요청을 해봤는데 너무 일반적인 답변만 나왔어요',
]

const SAMPLE_TEXT = `## 작업 상황
앱/웹사이트 개발 작업 중입니다.
개발자에게 전달할 기능 정의 문서를 만들어야 합니다.

## 막힌 부분과 요청
기능 아이디어는 있는데 어떻게 구조화해서 전달해야 할지 모르겠습니다.
화면 단위로 정리해주시고, 개발자가 바로 이해할 수 있게 만들어 주세요.

## 원하는 결과물
유형: 기능 정의 문서
각 기능을 목적·동작 방식·예외 처리 순서로 정리해주세요.

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 개발하려는 서비스의 핵심 기능
- 주요 사용자와 사용 상황
- 기술 스택 또는 제약 조건 ...`

const FAQ = [
  {
    q: '개발자가 아니어도 사용할 수 있나요?',
    a: '네. 이 집중팩은 비개발자, 기획자, 스타트업 창업자 등 개발 지식 없이도 AI를 통해 기능 요청을 정리하고 싶은 분을 위해 만들어졌어요. 기술 용어보다 목적과 흐름을 중심으로 구성되어 있어요.',
  },
  {
    q: '어떤 형태로 제공되나요?',
    a: '현재는 PDF 파일로 제공돼요. 전달과 보관이 쉽고, 바로 열어보며 활용할 수 있어요.',
  },
  {
    q: '환불은 어떻게 되나요?',
    a: '본 상품은 디지털 자료 상품이에요. 자료가 전달된 이후에는 상품 특성상 환불이 제한될 수 있어요. 상세 환불 기준은 결제 페이지에서 확인할 수 있어요.',
  },
]

export default function DevFocusedPackPage() {
  const paymentUrl = process.env.NEXT_PUBLIC_DEV_PACK_URL ?? null

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>

        {/* 섹션 1: 히어로 */}
        <p className="text-xs font-medium text-indigo-500 mb-3">앱/웹사이트 개발 집중팩</p>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          개발을 몰라도<br />기능 요청을 더 명확하게<br />정리할 수 있어요
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          개발자에게 뭐라고 말해야 할지 막혔을 때,<br />
          선택만 하면 기능 정의부터 검수까지 이어갈 수 있어요.
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
            기능 정의부터 검수까지, 이 흐름을 따라가면 돼요
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
            첫 질문부터 검수까지, 개발 전달 흐름을 담았어요
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
              <p className="text-[10px] font-medium text-gray-400 mb-3">기능 정의 요청 예시</p>
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
              <p className="text-xs font-medium text-indigo-500 mb-3">개발 집중팩</p>
              <ul className="space-y-2">
                <li className="text-xs font-medium text-gray-800">기능 정의·검수 흐름</li>
                <li className="text-xs text-gray-600">후속·수정·검수 포함</li>
                <li className="text-xs text-gray-600">개발자 전달 수준</li>
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
          <div className="mb-4 rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm font-medium text-gray-800 mb-1">
              지금 필요한 개발 요청을 깊게 정리하고 싶다면 이 집중팩이 맞아요.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              결제 전 먼저 정보를 입력해 주세요. 결제 확인 후 입력하신 이메일로 PDF 자료를 보내드려요.
            </p>
          </div>
          <PrePaymentForm
            packType="dev"
            packLabel="앱/웹사이트 개발 집중팩"
            price="9,900원"
            paymentUrl={paymentUrl}
          />
        </div>

        {/* 하단 번들 링크 */}
        <div className="border-t border-gray-100 pt-6 text-center">
          <p className="text-xs text-gray-400 mb-2">
            여러 상황을 넓게 써보고 싶다면 통합 스타터팩 번들이 더 맞아요
          </p>
          <Link href="/starter-pack" className="text-sm text-gray-500 underline underline-offset-2">
            통합 스타터팩 번들 보기
          </Link>
        </div>

      </div>
    </main>
  )
}
