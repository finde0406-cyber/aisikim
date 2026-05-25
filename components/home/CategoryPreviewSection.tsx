// 초기 MVP 카테고리 3개 미리보기 섹션
import Button from '@/components/ui/Button'

const CATEGORIES = [
  {
    title: '블로그·콘텐츠',
    examples: '글 초안, 제목 아이디어, 판매 문구',
  },
  {
    title: '업무·보고서',
    examples: '보고서 초안, 체크리스트, 실행 계획',
  },
  {
    title: '앱·웹사이트 개발',
    examples: '기능 정의, 개발 지시문, 기획서',
  },
]

export default function CategoryPreviewSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-10 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
          어떤 작업이 필요하신가요?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          아래 3가지 영역에서 바로 시작할 수 있습니다.
        </p>
        <ul className="space-y-3 mb-6">
          {CATEGORIES.map((cat) => (
            <li key={cat.title} className="bg-white rounded-xl px-4 py-4 shadow-sm">
              <p className="font-semibold text-gray-900 text-sm">{cat.title}</p>
              <p className="text-gray-400 text-xs mt-1">{cat.examples}</p>
            </li>
          ))}
        </ul>
        <Button href="/quiz" className="w-full">
          무료 진단 시작하기
        </Button>
      </div>
    </section>
  )
}
