import type { Metadata } from 'next'
import QuizPageClient from '@/components/quiz/QuizPageClient'

export const metadata: Metadata = {
  title: '무료 작업지시서 만들기 | AI시킴',
  description:
    '블로그, 업무, 개발 중 어떤 작업이 막히는지 선택하면 AI에 바로 넣을 수 있는 무료 작업지시서를 만들어드려요.',
  alternates: {
    canonical: 'https://aisikim.com/quiz',
  },
  openGraph: {
    title: '무료 작업지시서 만들기 | AI시킴',
    description:
      '어떤 작업이 막히는지 선택하면 AI에 바로 넣을 수 있는 무료 작업지시서를 만들어드려요.',
    url: 'https://aisikim.com/quiz',
    type: 'website',
  },
}

export default function QuizPage() {
  return <QuizPageClient />
}
