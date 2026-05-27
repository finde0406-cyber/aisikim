// 랜딩 히어로 섹션 - 핵심 메시지와 주요 CTA
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section>
      <div className="px-4 pt-14 pb-10 max-w-sm mx-auto text-center">
        <h1 className="text-[1.875rem] font-extrabold text-gray-900 leading-[1.2] tracking-tight mb-5">
          AI에게 뭘 시켜야 할지<br />
          모르겠다면,<br />
          <span className="text-indigo-600">직접 쓰지 말고<br />선택하세요.</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          목적·상황·결과물을 고르면<br />
          ChatGPT·Claude·Gemini에 바로 넣을 수 있는<br />
          작업지시서를 3분 만에 만들어드려요.
        </p>
        <Button href="/quiz" className="w-full">
          무료 작업지시서 만들기 →
        </Button>
        <p className="mt-3 text-xs text-gray-400">
          이메일 · 회원가입 불필요
        </p>
      </div>
    </section>
  )
}
