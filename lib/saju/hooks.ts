// 무료 풀이의 "숨은 신호" — 실제 사주 이론으로 차트에서 계산한 단서만 보여주고 해석은 전체 리포트로 잠근다.
import { BRANCHES, STEMS, BRANCH_ROMAN, STEM_ELEMENT, BRANCH_ELEMENT, type SajuChart, type Element } from './calc'
import { ZODIAC, ELEMENT_INFO } from './content'

export interface Hook {
  key: string
  label: string
  glyph: string
  glyphElement: Element
  headline: string
  teaser: string
}

const PILLAR_NAMES = ['year', 'month', 'day', 'hour'] as const
const NEXT_YEAR = 2027

// 도화(桃花): 일지 삼합 그룹 기준
function peachBranch(dayBranch: number): number {
  if ([8, 0, 4].includes(dayBranch)) return 9 // 申子辰 → 酉
  if ([2, 6, 10].includes(dayBranch)) return 3 // 寅午戌 → 卯
  if ([5, 9, 1].includes(dayBranch)) return 6 // 巳酉丑 → 午
  return 0 // 亥卯未 → 子
}

// 육합(六合) 짝
const HARMONY: Record<number, number> = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 }

const yearStem = (y: number) => (((y - 4) % 10) + 10) % 10
const yearBranch = (y: number) => (((y - 4) % 12) + 12) % 12

export function buildHooks(chart: SajuChart, quietest: Element | null): Hook[] {
  const hooks: Hook[] = []
  const pillars = [chart.year, chart.month, chart.day, chart.hour]

  // 1) 배우자궁 (일지)
  const db = chart.day.branch
  hooks.push({
    key: 'spouse',
    label: 'Your spouse palace',
    glyph: BRANCHES[db],
    glyphElement: BRANCH_ELEMENT[db],
    headline: `${ZODIAC[db].animal} (${BRANCH_ROMAN[db]}), ${ELEMENT_INFO[BRANCH_ELEMENT[db]].name.toLowerCase()} element`,
    teaser:
      'In saju, the branch sitting under your day master shows the kind of person you are drawn to and how you behave in a close relationship.',
  })

  // 2) 2027년과의 관계 (충·합)
  const ys = yearStem(NEXT_YEAR), yb = yearBranch(NEXT_YEAR)
  const clashIdx = pillars.findIndex((p) => p && (p.branch + 6) % 12 === yb)
  const harmonyIdx = pillars.findIndex((p) => p && HARMONY[p.branch] === yb)
  const yearGlyph = STEMS[ys] + BRANCHES[yb]
  if (clashIdx >= 0) {
    hooks.push({
      key: 'year', label: `You and ${NEXT_YEAR}`, glyph: yearGlyph, glyphElement: BRANCH_ELEMENT[yb],
      headline: `${NEXT_YEAR} clashes with your ${PILLAR_NAMES[clashIdx]} pillar`,
      teaser: 'A clash (chung) is how saju marks a year of movement: something in your life gets shaken loose. Which part, and when in the year, depends on the rest of your chart.',
    })
  } else if (harmonyIdx >= 0) {
    hooks.push({
      key: 'year', label: `You and ${NEXT_YEAR}`, glyph: yearGlyph, glyphElement: BRANCH_ELEMENT[yb],
      headline: `${NEXT_YEAR} forms a harmony with your ${PILLAR_NAMES[harmonyIdx]} pillar`,
      teaser: 'A harmony (hap) is how saju marks a year when the right people and offers find you more easily. Where it lands in your life depends on the rest of your chart.',
    })
  } else {
    hooks.push({
      key: 'year', label: `You and ${NEXT_YEAR}`, glyph: yearGlyph, glyphElement: STEM_ELEMENT[ys],
      headline: `${NEXT_YEAR} brings ${ELEMENT_INFO[STEM_ELEMENT[ys]].name} and ${ELEMENT_INFO[BRANCH_ELEMENT[yb]].name} into your chart`,
      teaser: 'Every year adds its own two elements to the ones you were born with. How they meet your day master decides whether the year pushes you or carries you.',
    })
  }

  // 3) 도화살
  const pb = peachBranch(db)
  const peachIdx = pillars.findIndex((p, i) => p && i !== 2 && p.branch === pb)
  if (peachIdx >= 0) {
    hooks.push({
      key: 'peach', label: 'Peach blossom star', glyph: BRANCHES[pb], glyphElement: BRANCH_ELEMENT[pb],
      headline: `You were born with a peach blossom in your ${PILLAR_NAMES[peachIdx]} pillar`,
      teaser: 'Koreans call it dohwa. It is the star people mean when they say someone is hard not to notice. It can work for you or against you, depending on where it sits.',
    })
  } else {
    let y = NEXT_YEAR
    while (yearBranch(y) !== pb) y++
    hooks.push({
      key: 'peach', label: 'Peach blossom star', glyph: BRANCHES[pb], glyphElement: BRANCH_ELEMENT[pb],
      headline: `Your next peach blossom year is ${y}`,
      teaser: 'Koreans call it dohwa: the year attraction comes easier and people notice you more. What it means for you depends on your day master.',
    })
  }

  // 4) 부족한 오행이 들어오는 해
  if (quietest) {
    let y = NEXT_YEAR
    while (y < NEXT_YEAR + 12 && STEM_ELEMENT[yearStem(y)] !== quietest && BRANCH_ELEMENT[yearBranch(y)] !== quietest) y++
    const info = ELEMENT_INFO[quietest]
    hooks.push({
      key: 'missing', label: 'Your quietest element', glyph: info.hanja, glyphElement: quietest,
      headline: `${info.name} returns to your chart in ${y}`,
      teaser: `The element you were born short of brings ${info.nature}. Saju reads the years it arrives as turning points, and there are ways to borrow it before then.`,
    })
  }
  return hooks
}
