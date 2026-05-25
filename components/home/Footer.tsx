// 랜딩페이지 푸터 - 법적 고지 링크 포함
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="px-4 py-6 max-w-sm mx-auto text-center">
        <p className="text-xs text-gray-400 mb-3">© 2026 AI시킴</p>
        <div className="flex justify-center gap-4">
          <Link href="/legal/privacy" className="text-xs text-gray-400 underline underline-offset-2">
            개인정보 처리방침
          </Link>
          <Link href="/legal/terms" className="text-xs text-gray-400 underline underline-offset-2">
            이용약관
          </Link>
        </div>
      </div>
    </footer>
  )
}
