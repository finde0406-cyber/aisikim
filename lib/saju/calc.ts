// 사주(四柱) 계산 — 외부 패키지 없이 태양 황경으로 절기 경계를 판정한다.
// 연주: 입춘(황경 315°) 기준 / 월주: 12절(30° 간격) 기준 / 일주: 율리우스일 60갑자 / 시주: 지방시(경도 보정) 기준
// 일주 경계는 지방시 23:00 (자시 시작에 날이 바뀌는 방식)

export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
export const STEM_ROMAN = ['Gap', 'Eul', 'Byeong', 'Jeong', 'Mu', 'Gi', 'Gyeong', 'Sin', 'Im', 'Gye']
export const BRANCH_ROMAN = ['Ja', 'Chuk', 'In', 'Myo', 'Jin', 'Sa', 'O', 'Mi', 'Sin', 'Yu', 'Sul', 'Hae']

export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water'
export const STEM_ELEMENT: Element[] = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water']
export const BRANCH_ELEMENT: Element[] = ['water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water']

export interface Pillar {
  stem: number
  branch: number
}

export interface SajuChart {
  year: Pillar
  month: Pillar
  day: Pillar
  hour: Pillar | null
  elements: Record<Element, number>
}

// ── 천문 계산 ──────────────────────────────────────────────

function julianDay(utcMs: number): number {
  return utcMs / 86400000 + 2440587.5
}

// 태양 겉보기 황경 (Meeus 저정밀식, 오차 약 0.01° ≈ 15분)
export function sunLongitude(utcMs: number): number {
  const T = (julianDay(utcMs) - 2451545.0) / 36525
  const rad = Math.PI / 180
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * rad
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
    0.000289 * Math.sin(3 * M)
  const omega = (125.04 - 1934.136 * T) * rad
  const lambda = L0 + C - 0.00569 - 0.00478 * Math.sin(omega)
  return ((lambda % 360) + 360) % 360
}

const mod = (n: number, m: number) => ((n % m) + m) % m

// 그레고리력 날짜 → 율리우스 일수(정수, 정오 기준)
function jdnOf(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12)
  const yy = y + 4800 - a
  const mm = m + 12 * a - 3
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045
}

// ── 시간대 ────────────────────────────────────────────────

// 특정 IANA 시간대에서 벽시계 시각 → UTC 밀리초
export function zonedToUtc(y: number, mo: number, d: number, h: number, mi: number, timeZone: string): number {
  const asUtc = Date.UTC(y, mo - 1, d, h, mi)
  let guess = asUtc
  for (let i = 0; i < 3; i++) {
    guess = asUtc - offsetMinutes(guess, timeZone) * 60000
  }
  return guess
}

function offsetMinutes(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(new Date(utcMs))
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const local = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  return Math.round((local - utcMs) / 60000)
}

// ── 사주 계산 ────────────────────────────────────────────

export interface BirthInput {
  year: number
  month: number
  day: number
  hour: number | null // null = 시간 모름
  minute: number
  timeZone: string
  longitude: number | null // null이면 표준시 그대로 사용
}

export function computeSaju(input: BirthInput): SajuChart {
  const knownTime = input.hour !== null
  const h = knownTime ? input.hour! : 12
  const utc = zonedToUtc(input.year, input.month, input.day, h, input.minute, input.timeZone)

  // 연·월주: 태양 황경
  const lon = sunLongitude(utc)
  const monthOrder = Math.floor(mod(lon - 315, 360) / 30) // 0 = 寅월
  let solarYear = input.year
  if (input.month <= 2 && monthOrder >= 10) solarYear -= 1 // 입춘 전
  const yearIdx = mod(solarYear - 4, 60)
  const year: Pillar = { stem: yearIdx % 10, branch: yearIdx % 12 }
  const month: Pillar = { stem: mod(year.stem * 2 + 2 + monthOrder, 10), branch: mod(monthOrder + 2, 12) }

  // 일·시주: 지방시(경도 보정). 경도가 없으면 표준시.
  const offsetMin = input.longitude !== null ? input.longitude * 4 : offsetMinutes(utc, input.timeZone) - dstShift(utc, input.timeZone)
  const lmt = new Date(utc + offsetMin * 60000)
  let ly = lmt.getUTCFullYear(), lm = lmt.getUTCMonth() + 1, ld = lmt.getUTCDate()
  const lh = lmt.getUTCHours()
  if (knownTime && lh >= 23) {
    const next = new Date(Date.UTC(ly, lm - 1, ld + 1))
    ly = next.getUTCFullYear(); lm = next.getUTCMonth() + 1; ld = next.getUTCDate()
  }
  const dayIdx = mod(jdnOf(ly, lm, ld) - 11, 60)
  const day: Pillar = { stem: dayIdx % 10, branch: dayIdx % 12 }

  let hour: Pillar | null = null
  if (knownTime) {
    const hb = Math.floor((lh + 1) / 2) % 12
    hour = { stem: mod(day.stem * 2 + hb, 10), branch: hb }
  }

  const elements: Record<Element, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  for (const p of [year, month, day, hour]) {
    if (!p) continue
    elements[STEM_ELEMENT[p.stem]]++
    elements[BRANCH_ELEMENT[p.branch]]++
  }
  return { year, month, day, hour, elements }
}

// 서머타임 중이면 그만큼(분) 빼서 표준시로 맞춘다
function dstShift(utcMs: number, timeZone: string): number {
  const y = new Date(utcMs).getUTCFullYear()
  const jan = offsetMinutes(Date.UTC(y, 0, 15), timeZone)
  const jul = offsetMinutes(Date.UTC(y, 6, 15), timeZone)
  const standard = Math.min(jan, jul)
  return offsetMinutes(utcMs, timeZone) - standard
}
