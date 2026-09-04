// 페이지 하단 최종 CTA 섹션
import Button from '@/components/ui/Button'

export default function FinalCTASection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-12 max-w-sm mx-auto text-center">
        <h2 className="text-xl font-extrabold text-gray-900 mb-3">
          지금 어디에서 막혔는지부터 확인하세요
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          무료 진단 후, 필요한 사람만 바이브코딩 출시팩을 확인하면 돼요.
        </p>
        <Button href="/quiz" className="w-full">
          지금 내 작업지시서 만들기 →
        </Button>
      </div>
    </section>
  )
}
