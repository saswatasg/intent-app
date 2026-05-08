'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './page.module.css'

export default function ReferralPage() {
  const router = useRouter()
  // Mock generating a referral code based on user ID or use existing. 
  // In reality, this would be fetched from the DB (e.g. ARJ7K2).
  const [referralCode] = useState(CURRENT_USER.referralCode || 'ARJ7K2')
  const [copied, setCopied] = useState(false)

  // Mock stats
  const stats = {
    invited: 4,
    completed: 2,
    rewards: 1
  }

  const shareUrl = `http://localhost:3000/i/${referralCode}` // Locally intent.app visually
  const shareText = `I've been using Intent — it's the dating app for people who actually want something real. Skip the waitlist with my code: ${referralCode} → ${shareUrl}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const encodedText = encodeURIComponent(shareText)
    window.open(`https://wa.me/?text=${encodedText}`, '_blank')
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>←</button>
          <div className={styles.headerTitle}>Invite Friends</div>
          <div className={styles.ghostBtn} />
        </div>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Your matches get better when your friends are on Intent.</h1>
          <p className={styles.heroSub}>
            Dating shouldn't be a solo sport. Invite your friends, skip the waitlist, and earn exclusive rewards.
          </p>

          <div className={styles.codeBox}>
            <div className={styles.codeLabel}>Your Unique Code</div>
            <div className={styles.codeValue}>{referralCode}</div>
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? 'Copied ✓' : 'Copy Link'}
            </button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statVal}>{stats.invited}</div>
              <div className={styles.statLbl}>Invited</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>{stats.completed}</div>
              <div className={styles.statLbl}>Joined</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>{stats.rewards}</div>
              <div className={styles.statLbl}>Earned</div>
            </div>
          </div>

          <button className={styles.waBtn} onClick={handleWhatsApp}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Invite via WhatsApp
          </button>
        </div>

        <div className={styles.rewardsSection}>
          <div className={styles.sectionTitle}>Rewards Progress</div>

          {/* Tier 1 */}
          <div className={`${styles.rewardCard} ${stats.completed >= 1 ? styles.earned : ''}`}>
            <div className={styles.rewardIconWrap}>🌟</div>
            <div className={styles.rewardInfo}>
              <div className={styles.rewardTitle}>1 Friend: Plus Tier Free</div>
              <div className={styles.rewardDesc}>You both get 1 month of Intent Plus for free.</div>
              <div className={styles.rewardStatus}>
                {stats.completed >= 1 ? <span className={styles.statusEarned}>Earned ✓</span> : <span className={styles.statusPending}>0 / 1 Joined</span>}
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className={`${styles.rewardCard} ${stats.completed >= 3 ? styles.earned : ''}`}>
            <div className={styles.rewardIconWrap}>🔥</div>
            <div className={styles.rewardInfo}>
              <div className={styles.rewardTitle}>3 Friends: Extra Matches</div>
              <div className={styles.rewardDesc}>+1 AI Curated Match per day for 30 days.</div>
              <div className={styles.rewardStatus}>
                {stats.completed >= 3 ? <span className={styles.statusEarned}>Earned ✓</span> : <span className={styles.statusPending}>{Math.min(stats.completed, 3)} / 3 Joined</span>}
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className={`${styles.rewardCard} ${stats.completed >= 5 ? styles.earned : ''}`}>
            <div className={styles.rewardIconWrap}>👑</div>
            <div className={styles.rewardInfo}>
              <div className={styles.rewardTitle}>5 Friends: Founding Member</div>
              <div className={styles.rewardDesc}>Exclusive badge visible to all your matches.</div>
              <div className={styles.rewardStatus}>
                {stats.completed >= 5 ? <span className={styles.statusEarned}>Earned ✓</span> : <span className={styles.statusPending}>{Math.min(stats.completed, 5)} / 5 Joined</span>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </MobileShell>
  )
}
