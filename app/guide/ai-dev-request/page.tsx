// SEO 가이드 아티클 — 비개발자가 AI로 앱 개발 요청하는 법 (검색 유입 → 무료 진단/출시팩 런칭특가 퍼널)
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '코딩 몰라도 AI로 앱 만드는 법 — 바이브코딩 시작 전 꼭 알아야 할 것 | AI시킴',
  description:
    '바이브코딩으로 앱·웹서비스를 만들고 싶은데 AI에게 뭘 어떻게 요청해야 할지 막막하다면, 기능 정의부터 검수까지 실제로 통하는 요청 방법을 정리했습니다.',
  alternates: {
    canonical: 'https://aisikim.com/guide/ai-dev-request',
  },
}

const BAD_PROMPT = `할일 관리 앱 하나 만들어줘`

const GOOD_PROMPT = `## 작업 상황
[할일 관리] 앱/웹서비스를 처음 만들려고 합니다.
아직 기획이 구체적이지 않습니다.

## 막힌 부분과 요청
어떤 기능부터 만들어야 할지 모르겠습니다.
가장 핵심 기능 3개만 먼저 정하고 시작하고 싶습니다.

## 원하는 결과물
유형: MVP 기능 목록
1주~2주 안에 실제로 완성 가능한 범위로 줄여주세요.
"나중에 추가할 기능"과 "지금 뺄 기능"도 구분해주세요.

## 시작 전 확인할 것
아래 내용을 먼저 물어봐 주세요:
- 이 앱을 누가, 왜 쓰는지
- 가장 해결하고 싶은 문제 하나
- 기술 스택 제약이 있는지`

export default function AiDevRequestGuidePage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <article className="max-w-sm mx-auto w-full">

        <Link href="/guide" className="text-gray-400 text-sm block mb-8">← 가이드 목록</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          코딩 몰라도 AI로 앱 만들기,<br />시작 전에 꼭 알아야 할 것
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          바이브코딩은 코드를 몰라도 됩니다. 하지만 <strong className="text-gray-700">뭘 원하는지 모르고 시작하면</strong> AI도 못 만듭니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">막연하게 시키면 막연한 게 나옵니다</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-medium text-red-400 mb-2">이렇게 시키면 방향이 자꾸 바뀌어요</p>
          <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{BAD_PROMPT}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          할일 관리 앱이라고만 하면 AI는 회원가입, 알림, 캘린더 연동까지
          다 만들려고 합니다. 범위가 넓어질수록 완성은 멀어집니다.
        </p>

        <h2 className="text-base font-bold text-gray-900 mb-3">MVP부터 명확히 정하고 시작하세요</h2>
        <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden mb-8">
          <div className="p-4">
            <p className="text-[10px] font-medium text-indigo-500 mb-2">바로 복사할 작업지시서 — 첫 MVP 범위 정하기</p>
            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{GOOD_PROMPT}</p>
          </div>
          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
            <p className="text-[10px] text-gray-400">Claude Code · Codex · ChatGPT 어디서든 동일하게 작동해요</p>
          </div>
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-3">MVP 다음, 실제로 막히는 지점들</h2>
        <ul className="space-y-3 mb-8">
          {[
            ['오류 전달', '"오류 메시지 전체, 어떤 동작을 했을 때 나왔는지, 예상 결과를 같이 알려줘"'],
            ['범위 제한', '"이 파일만 고치고 다른 파일은 건드리지 마"'],
            ['최종 검수', '"모바일 화면에서 글자·버튼이 겹치는 곳 있는지 확인해줘"'],
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
            아이디어부터 출시까지, 15개 작업지시서로 이어가세요
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            MVP 정하기, 오류 수정, 검수, 출시 콘텐츠까지 — 지금 런칭 특가로 만나보세요.
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
