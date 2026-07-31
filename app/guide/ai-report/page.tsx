// SEO 가이드 아티클 — AI 보고서 작성법 (검색 유입 → 무료 진단/업무팩 퍼널)
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI에게 보고서 초안을 쓰게 하는 법 — 막연한 질문과 작업지시서의 차이 | AI시킴',
  description:
    'ChatGPT에 "보고서 써줘"라고 하면 뻔한 답이 나오는 이유와, 실무에서 바로 쓸 수 있는 보고서 초안을 받는 작업지시 방법을 예시와 함께 정리했습니다.',
  alternates: {
    canonical: 'https://aisikim.com/guide/ai-report',
  },
}

const BAD_PROMPT = `주간 업무 보고서 좀 잘 써줘`

const GOOD_PROMPT = `## 작업 상황
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
- 분량이나 형식 제약`

export default function AiReportGuidePage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <article className="max-w-sm mx-auto w-full">

        <Link href="/guide" className="text-gray-400 text-sm block mb-8">← 가이드 목록</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          AI에게 보고서 초안을<br />쓰게 하는 법
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          ChatGPT, Claude, Gemini에게 &quot;보고서 써줘&quot;라고 해본 적 있다면,
          결과가 왜 항상 뻔한지도 알고 계실 거예요. 문제는 AI가 아니라
          <strong className="text-gray-700"> 시키는 방법</strong>에 있습니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">막연한 질문은 막연한 답을 만듭니다</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          가장 흔한 요청은 이렇습니다.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-medium text-red-400 mb-2">이렇게 시키면 뻔한 답이 나와요</p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{BAD_PROMPT}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          AI는 내 상황을 모릅니다. 누가 읽는 보고서인지, 무엇을 보고하는지,
          어떤 구조를 원하는지 알려주지 않으면 인터넷 어딘가에 있을 법한
          평균적인 문서를 돌려줄 수밖에 없습니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">작업지시서 방식: 4가지만 정해주면 됩니다</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          실무에서 바로 쓸 수 있는 결과물을 받으려면, 신입사원에게 일을 맡기듯
          네 가지를 정해서 전달하면 됩니다.
        </p>
        <div className="space-y-2 mb-6">
          {[
            ['① 작업 상황', '지금 어떤 일을 하는 중인지'],
            ['② 막힌 부분과 요청', '무엇이 안 풀려서 무엇을 해달라는 건지'],
            ['③ 원하는 결과물', '어떤 형식·구조로 받고 싶은지'],
            ['④ 시작 전 확인할 것', 'AI가 나에게 먼저 물어봐야 할 정보'],
          ].map(([t, d]) => (
            <div key={t} className="border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-gray-800 mb-0.5">{t}</p>
              <p className="text-xs text-gray-500">{d}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          같은 보고서 요청을 작업지시서로 바꾸면 이렇게 됩니다. 그대로 복사해서 써보세요.
        </p>
        <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden mb-8">
          <div className="p-4">
            <p className="text-[10px] font-medium text-indigo-500 mb-2">바로 복사할 작업지시서 — 보고서 초안</p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{GOOD_PROMPT}</p>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <p className="text-[10px] text-gray-400">ChatGPT · Claude · Gemini 어디서든 동일하게 작동해요</p>
          </div>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-3">초안을 받은 다음이 더 중요합니다</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          첫 초안은 시작일 뿐입니다. 결과물의 품질은 후속 요청에서 결정됩니다.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            ['후속 질문', '"보고 대상이 임원이면 어떤 부분을 줄여야 할지 알려줘"'],
            ['수정 요청', '"결론을 먼저 쓰고, 근거를 뒤로 옮겨줘. 문장은 개조식으로."'],
            ['검수 요청', '"보고 전 관점에서 논리 비약이나 빠진 숫자를 지적해줘"'],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-3">
              <span className="text-indigo-300 flex-shrink-0 mt-0.5">·</span>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">{t}</strong> — {d}
              </p>
            </li>
          ))}
        </ul>

        {/* 퍼널 CTA */}
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
            href="/focused-pack/work"
            className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
          >
            업무/보고서 집중팩 보기 — 9,900원
          </Link>
        </div>

      </article>
    </main>
  )
}
