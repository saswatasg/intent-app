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
import styles from './page.module.css'

/* ─── Countdown Ring ─── */
function CountdownTimer({ target }) {
  const [time, setTime] = useState(formatCountdown(target))
  useEffect(() => {
    const t = setInterval(() => setTime(formatCountdown(target)), 1000)
    return () => clearInterval(t)
  }, [target])
  const pct = Math.max(0, Math.min(100, (1 - time.total / (48 * 3600000)) * 100))
  const r = 34, circ = +(2 * Math.PI * r).toFixed(3)
  const offset = +(circ * (pct / 100)).toFixed(3)
  return (
    <div className={styles.countdownCard}>
      <div className={styles.countdownRing}>
        <svg width={80} height={80}>
          <circle cx={40} cy={40} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
          <circle cx={40} cy={40} r={r} fill="none" stroke="var(--sage)" strokeWidth={5}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 40 40)" />
        </svg>
        <div className={styles.countdownInner}>
          <div className={styles.countdownNum}>
            {String(time.hours).padStart(2,'0')}:{String(time.minutes).padStart(2,'0')}
          </div>
          <div className={styles.countdownSec}>{String(time.seconds).padStart(2,'0')}s</div>
        </div>
      </div>
      <div className={styles.countdownText}>
        <div className={styles.countdownTitle}>Next matches arriving</div>
        <div className={styles.countdownSub}>3 people curated for you · 8:00 PM IST</div>
        <div className={styles.pulseRow}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

/* ─── Intent Score ─── */
function IntentRing({ score, streak }) {
  const r = 28, circ = +(2 * Math.PI * r).toFixed(3)
  const color = score >= 80 ? 'var(--sage)' : 'var(--gold)'
  return (
    <div className={styles.intentRing}>
      <svg width={68} height={68}>
        <circle cx={34} cy={34} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} />
        <circle cx={34} cy={34} r={r} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={circ}
          strokeDashoffset={+(circ - (score / 100) * circ).toFixed(3)}
          strokeLinecap="round" transform="rotate(-90 34 34)" />
        <text x="50%" y="44%" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="13" fontWeight="800">{score}</text>
        <text x="50%" y="66%" textAnchor="middle" dominantBaseline="central" fill="var(--muted)" fontSize="6.5" letterSpacing="0.5">INTENT</text>
      </svg>
      <div className={styles.streakPill}>🔥 {streak}</div>
    </div>
  )
}

/* ─── Score Ring ─── */
function ScoreRing({ score, size = 50 }) {
  const r = (size - 8) / 2, circ = +(2 * Math.PI * r).toFixed(3)
  const color = score >= 80 ? 'var(--sage)' : score >= 70 ? 'var(--gold)' : 'var(--blush)'
  return (
    <svg width={size} height={size} style={{ filter: `drop-shadow(0 0 5px ${color}55)`, flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={circ}
        strokeDashoffset={+(circ - (score / 100) * circ).toFixed(3)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="10.5" fontWeight="800">{score}%</text>
    </svg>
  )
}

/* ─── Skip Modal ─── */
const SKIP_REASONS = [
  "Not what I'm looking for",
  "Didn't feel the compatibility",
  "Profile felt incomplete",
  "Already focused on a conversation",
  "Other reason",
]
function SkipModal({ onClose, onConfirm }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHandle} />
        <div className={styles.modalTitle}>Why are you passing?</div>
        <div className={styles.modalSub}>Helps us improve your next cycle</div>
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
const MATCH_TO_CONV = { match_001: 'conv_001', match_002: 'conv_002', match_003: 'conv_003' }

function MatchCard({ match, index }) {
  const [skipping, setSkipping] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const hoursLeft = Math.floor((match.expiresAt - Date.now()) / 3600000)
  const convId = MATCH_TO_CONV[match.id]

  if (skipped) return (
    <div className={`${styles.matchCard} ${styles.matchCardSkipped}`}>
      <div className={styles.skippedIcon}>✓</div>
      <div>
        <div className={styles.skippedTitle}>Feedback noted</div>
        <div className={styles.skippedSub}>Improving your next cycle</div>
      </div>
    </div>
  )

  return (
    <>
      <div className={`${styles.matchCard} animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
        {/* Expiry badge */}
        {hoursLeft < 12 && <div className={styles.expiryBadge}>⏱ {hoursLeft}h left</div>}

        {/* Photo */}
        <div className={styles.matchPhoto}>
          <Image src={match.photo} alt={match.name} fill
            style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="350px" priority={index === 0} />
          <div className={styles.matchPhotoGrad} />

          {/* Verify badge */}
          <div className={styles.matchVerify}>
            <span className={match.verified === 'id' ? styles.badgeGold : styles.badgeSage}>
              {match.verified === 'id' ? '🛡 ID' : '✓ Verified'}
            </span>
          </div>

          {/* Name block */}
          <div className={styles.matchNameBlock}>
            <div className={styles.matchNameRow}>
              <div>
                <div className={styles.matchName}>{match.name}, {match.age}</div>
                <div className={styles.matchCity}>{match.city} · {match.profession}</div>
              </div>
              <ScoreRing score={match.totalScore} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.matchBody}>
          {/* Compatibility bar */}
          <div className={styles.compatRow}>
            <div className={styles.compatTrack}>
              <div className={styles.compatFill} style={{ width: `${match.totalScore}%` }} />
            </div>
            <span className={styles.compatPct}>{match.totalScore}% compatible</span>
          </div>

          {/* Insights */}
          <div className={styles.insightList}>
            {match.insights.slice(0, 2).map((ins, i) => (
              <div key={i} className={styles.insightRow}>
                <span className={styles.insightDot} />
                <span>{ins}</span>
              </div>
            ))}
          </div>

          {/* Intent chip */}
          <div className={styles.intentRow}>
            <span className={`chip ${match.intentLevel === 'marriage' ? 'chip-gold' : 'chip-sage'}`}
              style={{ fontSize: '0.6875rem' }}>
              {match.intentLevel === 'long_term' ? '💚 Long-term'
                : match.intentLevel === 'marriage' ? '💛 Marriage-minded'
                : '🔵 Exploring seriously'}
            </span>
          </div>

          {/* CTAs */}
          <Link href={`/match/${match.id}`} className={`btn btn-primary btn-full`}
            style={{ marginTop: 12 }}>
            View compatibility →
          </Link>
          <button className={`btn btn-ghost btn-full btn-sm`}
            style={{ marginTop: 8 }} onClick={() => setSkipping(true)}>
            Pass on this match
          </button>
        </div>
      </div>

      {skipping && (
        <SkipModal onClose={() => setSkipping(false)} onConfirm={() => { setSkipped(true); setSkipping(false) }} />
      )}
    </>
  )
}

/* ─── Week Stats ─── */
function WeekStats({ stats }) {
  const items = [
    { val: stats.matchesReviewed,       lbl: 'Matches\nreviewed',        color: 'var(--sage-light)' },
    { val: stats.conversationsStarted,  lbl: 'Chats\nstarted',           color: 'var(--gold)' },
    { val: stats.deepConversations,     lbl: 'Deep\nconversations',      color: 'var(--blush-light)' },
    { val: stats.avgResponseTime,       lbl: 'Avg reply\ntime',          color: 'var(--muted)', small: true },
  ]
  return (
    <div className={styles.weekCard}>
      <div className={styles.sectionLabel}>This week</div>
      <div className={styles.weekGrid}>
        {items.map((item, i) => (
          <div key={i} className={styles.weekTile}>
            <div className={styles.weekVal}
              style={{ color: item.color, fontSize: item.small ? '0.875rem' : '1.375rem' }}>
              {item.val}
            </div>
            <div className={styles.weekLbl}>{item.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Achievements ─── */
function Achievements({ achievements }) {
  const earned = achievements.filter(a => a.earned)
  const next = achievements.find(a => !a.earned)
  return (
    <div className={styles.achieveCard}>
      <div className={styles.sectionLabel}>Achievements</div>
      <div className={styles.achieveList}>
        {earned.map(a => (
          <div key={a.id} className={styles.achieveBadge} title={`${a.title}: ${a.desc}`}>
            <div className={styles.achieveEmoji}>{a.emoji}</div>
            <div className={styles.achieveLabel}>{a.title}</div>
          </div>
        ))}
        {next && (
          <div className={`${styles.achieveBadge} ${styles.achieveLocked}`} title={`Locked: ${next.desc}`}>
            <div className={styles.achieveEmoji} style={{ filter: 'grayscale(1) opacity(0.35)' }}>{next.emoji}</div>
            <div className={styles.achieveLabel} style={{ color: 'var(--muted-dark)' }}>{next.title}</div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Profile Completion ─── */
function ProfileCompletion({ pct }) {
  return (
    <div className={styles.completionCard}>
      <div className={styles.completionTop}>
        <span className={styles.sectionLabel} style={{ marginBottom: 0 }}>Profile strength</span>
        <span className={styles.completionPct}>{pct}%</span>
      </div>
      <div className={styles.completionTrack}>
        <div className={styles.completionFill} style={{ width: `${pct}%` }} />
      </div>
      <div className={styles.completionNote}>
        Add a voice intro to hit 100% — unlocks 2× match priority
      </div>
      <Link href="/profile" className="btn btn-outline-sage btn-sm btn-full" style={{ marginTop: 10 }}>
        Complete profile →
      </Link>
    </div>
  )
}

/* ─── Pause Toggle ─── */
function PauseControl({ paused, onToggle }) {
  return (
    <div className={styles.pauseCard}>
      <div>
        <div className={styles.pauseTitle}>Match delivery</div>
        <div className={styles.pauseSub}>
          {paused ? 'Paused — tap to resume' : 'Active · Next delivery at 8 PM'}
        </div>
      </div>
      <button className={`${styles.toggle} ${!paused ? styles.toggleOn : ''}`}
        onClick={onToggle} aria-label="Toggle match delivery">
        <div className={styles.toggleThumb} />
      </button>
    </div>
  )
}

/* ─── Main ─── */
export default function HomePage() {
  const [tab, setTab] = useState('matches')
  const [paused, setPaused] = useState(false)
  const user = CURRENT_USER

  return (
    <MobileShell>
      <div className={styles.page}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.selfAvatar}>
              <Image src={user.photo} alt={user.name} fill
                style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="42px" />
            </div>
            <div>
              <div className={styles.greeting}>Hey, {user.name} 👋</div>
              <span className="chip chip-sage" style={{ fontSize: '0.6rem', padding: '2px 8px' }}>
                💚 Serious mode
              </span>
            </div>
          </div>
          <IntentRing score={user.intentScore} streak={user.streak} />
        </div>

        {/* ── Countdown ── */}
        <div className={styles.section}>
          <CountdownTimer target={NEXT_MATCH_TIME} />
        </div>

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          {[['matches', 'Matches', 3], ['journey', 'Journey', null]].map(([key, label, count]) => (
            <button key={key}
              className={`${styles.tab} ${tab === key ? styles.tabActive : ''}`}
              onClick={() => setTab(key)}>
              {label}
              {count && <span className={styles.tabBadge}>{count}</span>}
            </button>
          ))}
        </div>

        {/* ── MATCHES ── */}
        {tab === 'matches' && (
          <div className={styles.tabContent}>
            {!paused ? (
              <>
                <p className={styles.tabNote}>
                  3 curated matches · expires in 48 hours · skip to train the algorithm
                </p>
                {MATCHES.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
              </>
            ) : (
              <div className={styles.pausedBox}>
                <div className={styles.pausedEmoji}>⏸</div>
                <div className={styles.pausedTitle}>Matches paused</div>
                <div className={styles.pausedSub}>
                  Your conversations continue. Reactivate when you're ready.
                </div>
                <button className="btn btn-primary" onClick={() => setPaused(false)}>
                  Resume matches
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── JOURNEY ── */}
        {tab === 'journey' && (
          <div className={styles.tabContent}>
            <WeekStats stats={user.weekStats} />
            <Achievements achievements={ACHIEVEMENTS} />
            <ProfileCompletion pct={user.profileCompletion} />
            <PauseControl paused={paused} onToggle={() => setPaused(p => !p)} />
          </div>
        )}

      </div>
    </MobileShell>
  )
}
