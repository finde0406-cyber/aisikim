// 랜딩 히어로 섹션 - 핵심 메시지와 주요 CTA
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section>
      <div className="px-4 pt-12 pb-10 max-w-sm mx-auto text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
          회원가입 없이 바로 사용 가능
        </span>
        <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
          AI에게 뭘 시켜야 할지<br />
          모르겠다면,<br />
          <span className="text-indigo-600">선택만 하세요.</span>
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-8">
          ChatGPT·Claude·Gemini·Codex에<br />
          바로 넣을 수 있는 작업지시서를<br />
          3분 만에 만들어드립니다.
        </p>
        <Button href="/quiz" className="w-full">
          무료로 진단 시작하기
        </Button>
        <p className="mt-3 text-sm text-gray-400">
          이메일 입력 · 회원가입 불필요
        </p>
      </div>
    </section>
  )
}
