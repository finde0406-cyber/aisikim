'use client'
// 유료팩 구매 전 연락처 수집 폼 — 정보 저장 후 나이스페이 결제창 호출
// NEXT_PUBLIC_NICEPAY_CLIENT_KEY 미설정 시 구매 불가 안내로 안전하게 전환

import { useState } from 'react'
import Link from 'next/link'
import { PACK_PRODUCTS, type PackType } from '@/lib/products'

const NICEPAY_SDK_URL = 'https://pay.nicepay.co.kr/v1/js/'

declare global {
  interface Window {
    AUTHNICE?: {
      requestPay: (options: Record<string, unknown>) => void
    }
  }
}

// 나이스페이 JS SDK를 필요 시점에 1회만 로드
function loadNicepaySdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.AUTHNICE) {
      resolve()
      return
    }
    const existing = document.querySelector(`script[src="${NICEPAY_SDK_URL}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('sdk_load_failed')))
      return
    }
    const script = document.createElement('script')
    script.src = NICEPAY_SDK_URL
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('sdk_load_failed'))
    document.head.appendChild(script)
  })
}

// 주문번호와 서명된 주문 정보(mallReserved)는 서버(/api/purchase-intent)가 발급한다.
// 클라이언트는 값을 만들지 않고 전달만 한다 — 상품·금액 위변조는 서버 검증에서 차단.
interface PayInfo {
  orderId: string
  mallReserved: string
  buyerEmail: string
}

function PurchaseSteps({ activeStep }: { activeStep: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: '정보 입력' },
    { n: 2, label: '결제' },
    { n: 3, label: '이메일 발송' },
  ]
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                s.n <= activeStep ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s.n < activeStep ? '✓' : s.n}
            </span>
            <span
              className={`text-[10px] font-medium whitespace-nowrap ${
                s.n <= activeStep ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px flex-1 mx-1 mb-4 ${
                s.n < activeStep ? 'bg-indigo-300' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'loading' | 'ready' | 'not_configured' | 'error'

interface Props {
  packType: PackType
  packLabel: string
  price: string
}

export default function PrePaymentForm({ packType, packLabel, price }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldError, setFieldError] = useState('')
  const [payError, setPayError] = useState('')
  const [payLoading, setPayLoading] = useState(false)
  const [payInfo, setPayInfo] = useState<PayInfo | null>(null)

  const nicepayClientKey = process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY ?? ''

  // 결제 수단 미설정 상태
  if (!nicepayClientKey) {
    return (
      <div className="border border-gray-100 rounded-2xl py-6 px-5 text-center bg-gray-50">
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

  // 나이스페이 결제창 호출
  async function handleNicepayPay() {
    setPayError('')

    if (!payInfo) {
      setPayError('주문 정보가 만료됐어요. 새로고침 후 다시 진행해주세요.')
      return
    }

    setPayLoading(true)
    try {
      await loadNicepaySdk()
      if (!window.AUTHNICE) throw new Error('sdk_load_failed')

      // 운영에서는 NEXT_PUBLIC_SITE_URL(https://aisikim.com)로 returnUrl 고정
      const returnBase = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

      window.AUTHNICE.requestPay({
        clientId: nicepayClientKey,
        method: 'card',
        orderId: payInfo.orderId,
        amount: PACK_PRODUCTS[packType].amount,
        goodsName: PACK_PRODUCTS[packType].label,
        buyerName: name.trim(),
        buyerEmail: payInfo.buyerEmail,
        buyerTel: phone.replace(/\D/g, ''),
        returnUrl: `${returnBase}/api/payments/nicepay/return`,
        mallReserved: payInfo.mallReserved,
        fnError: (result: { errorMsg?: string }) => {
          setPayLoading(false)
          setPayError(result?.errorMsg || '결제창을 여는 중 문제가 생겼어요. 다시 시도해주세요.')
        },
      })
      // 결제창이 열리면 이후 흐름은 returnUrl 리다이렉트로 이어짐
      setPayLoading(false)
    } catch {
      setPayLoading(false)
      setPayError('결제 모듈을 불러오지 못했어요. 새로고침 후 다시 시도해주세요.')
    }
  }

  // 정보 저장 완료 → 결제 단계
  if (status === 'ready') {
    return (
      <div className="border border-indigo-200 bg-indigo-50 rounded-2xl px-5 py-6">
        <PurchaseSteps activeStep={2} />
        <div className="flex items-start gap-3 mb-5">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-base">
            ✓
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">정보가 저장됐어요</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              아래 버튼을 누르면 결제창이 열려요.<br />
              결제가 완료되면 입력하신 이메일로 PDF 자료가 자동 발송돼요.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNicepayPay}
          disabled={payLoading}
          className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold rounded-xl px-6 py-4 text-sm min-h-[52px] active:bg-indigo-700 disabled:opacity-60"
        >
          {payLoading ? '결제창 여는 중...' : `${price}으로 결제하기 →`}
        </button>

        {payError && <p className="text-xs text-red-500 text-center mt-3">{payError}</p>}

        <p className="text-xs text-gray-400 text-center mt-3">
          나이스페이 안전결제를 사용해요
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
      <div className="border border-gray-100 rounded-2xl py-6 px-5 text-center bg-gray-50">
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
        const data = await res.json().catch(() => ({}))
        if (data?.pay?.orderId && data?.pay?.mallReserved && data?.pay?.buyerEmail) {
          setPayInfo(data.pay as PayInfo)
        }
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
    <div className="border border-indigo-100 rounded-2xl overflow-hidden">
      {/* 폼 헤더 — 구매 흐름 표시 */}
      <div className="bg-indigo-50 px-5 pt-5 pb-4 border-b border-indigo-100">
        <PurchaseSteps activeStep={1} />
        <p className="text-sm font-semibold text-gray-900 mb-1">구매 전 정보 입력</p>
        <p className="text-xs text-gray-500 leading-relaxed">
          결제 확인 후 아래 이메일로 PDF 자료를 보내드려요.
        </p>
      </div>

      {/* 폼 본체 */}
      <form onSubmit={handleSubmit} noValidate className="px-5 py-5">
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setFieldError('') }}
          placeholder="이름"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
          autoComplete="name"
          disabled={status === 'loading'}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setFieldError('') }}
          placeholder="이메일 (자료를 받을 주소)"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
          inputMode="email"
          autoComplete="email"
          disabled={status === 'loading'}
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="연락처 (예: 010-1234-5678)"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-4"
          inputMode="tel"
          autoComplete="tel"
          disabled={status === 'loading'}
        />

        <label className="flex items-start gap-3 cursor-pointer mb-4">
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
      </form>

      {/* 폼 푸터 */}
      <div className="bg-gray-50 border-t border-gray-100 px-5 py-4 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          메일이 보이지 않으면 스팸함도 함께 확인해 주세요.<br />
          문의: hello@aisikim.com / 0502-1940-2233
        </p>
        <p className="text-xs text-gray-400 mt-1">
          자료 발송 외 목적으로 사용하지 않아요.
        </p>
      </div>
    </div>
  )
}
