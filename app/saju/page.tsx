// Hanji Saju 첫 화면 — 광고 도착 페이지
import BirthForm from '@/components/saju/BirthForm'
import styles from './saju.module.css'

export default function SajuHome() {
  return (
    <div className={styles.wrap}>
      <header className={styles.site}>
        <a className={styles.brand} href="/saju">Hanji Saju <span>四柱</span></a>
        <span className={styles.label}>Made in Seoul</span>
      </header>

      <section className={styles.hero}>
        <span className={styles.label}>Korean saju · 사주</span>
        <h1 className={styles.h1}>The reading Koreans get before big decisions. Now in English.</h1>
        <p className={`${styles.p} ${styles.lede} ${styles.muted}`}>
          Saju turns the moment you were born into four pillars of time. In Korea, people check theirs before a wedding,
          a new job, or a big move. Find your day master and your five-element balance in under a minute.
        </p>
        <div className={styles.trust}>
          <span>Free</span>
          <span>No sign-up</span>
          <span>About 40 seconds</span>
        </div>
      </section>

      <section className={styles.sheet} aria-labelledby="form-title">
        <h2 id="form-title" className={styles.h2}>Your birth moment</h2>
        <BirthForm />
      </section>

      <section aria-labelledby="how-title" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 id="how-title" className={styles.h2}>How it works</h2>
        <ol className={styles.steps}>
          <li><b>Your pillars</b>We place your birth on the Korean solar-term calendar and find the year, month, day, and hour pillars.</li>
          <li><b>Your day master</b>The first character of your day pillar is you. It sets the tone for the whole reading.</li>
          <li><b>Your balance</b>We count the five elements in your chart to show what runs strong and what restores you.</li>
        </ol>
      </section>

      <section className={styles.culture}>
        <span className={styles.label}>Why saju</span>
        <p className={styles.p}>
          Walk through Hongdae or Myeongdong in Seoul and you will find saju cafés tucked between the coffee shops.
          Koreans have read saju for centuries, and it reads you down to the hour you were born, not just the month.
        </p>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.h2} style={{ marginBottom: 6 }}>Questions</h2>
        <details>
          <summary>What if I don&apos;t know my birth time?</summary>
          <p>You still get three of your four pillars and your day master. The hour pillar adds detail but isn&apos;t required.</p>
        </details>
        <details>
          <summary>How is this different from astrology?</summary>
          <p>Both read your birth moment. Saju uses the Korean solar-term calendar and the five elements instead of planets and zodiac signs.</p>
        </details>
        <details>
          <summary>Do you store my birth details?</summary>
          <p>No. Your reading is calculated when you open it and nothing is saved.</p>
        </details>
      </section>

      <p className={styles.foot}>For reflection and entertainment. Not advice for medical, legal, or financial decisions.</p>
    </div>
  )
}
