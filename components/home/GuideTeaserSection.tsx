// 무료 가이드 아티클 허브 노출 섹션 — 홈에서 /guide로 가는 유일한 진입점
import Link from 'next/link'

const ARTICLES = [
  { href: '/guide/ai-report', title: 'AI에게 보고서 초안을 쓰게 하는 법' },
  { href: '/guide/ai-blog', title: 'ChatGPT로 블로그 글 쓰면 다 비슷해지는 이유' },
  { href: '/guide/ai-dev-request', title: '코딩 몰라도 AI로 앱 만들기' },
]

export default function GuideTeaserSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-10 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-2 text-center uppercase tracking-wide">
          무료로 먼저 읽어보기
        </p>
        <h2 className="text-base font-bold text-gray-900 mb-5 text-center">
          상황별 무료 가이드
        </h2>

        <div className="space-y-2 mb-4">
          {ARTICLES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 active:bg-gray-50"
            >
              <p className="text-sm text-gray-700">{a.title}</p>
              <span className="text-xs text-indigo-500 flex-shrink-0 ml-2">→</span>
            </Link>
          ))}
        </div>

        <Link
          href="/guide"
          className="flex items-center justify-center w-full text-xs font-semibold text-indigo-500"
        >
          가이드 전체 보기 →
        </Link>
      </div>
    </section>
  )
}
