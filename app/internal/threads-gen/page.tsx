import type { Metadata } from 'next'
import Link from 'next/link'
import ThreadsContentGenerator from '@/components/internal/ThreadsContentGenerator'

export const metadata: Metadata = {
  title: 'Threads 콘텐츠 생성기 | AI시킴',
  description: 'AI시킴 관련 Threads 홍보 콘텐츠를 자동으로 생성하는 내부 운영용 도구입니다.',
  alternates: {
    canonical: 'https://aisikim.com/internal/threads-gen',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThreadsGenPage() {
  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">
        <Link href="/" className="text-gray-400 text-sm block mb-8">
          ← 홈
        </Link>

        <ThreadsContentGenerator />
      </div>
    </main>
  )
}
