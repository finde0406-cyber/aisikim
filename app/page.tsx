// 홈 랜딩페이지 - 전체 섹션 조합
import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ProblemSection from '@/components/home/ProblemSection'
import SamplePreviewSection from '@/components/home/SamplePreviewSection'
import QuickGuideSection from '@/components/home/QuickGuideSection'
import CategoryPreviewSection from '@/components/home/CategoryPreviewSection'
import PackPreviewSection from '@/components/home/PackPreviewSection'
import CreatorProofSection from '@/components/home/CreatorProofSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Footer from '@/components/home/Footer'

export const metadata: Metadata = {
  title: 'AI시킴 | AI에게 뭘 시켜야 할지 모르겠다면',
  description:
    '질문을 잘 못해도 괜찮아요. 선택만으로 ChatGPT·Claude·Gemini·Codex에 바로 넣을 수 있는 작업지시서를 만들어드립니다.',
  alternates: {
    canonical: 'https://aisikim.com',
  },
  openGraph: {
    title: 'AI시킴 | AI에게 뭘 시켜야 할지 모르겠다면',
    description:
      '선택만으로 AI에 바로 넣을 수 있는 작업지시서를 만들고, 샘플팩과 유료 집중팩까지 이어서 활용해보세요.',
    url: 'https://aisikim.com',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SamplePreviewSection />
      <QuickGuideSection />
      <CategoryPreviewSection />
      <PackPreviewSection />
      <CreatorProofSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
