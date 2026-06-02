'use client'
// 유료팩 구매 전 연락처 수집 폼 — 결제 이동 전 이메일/이름 저장

import { useState } from 'react'
import Link from 'next/link'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'loading' | 'ready' | 'not_configured' | 'error'

interface Props {
  packType: 'dev' | 'work' | 'blog' | 'starter_bundle'
  packLabel: string
  price: string
  paymentUrl: string | null
}

export default function PrePaymentForm({ packType, packLabel, price, paymentUrl }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldError, setFieldError] = useState('')

  // 결제 URL 미설정 상태
  if (!paymentUrl) {
    return (
      <div className="border border-gray-100 rounded-xl py-5 px-4 text-center">
        <p className="text-sm font-medium text-gray-700 mb-1">
          현재 구매 신청을 받고 있지 않아요
        </p>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          먼저 무료 샘플팩으로 품질을 확인해보세요.
        </p>
        <Link href="/quiz" className="text-sm text-indigo-600 underline underline-offset-2">
          무료 진단 후 샘플팩 신청하기
        </Link>
      </div>
    )
  }

  // 정보 저장 완료 → 결제 이동 단계
  if (status === 'ready') {
    return (
      <div className="border border-indigo-100 bg-indigo-50 rounded-xl px-4 py-6">
        <p className="text-sm font-semibold text-gray-900 mb-2">정보가 저장됐어요</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          아래 버튼으로 결제 페이지로 이동해주세요.<br />
          결제 완료 후 영업일 기준 1~2일 내 입력하신 이메일로 PDF 자료를 보내드릴게요.
        </p>
        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700"
        >
          {price}으로 결제하기 →
        </a>
        <p className="text-xs text-gray-400 text-center mt-3">
          결제 창이 새 탭으로 열려요
        </p>
        <p className="text-xs text-gray-400 text-center mt-2 leading-relaxed">
          메일이 보이지 않으면 스팸함도 함께 확인해 주세요.<br />
          문의: hello@aisikim.com / 0502-1940-2233
        </p>
      </div>
    )
  }

  // 운영 설정 전 상태 (mail_not_configured)
  if (status === 'not_configured') {
    return (
      <div className="border border-gray-100 rounded-xl py-5 px-4 text-center">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          현재 구매 신청을 받고 있지 않아요
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          결제 연동을 마무리하는 중이에요.<br />
          조금 뒤 다시 시도해 주세요.
        </p>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      setFieldError('이름을 입력해주세요.')
      return
    }
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setFieldError('올바른 이메일을 입력해주세요.')
      return
    }
    if (!phone.trim()) {
      setFieldError('연락처를 입력해주세요.')
      return
    }
    if (!agreed) {
      setFieldError('동의 항목을 먼저 확인해주세요.')
      return
    }

    setFieldError('')
    setStatus('loading')

    try {
      const res = await fetch('/api/purchase-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          packType,
          agreed,
        }),
      })

      if (res.ok) {
        setStatus('ready')
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('[PrePaymentForm] 오류:', res.status, data)
        if (res.status === 503) {
          setStatus('not_configured')
        } else {
          setStatus('error')
        }
      }
    } catch {
      console.error('[PrePaymentForm] 네트워크 오류')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
        구매 연락처
      </p>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        결제 전 이름, 이메일, 연락처를 먼저 입력해 주세요.<br />
        결제 확인 후 입력하신 이메일로 PDF 자료를 보내드려요.
      </p>

      {/* 이름 */}
      <input
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value); setFieldError('') }}
        placeholder="이름"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
        autoComplete="name"
        disabled={status === 'loading'}
      />

      {/* 이메일 */}
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setFieldError('') }}
        placeholder="이메일"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
        inputMode="email"
        autoComplete="email"
        disabled={status === 'loading'}
      />

      {/* 연락처 (선택) */}
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="연락처 (예: 010-1234-5678)"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
        inputMode="tel"
        autoComplete="tel"
        disabled={status === 'loading'}
      />

      {/* 동의 */}
      <label className="flex items-start gap-3 cursor-pointer mb-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); setFieldError('') }}
          className="mt-0.5 w-4 h-4 accent-indigo-600 flex-shrink-0"
          disabled={status === 'loading'}
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          {packLabel} 발송을 위해 위 정보를 수집해요. 서비스 안내 목적으로만 사용하며
          언제든지 수신을 거부할 수 있어요.
        </span>
      </label>

      {fieldError && <p className="text-xs text-red-500 mb-3">{fieldError}</p>}
      {status === 'error' && (
        <p className="text-xs text-red-500 mb-3">
          저장 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-indigo-600 text-white font-semibold rounded-xl py-4 text-sm min-h-[52px] active:bg-indigo-700 disabled:opacity-60"
      >
        {status === 'loading' ? '저장 중...' : `정보 저장 후 결제하기 — ${price}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
        메일이 보이지 않으면 스팸함도 함께 확인해 주세요.<br />
        문의: hello@aisikim.com / 0502-1940-2233
      </p>
      <p className="text-xs text-gray-400 text-center mt-2">
        자료 발송 외 목적으로 사용하지 않아요.
      </p>
    </form>
  )
}
