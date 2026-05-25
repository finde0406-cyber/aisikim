'use client'
// 선택형 진단 페이지 - 5단계 선택형 진단 흐름

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QUIZ_STEPS, type QuizAnswers } from '@/lib/quiz-data'

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentQ = QUIZ_STEPS[step]
  const selected = answers[currentQ.id]
  const isLast = step === QUIZ_STEPS.length - 1

  function handleSelect(value: string) {
    if (timerRef.current) clearTimeout(timerRef.current)
    const updated = { ...answers, [currentQ.id]: value }
    setAnswers(updated)
    timerRef.current = setTimeout(() => {
      if (isLast) {
        const params = new URLSearchParams(
          Object.entries(updated).filter((e): e is [string, string] => e[1] !== undefined)
        )
        router.push(`/result?${params.toString()}`)
      } else {
        setStep(s => s + 1)
      }
    }, 180)
  }

  function handlePrev() {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (step > 0) setStep(prev => prev - 1)
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-10">
      <div className="max-w-sm mx-auto w-full flex flex-col min-h-screen">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-8">
          {step > 0 ? (
            <button
              onClick={handlePrev}
              className="text-gray-400 text-sm py-2 pr-4"
            >
              ← 이전
            </button>
          ) : (
            <Link href="/" className="text-gray-400 text-sm py-2 pr-4">
              ← 홈
            </Link>
          )}
          <span className="text-xs text-gray-400 font-medium">
            {step + 1} / {QUIZ_STEPS.length}
          </span>
        </div>

        {/* 진행 단계 바 */}
        <div className="flex gap-1 mb-8">
          {QUIZ_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-indigo-600' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>

        {/* 질문 */}
        <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
          {currentQ.question}
        </h2>

        {/* 선택지 */}
        <div className="space-y-3 flex-1">
          {currentQ.options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium min-h-[52px] transition-colors ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-700 active:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

      </div>
    </main>
  )
}
