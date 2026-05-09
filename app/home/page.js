'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import {
  MATCHES, NEXT_MATCH_TIME, CURRENT_USER, ACHIEVEMENTS,
  formatCountdown, getDepthColor, getDepthLabel
} from '@/lib/mockData'
import { getModuleTier, getNextAccuracyNudge } from '@/lib/modules'
import styles from './page.module.css'

/* ─── Countdown ─── */
function Countdown({ target }) {
  const [time, setTime] = useState(formatCountdown(target))
  useEffect(() => {
    const t = setInterval(() => setTime(formatCountdown(target)), 1000)
    return () => clearInterval(t)
  }, [target])
  return (
    <div className={styles.countdownRow}>
      <div className={styles.countdownTime}>
        {String(time.hours).padStart(2,'0')}:{String(time.minutes).padStart(2,'0')}:{String(time.seconds).padStart(2,'0')}
      </div>
      <div className={styles.countdownLabel}>Your next match arrives at 8:00 PM</div>
    </div>
  )
}

/* ─── Score Ring ─── */
function ScoreRing({ score, size = 44 }) {
  const r = (size - 6) / 2, circ = +(2 * Math.PI * r).toFixed(3)
  return (
    <svg width={size} height={size} className={styles.scoreRing}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--coral)" strokeWidth={3}
        strokeDasharray={circ}
        strokeDashoffset={+(circ - (score / 100) * circ).toFixed(3)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        fill="var(--text-primary)" fontSize="11" fontWeight="700">{score}%</text>
    </svg>
  )
}

/* ─── Skip Modal ─── */
const SKIP_REASONS = [
  "Not quite the right fit",
  "Looking for someone different",
  "Profile felt incomplete",
  "Already focused elsewhere",
  "Other",
]
function SkipModal({ onClose, onConfirm }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHandle} />
        <div className={styles.modalTitle}>Help us understand — what didn't fit?</div>
        <div className={styles.modalOptions}>
          {SKIP_REASONS.map((r, i) => (
            <button key={i} className={styles.modalOption} onClick={() => onConfirm(r)}>{r}</button>
          ))}
        </div>
        <button className={styles.modalCancel} onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

/* ─── Match Card ─── */
function MatchCard({ match, onSkip }) {
  const router = useRouter()
  return (
    <div className={styles.matchCard}>
      <div className={styles.cardPhoto}>
        <Image src={match.photo} alt={match.name} fill
          style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="390px" priority />
        <div className={styles.cardGradient} />
        <div className={styles.cardScore}>
          <ScoreRing score={match.totalScore} size={48} />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>{match.name}, {match.age}</div>
          <div className={styles.cardMeta}>{match.city} · {match.profession}</div>
        </div>
      </div>

      <div className={styles.cardChips}>
        {match.verified && (
          <span className={`chip chip-sage`} style={{ fontSize: '0.75rem' }}>
            {match.verified === 'id' ? 'ID Verified' : 'Verified'}
          </span>
        )}
        <span className="chip" style={{ fontSize: '0.75rem' }}>
          {match.intentLevel === 'long_term' ? 'Long-term' : match.intentLevel === 'marriage' ? 'Marriage-minded' : 'Exploring'}
        </span>
        {match.is_resurfaced && (
          <span className="chip chip-coral" style={{ fontSize: '0.75rem' }}>Compatibility updated</span>
        )}
      </div>

      <div className={styles.cardActions}>
        <button className="btn btn-primary btn-full" onClick={() => router.push(`/match/${match.id}`)}>
          View full profile
        </button>
        <button className="btn btn-ghost btn-full" onClick={() => onSkip(match.id)}>
          Not for me
        </button>
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function HomePage() {
  const router = useRouter()
  const [matches, setMatches] = useState(MATCHES)
  const [showSkip, setShowSkip] = useState(false)
  const [skipTarget, setSkipTarget] = useState(null)

  const tier = getModuleTier(3)
  const nudge = getNextAccuracyNudge(3)

  const handleSkip = (id) => { setSkipTarget(id); setShowSkip(true) }
  const confirmSkip = (reason) => {
    setMatches(prev => prev.filter(m => m.id !== skipTarget))
    setShowSkip(false)
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        {showSkip && <SkipModal onClose={() => setShowSkip(false)} onConfirm={confirmSkip} />}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.logoMark}>◈</span>
            <span className={styles.logoText}>intent</span>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.bellBtn} aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
            <div className={styles.headerAvatar}>
              <Image src={CURRENT_USER.photo} alt="Me" fill style={{ objectFit: 'cover' }} sizes="32px" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className={styles.greeting}>
          <div className={styles.greetingName}>Good evening, {CURRENT_USER.name.split(' ')[0]}</div>
          <Countdown target={NEXT_MATCH_TIME} />
        </div>

        {/* Accuracy nudge */}
        {nudge && (
          <button className={styles.nudgeCard} onClick={() => router.push('/modules')}>
            <div className={styles.nudgeText}>
              <span className={styles.nudgeTitle}>Sharpen your matches</span>
              <span className={styles.nudgeSub}>{nudge}</span>
            </div>
            <span className={styles.nudgeArrow}>→</span>
          </button>
        )}

        {/* Matches */}
        <div className={styles.matchList}>
          {matches.length > 0 ? (
            matches.map((match, i) => (
              <div key={match.id} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-in-up">
                <MatchCard match={match} onSkip={handleSkip} />
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyTitle}>We're being selective.</div>
              <div className={styles.emptySub}>New match tomorrow at 8:00 PM.</div>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  )
}
