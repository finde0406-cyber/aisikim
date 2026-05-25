// 초기 MVP 카테고리 3개 미리보기 섹션
import Button from '@/components/ui/Button'

const CATEGORIES = [
  {
    title: '블로그·콘텐츠',
    examples: '글 초안 · 제목 · 판매 문구',
  },
  {
    title: '업무·보고서',
    examples: '보고서 · 체크리스트 · 기획서',
  },
  {
    title: '앱·웹사이트 개발',
    examples: '기능 정의 · 개발 지시문',
  },
]

export default function CategoryPreviewSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-8 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-400 mb-5 text-center uppercase tracking-wide">
          지금 시작할 수 있는 영역
        </p>
        <div className="space-y-0 mb-6">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={`flex items-baseline justify-between gap-2 py-3 ${
                i < CATEGORIES.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <span className="font-semibold text-gray-900 text-sm flex-shrink-0">
                {cat.title}
              </span>
              <span className="text-gray-400 text-xs text-right">{cat.examples}</span>
            </div>
          ))}
        </div>
        <Button href="/quiz" className="w-full">
          무료 진단 시작하기 →
        </Button>
      </div>
    </section>
  )
}
