'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { INSIGHTS_REPORT, CONVERSATIONS } from '@/lib/mockData'
import styles from './page.module.css'

const REC_COLORS = {
  strong_potential: { color: '#7BA38C', bg: 'rgba(123,163,140,0.08)', border: 'rgba(123,163,140,0.25)', emoji: '🟢' },
  promising: { color: '#D4A85C', bg: 'rgba(212,168,92,0.08)', border: 'rgba(212,168,92,0.25)', emoji: '🟡' },
  proceed_thoughtfully: { color: '#E07B54', bg: 'rgba(220,120,80,0.08)', border: 'rgba(220,120,80,0.25)', emoji: '🟠' },
  low_compatibility: { color: '#C4827A', bg: 'rgba(180,80,80,0.08)', border: 'rgba(180,80,80,0.25)', emoji: '🔴' },
}

const DIM_COLORS = [
  { label: 'Values', key: 'values', color: 'var(--sage)' },
  { label: 'Emotional', key: 'emotional', color: 'var(--blush-light)' },
  { label: 'Lifestyle', key: 'lifestyle', color: 'var(--gold)' },
  { label: 'Intent', key: 'intent', color: 'var(--sage-light)' },
  { label: 'Communication', key: 'communication', color: 'var(--muted)' },
]

export default function InsightsPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const r = INSIGHTS_REPORT
  const rec = REC_COLORS[r.recommendation]
  const conv = CONVERSATIONS.find(c => c.id === id) || CONVERSATIONS[0]

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.back} onClick={() => router.back()}>←</button>
          <div className={styles.headerTitle}>
            <div className={styles.htMain}>Conversation Insights</div>
            <div className={styles.htSub}>You & {r.partnerName} · {r.metrics.daysActive} days</div>
          </div>
          <div className={styles.privacyBadge}>🔒</div>
        </div>

        {/* Partner banner */}
        <div className={styles.partnerBanner}>
          <div className={styles.partnerPhotoWrap}>
            <Image src={r.partnerPhoto} alt={r.partnerName} fill style={{ objectFit: 'cover' }} sizes="56px" />
          </div>
          <div className={styles.partnerInfo}>
            <div className={styles.partnerName}>{r.partnerName}</div>
            <div className={styles.partnerScore}>{r.matchScore}% compatibility · {r.metrics.totalMessages} messages</div>
          </div>
          <button className={`btn btn-ghost btn-sm`} onClick={() => router.push(`/chat/${id}`)}>Chat →</button>
        </div>

        {/* Recommendation */}
        <div className={styles.recCard} style={{ background: rec.bg, borderColor: rec.border }}>
          <div className={styles.recEmoji}>{rec.emoji}</div>
          <div>
            <div className={styles.recLabel} style={{ color: rec.color }}>{r.recommendationLabel}</div>
            <div className={styles.recText}>{r.recommendationText}</div>
          </div>
        </div>

        {/* Metrics grid */}
        <div className={styles.section}>
          <div className={styles.sLabel}>Interaction metrics</div>
          <div className={styles.metricsGrid}>
            {[
              { val: r.metrics.totalMessages, lbl: 'Messages' },
              { val: r.metrics.daysActive, lbl: 'Days active' },
              { val: r.metrics.avgResponseTimeYou, lbl: 'Your reply' },
              { val: r.metrics.avgResponseTimeThem, lbl: 'Their reply' },
              { val: `${r.metrics.reciprocityScore}%`, lbl: 'Reciprocity' },
              { val: `${r.metrics.youInitiated}:${r.metrics.theyInitiated}`, lbl: 'Initiated' },
            ].map((m, i) => (
              <div key={i} className={styles.metricTile}>
                <div className={styles.metricVal}>{m.val}</div>
                <div className={styles.metricLbl}>{m.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Observations */}
        <div className={styles.section}>
          <div className={styles.sLabel}>What we noticed</div>
          <div className={styles.sList}>
            {r.behavioralObservations.map((obs, i) => (
              <div key={i} className={styles.obsCard} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={styles.obsNum}>{i + 1}</div>
                <div className={styles.obsText}>{obs}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compatibility bars */}
        <div className={styles.section}>
          <div className={styles.sLabel}>Compatibility breakdown</div>
          <div className={styles.compat}>
            {DIM_COLORS.map(d => (
              <div key={d.key} className={styles.compatRow}>
                <span className={styles.compatLbl}>{d.label}</span>
                <div className={styles.compatTrack}>
                  <div className={styles.compatFill} style={{ width: `${r.breakdown[d.key]}%`, background: d.color }} />
                </div>
                <span className={styles.compatPct} style={{ color: d.color }}>{r.breakdown[d.key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight paragraph */}
        <div className={styles.section}>
          <div className={styles.sLabel}>The bigger picture</div>
          <div className={styles.insightPara}>{r.compatibilityInsight}</div>
        </div>

        {/* Patterns */}
        <div className={styles.section}>
          <div className={styles.sLabel}>Peak engagement</div>
          <div className={styles.patternGrid}>
            <div className={styles.patternCard}>
              <div className={styles.patternLbl}>Your peak</div>
              <div className={styles.patternVal}>{r.metrics.peakTimeYou}</div>
            </div>
            <div className={styles.patternCard}>
              <div className={styles.patternLbl}>Their peak</div>
              <div className={styles.patternVal}>{r.metrics.peakTimeThem}</div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className={styles.privacyNote}>
          🔒 Generated from conversation patterns — not your message content. Only you can ever see this.
        </div>
      </div>
    </MobileShell>
  )
}
