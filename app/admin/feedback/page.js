'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export default function AdminFeedbackDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ ai_curated: {}, random_control: {} })

  const fetchStats = async () => {
    setLoading(true)
    try {
      // In a prototype environment where DB joins might be tricky without full data,
      // we'll fetch matches and feedback, then merge them in memory.
      const { data: matches } = await supabase.from('matches').select('id, bucket')
      const { data: feedback } = await supabase.from('feedback_events').select('*')

      if (!matches || !feedback) return

      const buckets = { ai_curated: [], random_control: [] }
      
      matches.forEach(m => {
        if (buckets[m.bucket]) {
          buckets[m.bucket].push(m.id)
        }
      })

      const analyzeBucket = (bucketName) => {
        const matchIds = buckets[bucketName] || []
        const totalMatches = matchIds.length
        const bucketFeedback = feedback.filter(f => matchIds.includes(f.match_id))
        
        const weMet = bucketFeedback.filter(f => f.outcome === 'we_met').length
        const greatMeet = bucketFeedback.filter(f => f.outcome === 'we_met' && f.went_well === 'great').length
        const didntClick = bucketFeedback.filter(f => f.outcome === 'didnt_click').length

        return {
          totalMatches,
          feedbackCount: bucketFeedback.length,
          weMet,
          greatMeet,
          didntClick,
          meetRate: totalMatches ? ((weMet / totalMatches) * 100).toFixed(1) : 0,
          greatRate: totalMatches ? ((greatMeet / totalMatches) * 100).toFixed(1) : 0
        }
      }

      setStats({
        ai_curated: analyzeBucket('ai_curated'),
        random_control: analyzeBucket('random_control')
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Algorithm Validation Dashboard</h1>
        <div className={styles.subtitle}>Tracking Real-World Outcomes: AI Curated vs. Random Control</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <button className={styles.refreshBtn} onClick={fetchStats}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className={styles.grid}>
        {['ai_curated', 'random_control'].map(bucket => {
          const s = stats[bucket]
          const isAI = bucket === 'ai_curated'
          return (
            <div key={bucket} className={styles.card} style={isAI ? { borderColor: 'var(--sage)' } : {}}>
              <div className={styles.cardTitle}>{isAI ? '✨ AI Curated (Gemini)' : '🎲 Random Control'}</div>
              
              {s.totalMatches === undefined ? (
                <div className={styles.empty}>Loading...</div>
              ) : (
                <>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Total Matches Generated</span>
                    <span className={styles.statValue}>{s.totalMatches}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Feedback Responses</span>
                    <span className={styles.statValue}>{s.feedbackCount}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Real-World Meet Rate</span>
                    <span className={`${styles.statValue} ${isAI ? styles.highlight : ''}`}>
                      {s.meetRate}% <span className={styles.statMuted}>({s.weMet} met)</span>
                    </span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>"Went Great" Rate</span>
                    <span className={`${styles.statValue} ${isAI ? styles.highlight : ''}`}>
                      {s.greatRate}% <span className={styles.statMuted}>({s.greatMeet} great)</span>
                    </span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>"Didn't Click"</span>
                    <span className={styles.statValue}>
                      {s.didntClick}
                    </span>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
