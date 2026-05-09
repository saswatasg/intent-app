'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './page.module.css'

export default function ProfilePage() {
  const router = useRouter()
  
  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div style={{ width: 32 }} /> {/* spacer */}
          <div className={styles.headerTitle}>Profile</div>
          <button className={styles.settingsBtn} onClick={() => router.push('/settings')} aria-label="Settings">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </header>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.avatar}>
            <Image src={CURRENT_USER.photo} alt={CURRENT_USER.name} fill style={{ objectFit: 'cover' }} sizes="96px" />
          </div>
          <h1 className={styles.name}>{CURRENT_USER.name}, {CURRENT_USER.age}</h1>
          <div className={styles.meta}>{CURRENT_USER.city} · {CURRENT_USER.profession}</div>
          <div className={styles.verifyBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Verified
          </div>
        </section>

        {/* Score & Stats */}
        <section className={styles.scoreStatsRow}>
          <div className={styles.intentScoreCard}>
            <div>
              <div className={styles.scoreLabel}>Intent Score</div>
              <div className={styles.scoreValue}>{CURRENT_USER.intentScore}</div>
            </div>
            <div className={styles.streak}>
              <div className={styles.streakLabel}>{CURRENT_USER.streak}-day streak</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Consistent</div>
            </div>
          </div>
          
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Modules</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>82%</div>
              <div className={styles.statLabel}>Avg Comp</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>6</div>
              <div className={styles.statLabel}>Matches</div>
            </div>
          </div>
        </section>

        {/* Prompts */}
        <section className={styles.prompts}>
          <h2 className={styles.sectionTitle}>Your prompts</h2>
          {CURRENT_USER.prompts.slice(0, 2).map((p, i) => (
            <div key={i} className={styles.promptCard}>
              <div className={styles.promptQ}>{p.q}</div>
              <div className={styles.promptA}>"{p.a}"</div>
            </div>
          ))}
        </section>

        {/* Perks & Upgrade */}
        <section className={styles.cards}>
          <div className={styles.perkCard}>
            <div className={styles.cardTitle}>Invite friends, earn perks</div>
            <div className={styles.cardSub}>Share your code to unlock Plus, extra matches, and status badges.</div>
            <button className="btn btn-outline-sage btn-sm" onClick={() => router.push('/refer')}>Share referral code</button>
          </div>

          <div className={styles.upgradeCard}>
            <div className={styles.cardTitle}>Unlock Intent Plus</div>
            <div className={styles.cardSub}>More signal. Less noise. Access full compatibility reports.</div>
            <button className="btn btn-primary btn-sm" onClick={() => router.push('/upgrade')}>₹499 / mo</button>
          </div>
        </section>

        {/* Footer */}
        <Link href="/profile/preferences" className={styles.settingsLink}>
          <span>Settings & preferences</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </MobileShell>
  )
}
