// 바이브코딩 웹서비스 출시 작업지시서팩 상세 페이지
import type { Metadata } from 'next'
import Link from 'next/link'
import PrePaymentForm from '@/components/purchase/PrePaymentForm'
import Footer from '@/components/home/Footer'
import { getEffectivePackProduct, isLaunchPromoActive } from '@/lib/products'

export const metadata: Metadata = {
  title: '바이브코딩 웹서비스 출시 작업지시서팩 | AI시킴',
  description:
    '아이디어 정리부터 MVP 개발, 오류 수정, 판매 페이지, 출시 콘텐츠까지 — AI에게 시킬 일을 단계별로 정리한 실행형 작업지시서팩.',
  alternates: {
    canonical: 'https://aisikim.com/focused-pack/dev',
  },
}

const PACK_ITEMS = [
  { name: '아이디어·MVP 정리', desc: '아이디어를 한 문장으로 줄이고 첫 출시 범위를 정하는 지시' },
  { name: '바이브코딩 시작', desc: 'AI에게 프로젝트 전체 상황과 작업 범위를 전달하는 지시' },
  { name: '단계별 기능 구현', desc: '화면과 기능을 한 단계씩 나눠 구현시키는 지시 흐름' },
  { name: '오류 전달·수정 확인', desc: '오류를 재현 가능한 문장으로 전달하고 다른 기능이 망가지지 않았는지 확인하는 지시' },
  { name: '출시 전 검수', desc: '모바일 화면·결제 흐름·마지막 누락을 점검하는 검수 지시' },
  { name: '판매 페이지·홍보', desc: '핵심 문장, 카드뉴스형 콘텐츠, 제작 과정 콘텐츠를 만드는 지시' },
  { name: '반응 확인·개선', desc: '사용자 반응을 다음 개선으로 연결하고 전체 흐름을 점검하는 지시' },
]

const FLOW_STEPS = [
  {
    step: 1,
    title: '아이디어를 MVP로',
    desc: '만들고 싶은 것을 1~2주 안에 출시 가능한 범위로 줄이기',
  },
  {
    step: 2,
    title: 'AI에게 개발 시키기',
    desc: '전체 상황 전달부터 기능을 한 단계씩 구현시키는 흐름',
  },
  {
    step: 3,
    title: '오류 수정과 검수',
    desc: '오류를 정확히 전달하고 출시 전 화면·흐름을 점검',
  },
  {
    step: 4,
    title: '출시와 홍보',
    desc: '판매 페이지 문구와 홍보 콘텐츠까지 이어서 완성',
  },
]

const PROBLEMS = [
  'AI로 만들어보고는 싶은데 무엇부터 시켜야 할지 막막해요',
  '개발은 진행되는데 기획·검수·출시 단계에서 자꾸 멈춰요',
  '오류가 나면 뭐라고 다시 시켜야 할지 몰라 한참 헤매요',
]

const SAMPLE_TEXT = `저는 아래 아이디어로 작은 웹서비스를 만들어보고 싶습니다.

아이디어: [만들고 싶은 서비스]
제가 생각한 사용자: [누가 쓰는지]
사용자가 겪는 문제: [불편한 상황]

이 아이디어를 처음 출시 가능한 한 문장으로 줄여주세요.
다음 순서로 정리해 주세요.
1. 가장 좁은 핵심 사용자
2. 가장 중요한 문제 하나
3. 서비스가 제공할 핵심 결과 하나
4. 첫 출시에서 빼야 할 기능
5. 한 문장 소개

기능을 더 많이 넣지 말고, 1주에서 2주 안에
확인할 수 있는 작은 범위로 줄여주세요.`

const FAQ = [
  {
    q: '개발자가 아니어도 사용할 수 있나요?',
    a: '네. 이 팩은 코딩을 몰라도 Claude Code, Codex, ChatGPT 같은 AI로 웹서비스를 직접 만들어보고 싶은 분을 위해 만들어졌어요. 기술 용어보다 목적과 흐름 중심으로 구성되어 있어요.',
  },
  {
    q: '코딩을 대신해주는 상품인가요?',
    a: '아니요. 이 자료는 AI에게 무엇을, 어떤 순서로, 어디까지 시켜야 하는지 정리해 개발이 멈추는 시간을 줄여주는 실행형 작업지시서예요. 실제 개발은 AI가, 방향 결정은 내가 하는 구조예요.',
  },
  {
    q: '어떤 형태로 제공되나요?',
    a: '결제가 완료되면 입력하신 이메일로 PDF 파일이 자동 발송돼요. 15개 상황별 작업지시서에 후속 질문·수정 요청·검수 기준까지 포함되어 있어요.',
  },
  {
    q: '환불은 어떻게 되나요?',
    a: '본 상품은 디지털 자료 상품이에요. 자료가 전달된 이후에는 상품 특성상 환불이 제한될 수 있어요. 상세 환불 기준은 결제 페이지에서 확인할 수 있어요.',
  },
]

export default function DevFocusedPackPage() {
  const product = getEffectivePackProduct('dev')
  const promoActive = isLaunchPromoActive('dev')

  return (
    <>
      <main className="flex flex-col px-4 py-10 pb-20">
        <div className="max-w-sm mx-auto w-full">

        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>

        {promoActive && (
          <div className="bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg px-3 py-2 mb-4 text-center">
            🎉 런칭 특가 · 8월 10일까지 {product.priceText} (정가 9,900원)
          </div>
        )}

        {/* 섹션 1: 히어로 */}
        <p className="text-xs font-medium text-indigo-500 mb-3">바이브코딩 웹서비스 출시 작업지시서팩</p>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          바이브코딩으로 만들고 싶은데,<br />AI에게 뭘 시켜야 할지<br />막막하다면
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          아이디어 정리부터 MVP 개발, 오류 수정,<br />
          판매 페이지, 출시 콘텐츠까지 —<br />
          바로 복사해 쓰는 작업지시서로 이어가세요.
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

        {/* 관련 무료 가이드 링크 */}
        <Link
          href="/guide/ai-dev-request"
          className="flex items-center justify-between border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 mb-10"
        >
          <p className="text-xs text-gray-500">무료 가이드: 코딩 몰라도 AI로 앱 만들기</p>
          <span className="text-xs text-indigo-500 flex-shrink-0 ml-2">읽기 →</span>
        </Link>

        {/* 섹션 3: 포함 구성 */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 mb-3">포함 구성 — 15개 상황별 작업지시서</p>
          <h2 className="text-base font-bold text-gray-900 mb-5">
            아이디어부터 출시까지, 이 흐름을 따라가면 돼요
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
            아이디어에서 출시까지, 멈추지 않는 흐름을 담았어요
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
            실제 팩에 들어있는 첫 번째 작업지시서예요
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4">
              <p className="text-[10px] font-medium text-gray-400 mb-3">1. 아이디어를 한 문장으로 줄이고 싶을 때</p>
              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {SAMPLE_TEXT}
              </p>
            </div>
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">Claude Code · Codex · ChatGPT에 바로 사용</p>
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
              <p className="text-xs font-medium text-indigo-500 mb-3">출시 작업지시서팩</p>
              <ul className="space-y-2">
                <li className="text-xs font-medium text-gray-800">아이디어→출시 전체 흐름</li>
                <li className="text-xs text-gray-600">후속·수정·검수 기준 포함</li>
                <li className="text-xs text-gray-600">15개 상황별 지시서</li>
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
          <div className="mb-5 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl px-5 py-4">
            <span className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wide mb-2 block">구매 안내</span>
            <p className="text-sm font-medium text-gray-800 mb-1">
              만들고 출시까지 이어가고 싶다면 이 팩이 맞아요.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              결제 전 먼저 정보를 입력해 주세요. 결제가 완료되면 입력하신 이메일로 PDF 자료가 자동 발송돼요.
            </p>
          </div>
          <PrePaymentForm
            packType="dev"
            packLabel="바이브코딩 웹서비스 출시 작업지시서팩"
          />
        </div>

        {/* 하단 팩 비교 카드 */}
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-xs font-medium text-gray-400 mb-4">이 팩과 스타터팩 번들의 차이</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-indigo-500 rounded-xl p-4 bg-white">
              <p className="text-xs font-bold text-indigo-600 mb-2">이 출시팩</p>
              <p className="text-xs font-medium text-gray-800 mb-1">만들고 출시까지 깊게</p>
              <p className="text-xs text-gray-500">바이브코딩 출시 흐름에 집중한 15개 지시서</p>
            </div>
            <Link href="/starter-pack" className="border border-gray-200 rounded-xl p-4 bg-gray-50 block">
              <p className="text-xs font-medium text-gray-500 mb-2">통합 스타터팩 번들</p>
              <p className="text-xs font-medium text-gray-800 mb-1">여러 분야를 넓게</p>
              <p className="text-xs text-gray-500 mb-3">5개 분야 × 10개, 다양한 상황에 두루 활용</p>
              <p className="text-xs font-semibold text-indigo-500">번들 보기 →</p>
            </Link>
          </div>
        </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
