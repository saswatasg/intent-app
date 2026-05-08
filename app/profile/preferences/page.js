'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import styles from './page.module.css'

export default function PreferencesPage() {
  const router = useRouter()
  // Mock current user state for intents
  const [intents, setIntents] = useState(['long_term', 'marriage'])
  const [resurface, setResurface] = useState(true)

  const handleToggleIntent = (val) => {
    if (intents.includes(val)) {
      if (intents.length > 1) {
        setIntents(intents.filter(i => i !== val))
      }
    } else {
      setIntents([...intents, val])
    }
  }

  const handleSave = () => {
    // In production, sync with Supabase
    alert('Preferences saved!')
    router.back()
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>←</button>
          <div className={styles.title}>Matching Preferences</div>
          <div className={styles.ghost} />
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Intent Filters</div>
            <div className={styles.sectionDesc}>
              Select the types of relationships you are open to. Expanding your intents will significantly increase your available matching pool.
            </div>

            <div className={styles.intentGrid}>
              <div 
                className={`${styles.intentCard} ${intents.includes('long_term') ? styles.intentCardActive : ''}`}
                onClick={() => handleToggleIntent('long_term')}
              >
                <div className={styles.checkbox}>
                  {intents.includes('long_term') && '✓'}
                </div>
                <div className={styles.intentInfo}>
                  <div className={styles.intentName}>Long-term Relationship</div>
                  <div className={styles.intentSub}>Looking for a serious partner, timeline open</div>
                </div>
              </div>

              <div 
                className={`${styles.intentCard} ${intents.includes('marriage') ? styles.intentCardActive : ''}`}
                onClick={() => handleToggleIntent('marriage')}
              >
                <div className={styles.checkbox}>
                  {intents.includes('marriage') && '✓'}
                </div>
                <div className={styles.intentInfo}>
                  <div className={styles.intentName}>Marriage-minded</div>
                  <div className={styles.intentSub}>Looking to get married within 2-3 years</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Candidate Re-surfacing</div>
            <div className={styles.sectionDesc}>
              As users complete more modules, your compatibility scores with them may change.
            </div>
            <div className={styles.toggleRow}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleName}>Show updated matches</div>
                <div className={styles.toggleSub}>Allow previously-skipped people to re-appear if their compatibility score shifts significantly.</div>
              </div>
              <div className={`${styles.toggle} ${resurface ? styles.toggleOn : ''}`} onClick={() => setResurface(!resurface)}>
                <div className={styles.toggleThumb} />
              </div>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </div>
    </MobileShell>
  )
}
