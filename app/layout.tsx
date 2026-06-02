// 앱 루트 레이아웃 - 폰트·메타데이터 설정
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aisikim.com'),
  title: 'AI시킴 — AI에게 뭘 시켜야 할지 모르겠다면',
  description:
    '선택만으로 ChatGPT·Claude·Gemini·Codex에 바로 넣을 수 있는 작업지시서를 만들어드립니다.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'AI시킴 — AI에게 뭘 시켜야 할지 모르겠다면',
    description:
      '선택만으로 ChatGPT·Claude·Gemini에 바로 넣을 수 있는 작업지시서를 만들어드립니다.',
    url: 'https://aisikim.com',
    siteName: 'AI시킴',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI시킴 — AI에게 뭘 시켜야 할지 모르겠다면',
    description:
      '선택만으로 ChatGPT·Claude·Gemini에 바로 넣을 수 있는 작업지시서를 만들어드립니다.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI시킴',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
