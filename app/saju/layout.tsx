// Hanji Saju 전용 레이아웃 — AI시킴 화면 요소 없이 독립 브랜드로 보이게 한다.
import type { Metadata } from 'next'
import { Gowun_Batang, Noto_Serif_KR, Instrument_Sans } from 'next/font/google'
import styles from './saju.module.css'

const display = Gowun_Batang({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-display', display: 'swap' })
const hanja = Noto_Serif_KR({ weight: ['500', '700'], subsets: ['latin'], variable: '--font-hanja', display: 'swap', preload: false })
const body = Instrument_Sans({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: 'Hanji Saju · Your Korean four pillars, in English',
  description:
    'Saju is the reading Koreans get before big decisions. Enter your birth details and find your day master and five-element balance in under a minute. Free.',
  alternates: { canonical: 'https://aisikim.com/saju' },
  openGraph: {
    title: 'Hanji Saju · Your Korean four pillars, in English',
    description: 'The reading Koreans get before big decisions. Free, no sign-up.',
    url: 'https://aisikim.com/saju',
    siteName: 'Hanji Saju',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Hanji Saju', description: 'Your Korean four pillars, in English.' },
}

export default function SajuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className={`${styles.root} ${display.variable} ${hanja.variable} ${body.variable}`}>
      {children}
    </div>
  )
}
