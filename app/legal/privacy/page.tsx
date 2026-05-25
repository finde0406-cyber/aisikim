// 개인정보 처리방침 페이지 - 서비스 정식 출시 전 업데이트 예정
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-sm mx-auto">
        <p className="text-sm font-medium text-gray-700 mb-2">개인정보 처리방침</p>
        <p className="text-gray-400 text-sm mb-6">서비스 정식 출시 전 업데이트 예정입니다.</p>
        <Link href="/" className="text-indigo-600 text-sm underline underline-offset-2">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
