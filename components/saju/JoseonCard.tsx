// 조선 캐릭터 카드 — 일간별 역할 일러스트 (SVG 직접 그림, 외부 이미지 없음)
import { useId } from 'react'
import type { Element } from '@/lib/saju/calc'

type Hat = 'gat' | 'samo' | 'jeonrip' | 'band'
interface Look {
  robe: string
  robeShade: string
  collar: string
  belt: string
  hat: Hat
  badge?: boolean // 관복 흉배
}

// STEMS 순서: 학자, 역관, 소리꾼, 어의, 무관, 숙수, 암행어사, 화원, 거상, 천문관
const LOOKS: Look[] = [
  { robe: '#2f6b5a', robeShade: '#285c4d', collar: '#f3ead6', belt: '#1d2b4a', hat: 'samo', badge: true },
  { robe: '#6f9f8f', robeShade: '#5f8a7b', collar: '#f3ead6', belt: '#a3312f', hat: 'gat' },
  { robe: '#f1ece0', robeShade: '#ddd5c3', collar: '#ffffff', belt: '#a3312f', hat: 'gat' },
  { robe: '#5d84b0', robeShade: '#4f7199', collar: '#f3ead6', belt: '#1d2b4a', hat: 'samo', badge: true },
  { robe: '#a3312f', robeShade: '#8a2826', collar: '#e3c06a', belt: '#1d2b4a', hat: 'jeonrip' },
  { robe: '#f3ead6', robeShade: '#e0d5bd', collar: '#ffffff', belt: '#5d84b0', hat: 'band' },
  { robe: '#3a3f52', robeShade: '#323646', collar: '#f3ead6', belt: '#a3312f', hat: 'gat' },
  { robe: '#8fb3cf', robeShade: '#7c9fbb', collar: '#f3ead6', belt: '#1d2b4a', hat: 'gat' },
  { robe: '#a67c46', robeShade: '#92693a', collar: '#f3ead6', belt: '#2f6b5a', hat: 'gat' },
  { robe: '#26406b', robeShade: '#1f365c', collar: '#f3ead6', belt: '#e3c06a', hat: 'samo', badge: true },
]

const INK = '#1f1f24'

function HatShape({ hat }: { hat: Hat }) {
  if (hat === 'samo')
    return (
      <g>
        <ellipse cx="124" cy="104" rx="16" ry="6" fill={INK} />
        <ellipse cx="186" cy="104" rx="16" ry="6" fill={INK} />
        <path d="M133 112 C133 92 140 84 155 84 C170 84 177 92 177 112Z" fill={INK} />
        <path d="M140 92 C146 86 164 86 170 92" fill="none" stroke="#4a4a52" strokeWidth="1.2" />
      </g>
    )
  if (hat === 'jeonrip')
    return (
      <g>
        <ellipse cx="155" cy="110" rx="50" ry="8" fill={INK} />
        <path d="M137 108 C137 88 144 80 155 80 C166 80 173 88 173 108Z" fill={INK} />
        <path d="M155 80 C150 70 158 62 166 66" fill="none" stroke="#e3c06a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M137 106 C130 116 132 126 138 132" fill="none" stroke="#c4473a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="139" cy="134" r="4" fill="#c4473a" />
      </g>
    )
  if (hat === 'band')
    return (
      <g>
        <ellipse cx="155" cy="104" rx="11" ry="9" fill="#26262c" />
        <path d="M131 124 C136 116 174 116 179 124" fill="none" stroke={INK} strokeWidth="5" />
      </g>
    )
  return (
    <g>
      <ellipse cx="155" cy="111" rx="58" ry="9" fill={INK} fillOpacity=".8" />
      <path d="M136 109 L139 82 C146 76 164 76 171 82 L174 109Z" fill={INK} fillOpacity=".86" />
      <path d="M131 114 C130 138 134 156 146 166 M179 114 C180 138 176 156 164 166" fill="none" stroke={INK} strokeWidth="1" />
      <circle cx="155" cy="168" r="2.6" fill="#a3312f" />
    </g>
  )
}

function Prop({ stem }: { stem: number }) {
  switch (stem) {
    case 0: // 책
      return (
        <g>
          <rect x="130" y="222" width="50" height="34" rx="2" fill="#2c4a73" stroke={INK} />
          <path d="M135 228 L175 228 M135 234 L170 234" stroke="#e3c06a" strokeWidth="1.4" />
          <ellipse cx="128" cy="244" rx="8" ry="7" fill="#f0c9a6" stroke={INK} />
        </g>
      )
    case 1: // 두루마리 서신
      return (
        <g>
          <rect x="126" y="226" width="58" height="22" rx="4" fill="#f7f1e2" stroke={INK} />
          <path d="M134 233 L176 233 M134 240 L168 240" stroke="#5a5f68" strokeWidth="1.2" />
          <circle cx="126" cy="237" r="6" fill="#a67c46" stroke={INK} />
          <circle cx="184" cy="237" r="6" fill="#a67c46" stroke={INK} />
        </g>
      )
    case 2: // 부채
      return (
        <g>
          <path d="M196 214 L226 168 A54 54 0 0 1 252 214Z" fill="#f7f1e2" stroke={INK} />
          <path d="M196 214 L232 172 M196 214 L240 180 M196 214 L247 196" stroke="#c4473a" strokeWidth="1" />
          <ellipse cx="194" cy="218" rx="8" ry="7" fill="#f0c9a6" stroke={INK} />
        </g>
      )
    case 3: // 약함
      return (
        <g>
          <rect x="132" y="222" width="46" height="34" rx="3" fill="#a3312f" stroke={INK} />
          <path d="M132 239 L178 239 M155 222 L155 256" stroke={INK} strokeWidth="1" />
          <circle cx="146" cy="231" r="1.8" fill="#e3c06a" /><circle cx="164" cy="231" r="1.8" fill="#e3c06a" />
          <circle cx="146" cy="248" r="1.8" fill="#e3c06a" /><circle cx="164" cy="248" r="1.8" fill="#e3c06a" />
        </g>
      )
    case 4: // 창과 깃발
      return (
        <g>
          <path d="M214 316 L214 150" stroke="#5b3b2a" strokeWidth="4" strokeLinecap="round" />
          <path d="M214 150 L208 166 L214 160 L220 166Z" fill="#b8bcc4" stroke={INK} />
          <path d="M216 172 L246 180 L216 190Z" fill="#e3c06a" stroke={INK} />
          <ellipse cx="212" cy="236" rx="8" ry="7" fill="#f0c9a6" stroke={INK} />
        </g>
      )
    case 5: // 국자와 그릇
      return (
        <g>
          <path d="M126 262 C126 248 184 248 184 262 C184 274 126 274 126 262Z" fill="#f7f1e2" stroke={INK} />
          <path d="M136 256 C150 252 160 252 174 256" stroke="#c4473a" strokeWidth="2" fill="none" />
          <path d="M178 214 L160 248" stroke="#a67c46" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="160" cy="250" rx="7" ry="4" fill="#a67c46" stroke={INK} />
          <ellipse cx="180" cy="212" rx="8" ry="7" fill="#f0c9a6" stroke={INK} />
        </g>
      )
    case 6: // 마패
      return (
        <g>
          <ellipse cx="139" cy="240" rx="9" ry="8" fill="#f0c9a6" stroke={INK} />
          <circle cx="155" cy="234" r="19" fill="#d9a441" stroke={INK} />
          <circle cx="155" cy="234" r="13" fill="none" stroke="#7a5512" strokeWidth="1.4" />
          <path d="M147 238 l3 -7 l3 3 l3 -5 l3 9 M152 243 l3 -4 l3 4" stroke="#7a5512" strokeWidth="1.6" fill="none" />
          <path d="M155 215 L155 205" stroke="#7a5512" strokeWidth="1.6" />
        </g>
      )
    case 7: // 붓과 화첩
      return (
        <g>
          <rect x="128" y="230" width="44" height="30" rx="2" fill="#f7f1e2" stroke={INK} />
          <path d="M134 252 C142 240 150 248 158 238 C162 246 166 244 168 250" stroke="#3f7f63" strokeWidth="1.6" fill="none" />
          <path d="M200 196 L176 238" stroke="#5b3b2a" strokeWidth="3" strokeLinecap="round" />
          <path d="M176 238 L172 246 L180 242Z" fill={INK} />
          <ellipse cx="196" cy="204" rx="8" ry="7" fill="#f0c9a6" stroke={INK} />
        </g>
      )
    case 8: // 주판
      return (
        <g>
          <rect x="128" y="226" width="54" height="30" rx="3" fill="#7a5512" stroke={INK} />
          <rect x="132" y="230" width="46" height="22" fill="#f3ead6" />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <path d={`M132 ${234 + r * 5} L178 ${234 + r * 5}`} stroke="#7a5512" strokeWidth=".8" />
              {[0, 1, 2, 3, 4].map((c) => (
                <circle key={c} cx={137 + c * 9 + (r % 2) * 3} cy={234 + r * 5} r="2" fill="#a3312f" />
              ))}
            </g>
          ))}
        </g>
      )
    default: // 혼천의
      return (
        <g fill="none" stroke="#d9a441" strokeWidth="2.6">
          <circle cx="155" cy="238" r="20" />
          <ellipse cx="155" cy="238" rx="20" ry="7" />
          <ellipse cx="155" cy="238" rx="7" ry="20" transform="rotate(30 155 238)" />
          <circle cx="155" cy="238" r="3.4" fill="#e3c06a" stroke={INK} strokeWidth="1" />
          <path d="M155 258 L155 270 M145 272 L165 272" stroke={INK} strokeWidth="2" />
        </g>
      )
  }
}

export interface CardStat {
  element: Element
  label: string
  value: number
}

export interface JoseonCardProps {
  stem: number
  title: string
  hanjaLine: string
  dayMasterLabel: string
  rating: number
  ratingHanja: string
  ratingLabel: string
  rarity: string
  stats: CardStat[]
}

const STAT_COLOR: Record<Element, string> = {
  wood: '#3f7f63', fire: '#c4473a', earth: '#a07a2a', metal: '#5f7084', water: '#2c4a73',
}

export default function JoseonCard(p: JoseonCardProps) {
  const uid = useId().replace(/:/g, '')
  const look = LOOKS[p.stem]
  const id = (n: string) => `${n}-${uid}`
  return (
    <svg viewBox="0 0 310 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${p.title} card, ${p.rarity}, rating ${p.rating}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <filter id={id('paper')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={4} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.25  0 0 0 0.10 0" result="g" />
          <feComposite in="g" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={id('brush')}>
          <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves={2} seed={7} result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={0.7} />
        </filter>
        <filter id={id('wash')}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={2} result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={1.6} />
        </filter>
        <clipPath id={id('clip')}><rect x="16" y="16" width="278" height="300" rx="10" /></clipPath>
        <pattern id={id('dc')} width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill="#1d2b4a" />
          <path d="M11 3 L19 11 L11 19 L3 11Z" fill="none" stroke="#e3c06a" strokeWidth="1.4" />
          <circle cx="11" cy="11" r="2.6" fill="#a3312f" />
          <circle cx="0" cy="0" r="2" fill="#3f7f63" /><circle cx="22" cy="0" r="2" fill="#3f7f63" />
          <circle cx="0" cy="22" r="2" fill="#3f7f63" /><circle cx="22" cy="22" r="2" fill="#3f7f63" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="310" height="460" rx="18" fill={`url(#${id('dc')})`} />
      <rect x="9" y="9" width="292" height="442" rx="13" fill="none" stroke="#e3c06a" strokeWidth="1.5" />

      <g clipPath={`url(#${id('clip')})`}>
        <rect x="16" y="16" width="278" height="300" fill="#efe3c8" />
        <g filter={`url(#${id('wash')})`}>
          <circle cx="70" cy="150" r="21" fill="#c4473a" />
          <circle cx="244" cy="150" r="17" fill="#f7f1e2" stroke="#d8c9a6" strokeWidth="1" />
          <path d="M16 236 L52 176 L84 214 L118 150 L155 205 L192 150 L226 214 L258 176 L294 236 L294 316 L16 316Z" fill="#6e9c84" />
          <path d="M16 262 L60 208 L98 250 L134 196 L155 222 L176 196 L212 250 L250 208 L294 262 L294 316 L16 316Z" fill="#3f7f63" />
          <path d="M16 288 C46 276 66 296 96 286 C126 276 146 298 176 288 C206 278 230 298 262 286 C278 280 288 284 294 286 L294 316 L16 316Z" fill="#2c4a73" />
        </g>
        <g filter={`url(#${id('brush')})`} fill="none" stroke="#2a2a2a" strokeWidth="1.6" strokeLinejoin="round" opacity=".75">
          <path d="M16 262 L60 208 L98 250 L134 196 L155 222 L176 196 L212 250 L250 208 L294 262" />
          <path d="M24 296 C40 288 54 300 70 294 M120 300 C136 292 150 304 166 298 M214 298 C230 290 244 302 260 296" stroke="#f7f1e2" opacity=".9" />
        </g>
        <g filter={`url(#${id('brush')})`} fill="#f7f1e2" stroke="#2a2a2a" strokeWidth="1.3">
          <path d="M96 92 c-10 0 -14 -12 -4 -16 c2 -10 16 -10 18 -2 c8 -6 18 2 14 10 c8 2 6 12 -2 12Z" />
          <path d="M214 70 c-9 0 -12 -10 -3 -13 c2 -9 14 -9 16 -2 c7 -5 16 2 12 9 c7 2 5 10 -2 10Z" />
        </g>

        <g filter={`url(#${id('brush')})`} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
          {/* 몸 */}
          <path d="M155 176 C128 178 112 194 106 222 L96 316 L214 316 L204 222 C198 194 182 178 155 176Z" fill={look.robe} />
          <path d="M106 222 C92 244 88 270 90 298 L112 300 L117 244Z" fill={look.robeShade} />
          <path d="M204 222 C218 244 222 270 220 298 L198 300 L193 244Z" fill={look.robeShade} />
          <path d="M141 180 L155 220 L169 180" fill="none" stroke={look.collar} strokeWidth="7" />
          <path d="M141 180 L155 220 L169 180" fill="none" strokeWidth="1.1" />
          {look.badge && (
            <g>
              <rect x="138" y="262" width="34" height="30" fill="#1d2b4a" stroke="#e3c06a" />
              <path d="M146 282 C150 272 160 272 164 282 M155 274 L155 268" stroke="#f7f1e2" strokeWidth="1.6" fill="none" />
            </g>
          )}
          <path d="M110 256 L200 256" stroke={look.belt} strokeWidth="6" />
          {/* 얼굴 */}
          <path d="M147 158 L147 178 L163 178 L163 158Z" fill="#e7b78f" />
          <ellipse cx="155" cy="140" rx="24" ry="27" fill="#f0c9a6" />
          <path d="M131 136 C131 120 141 112 155 112 C169 112 179 120 179 136 C172 128 164 125 155 125 C146 125 138 128 131 136Z" fill="#26262c" />
          <path d="M142 141 q5 3 9 0 M159 141 q5 3 9 0" fill="none" strokeWidth="2" />
          <path d="M141 133 l9 -2 M160 131 l9 2" strokeWidth="2" />
          <path d="M151 155 q4 2 8 0" fill="none" stroke="#a5604a" strokeWidth="1.6" />
          <ellipse cx="139" cy="149" rx="4" ry="2.4" fill="#e8a089" stroke="none" opacity=".55" />
          <ellipse cx="171" cy="149" rx="4" ry="2.4" fill="#e8a089" stroke="none" opacity=".55" />
          <HatShape hat={look.hat} />
          <Prop stem={p.stem} />
        </g>
        <rect x="16" y="16" width="278" height="300" fill="#fff" filter={`url(#${id('paper')})`} />
      </g>
      <rect x="16" y="16" width="278" height="300" rx="10" fill="none" stroke="#e3c06a" strokeWidth="1.2" />

      <rect x="26" y="26" width="56" height="74" rx="8" fill="#f3ead6" fillOpacity=".93" stroke="#1d2b4a" strokeWidth="1" />
      <text x="54" y="62" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize="30" fontWeight="700" fill="#1d2b4a">{p.rating}</text>
      <text x="54" y="84" textAnchor="middle" fontFamily="var(--font-hanja), serif" fontSize="16" fontWeight="700" fill="#a3312f">{p.ratingHanja}</text>
      <text x="54" y="96" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="1.2" fill="#1d2b4a">{p.ratingLabel.toUpperCase()}</text>
      <rect x="196" y="28" width="88" height="20" rx="10" fill="#1d2b4a" />
      <text x="240" y="42" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.8" fill="#e3c06a">{p.rarity.toUpperCase()}</text>

      <rect x="16" y="324" width="278" height="120" rx="10" fill="#f3ead6" />
      <rect x="16" y="324" width="278" height="120" rx="10" fill="#fff" filter={`url(#${id('paper')})`} />
      <text x="155" y="346" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1.6" fill="#a3312f">{p.dayMasterLabel.toUpperCase()}</text>
      <text x="155" y="372" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize={p.title.length > 20 ? 18.5 : 21} fontWeight="700" fill="#1d2b4a">{p.title}</text>
      <text x="155" y="390" textAnchor="middle" fontFamily="var(--font-hanja), serif" fontSize="11" fill="#5a5f68">{p.hanjaLine}</text>
      <line x1="34" y1="402" x2="276" y2="402" stroke="#d8c9a6" />
      {p.stats.map((s, i) => (
        <g key={s.element} fontFamily="var(--font-body), sans-serif" textAnchor="middle">
          <text x={54 + i * 50.5} y="424" fontSize="16" fontWeight="700" fill="#1d2b4a">{s.value}</text>
          <text x={54 + i * 50.5} y="436" fontSize="7.5" fontWeight="700" letterSpacing="1" fill={STAT_COLOR[s.element]}>{s.label.toUpperCase()}</text>
        </g>
      ))}
    </svg>
  )
}
