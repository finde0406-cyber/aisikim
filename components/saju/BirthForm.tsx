'use client'
// 출생 정보 입력 — 결과는 /saju/reading 으로 넘겨 별도 페이지뷰로 집계한다.
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CITIES } from '@/lib/saju/content'
import styles from '@/app/saju/saju.module.css'

export default function BirthForm() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [noTime, setNoTime] = useState(false)
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return setError('Please enter your date of birth.')
    const year = Number(date.slice(0, 4))
    if (year < 1900 || year > 2025) return setError('Please enter a birth year between 1900 and 2025.')
    if (!noTime && !/^\d{2}:\d{2}$/.test(time)) return setError('Add your birth time, or tick "I don\'t know my birth time".')
    if (!city) return setError('Please choose the city you were born in.')
    setError('')
    const q = new URLSearchParams({ d: date })
    if (!noTime) q.set('t', time)
    if (city === 'other') {
      q.set('tz', Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
    } else {
      q.set('c', city)
    }
    router.push(`/saju/reading?${q.toString()}`)
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="sj-date">Date of birth</label>
        <input id="sj-date" className={styles.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} max="2025-12-31" min="1900-01-01" />
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="sj-time">Time of birth</label>
        <input id="sj-time" className={styles.input} type="time" value={time} disabled={noTime} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className={`${styles.field} ${styles.full}`}>
        <label className={styles.fieldLabel} htmlFor="sj-city">City of birth</label>
        <select id="sj-city" className={styles.input} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Choose a city</option>
          {CITIES.map((c, i) => (
            <option key={c.label} value={String(i)}>{c.label}</option>
          ))}
          <option value="other">Somewhere else (use my current time zone)</option>
        </select>
      </div>
      <label className={`${styles.check} ${styles.full}`} htmlFor="sj-notime">
        <input id="sj-notime" type="checkbox" checked={noTime} onChange={(e) => setNoTime(e.target.checked)} />
        I don&apos;t know my birth time
      </label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.btn} type="submit">Read my four pillars</button>
    </form>
  )
}
