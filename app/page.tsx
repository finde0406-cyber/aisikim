// 홈 랜딩페이지 - 전체 섹션 조합
import HeroSection from '@/components/home/HeroSection'
import ProblemSection from '@/components/home/ProblemSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import CategoryPreviewSection from '@/components/home/CategoryPreviewSection'
import FreeVsPaidSection from '@/components/home/FreeVsPaidSection'
import StarterPackTeaserSection from '@/components/home/StarterPackTeaserSection'
import FinalCTASection from '@/components/home/FinalCTASection'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <CategoryPreviewSection />
      <FreeVsPaidSection />
      <StarterPackTeaserSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
