// SEO 가이드 아티클 — AI로 블로그 글 쓰는 법 (검색 유입 → 무료 진단/블로그팩 퍼널)
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ChatGPT로 블로그 글 쓰는 법 — 뻔한 글이 나오는 이유와 해결법 | AI시킴',
  description:
    'ChatGPT나 Claude에 "블로그 글 써줘"라고만 하면 왜 다 비슷한 글이 나오는지, 실제로 검색 유입이 붙는 글을 받는 작업지시 방법을 예시와 함께 정리했습니다.',
  alternates: {
    canonical: 'https://aisikim.com/guide/ai-blog',
  },
}

const BAD_PROMPT = `블로그에 올릴 글 하나 써줘, 주제는 재테크`

const GOOD_PROMPT = `## 작업 상황
블로그 글을 작성하려고 합니다.
주제는 [주제]이고, 목적은 [정보 제공 / 후기 / 판매 유도]입니다.

## 막힌 부분과 요청
제목과 첫 문단이 막막합니다.
검색으로 들어온 사람이 끝까지 읽을 수 있는 구조를 잡아주세요.

## 원하는 결과물
유형: 블로그 글 초안
제목 후보 5개 + 소제목 구조 + 도입부 + 본문 핵심 흐름 + 마무리(CTA)

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 이 글을 읽을 대상(초보자/실무자 등)
- 이 글로 얻고 싶은 행동(구독, 구매, 재방문 등)
- 참고할 톤이나 예시 글이 있는지`

export default function AiBlogGuidePage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <article className="max-w-sm mx-auto w-full">

        <Link href="/guide" className="text-gray-400 text-sm block mb-8">← 가이드 목록</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          ChatGPT로 블로그 글 쓰면<br />다 비슷비슷해지는 이유
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          &quot;블로그 글 써줘&quot;라고 시키면 어디서 본 듯한 글이 나옵니다.
          AI 탓이 아니라 <strong className="text-gray-700">시키는 방법</strong> 탓입니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">막연한 요청은 막연한 글을 만듭니다</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          가장 흔한 요청은 이렇습니다.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-medium text-red-400 mb-2">이렇게 시키면 뻔한 글이 나와요</p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{BAD_PROMPT}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          누가 읽는지, 왜 읽는지, 읽고 나서 뭘 하길 바라는지를 안 알려주면
          AI는 인터넷에 이미 있는 평균적인 글을 재조합할 수밖에 없습니다.
          검색엔진도 이런 글을 &quot;이미 있는 내용&quot;으로 판단해 잘 안 올려줍니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">작업지시서로 바꾸면 이렇게 됩니다</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          그대로 복사해서 써보세요.
        </p>
        <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden mb-8">
          <div className="p-4">
            <p className="text-[10px] font-medium text-indigo-500 mb-2">바로 복사할 작업지시서 — 블로그 글 첫 구조</p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{GOOD_PROMPT}</p>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <p className="text-[10px] text-gray-400">ChatGPT · Claude · Gemini 어디서든 동일하게 작동해요</p>
          </div>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-3">초안 이후가 진짜입니다</h2>
        <ul className="space-y-3 mb-8">
          {[
            ['제목 압축', '"제목 후보 5개 중 검색 키워드가 앞에 오는 순서로 다시 정렬해줘"'],
            ['도입부 강화', '"첫 2문장 안에 이 글을 계속 읽어야 할 이유를 넣어줘"'],
            ['판매형 CTA', '"본문 흐름을 안 끊고 자연스럽게 [상품/서비스]로 연결해줘"'],
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
            내 상황에 맞는 작업지시서를 바로 받아보세요
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            1분 선택형 진단으로 지금 막힌 단계에 맞는 작업지시서 1개를 무료로 만들어드려요.
          </p>
          <Link
            href="/quiz"
            className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-3"
          >
            무료 진단 시작하기
          </Link>
          <Link
            href="/focused-pack/blog"
            className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
          >
            블로그/콘텐츠 집중팩 보기 — 9,900원
          </Link>
        </div>

      </article>
    </main>
  )
}
