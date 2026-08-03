// 가이드 목록 페이지 — SEO 아티클 허브
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI에게 일 시키는 법 가이드 | AI시킴',
  description:
    '보고서, 블로그, 개발까지 — AI에게 제대로 일을 시키는 작업지시서 방법을 상황별로 정리한 무료 가이드 모음입니다.',
  alternates: {
    canonical: 'https://aisikim.com/guide',
  },
}

const ARTICLES = [
  {
    href: '/guide/ai-report',
    title: 'AI에게 보고서 초안을 쓰게 하는 법',
    desc: '"보고서 써줘"가 실패하는 이유와, 실무 수준 초안을 받는 작업지시서 4요소',
  },
  {
    href: '/guide/ai-blog',
    title: 'ChatGPT로 블로그 글 쓰면 다 비슷해지는 이유',
    desc: '검색 유입이 붙는 글과 안 붙는 글의 차이, 작업지시서로 바꾸는 법',
  },
]

export default function GuideIndexPage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        <Link href="/" className="text-gray-400 text-sm block mb-8">← 홈</Link>

        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          AI에게 일 시키는 법<br />무료 가이드
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          같은 AI라도 시키는 방법에 따라 결과가 완전히 달라져요.<br />
          상황별로 바로 써먹는 방법을 정리했습니다.
        </p>

        <div className="space-y-3 mb-10">
          {ARTICLES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="block border border-gray-200 rounded-xl px-4 py-4 active:bg-gray-50"
            >
              <p className="text-sm font-semibold text-gray-800 mb-1">{a.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              <p className="text-xs font-semibold text-indigo-500 mt-2">읽기 →</p>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            글보다 빠른 방법: 1분 진단으로 내 상황에 맞는 작업지시서를 바로 받아보세요.
          </p>
          <Link
            href="/quiz"
            className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700"
          >
            무료 진단 시작하기
          </Link>
        </div>

      </div>
    </main>
  )
}
