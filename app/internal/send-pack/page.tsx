'use client'
// 운영자 전용 유료팩 발송 화면 — INTERNAL_ACCESS_KEY 로 보호

import { useState } from 'react'

const PACK_OPTIONS = [
  { value: 'dev', label: '앱/웹사이트 개발 집중팩' },
  { value: 'work', label: '업무/보고서 집중팩' },
  { value: 'blog', label: '블로그/콘텐츠 집중팩' },
  { value: 'starter_bundle', label: '통합 스타터팩 번들' },
]

type Status = 'idle' | 'loading' | 'success' | 'not_configured' | 'assets_not_configured' | 'unauthorized' | 'error'

export default function InternalSendPackPage() {
  const [accessKey, setAccessKey] = useState('')
  const [packType, setPackType] = useState('dev')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [resultEmail, setResultEmail] = useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!accessKey || !email || !packType) return

    setStatus('loading')
    setResultEmail('')

    try {
      const res = await fetch('/api/internal/send-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessKey, email: email.trim(), name: name.trim(), packType }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus('success')
        setResultEmail(email.trim())
        setEmail('')
        setName('')
      } else if (res.status === 401) {
        setStatus('unauthorized')
      } else if (res.status === 503 && data.error === 'pack_assets_not_configured') {
        setStatus('assets_not_configured')
      } else if (res.status === 503) {
        setStatus('not_configured')
      } else {
        console.error('[send-pack] 오류:', res.status, data)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const statusMessage = () => {
    switch (status) {
      case 'success':
        return <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">{resultEmail} 으로 발송 완료됐어요.</p>
      case 'not_configured':
        return <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">메일 발송 설정이 안 되어 있어요. MAIL_PROVIDER + RESEND_API_KEY를 확인해주세요.</p>
      case 'assets_not_configured':
        return <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">해당 상품의 발송 링크가 아직 설정되지 않았어요. env에서 PDF/Notion URL을 먼저 설정해주세요.</p>
      case 'unauthorized':
        return <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">접근 키가 맞지 않아요. INTERNAL_ACCESS_KEY를 확인해주세요.</p>
      case 'error':
        return <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">발송 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.</p>
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">
          Internal
        </p>
        <h1 className="text-lg font-bold text-gray-900 mb-6">유료팩 발송</h1>

        <form onSubmit={handleSend} className="space-y-4">
          {/* 접근 키 */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">접근 키</label>
            <input
              type="password"
              value={accessKey}
              onChange={(e) => { setAccessKey(e.target.value); setStatus('idle') }}
              placeholder="INTERNAL_ACCESS_KEY"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400"
              disabled={status === 'loading'}
              required
            />
          </div>

          {/* 상품 선택 */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">상품</label>
            <select
              value={packType}
              onChange={(e) => setPackType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 bg-white"
              disabled={status === 'loading'}
            >
              {PACK_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* 구매자 이름 (선택) */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">구매자 이름 (선택)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400"
              disabled={status === 'loading'}
            />
          </div>

          {/* 구매자 이메일 */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">구매자 이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="buyer@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400"
              disabled={status === 'loading'}
              required
            />
          </div>

          {/* 결과 메시지 */}
          {statusMessage()}

          <button
            type="submit"
            disabled={status === 'loading' || !accessKey || !email}
            className="w-full bg-indigo-600 text-white font-semibold rounded-xl py-4 text-sm min-h-[52px] disabled:opacity-50"
          >
            {status === 'loading' ? '발송 중...' : '자료 발송하기'}
          </button>
        </form>
      </div>
    </main>
  )
}
