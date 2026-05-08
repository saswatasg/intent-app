'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MobileShell from '@/components/layout/MobileShell'
import styles from './page.module.css'

export default function AboutPage() {
  const router = useRouter()

  return (
    <MobileShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>←</button>
          <div className={styles.ghost} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>The modern dating app for people who actually want something real.</h1>
          
          <p className={styles.paragraph}>
            The legacy era of Indian dating is over. Swiping became a game, and the apps that promised us connection ended up delivering endless, exhausting noise. 
          </p>

          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>75%</div>
              <div className={styles.statLabel}>of Indian Gen Z report severe swipe fatigue.</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>17%</div>
              <div className={styles.statLabel}>YoY growth in serious dating vs. decline in swipe apps.</div>
            </div>
          </div>

          <p className={styles.paragraph}>
            <span className={styles.highlight}>Intent</span> is the generational successor for the urban Indian 24–30 year old. Made for people who think Tinder is for college, and matrimony is for parents. If you're stuck in the exhausting space between casual and serious, you're not alone. We built this for you.
          </p>

          <p className={styles.paragraph}>
            We don't rely on endless stacks of profiles. Our matching is anchored in published psychological frameworks. Yes, the questionnaire is long. That's the price of admission. We're confident that if you put in the intent, the signal cuts through the noise.
          </p>

          <div className={styles.footer}>
            <div className={styles.footerLinks}>
              <Link href="/onboarding">Join Intent</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '8px' }}>
              © 2026 Intent. Built in Bangalore.
            </div>
          </div>

        </div>
      </div>
    </MobileShell>
  )
}
