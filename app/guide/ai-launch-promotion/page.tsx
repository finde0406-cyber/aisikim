// SEO 가이드 아티클 — 만든 것을 아무도 안 볼 때 AI로 홍보 문구 만드는 법 (검색 유입 → 출시팩 퍼널)
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '만들긴 했는데 아무도 안 봐요 — AI로 서비스 알리는 법 | AI시킴',
  description:
    '바이브코딩으로 서비스를 출시했는데 방문자가 없다면, 기능이 아니라 알리는 방법이 문제일 수 있습니다. AI에게 홍보 문구·글감을 제대로 시키는 방법을 정리했습니다.',
  alternates: {
    canonical: 'https://aisikim.com/guide/ai-launch-promotion',
  },
}

const BAD_PROMPT = `우리 서비스 홍보 글 하나 써줘`

const GOOD_PROMPT = `## 작업 상황
[서비스 이름]을 막 출시했습니다.
아직 사용자가 거의 없는 초기 단계입니다.

## 막힌 부분과 요청
기능 설명은 할 수 있는데, 왜 지금 써야 하는지를 못 전달하겠습니다.
스크롤을 멈추게 할 첫 문장이 필요합니다.

## 원하는 결과물
유형: SNS 홍보 글 초안 (3줄 훅 + 본문)
- 기능 나열이 아니라, 이 서비스가 없을 때 겪는 구체적인 불편 1개로 시작
- "무료로 해보세요" 대신 실제로 무엇이 달라지는지로 마무리

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 이 글을 볼 사람이 지금 어떤 상황에 있는지
- 우리 서비스를 쓰기 전/후 무엇이 구체적으로 달라지는지
- 어디에 올릴 글인지 (Threads/블로그/카페 등 톤이 다름)`

export default function AiLaunchPromotionGuidePage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <article className="max-w-sm mx-auto w-full">

        <Link href="/guide" className="text-gray-400 text-sm block mb-8">← 가이드 목록</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          만들긴 했는데<br />아무도 안 봐요
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          출시까지는 어떻게든 갑니다. 진짜 어려운 건 그다음 — <strong className="text-gray-700">아무도 모르는 상태에서 첫 사람을 데려오는 것</strong>입니다.
          저희도 지금 이 단계를 지나는 중이라 정직하게 정리했습니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">기능 자랑은 아무도 안 멈춥니다</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-medium text-red-400 mb-2">이렇게 시키면 아무 데서나 본 듯한 홍보글이 나와요</p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{BAD_PROMPT}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          &ldquo;이런 기능이 있습니다&rdquo;는 만든 사람한텐 자랑스럽지만, 처음 보는 사람한텐 아무 의미가 없습니다.
          사람은 기능이 아니라 <strong className="text-gray-700">자기 불편</strong>이 언급될 때 멈춰서 읽습니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">불편 하나를 먼저 찌르고 시작하세요</h2>
        <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden mb-8">
          <div className="p-4">
            <p className="text-[10px] font-medium text-indigo-500 mb-2">바로 복사할 작업지시서 — 첫 문장 훅 만들기</p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{GOOD_PROMPT}</p>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <p className="text-[10px] text-gray-400">ChatGPT · Claude · Gemini 어디서든 동일하게 작동해요</p>
          </div>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-3">글 하나 쓰고 끝이 아닙니다</h2>
        <ul className="space-y-3 mb-8">
          {[
            ['채널별 재작성', '"같은 내용을 Threads용 3줄 버전과 블로그용 긴 버전으로 각각 다시 써줘"'],
            ['과장 걸러내기', '"확인 안 된 숫자나 효과는 다 빼고, 사실만 남겨줘"'],
            ['반응 없는 글 재활용', '"이 글이 왜 안 읽혔을지 첫 문장 기준으로 3가지 가설을 세워줘"'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-3">
              <span className="text-indigo-300 flex-shrink-0 mt-0.5">·</span>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">{t}</strong> — {d}
              </p>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-xs font-medium text-gray-400 mb-2">다음 단계</p>
          <p className="text-base font-semibold text-gray-900 mb-2">
            개발부터 판매 페이지·홍보 글까지, 15개 작업지시서로 이어가세요
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            아이디어 정리, 개발, 검수뿐 아니라 출시 후 알리는 단계까지 포함된 작업지시서팩입니다.
          </p>
          <Link
            href="/focused-pack/dev"
            className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-3"
          >
            출시 작업지시서팩 보기 →
          </Link>
          <Link
            href="/quiz"
            className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
          >
            무료 진단 먼저 해보기
          </Link>
        </div>

      </article>
    </main>
  )
}
