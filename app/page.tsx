// 홈 랜딩페이지 - 전체 섹션 조합
import HeroSection from '@/components/home/HeroSection'
import ProblemSection from '@/components/home/ProblemSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import SamplePreviewSection from '@/components/home/SamplePreviewSection'
import CategoryPreviewSection from '@/components/home/CategoryPreviewSection'
import StarterPackFlowSection from '@/components/home/StarterPackFlowSection'
import PackPreviewSection from '@/components/home/PackPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <SamplePreviewSection />
      <CategoryPreviewSection />
      <StarterPackFlowSection />
      <PackPreviewSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
