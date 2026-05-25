// 무료 결과 페이지 - 선택형 진단 결과로 기본 작업지시서 1개 생성
import Link from 'next/link'
import CopyButton from '@/components/result/CopyButton'
import EmailForm from '@/components/email/EmailForm'
import { generateInstruction, getAnswerSummary } from '@/lib/result-generator'
import type { QuizAnswers } from '@/lib/quiz-data'

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

  return (
    <main className="flex flex-col px-4 py-10 pb-20">
      <div className="max-w-sm mx-auto w-full">

        {/* 상단 홈 링크 */}
        <Link href="/" className="text-gray-400 text-sm block mb-8">
          ← 홈
        </Link>

        {/* 헤더 */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">내 맞춤 작업지시서</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          선택하신 내용을 바탕으로 기본 작업지시서를 만들었습니다.<br />
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

        {/* 다시 진단하기 */}
        <div className="mt-4 text-center">
          <Link href="/quiz" className="text-sm text-gray-400 underline underline-offset-2">
            다시 진단하기
          </Link>
        </div>

        {/* 구분 */}
        <div className="mt-12 mb-8 border-t border-gray-100" />

        {/* 무료 vs 유료 비교 */}
        <p className="text-xs font-medium text-gray-400 mb-4">이것만으로 부족하다면</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">지금 무료</p>
            <ul className="space-y-1.5">
              <li className="text-xs text-gray-600">기본 작업지시서 1개</li>
              <li className="text-xs text-gray-400">단일 질문 구조</li>
            </ul>
          </div>
          <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4">
            <p className="text-xs font-medium text-indigo-500 mb-2">유료 스타터팩</p>
            <ul className="space-y-1.5">
              <li className="text-xs font-medium text-gray-800">작업지시서 50개</li>
              <li className="text-xs text-gray-600">후속 질문·검수 포함</li>
              <li className="text-xs font-semibold text-indigo-600">9,900원</li>
            </ul>
          </div>
        </div>

        {/* 스타터팩 CTA */}
        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700"
        >
          결과물을 완성하는 작업지시서 50개 보기
        </Link>

        {/* 구분 */}
        <div className="mt-12 mb-8 border-t border-gray-100" />

        {/* 무료 샘플팩 이메일 수집 섹션 */}
        <p className="text-xs font-medium text-gray-400 mb-2">무료 샘플팩</p>
        <p className="text-base font-semibold text-gray-900 mb-2">
          더 많은 작업지시서가 필요하신가요?
        </p>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          바로 복사해서 쓸 수 있는 작업지시서 샘플 5개를 이메일로 보내드립니다.
        </p>
        <EmailForm />

      </div>
    </main>
  )
}
