// 페이지 하단 최종 CTA 섹션
import Button from '@/components/ui/Button'

export default function FinalCTASection() {
  return (
    <section>
      <div className="px-4 py-12 max-w-sm mx-auto text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          지금 바로 무료로 시작하세요
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          선택만으로 3분 만에 작업지시서 1개를 받아보세요.<br />
          이메일이나 회원가입이 필요 없습니다.
        </p>
        <Button href="/quiz" className="w-full">
          무료 진단 시작하기
        </Button>
      </div>
    </section>
  )
}
