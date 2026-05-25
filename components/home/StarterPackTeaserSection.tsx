// 유료 스타터팩 예고 섹션 - 구성 목록과 가격 안내
import Button from '@/components/ui/Button'

const PACK_ITEMS = [
  '블로그·콘텐츠 작업지시서 10개',
  '업무·보고서 작업지시서 10개',
  '앱·웹사이트 개발 작업지시서 10개',
  '결과물 검수·수정 작업지시서 10개',
  '공통 AI 활용 작업지시서 10개',
]

export default function StarterPackTeaserSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 py-10 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-indigo-600 text-center mb-2 uppercase tracking-wide">
          AI 작업지시서 스타터팩
        </p>
        <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
          더 완성된 결과물이<br />필요하다면
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          한 번에 대충 묻고 끝내는 문장 묶음이 아니라,<br />
          결과물을 완성하기 위한 단계별 작업지시서 50개입니다.
        </p>
        <ul className="space-y-2 mb-6">
          {PACK_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-indigo-400 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mb-5">
          <span className="text-gray-400 text-sm">PDF + Notion 링크 제공</span>
          <span className="text-lg font-bold text-gray-900">9,900원</span>
        </div>
        <Button href="/starter-pack" variant="outline" className="w-full">
          스타터팩 자세히 보기
        </Button>
      </div>
    </section>
  )
}
