// 띠 동물 아이콘 — BRANCHES 순서 (子=쥐 … 亥=돼지). 같은 화풍의 둥근 얼굴 일러스트.
const INK = '#1f1f24'

function Eyes({ y = 52, gap = 12 }: { y?: number; gap?: number }) {
  return (
    <g fill={INK}>
      <circle cx={50 - gap} cy={y} r="3" />
      <circle cx={50 + gap} cy={y} r="3" />
    </g>
  )
}
function Cheeks({ y = 62 }: { y?: number }) {
  return (
    <g fill="#e8a089" opacity=".55">
      <ellipse cx="33" cy={y} rx="5" ry="3" />
      <ellipse cx="67" cy={y} rx="5" ry="3" />
    </g>
  )
}

const ANIMALS: React.ReactNode[] = [
  // 쥐
  <g key="rat">
    <circle cx="27" cy="30" r="14" fill="#b9b2a6" stroke={INK} strokeWidth="1.6" /><circle cx="27" cy="30" r="7" fill="#e8a089" />
    <circle cx="73" cy="30" r="14" fill="#b9b2a6" stroke={INK} strokeWidth="1.6" /><circle cx="73" cy="30" r="7" fill="#e8a089" />
    <ellipse cx="50" cy="56" rx="26" ry="24" fill="#cfc8bb" stroke={INK} strokeWidth="1.6" />
    <Eyes y={52} gap={10} /><circle cx="50" cy="64" r="3.5" fill="#c4473a" />
    <path d="M38 64 L24 60 M38 67 L24 68 M62 64 L76 60 M62 67 L76 68" stroke={INK} strokeWidth="1" />
  </g>,
  // 소
  <g key="ox">
    <path d="M22 34 C14 22 20 14 26 20 M78 34 C86 22 80 14 74 20" stroke="#e3d7b8" strokeWidth="6" strokeLinecap="round" fill="none" />
    <ellipse cx="50" cy="52" rx="28" ry="26" fill="#8a5a3c" stroke={INK} strokeWidth="1.6" />
    <ellipse cx="50" cy="68" rx="18" ry="11" fill="#e8c7a6" stroke={INK} strokeWidth="1.2" />
    <circle cx="44" cy="68" r="2.2" fill={INK} /><circle cx="56" cy="68" r="2.2" fill={INK} />
    <Eyes y={48} gap={12} />
  </g>,
  // 호랑이
  <g key="tiger">
    <circle cx="28" cy="30" r="10" fill="#e09a3e" stroke={INK} strokeWidth="1.6" /><circle cx="72" cy="30" r="10" fill="#e09a3e" stroke={INK} strokeWidth="1.6" />
    <circle cx="50" cy="54" r="28" fill="#e9a54a" stroke={INK} strokeWidth="1.6" />
    <path d="M44 30 L46 38 M50 28 L50 38 M56 30 L54 38 M24 50 L32 52 M24 58 L32 58 M76 50 L68 52 M76 58 L68 58" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    <ellipse cx="50" cy="66" rx="12" ry="8" fill="#f7f1e2" />
    <Eyes y={50} gap={11} /><path d="M46 62 L54 62 L50 66Z" fill={INK} />
  </g>,
  // 토끼
  <g key="rabbit">
    <ellipse cx="38" cy="22" rx="7" ry="20" fill="#f3ede2" stroke={INK} strokeWidth="1.6" /><ellipse cx="38" cy="22" rx="3" ry="13" fill="#eab3a6" />
    <ellipse cx="62" cy="22" rx="7" ry="20" fill="#f3ede2" stroke={INK} strokeWidth="1.6" /><ellipse cx="62" cy="22" rx="3" ry="13" fill="#eab3a6" />
    <circle cx="50" cy="58" r="24" fill="#f7f3ea" stroke={INK} strokeWidth="1.6" />
    <Eyes y={56} gap={10} /><Cheeks y={64} /><path d="M47 63 L53 63 L50 66Z" fill="#c4473a" />
  </g>,
  // 용
  <g key="dragon">
    <path d="M32 30 L24 12 L36 24 M68 30 L76 12 L64 24" stroke="#d9a441" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="50" cy="54" rx="27" ry="25" fill="#5aa182" stroke={INK} strokeWidth="1.6" />
    <path d="M30 66 C20 70 16 78 12 74 M70 66 C80 70 84 78 88 74" stroke={INK} strokeWidth="1.6" fill="none" />
    <ellipse cx="50" cy="66" rx="14" ry="9" fill="#a9d1bd" />
    <Eyes y={50} gap={12} /><circle cx="45" cy="66" r="2" fill={INK} /><circle cx="55" cy="66" r="2" fill={INK} />
    <path d="M42 34 L46 40 L50 34 L54 40 L58 34" stroke="#d9a441" strokeWidth="2" fill="none" />
  </g>,
  // 뱀
  <g key="snake">
    <path d="M30 86 C10 76 24 60 44 66 C66 72 82 60 70 48" stroke={INK} strokeWidth="1.6" fill="none" />
    <ellipse cx="54" cy="44" rx="24" ry="20" fill="#8cbf6a" stroke={INK} strokeWidth="1.6" />
    <path d="M24 80 C16 72 26 64 42 68 C60 74 74 64 66 54" stroke="#8cbf6a" strokeWidth="10" fill="none" strokeLinecap="round" />
    <Eyes y={40} gap={10} />
    <path d="M54 58 L54 66 M54 66 L50 70 M54 66 L58 70" stroke="#c4473a" strokeWidth="1.8" strokeLinecap="round" />
  </g>,
  // 말
  <g key="horse">
    <path d="M36 22 L40 8 L46 20 M64 22 L60 8 L54 20" fill="#8a5a3c" stroke={INK} strokeWidth="1.6" />
    <path d="M50 14 C40 18 36 24 38 30" stroke="#3a2a22" strokeWidth="8" strokeLinecap="round" fill="none" />
    <ellipse cx="50" cy="52" rx="22" ry="32" fill="#a86f48" stroke={INK} strokeWidth="1.6" />
    <ellipse cx="50" cy="74" rx="16" ry="11" fill="#d6a882" stroke={INK} strokeWidth="1.2" />
    <circle cx="44" cy="74" r="2" fill={INK} /><circle cx="56" cy="74" r="2" fill={INK} />
    <Eyes y={46} gap={11} />
  </g>,
  // 양
  <g key="sheep">
    {[[30, 30], [42, 22], [58, 22], [70, 30], [24, 44], [76, 44]].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="11" fill="#f7f3ea" stroke={INK} strokeWidth="1.4" />
    ))}
    <ellipse cx="50" cy="58" rx="22" ry="22" fill="#f0ddc6" stroke={INK} strokeWidth="1.6" />
    <Eyes y={56} gap={9} /><Cheeks y={64} /><path d="M46 66 q4 3 8 0" stroke={INK} strokeWidth="1.6" fill="none" />
  </g>,
  // 원숭이
  <g key="monkey">
    <circle cx="22" cy="52" r="10" fill="#e8c7a6" stroke={INK} strokeWidth="1.6" /><circle cx="78" cy="52" r="10" fill="#e8c7a6" stroke={INK} strokeWidth="1.6" />
    <circle cx="50" cy="50" r="28" fill="#8a5a3c" stroke={INK} strokeWidth="1.6" />
    <path d="M50 34 C38 30 28 40 32 52 C34 66 44 74 50 74 C56 74 66 66 68 52 C72 40 62 30 50 34Z" fill="#e8c7a6" />
    <Eyes y={50} gap={9} /><path d="M44 64 q6 4 12 0" stroke={INK} strokeWidth="1.6" fill="none" />
  </g>,
  // 닭
  <g key="rooster">
    <path d="M40 24 C38 12 46 10 48 18 C50 8 58 8 58 18 C62 12 70 16 64 26Z" fill="#c4473a" stroke={INK} strokeWidth="1.4" />
    <circle cx="50" cy="52" r="26" fill="#f7f3ea" stroke={INK} strokeWidth="1.6" />
    <path d="M48 56 L62 60 L48 64Z" fill="#e9a54a" stroke={INK} strokeWidth="1.2" />
    <path d="M50 66 C46 74 54 76 52 68" fill="#c4473a" />
    <Eyes y={48} gap={10} />
  </g>,
  // 개
  <g key="dog">
    <ellipse cx="24" cy="46" rx="10" ry="20" fill="#7a5235" stroke={INK} strokeWidth="1.6" transform="rotate(12 24 46)" />
    <ellipse cx="76" cy="46" rx="10" ry="20" fill="#7a5235" stroke={INK} strokeWidth="1.6" transform="rotate(-12 76 46)" />
    <circle cx="50" cy="52" r="26" fill="#d6a882" stroke={INK} strokeWidth="1.6" />
    <ellipse cx="50" cy="64" rx="13" ry="9" fill="#f3e3cf" />
    <Eyes y={48} gap={10} /><ellipse cx="50" cy="60" rx="5" ry="3.6" fill={INK} />
    <path d="M50 64 L50 68 M44 70 q6 4 12 0" stroke={INK} strokeWidth="1.4" fill="none" />
  </g>,
  // 돼지
  <g key="pig">
    <path d="M28 34 L24 18 L40 28Z M72 34 L76 18 L60 28Z" fill="#eab3a6" stroke={INK} strokeWidth="1.4" />
    <circle cx="50" cy="54" r="27" fill="#f2c4b8" stroke={INK} strokeWidth="1.6" />
    <ellipse cx="50" cy="64" rx="12" ry="8" fill="#eaa595" stroke={INK} strokeWidth="1.2" />
    <ellipse cx="46" cy="64" rx="2" ry="3" fill={INK} /><ellipse cx="54" cy="64" rx="2" ry="3" fill={INK} />
    <Eyes y={50} gap={11} />
  </g>,
]

export default function ZodiacIcon({ branch, size = 64 }: { branch: number; size?: number }) {
  return (
    <svg viewBox="0 0 100 92" width={size} height={size * 0.92} aria-hidden="true" style={{ display: 'block' }}>
      {ANIMALS[branch]}
    </svg>
  )
}
