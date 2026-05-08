'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function RootPage() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => {
      const onboarded = localStorage.getItem('intent_onboarded')
      router.replace(onboarded === 'true' ? '/home' : '/onboarding')
    }, 1800)
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className={styles.splash}>
      {/* Ambient orbs */}
      <div className={styles.orbContainer} aria-hidden>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={`${styles.logoWrap} ${visible ? styles.logoVisible : ''}`}>
        {/* Glowing ring behind logo */}
        <div className={styles.glowRing} />
        <div className={styles.logoMark}>◈</div>
        <div className={styles.logoText}>intent</div>
        <div className={styles.tagline}>Dating with purpose</div>

        {/* Loading dots */}
        <div className={styles.loadDots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}
