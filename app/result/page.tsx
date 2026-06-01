// 무료 결과 페이지 - 선택형 진단 결과로 기본 작업지시서 1개 생성
import Link from 'next/link'
import CopyButton from '@/components/result/CopyButton'
import EmailForm from '@/components/email/EmailForm'
import { generateInstruction, getAnswerSummary } from '@/lib/result-generator'
import type { QuizAnswers } from '@/lib/quiz-data'

const CATEGORY_PACK = {
  dev: {
    sectionLabel: '개발 요청을 더 명확하게',
    packTitle: '앱/웹사이트 개발 집중팩',
    packItems: ['기능 정의·요구사항 정리', '버그 설명·개발자 전달', '화면 흐름·최종 검수'],
    packNote: '개발자에게 전달 가능한 수준으로 정리할 수 있어요',
    ctaText: '개발 집중팩 살펴보기',
    ctaHref: '/focused-pack/dev',
  },
  work: {
    sectionLabel: '보고서와 실무 문서를 더 빠르게',
    packTitle: '업무/보고서 집중팩',
    packItems: ['보고서 초안·요약본', '실행안·체크리스트', '이메일·회의록 정리'],
    packNote: '상사에게 바로 보낼 수 있는 수준으로 다듬을 수 있어요',
    ctaText: '업무 집중팩 살펴보기',
    ctaHref: '/focused-pack/work',
  },
  blog: {
    sectionLabel: '제목부터 마무리까지 한 흐름으로',
    packTitle: '블로그/콘텐츠 집중팩',
    packItems: ['제목·도입부·구조 잡기', '본문 확장·판매 문구', 'CTA·최종 검수'],
    packNote: '게시 직전까지 다듬을 수 있는 흐름을 드려요',
    ctaText: '콘텐츠 집중팩 살펴보기',
    ctaHref: '/focused-pack/blog',
  },
}

const DEFAULT_PACK = {
  sectionLabel: '내 분야에 맞게 더 깊게',
  packTitle: '카테고리 집중팩',
  packItems: ['앱/웹사이트 개발', '업무/보고서', '블로그/콘텐츠'],
  packNote: '필요한 분야만 선택해 바로 활용할 수 있어요',
  ctaText: '집중팩 살펴보기',
  ctaHref: '/starter-pack',
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  const answers: QuizAnswers = {
    category: typeof params.category === 'string' ? params.category : undefined,
    blocker: typeof params.blocker === 'string' ? params.blocker : undefined,
    output: typeof params.output === 'string' ? params.output : undefined,
    ai_tool: typeof params.ai_tool === 'string' ? params.ai_tool : undefined,
    style: typeof params.style === 'string' ? params.style : undefined,
  }

  if (!answers.category) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-sm mx-auto">
          <p className="text-sm font-medium text-gray-700 mb-2">진단이 필요합니다</p>
          <p className="text-gray-400 text-sm mb-6">먼저 선택형 진단을 진행해주세요.</p>
          <Link href="/quiz" className="text-indigo-600 text-sm underline underline-offset-2">
            진단 시작하기
          </Link>
        </div>
      </main>
    )
  }

  const instruction = generateInstruction(answers)
  const summary = getAnswerSummary(answers)
  const pack = (answers.category && answers.category in CATEGORY_PACK)
    ? CATEGORY_PACK[answers.category as keyof typeof CATEGORY_PACK]
    : DEFAULT_PACK

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        {/* 상단 홈 링크 */}
        <Link href="/" className="text-gray-400 text-sm block mb-8">
          ← 홈
        </Link>

        {/* 헤더 */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">첫 번째 작업지시서</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          선택하신 조건으로 기본 작업지시서 1개를 만들어드렸어요.<br />
          아래 내용을 복사해서 AI에 바로 붙여 넣으세요.
        </p>

        {/* 선택 요약 칩 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {summary.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
            >
              <span className="text-gray-400">{s.label}:</span>
              <span className="font-medium">{s.value}</span>
            </span>
          ))}
        </div>

        {/* 작업지시서 결과 박스 */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-medium text-gray-400 mb-3">기본 작업지시서 1개</p>
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
            {instruction}
          </p>
        </div>

        {/* 복사 버튼 */}
        <CopyButton text={instruction} />

        {/* 다음 단계 훅 */}
        <div className="mt-6 mb-2">
          <p className="text-sm text-gray-500 leading-relaxed">
            이 작업지시서가 <strong className="text-gray-700">시작점</strong>이에요.
            복사해서 AI에 넣으면 바로 시작할 수 있고, 후속 질문·수정·검수로 결과물을 더 다듬을 수 있어요.
          </p>
        </div>

        {/* 다시 진단하기 */}
        <div className="mt-3 mb-0 text-center">
          <Link href="/quiz" className="text-xs text-gray-400 underline underline-offset-2">
            다시 진단하기
          </Link>
        </div>

        {/* 구분 */}
        <div className="mt-10 mb-8 border-t border-gray-100" />

        {/* ---- 샘플팩 섹션 (우선 노출) ---- */}
        <p className="text-xs font-medium text-gray-400 mb-2">다음 단계</p>
        <p className="text-base font-semibold text-gray-900 mb-2">
          5개를 더 받아서 다른 상황에서도 바로 써보세요
        </p>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          무료로 받을 수 있는 샘플 작업지시서 5개예요.<br />
          후속 질문·수정 요청·검수 흐름까지 포함된 형태로 구성되어 있어요.
        </p>
        <EmailForm category={answers.category} />

        {/* 구분 */}
        <div className="mt-12 mb-8 border-t border-gray-100" />

        {/* ---- 카테고리 분기 집중팩 섹션 (메인 유료 전환) ---- */}
        <p className="text-xs font-medium text-gray-400 mb-4">{pack.sectionLabel}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">지금 무료</p>
            <ul className="space-y-1.5">
              <li className="text-xs text-gray-600">기본 작업지시서 1개</li>
              <li className="text-xs text-gray-400">단일 질문 구조</li>
            </ul>
          </div>
          <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
            <p className="text-xs font-medium text-indigo-500 mb-2">{pack.packTitle}</p>
            <ul className="space-y-1">
              {pack.packItems.map((item) => (
                <li key={item} className="text-xs text-gray-700">{item}</li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-500 mt-1.5">{pack.packNote}</p>
          </div>
        </div>

        {/* 집중팩 CTA — solid (메인 유료) */}
        <Link
          href={pack.ctaHref}
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 mb-3"
        >
          {pack.ctaText}
        </Link>

        {/* 번들 블록 */}
        <div className="border border-gray-100 rounded-xl px-4 py-3 mb-3">
          <p className="text-xs text-gray-400 mb-1">더 넓게 써보고 싶다면</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            여러 분야를 한번에 체험할 수 있는 통합 스타터팩 50개 번들도 있어요.
          </p>
        </div>

        {/* 번들 CTA — outline (상위 옵션) */}
        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full border-2 border-gray-200 text-gray-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-gray-50"
        >
          통합 스타터팩 번들 보기
        </Link>

      </div>
    </main>
  )
}
