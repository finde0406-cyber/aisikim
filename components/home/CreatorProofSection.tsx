// 제작자 신뢰 증거 섹션 — 실제 운영 중인 서비스로 실행력 증명
import Link from 'next/link'

const PROOF_ITEMS = [
  {
    name: '리스크체크',
    desc: '투자심리 진단 서비스',
    href: 'https://check.financialrisklab.com',
  },
  {
    name: '머니플로우레이더',
    desc: '금융 리스크 분석 도구',
    href: 'https://moneyflowradar.com',
  },
]

export default function CreatorProofSection() {
  return (
    <section className="bg-white">
      <div className="px-4 py-12 max-w-sm mx-auto">
        <p className="text-xs font-medium text-gray-400 mb-3">만든 사람</p>
        <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
          이론이 아니라, 직접 만들어서<br />실제로 운영하고 있어요
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          AI시킴을 만든 사람은 AI와 함께 아이디어부터 출시까지 직접 진행해서
          아래 서비스들을 실제로 운영하고 있어요. 여기 담긴 작업지시서는
          그 과정에서 실제로 썼던 방식 그대로예요.
        </p>
        <div className="space-y-3">
          {PROOF_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 active:bg-gray-50"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <span className="text-xs text-indigo-500 flex-shrink-0">바로가기 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
