'use client'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

function CheckIcon({ color }) {
  return (
    <svg className={styles.featureIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function UpgradePage() {
  const router = useRouter()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Dating with intent.
          <span className={styles.heroTitleHighlight}>Designed for what's next.</span>
        </h1>
        <p className={styles.heroSub}>Choose the tier that matches where you are.</p>
      </section>

      <div className={styles.cards}>
        {/* Tier 1: Free */}
        <div className={`${styles.card} ${styles.cardFree}`}>
          <div className={styles.cardHeader}>
            <div>
              <div className={`${styles.cardLabel} ${styles.labelFree}`}>Free</div>
              <div className={styles.cardTitle}>Intent Free</div>
            </div>
          </div>
          <div className={styles.priceRow}>
            <div className={styles.price}>₹0</div>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}><CheckIcon color="var(--text-muted)" /><span className={styles.featureText}>3 curated matches per cycle</span></div>
            <div className={styles.feature}><CheckIcon color="var(--text-muted)" /><span className={styles.featureText}>Basic compatibility scores</span></div>
            <div className={styles.feature}><CheckIcon color="var(--text-muted)" /><span className={styles.featureText}>14-day conversation window</span></div>
          </div>
          <div className={styles.currentText}>Current Plan</div>
        </div>

        {/* Tier 2: Plus */}
        <div className={`${styles.card} ${styles.cardPlus}`}>
          <div className={styles.cardHeader}>
            <div>
              <div className={`${styles.cardLabel} ${styles.labelPlus}`}>Plus</div>
              <div className={styles.cardTitle}>Intent Plus</div>
              <div className={styles.cardSub}>More signal. Less noise.</div>
            </div>
            <div className={`${styles.badge} ${styles.badgePlus}`}>Recommended</div>
          </div>
          <div className={styles.priceRow}>
            <div className={styles.price}>₹499<span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/mo</span></div>
            <div className={styles.priceSub}>Save 33% yearly</div>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}><CheckIcon color="var(--coral)" /><span className={styles.featureText}>4 matches per cycle</span></div>
            <div className={styles.feature}><CheckIcon color="var(--coral)" /><span className={styles.featureText}>Unlimited AI insights</span></div>
            <div className={styles.feature}><CheckIcon color="var(--coral)" /><span className={styles.featureText}>21-day conversation window</span></div>
            <div className={styles.feature}><CheckIcon color="var(--coral)" /><span className={styles.featureText}>Full compatibility breakdown</span></div>
          </div>
          <button className="btn btn-primary btn-full">Get Intent Plus</button>
        </div>

        {/* Tier 3: Marriage Track */}
        <div className={`${styles.card} ${styles.cardMarriage}`}>
          <div className={styles.cardHeader}>
            <div>
              <div className={`${styles.cardLabel} ${styles.labelMarriage}`}>Marriage</div>
              <div className={styles.cardTitle}>Marriage Track</div>
              <div className={styles.cardSub}>Verified. Coached. Committed.</div>
            </div>
            <div className={`${styles.badge} ${styles.badgeMarriage}`}>For when you mean it</div>
          </div>
          <div className={styles.priceRow}>
            <div className={styles.price}>₹1,499<span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>/mo</span></div>
            <div className={styles.priceSub}>Save 33% yearly</div>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Everything in Plus</span></div>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Marriage-intent-only pool</span></div>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Priority matching queue</span></div>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Monthly 30-min coaching session</span></div>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Marriage intent badge</span></div>
            <div className={styles.feature}><CheckIcon color="var(--gold)" /><span className={styles.featureText}>Deep psychological reports</span></div>
          </div>
          <button className="btn btn-gold btn-full">Get Marriage Track</button>
        </div>
      </div>
    </div>
  )
}
