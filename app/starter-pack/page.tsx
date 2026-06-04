// 유료 스타터팩 상세 페이지 - 입문용 유료 상품 포지셔닝
import type { Metadata } from 'next'
import Link from 'next/link'
import PrePaymentForm from '@/components/purchase/PrePaymentForm'

export const metadata: Metadata = {
  title: 'AI시킴 작업지시서 스타터팩 번들 | AI시킴',
  description:
    '블로그, 업무, 개발, 검수, 공통 활용까지 5개 분야 50개 작업지시서를 한 번에 받아볼 수 있는 종합 번들입니다.',
  alternates: {
    canonical: 'https://aisikim.com/starter-pack',
  },
}

const PACK_CATEGORIES = [
  {
    name: '블로그/콘텐츠',
    count: 10,
    desc: '블로그 글, 콘텐츠 기획, 아이디어 발굴',
  },
  {
    name: '업무/보고서',
    count: 10,
    desc: '보고서, 이메일, 기획서, 회의록',
  },
  {
    name: '앱/웹사이트 개발',
    count: 10,
    desc: '기능 정의, 코드 지시, 버그 수정, API 연동',
  },
  {
    name: '결과물 검수/수정',
    count: 10,
    desc: '완성도 높이기, 방향 조정, 오류 수정',
  },
  {
    name: '공통 AI 활용/작업설계',
    count: 10,
    desc: '작업 설계, AI 활용 전략, 전체 흐름 잡기',
  },
]

const FLOW_STEPS = [
  {
    step: 1,
    title: '첫 질문',
    desc: 'AI에게 작업의 목적과 방향을 정확히 전달하는 질문',
  },
  {
    step: 2,
    title: '후속 질문',
    desc: '첫 답변을 더 구체적으로 발전시키는 질문',
  },
  {
    step: 3,
    title: '수정 요청',
    desc: '원하는 방향으로 조정하는 수정 지시',
  },
  {
    step: 4,
    title: '검수 질문',
    desc: '완성도를 높이는 마무리 검토 요청',
  },
]

const WHO_NEEDS = [
  'AI로 작업을 시작했지만 원하는 결과가 나오지 않는 분',
  '첫 질문만 하고 중간에 막혀버리는 분',
  '블로그·업무·개발 중에 단계적으로 AI를 활용하고 싶은 분',
  '따로 배우기보다 바로 복사해서 써볼 수 있는 자료가 필요한 분',
  'AI시킴의 작업지시서 방식이 실제로 자신에게 맞는지 시험해보고 싶은 분',
]

export default function StarterPackPage() {
  const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL ?? null
  const FAQ = [
    {
      q: '어떤 형식으로 제공되나요?',
      a: '현재는 PDF 파일로 제공됩니다. 전달과 보관이 쉽고, 바로 열어보며 활용할 수 있습니다.',
    },
    {
      q: '바로 AI에 붙여 넣을 수 있나요?',
      a: 'ChatGPT, Claude, Gemini, Codex에 바로 복사해서 넣을 수 있도록 구성되어 있습니다. 내 상황에 맞게 일부만 수정해서 사용하셔도 됩니다.',
    },
    {
      q: '결제와 자료 수령은 어떻게 되나요?',
      a: paymentUrl
        ? '구매 전 AI시킴에서 입력하신 이메일 주소로 PDF 파일과 Notion 링크를 보내드려요. 결제 확인 후 영업일 기준 1~2일 내 발송돼요.'
        : '결제 방법과 자료 수령 방법은 구매 페이지에서 확인할 수 있어요.',
    },
    {
      q: '디지털 상품 환불은 어떻게 되나요?',
      a: '본 상품은 디지털 자료 상품입니다. 자료가 전달된 이후에는 상품 특성상 환불이 제한될 수 있습니다. 상세 환불 기준은 결제 페이지에서 명확히 안내해 드립니다.',
    },
  ]

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        {/* 상단 홈 링크 */}
        <Link href="/" className="text-gray-400 text-sm block mb-8">
          ← 홈
        </Link>

        {/* --- 섹션 1: 히어로 --- */}
        {paymentUrl && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-indigo-100 text-indigo-700">
            구매하기
          </span>
        )}
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-2">
          AI 작업지시서 스타터팩
        </h1>
        <p className="text-3xl font-bold text-indigo-600 mb-3">24,900원</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-1">
          결과물을 완성하기 위한 단계별 작업지시서 50개
        </p>
        <p className="text-xs text-gray-400 mb-2">
          AI시킴 방식이 나와 맞는지 처음 확인해보는 입문용 상품입니다.
        </p>
        <p className="text-xs text-gray-400 mb-8">현재는 PDF 파일로 제공</p>

        {/* --- 섹션 2: 왜 무료 1개만으로는 부족한가 --- */}
        <div className="mt-2 mb-10 border-t border-gray-100 pt-8">
          <p className="text-xs font-medium text-gray-400 mb-3">무료 결과 이후</p>
          <h2 className="text-lg font-bold text-gray-900 mb-4 leading-snug">
            AI에게 한 번만 물어보고<br />끝나지 않습니다.
          </h2>
          <div className="space-y-3">
            {[
              '첫 답변이 너무 일반적이라 막막할 때',
              '어떻게 수정 요청을 해야 할지 모를 때',
              '여러 번 이어서 시켜야 하는데 흐름을 모를 때',
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-indigo-300 text-sm flex-shrink-0 mt-0.5">·</span>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-5 leading-relaxed">
            스타터팩은 이 흐름 전체를 담은 단계별 작업지시서 묶음입니다.
            한 번에 대충 묻고 끝내는 문장이 아니라, 결과물을 실제로 완성하는 데 필요한
            전체 과정을 포함합니다.
          </p>
        </div>

        {/* --- 섹션 3: 완성 흐름 4단계 --- */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">스타터팩 작업 흐름</p>
          <h2 className="text-base font-bold text-gray-900 mb-5">
            첫 질문부터 검수까지, 완성 흐름을 담았습니다.
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

        {/* --- 섹션 4: 구성 50개 --- */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">구성</p>
          <h2 className="text-base font-bold text-gray-900 mb-5">
            5개 분야 × 10개 = 작업지시서 50개
          </h2>
          <div className="space-y-3">
            {PACK_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="border border-gray-200 rounded-xl px-4 py-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-800">{cat.name}</p>
                  <span className="text-xs font-medium text-indigo-600">{cat.count}개</span>
                </div>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- 섹션 5: 누구에게 필요한가 --- */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">이런 분께 필요합니다</p>
          <div className="space-y-3">
            {WHO_NEEDS.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold flex-shrink-0 mt-0.5">·</span>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- 섹션 6: 무료 vs 유료 비교 --- */}
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
              <p className="text-xs font-medium text-indigo-500 mb-3">유료 스타터팩</p>
              <ul className="space-y-2">
                <li className="text-xs font-medium text-gray-800">작업지시서 50개</li>
                <li className="text-xs text-gray-600">후속·수정·검수 포함</li>
                <li className="text-xs text-gray-600">5개 분야 구성</li>
                <li className="text-xs font-semibold text-indigo-600">24,900원</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- 섹션 6.5: 집중팩과의 차이 --- */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-4">집중팩과의 차이</p>
          <div className="border border-indigo-100 rounded-xl p-4 bg-indigo-50">
            <p className="text-xs font-semibold text-indigo-600 mb-3">스타터팩 번들은 이런 분께 맞아요</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-indigo-100">
                <p className="text-xs font-bold text-gray-800 mb-1">집중팩</p>
                <p className="text-xs text-gray-500">한 분야, 더 깊게</p>
              </div>
              <div className="bg-indigo-600 rounded-lg p-3">
                <p className="text-xs font-bold text-white mb-1">스타터팩 번들 ★</p>
                <p className="text-xs text-indigo-100">여러 분야, 더 넓게</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 섹션 7: 결제 CTA --- */}
        <div className="mb-10">
          <div className="mb-5 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl px-5 py-4">
            <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wide mb-2 block">구매 안내</span>
            <p className="text-sm font-medium text-gray-800 mb-1">
              여러 분야를 넓게 써보고 싶다면 스타터팩 번들이 더 맞아요.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              결제 전 먼저 정보를 입력해 주세요. 결제 확인 후 입력하신 이메일로 PDF 자료를 보내드려요.
            </p>
          </div>
          <PrePaymentForm
            packType="starter_bundle"
            packLabel="통합 스타터팩 번들"
            price="24,900원"
            paymentUrl={paymentUrl}
          />
        </div>

        {/* --- 섹션 8: FAQ --- */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-4">자주 묻는 질문</p>
          <div className="space-y-2">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
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

        {/* --- 딥팩 간접 암시 --- */}
        <div className="mb-10 bg-gray-50 rounded-xl px-4 py-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            스타터팩으로 AI시킴 방식을 경험해보신 뒤, 자주 쓰는 분야가 생기면
            필요한 분야를 더 깊게 활용하는 방식으로 이어갈 수 있어요.
          </p>
        </div>

        {/* --- 섹션 9: 하단 CTA --- */}
        <div className="border-t border-gray-100 pt-8 space-y-3">
          <Link
            href="/quiz"
            className="flex items-center justify-center w-full border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-50"
          >
            무료 진단 먼저 해보기
          </Link>
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 underline underline-offset-2">
              홈으로 돌아가기
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}


