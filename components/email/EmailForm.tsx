'use client'
// 무료 샘플팩 신청 이메일 수집 폼

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

export default function EmailForm() {
  const formUrl = process.env.NEXT_PUBLIC_SAMPLE_PACK_FORM_URL

  // hooks는 조건 분기 이전에 모두 선언
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const [error, setError] = useState('')

  // 외부 폼 연결 전: 준비 중 안내만 노출
  if (!formUrl) {
    return (
      <div className="border border-dashed border-gray-200 rounded-xl px-4 py-5">
        <p className="text-xs font-medium text-gray-400 mb-3">샘플팩 구성 5개</p>
        <ul className="space-y-2 mb-5">
          {SAMPLE_PACK_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="text-indigo-300 flex-shrink-0 mt-0.5">·</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 rounded-xl px-4 py-4 text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">신청 연결 준비 중</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            샘플팩 발송 연결이 완료되면 이 자리에서 바로 신청하실 수 있습니다.
          </p>
        </div>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('올바른 이메일 형식으로 입력해주세요.')
      return
    }
    if (!agreed) {
      setError('동의 항목을 먼저 확인해주세요.')
      return
    }

    setError('')
    window.open(
      `${formUrl}?email=${encodeURIComponent(email.trim())}`,
      '_blank',
      'noopener,noreferrer'
    )
    setRedirected(true)
  }

  // 외부 폼으로 이동한 뒤: 제출 완료 안내 (접수 완료가 아님)
  if (redirected) {
    return (
      <div className="border border-indigo-100 bg-indigo-50 rounded-xl px-4 py-6 text-center">
        <p className="text-sm font-semibold text-gray-900 mb-2">신청 페이지가 열렸습니다</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          새 탭에서 열린 신청 페이지에서 제출을 완료해 주세요.
          <br />
          제출이 완료되면 영업일 기준 1~2일 내 이메일로 샘플팩을 보내드립니다.
        </p>
        <Link
          href="/starter-pack"
          className="text-sm text-indigo-600 underline underline-offset-2"
        >
          유료 스타터팩 50개도 살펴보기
        </Link>
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
          setError('')
        }}
        placeholder="이메일 주소를 입력해주세요"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-400 mb-3"
        inputMode="email"
        autoComplete="email"
      />

      {/* 동의 문구 */}
      <label className="flex items-start gap-3 cursor-pointer mb-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked)
            setError('')
          }}
          className="mt-0.5 w-4 h-4 accent-indigo-600 flex-shrink-0"
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          샘플팩 발송을 위해 이메일을 수집합니다. 향후 서비스 업데이트 및 유료 상품 안내를
          받을 수 있으며, 언제든지 수신을 거부하실 수 있습니다.
        </span>
      </label>

      {/* 에러 메시지 */}
      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold rounded-xl py-4 text-sm min-h-[52px] active:bg-indigo-700"
      >
        무료 샘플팩 신청하기
      </button>

      {/* 하단 안내 */}
      <p className="text-xs text-gray-400 text-center mt-3">
        이름·전화번호 등 추가 정보는 수집하지 않습니다.
      </p>
    </form>
  )
}
