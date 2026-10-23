// 궁합 계산 — 천간합(일간 짝) + 삼합(띠 짝, 정확히 4년 간격)
import type { SajuChart } from './calc'

// 甲己, 乙庚, 丙辛, 丁壬, 戊癸
export const STEM_PARTNER = [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]

// 삼합: 申子辰, 寅午戌, 巳酉丑, 亥卯未 — 같은 그룹 띠는 서로 4년 간격
export interface MatchYear {
  branch: number
  birthYear: number
  diff: number // +면 연하(나보다 늦게 태어남), -면 연상
}

export function bestMatchYears(chart: SajuChart, solarBirthYear: number): MatchYear[] {
  const yb = chart.year.branch
  return [-4, 4].map((diff) => ({
    branch: (((yb + diff) % 12) + 12) % 12,
    birthYear: solarBirthYear + diff,
    diff,
  }))
}

// 사주상 출생 연도(입춘 기준) = 연주 60갑자에서 역산
export function solarYearOf(chart: SajuChart, gregorianYear: number): number {
  const idx = chart.year.stem * 6 - chart.year.branch * 5 // 60갑자 인덱스 복원
  const sixty = ((idx % 60) + 60) % 60
  // gregorianYear 또는 그 전해 중 (y-4) mod 60 == sixty 인 해
  for (const y of [gregorianYear, gregorianYear - 1]) {
    if ((((y - 4) % 60) + 60) % 60 === sixty) return y
  }
  return gregorianYear
}
