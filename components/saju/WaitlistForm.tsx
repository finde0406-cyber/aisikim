'use client'
// 전체 리포트 출시 알림 신청 — 수요 측정용 (결제 없음)
import { useState } from 'react'
import styles from '@/app/saju/saju.module.css'

export default function WaitlistForm({ dayMaster }: { dayMaster: number }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState('error')
      setMsg('Please enter a valid email address.')
      return
    }
    setState('sending')
    try {
      const res = await fetch('/api/saju-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), dayMaster }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
      setMsg('Something went wrong on our side. Please try again in a minute.')
    }
  }

  if (state === 'done') {
    return <p className={styles.ok} role="status">You&apos;re on the list. We&apos;ll email you when your full reading is ready.</p>
  }

  return (
    <>
      <form className={styles.waitForm} onSubmit={submit} noValidate>
        <label htmlFor="sj-email" className="sr-only">Email</label>
        <input id="sj-email" className={styles.input} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <button className={styles.btn} type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Saving…' : 'Notify me'}
        </button>
      </form>
      {state === 'error' && <p className={styles.small} role="alert">{msg}</p>}
      <p className={styles.small}>We&apos;ll only email you about the full reading. Unsubscribe anytime.</p>
    </>
  )
}
