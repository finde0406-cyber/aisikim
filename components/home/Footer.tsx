// 랜딩페이지 푸터 - 법적 고지·서비스 안내 포함
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="px-4 py-8 max-w-sm mx-auto">

        {/* 서비스 안내 */}
        <div className="space-y-2 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-gray-300 flex-shrink-0 mt-0.5">·</span>
            <p className="text-xs text-gray-400 leading-relaxed">
              유료 상품은 PDF 파일 + Notion 링크 형태로 제공돼요. 발송 방식 및 일정은 신청·결제 페이지에서 확인할 수 있어요.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-300 flex-shrink-0 mt-0.5">·</span>
            <p className="text-xs text-gray-400 leading-relaxed">
              디지털 자료 특성상 자료 전달 후 교환·환불이 제한될 수 있어요. 상세 환불 기준은 결제 페이지에서 확인하세요.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-300 flex-shrink-0 mt-0.5">·</span>
            <p className="text-xs text-gray-400 leading-relaxed">
              서비스 문의는 신청·결제 페이지 내 안내를 참고해 주세요.
            </p>
          </div>
        </div>

        {/* 법적 링크 + 카피라이트 */}
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal/privacy" className="text-xs text-gray-400 underline underline-offset-2">
            개인정보 처리방침
          </Link>
          <Link href="/legal/terms" className="text-xs text-gray-400 underline underline-offset-2">
            이용약관
          </Link>
        </div>
        <p className="text-xs text-gray-400 text-center">© 2026 AI시킴</p>

      </div>
    </footer>
  )
}
