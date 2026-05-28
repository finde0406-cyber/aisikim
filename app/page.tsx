// 홈 랜딩페이지 - 전체 섹션 조합
import HeroSection from '@/components/home/HeroSection'
import ProblemSection from '@/components/home/ProblemSection'
import SamplePreviewSection from '@/components/home/SamplePreviewSection'
import QuickGuideSection from '@/components/home/QuickGuideSection'
import CategoryPreviewSection from '@/components/home/CategoryPreviewSection'
import PackPreviewSection from '@/components/home/PackPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SamplePreviewSection />
      <QuickGuideSection />
      <CategoryPreviewSection />
      <PackPreviewSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
