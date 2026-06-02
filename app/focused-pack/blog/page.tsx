// 블로그/콘텐츠 집중팩 상세 페이지
import Link from 'next/link'
import PrePaymentForm from '@/components/purchase/PrePaymentForm'

const PACK_ITEMS = [
  { name: '제목 후보 만들기', desc: '클릭률 높은 제목 후보를 여러 각도로 만들어 비교하기' },
  { name: '도입부 작성', desc: '독자가 계속 읽고 싶어지는 첫 단락 만들기' },
  { name: '구조 잡기', desc: '글 전체의 소제목과 단락 흐름을 먼저 잡아두기' },
  { name: '본문 확장', desc: '초안을 더 풍부하고 읽히는 방향으로 발전시키기' },
  { name: '판매형·공감형 문구', desc: '상황에 맞는 톤으로 설득력 있는 문구 만들기' },
  { name: 'CTA·마무리', desc: '독자가 다음 행동을 하게 만드는 마무리와 CTA 작성' },
]

const FLOW_STEPS = [
  {
    step: 1,
    title: '첫 질문',
    desc: '글의 방향·구조·독자를 AI에게 먼저 잡아주는 질문',
  },
  {
    step: 2,
    title: '후속 질문',
    desc: '초안을 더 읽히는 방향으로 발전시키는 질문',
  },
  {
    step: 3,
    title: '수정 요청',
    desc: '글의 흐름·톤·CTA를 원하는 방향으로 조정하는 수정 지시',
  },
  {
    step: 4,
    title: '검수 질문',
    desc: '게시 전 어색한 표현·흐름·CTA를 다듬는 마무리 검수',
  },
]

const PROBLEMS = [
  '첫 문장이 안 나와서 글 시작 자체가 막혀요',
  '초안은 써도 구조가 약하고 읽히지 않는 느낌이에요',
  '마지막 CTA나 마무리가 늘 어색하게 끝나요',
]

const SAMPLE_TEXT = `## 작업 상황
블로그 글 작업 중입니다.
글 초안 형태의 결과물을 만들어야 합니다.

## 막힌 부분과 요청
아직 어디서 시작해야 할지 모르겠습니다.
먼저 필요한 것들을 물어봐 주세요. 제 상황에
맞는 시작점을 같이 잡아주시면 좋겠습니다.

## 원하는 결과물
유형: 글 초안
제목과 소제목을 먼저 잡아주고,
각 섹션의 본문을 채워주세요.

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 주제나 키워드
- 이 글을 읽을 대상 독자
- 글의 목적 (정보 제공, 제품 소개 등) ...`

const FAQ = [
  {
    q: '블로그 외에 다른 콘텐츠에도 쓸 수 있나요?',
    a: '네. 블로그 글 외에도 SNS 카피, 뉴스레터, 랜딩 페이지 문구, 제품 설명글 등 다양한 콘텐츠 작성에 활용할 수 있어요. 콘텐츠를 만들어야 하는 상황이라면 대부분 맞아요.',
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

export default function BlogFocusedPackPage() {
  const paymentUrl = process.env.NEXT_PUBLIC_BLOG_PACK_URL ?? null

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>

        {/* 섹션 1: 히어로 */}
        <p className="text-xs font-medium text-indigo-500 mb-3">블로그/콘텐츠 집중팩</p>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          제목부터 초안, CTA까지<br />한 흐름으로<br />이어갈 수 있어요
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          첫 문장이 막혔을 때,<br />
          선택만 하면 제목 잡기부터 CTA 검수까지 이어갈 수 있어요.
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
            제목부터 마무리까지, 이 흐름을 따라가면 돼요
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
            첫 질문부터 게시 전 검수까지, 콘텐츠 완성 흐름을 담았어요
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
              <p className="text-[10px] font-medium text-gray-400 mb-3">글 초안 예시</p>
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
              <p className="text-xs font-medium text-indigo-500 mb-3">콘텐츠 집중팩</p>
              <ul className="space-y-2">
                <li className="text-xs font-medium text-gray-800">제목·초안·CTA 흐름</li>
                <li className="text-xs text-gray-600">후속·수정·검수 포함</li>
                <li className="text-xs text-gray-600">게시 직전 수준</li>
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
          <PrePaymentForm
            packType="blog"
            packLabel="블로그/콘텐츠 집중팩"
            price="9,900원"
            paymentUrl={paymentUrl}
          />
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
