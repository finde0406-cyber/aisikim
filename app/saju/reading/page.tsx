// Hanji Saju 무료 풀이 — 서버에서 계산해 바로 그린다 (저장 없음)
import type { Metadata } from 'next'
import { computeSaju, STEMS, BRANCHES, STEM_ROMAN, BRANCH_ROMAN, STEM_ELEMENT, BRANCH_ELEMENT, type Element, type Pillar } from '@/lib/saju/calc'
import { DAY_MASTERS, ELEMENT_INFO, ZODIAC, CITIES, JOSEON, JOSEON_FLAVOR } from '@/lib/saju/content'
import JoseonCard from '@/components/saju/JoseonCard'
import ZodiacIcon from '@/components/saju/ZodiacIcon'
import { STEM_PARTNER, bestMatchYears, solarYearOf } from '@/lib/saju/match'
import WaitlistForm from '@/components/saju/WaitlistForm'
import { buildHooks } from '@/lib/saju/hooks'
import styles from '../saju.module.css'

export const metadata: Metadata = {
  title: 'Your reading · Hanji Saju',
  robots: { index: false, follow: false },
}

type Params = { [k: string]: string | string[] | undefined }
const ORDER: Element[] = ['wood', 'fire', 'earth', 'metal', 'water']

function isValidTz(tz: string) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

export default async function Reading({ searchParams }: { searchParams: Promise<Params> }) {
  const sp = await searchParams
  const d = typeof sp.d === 'string' ? sp.d : ''
  const t = typeof sp.t === 'string' ? sp.t : ''
  const c = typeof sp.c === 'string' ? Number(sp.c) : NaN
  const tzParam = typeof sp.tz === 'string' ? sp.tz : ''

  const city = Number.isInteger(c) && CITIES[c] ? CITIES[c] : null
  const tz = city ? city.tz : tzParam && isValidTz(tzParam) ? tzParam : null
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d)
  const tm = /^(\d{2}):(\d{2})$/.exec(t)

  if (!dm || !tz) {
    return (
      <div className={styles.wrap}>
        <header className={styles.site}>
          <a className={styles.brand} href="/saju">Hanji Saju <span>四柱</span></a>
        </header>
        <section className={styles.sheet}>
          <h1 className={styles.h2}>We couldn&apos;t read those birth details</h1>
          <p className={`${styles.p} ${styles.muted}`}>Go back and enter your date of birth and city again.</p>
          <a className={styles.btn} href="/saju">Start again</a>
        </section>
      </div>
    )
  }

  const chart = computeSaju({
    year: Number(dm[1]), month: Number(dm[2]), day: Number(dm[3]),
    hour: tm ? Number(tm[1]) : null, minute: tm ? Number(tm[2]) : 0,
    timeZone: tz, longitude: city ? city.lon : null,
  })

  const me = DAY_MASTERS[chart.day.stem]
  const meEl = STEM_ELEMENT[chart.day.stem]
  const total = ORDER.reduce((s, e) => s + chart.elements[e], 0)
  const max = Math.max(...ORDER.map((e) => chart.elements[e]))
  const min = Math.min(...ORDER.map((e) => chart.elements[e]))
  const strongest = ORDER.find((e) => chart.elements[e] === max)!
  const quietest = ORDER.find((e) => chart.elements[e] === min)!
  const zodiac = ZODIAC[chart.year.branch]
  const hooks = buildHooks(chart, min < max ? quietest : null)

  // 조선 카드
  const STAT_LABEL: Record<Element, string> = { wood: 'Growth', fire: 'Charm', earth: 'Grit', metal: 'Resolve', water: 'Insight' }
  const statOf = (n: number) => Math.min(99, 50 + 12 * n)
  const rarity = max >= 4 ? 'Legendary' : max === 3 ? 'Epic' : min >= 1 ? 'Harmony' : 'Rare'
  const role = JOSEON[chart.day.stem]

  // 궁합
  const partnerStem = STEM_PARTNER[chart.day.stem]
  const partnerEl = STEM_ELEMENT[partnerStem]
  const matches = bestMatchYears(chart, solarYearOf(chart, Number(dm[1])))
  const bornLabel = new Date(Date.UTC(Number(dm[1]), Number(dm[2]) - 1, Number(dm[3]))).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })

  const pillars: { label: string; p: Pillar | null; mine?: boolean }[] = [
    { label: 'Hour', p: chart.hour },
    { label: 'Day · You', p: chart.day, mine: true },
    { label: 'Month', p: chart.month },
    { label: 'Year', p: chart.year },
  ]

  return (
    <div className={styles.wrap}>
      <header className={styles.site}>
        <a className={styles.brand} href="/saju">Hanji Saju <span>四柱</span></a>
        <a className={styles.linkBtn} href="/saju">New reading</a>
      </header>

      <section className={styles.sheet} aria-labelledby="pillars-title">
        <span className={styles.label}>Born {bornLabel}{tm ? `, ${t}` : ''} · {city ? city.label : tz}</span>
        <h1 id="pillars-title" className={styles.h2}>Your four pillars</h1>
        <div className={styles.pillars} role="list">
          {pillars.map(({ label, p, mine }) => (
            <div key={label} role="listitem" className={`${styles.pillar} ${mine ? styles.me : ''}`}>
              <span className={styles.pl}>{label}</span>
              {p ? (
                <>
                  <span className={`${styles.glyph} ${styles[STEM_ELEMENT[p.stem]]}`}>{STEMS[p.stem]}</span>
                  <span className={`${styles.glyph} ${styles[BRANCH_ELEMENT[p.branch]]}`}>{BRANCHES[p.branch]}</span>
                  <span className={styles.rom}>{STEM_ROMAN[p.stem]} · {BRANCH_ROMAN[p.branch]}</span>
                </>
              ) : (
                <>
                  <span className={`${styles.glyph} ${styles.unknown}`}>?</span>
                  <span className={`${styles.glyph} ${styles.unknown}`}>?</span>
                  <span className={styles.rom}>time unknown</span>
                </>
              )}
            </div>
          ))}
        </div>
        <p className={`${styles.p} ${styles.small}`}>
          You were born in a {zodiac.animal} year ({zodiac.korean}): {zodiac.line}. In saju the year turns at
          Ipchun, the start of spring in early February, so this can differ from the Lunar New Year.
        </p>
      </section>

      <section className={styles.sheet} aria-labelledby="dm-title">
        <div className={styles.dm}>
          <div className={`${styles.seal} ${styles['seal' + meEl]}`} aria-hidden="true">{STEMS[chart.day.stem]}</div>
          <div>
            <span className={styles.label}>Your day master</span>
            <h2 id="dm-title" className={styles.h3}>{STEM_ROMAN[chart.day.stem]} {ELEMENT_INFO[meEl].name} · {me.title}</h2>
          </div>
        </div>
        <p className={styles.p}>{me.portrait}</p>
        <dl className={styles.traits}>
          <div className={styles.trait}><dt>At your best</dt><dd>{me.strength}</dd></div>
          <div className={styles.trait}><dt>Watch for</dt><dd>{me.shadow}</dd></div>
          <div className={styles.trait}><dt>What restores you</dt><dd>{me.restores}</dd></div>
        </dl>
      </section>

      <section className={styles.sheet} aria-labelledby="joseon-title">
        <span className={styles.label}>Your life in Joseon · 1392–1897</span>
        <h2 id="joseon-title" className={styles.h2}>If you had been born in Joseon Korea</h2>
        <div className={styles.cardWrap}>
          <JoseonCard
            stem={chart.day.stem}
            title={role.title}
            hanjaLine={`${role.hanja} · ${role.korean}`}
            dayMasterLabel={`${STEM_ROMAN[chart.day.stem]} ${ELEMENT_INFO[meEl].name} · ${me.title}`}
            rating={statOf(max)}
            ratingHanja={ELEMENT_INFO[strongest].hanja}
            ratingLabel={STAT_LABEL[strongest]}
            rarity={rarity}
            stats={ORDER.map((e) => ({ element: e, label: STAT_LABEL[e], value: statOf(chart.elements[e]) }))}
          />
        </div>
        <p className={styles.p}>
          <b>You would have been a {role.title.toLowerCase()}.</b> {role.line} {JOSEON_FLAVOR[strongest]}
        </p>
        <p className={styles.small}>
          Joseon was the dynasty that ruled Korea for five centuries, the world of most Korean historical dramas.
          Your card stats come from the five elements in your chart.
        </p>
        <p className={styles.lockLine}>
          <span className={styles.blurInline} aria-hidden="true">How that life unfolded, and the work it points to</span>
          <span className={styles.lockTag}>In your full reading</span>
        </p>
      </section>

      <section className={styles.sheet} aria-labelledby="el-title">
        <span className={styles.label}>Five elements · 오행</span>
        <h2 id="el-title" className={styles.h2}>Your balance</h2>
        <div className={styles.elements}>
          {ORDER.map((e) => (
            <div key={e} className={styles.el}>
              <span className={styles[e]}>{ELEMENT_INFO[e].name} {ELEMENT_INFO[e].hanja}</span>
              <div className={styles.bar} role="img" aria-label={`${ELEMENT_INFO[e].name}: ${chart.elements[e]} of ${total}`}>
                <i style={{ width: `${max ? (chart.elements[e] / max) * 100 : 0}%`, background: `var(--${e})` }} />
              </div>
              <span className={styles.n}>{chart.elements[e]}</span>
            </div>
          ))}
        </div>
        <p className={styles.p}>{ELEMENT_INFO[strongest].strong}</p>
        {min < max && <p className={`${styles.p} ${styles.muted}`}>{ELEMENT_INFO[quietest].lack}</p>}
      </section>

      <section className={styles.sheet} aria-labelledby="match-title">
        <span className={styles.label}>Gunghap · 궁합 · compatibility</span>
        <h2 id="match-title" className={styles.h2}>Who you match best with</h2>
        <div className={styles.matchHead}>
          <div className={`${styles.seal} ${styles['seal' + partnerEl]}`} aria-hidden="true">{STEMS[partnerStem]}</div>
          <div>
            <span className={styles.label}>Your heavenly match</span>
            <h3 className={styles.h3}>{STEM_ROMAN[partnerStem]} {ELEMENT_INFO[partnerEl].name} · {DAY_MASTERS[partnerStem].title}</h3>
            <p className={`${styles.p} ${styles.muted}`}>{JOSEON[partnerStem].match}</p>
          </div>
        </div>
        <p className={styles.small}>
          In saju, some day masters pull toward each other like magnets. Yours, {STEM_ROMAN[chart.day.stem]} {ELEMENT_INFO[meEl].name.toLowerCase()},
          forms a natural pair with {STEM_ROMAN[partnerStem]} {ELEMENT_INFO[partnerEl].name.toLowerCase()}.
        </p>
        <div className={styles.matchYears}>
          {matches.map((m) => (
            <div key={m.diff} className={styles.matchYear}>
              <ZodiacIcon branch={m.branch} size={64} />
              <b>{ZODIAC[m.branch].animal}</b>
              <span>{m.diff < 0 ? '4 years older' : '4 years younger'}</span>
              <span className={styles.small}>born {m.birthYear}</span>
            </div>
          ))}
        </div>
        <p className={styles.small}>
          Your {ZODIAC[chart.year.branch].animal.toLowerCase()} year sits in a triangle of three animals that support each other. The other two
          are exactly four years apart from you.
        </p>
        <p className={styles.lockLine}>
          <span className={styles.blurInline} aria-hidden="true">Enter their birthday to see where you clash and</span>
          <span className={styles.lockTag}>Check a real match in the full reading</span>
        </p>
      </section>

      <section className={styles.sheet} aria-labelledby="hidden-title">
        <span className={styles.label}>Read from your chart</span>
        <h2 id="hidden-title" className={styles.h2}>What your pillars are hiding</h2>
        <div className={styles.hooks}>
          {hooks.map((h) => (
            <article key={h.key} className={styles.hook}>
              <div className={`${styles.hookGlyph} ${styles[h.glyphElement]}`} aria-hidden="true">{h.glyph}</div>
              <div className={styles.hookBody}>
                <span className={styles.label}>{h.label}</span>
                <h3 className={styles.hookTitle}>{h.headline}</h3>
                <p className={`${styles.p} ${styles.muted}`}>{h.teaser}</p>
                <p className={styles.lockLine}>
                  <span className={styles.blurInline} aria-hidden="true">What this means for you is that the next</span>
                  <span className={styles.lockTag}>In your full reading</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.sheet} ${styles.locked}`} aria-labelledby="full-title">
        <span className={styles.label}>Full reading · coming soon</span>
        <h2 id="full-title" className={styles.h2}>Get the whole story</h2>
        <ul>
          <li><span>What each hidden sign above means for you</span><span>Full reading</span></li>
          <li><span>Your Joseon life story, and the modern work it points to</span><span>Full reading</span></li>
          <li><span>Compatibility with someone specific</span><span>Full reading</span></li>
          <li><span>Love, and the kind of partner your chart draws in</span><span>Full reading</span></li>
          <li><span>Work and money: where your {ELEMENT_INFO[meEl].name.toLowerCase()} grows best</span><span>Full reading</span></li>
          <li><span>Your 10-year luck cycles (daeun)</span><span>Full reading</span></li>
          <li><span>2027 month by month</span><span>Full reading</span></li>
        </ul>
        <p className={styles.p}>
          We are finishing the English edition of the full reading. Leave your email and you&apos;ll get it first, at the
          launch price of <b>$4.99</b> instead of $9.99.
        </p>
        <WaitlistForm dayMaster={chart.day.stem} />
      </section>

      <p className={styles.foot}>For reflection and entertainment. Not advice for medical, legal, or financial decisions.</p>
    </div>
  )
}
