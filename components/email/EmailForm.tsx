'use client'
// 무료 샘플팩 신청 폼 — 내부 API(/api/sample-pack) 직접 연결

import { useState } from 'react'
import Link from 'next/link'

const SAMPLE_PACK_ITEMS = [
  '블로그 글 초안 만들기',
  '업무 보고서 초안 정리',
  '앱/웹사이트 기능 정의 요청하기',
  '공통 AI 활용/작업설계 시작하기',
  'AI 결과물 수정 및 검수 요청하기',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// mail_not_configured: 발송 설정 전 | success: 발송 성공 | error: 실패
type Status = 'idle' | 'loading' | 'success' | 'not_configured' | 'error'

interface Props {
  category?: string
}

export default function EmailForm({ category }: Props) {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldError, setFieldError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email.trim()) {
      setFieldError('이메일을 입력해주세요.')
      return
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setFieldError('올바른 이메일 형식으로 입력해주세요.')
      return
    }
    if (!agreed) {
      setFieldError('동의 항목을 먼저 확인해주세요.')
      return
    }

    setFieldError('')
    setStatus('loading')

    try {
      const res = await fetch('/api/sample-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), agreed, category }),
      })

      if (res.ok) {
        setStatus('success')
        return
      }

      const data = await res.json().catch(() => ({}))

      if (res.status === 503 && data.error === 'mail_not_configured') {
        setStatus('not_configured')
      } else {
        console.error('[EmailForm] API 오류:', res.status, data)
        setStatus('error')
      }
    } catch {
      console.error('[EmailForm] 네트워크 오류')
      setStatus('error')
    }
  }

  // 발송 성공
  if (status === 'success') {
    return (
      <div className="border border-indigo-100 bg-indigo-50 rounded-xl px-4 py-6 text-center">
        <p className="text-sm font-semibold text-gray-900 mb-2">신청이 완료됐어요</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          입력하신 이메일 주소로 샘플팩을 보내드릴게요.<br />
          받지 못하셨다면 스팸 폴더를 확인해주세요.
        </p>
        <Link
          href="/starter-pack"
          className="text-sm text-indigo-600 underline underline-offset-2"
        >
          집중팩·번들도 살펴보기
        </Link>
      </div>
    )
  }

  // 발송 설정 준비 전 — 신청 불가 상태
  if (status === 'not_configured') {
    return (
      <div className="border border-gray-100 rounded-xl px-4 py-5 text-center">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          현재 샘플팩 신청을 받고 있지 않아요
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          이메일 발송 연결을 마무리하는 중이에요.<br />
          조금 뒤 다시 시도해 주세요.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 샘플팩 구성 목록 */}
      <ul className="space-y-2 mb-5">
        {SAMPLE_PACK_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-indigo-400 font-bold flex-shrink-0 mt-0.5">·</span>
            {item}
          </li>
        ))}
      </ul>

      {/* 이메일 입력 */}
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setFieldError('')
        }}
        placeholder="이메일 주소를 입력해주세요"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
        inputMode="email"
        autoComplete="email"
        disabled={status === 'loading'}
      />

      {/* 동의 문구 */}
      <label className="flex items-start gap-3 cursor-pointer mb-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked)
            setFieldError('')
          }}
          className="mt-0.5 w-4 h-4 accent-indigo-600 flex-shrink-0"
          disabled={status === 'loading'}
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          샘플팩 발송을 위해 이메일을 수집해요. 향후 서비스 업데이트 및 유료 상품 안내를
          받을 수 있으며, 언제든지 수신을 거부할 수 있어요.
        </span>
      </label>

      {/* 에러 메시지 */}
      {fieldError && <p className="text-xs text-red-500 mb-3">{fieldError}</p>}
      {status === 'error' && (
        <p className="text-xs text-red-500 mb-3">
          신청 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-indigo-600 text-white font-semibold rounded-xl py-4 text-sm min-h-[52px] active:bg-indigo-700 disabled:opacity-60"
      >
        {status === 'loading' ? '신청 중...' : '무료 샘플팩 신청하기'}
      </button>

      {/* 하단 안내 */}
      <p className="text-xs text-gray-400 text-center mt-3">
        이름·전화번호 등 추가 정보는 수집하지 않아요.
      </p>
    </form>
  )
}
