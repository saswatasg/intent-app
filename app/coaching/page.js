'use client'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import styles from './page.module.css'

export default function CoachingPage() {
  const router = useRouter()

  return (
    <MobileShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>←</button>
          <div className={styles.title}>Relationship Coaching</div>
          <div className={styles.ghost} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.heroTitle}>Book your session.</h1>
          <p className={styles.heroSub}>
            As a Marriage Track member, you have 1 session available this month. Pick a time that works for you.
          </p>

          <div className={styles.calendlyWrap}>
            {/* Using a placeholder Calendly embed URL for prototype demonstration */}
            <iframe 
              src="https://calendly.com/rick-astley/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
              className={styles.iframe}
              title="Calendly Scheduling Page"
            />
          </div>
        </div>
      </div>
    </MobileShell>
  )
}
