'use client'
// 작업지시서 복사 버튼 - 클립보드 API 사용

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API 미지원 환경 무시
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-4 rounded-xl text-sm font-semibold min-h-[52px] transition-colors ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-indigo-600 text-white active:bg-indigo-700'
      }`}
    >
      {copied ? '복사됐습니다' : '작업지시서 복사하기'}
    </button>
  )
}
