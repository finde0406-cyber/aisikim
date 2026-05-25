// 페이지 하단 최종 CTA 섹션
import Button from '@/components/ui/Button'

export default function FinalCTASection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-12 max-w-sm mx-auto text-center">
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          지금 바로 무료로 시작하세요
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          선택만으로 3분 만에 작업지시서 1개를 받아보세요.
        </p>
        <Button href="/quiz" className="w-full">
          지금 내 작업지시서 만들기 →
        </Button>
      </div>
    </section>
  )
}
