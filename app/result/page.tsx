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
        <h1 className="text-xl font-bold text-gray-900 mb-2">첫 번째 작업지시서</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          선택하신 조건으로 기본 작업지시서 1개를 만들었습니다.<br />
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
            지금은 <strong className="text-gray-700">첫 번째 작업지시서 1개</strong>만 열려 있습니다.
            실제 결과물을 완성하려면 후속 질문, 수정 요청, 검수 단계가 더 필요합니다.
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
          무료로 받을 수 있는 샘플 작업지시서 5개입니다.<br />
          후속 질문·수정 요청·검수 흐름이 포함된 형태로 구성되어 있습니다.
        </p>
        <EmailForm />

        {/* 구분 */}
        <div className="mt-12 mb-8 border-t border-gray-100" />

        {/* ---- 스타터팩 섹션 (소프트 노출) ---- */}
        <p className="text-xs font-medium text-gray-400 mb-4">더 완성된 결과물이 필요하다면</p>
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
              <li className="text-xs text-gray-600">후속·수정·검수 포함</li>
              <li className="text-xs font-semibold text-indigo-600">9,900원</li>
            </ul>
          </div>
        </div>

        {/* 스타터팩 CTA — outline 스타일 (소프트) */}
        <Link
          href="/starter-pack"
          className="flex items-center justify-center w-full border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-50"
        >
          결과물을 완성하는 작업지시서 50개 보기
        </Link>

      </div>
    </main>
  )
}
