'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import MobileShell from '@/components/layout/MobileShell'
import { MATCHES } from '@/lib/mockData'
import styles from './page.module.css'

// Map each match to its conversation ID
const MATCH_TO_CONV = {
  match_001: 'conv_001',
  match_002: 'conv_002',
  match_003: 'conv_003',
}

function AnimatedScoreRing({ score, size = 96 }) {
  const [displayed, setDisplayed] = useState(0)
  const r = (size - 10) / 2, circ = 2 * Math.PI * r
  const color = score >= 80 ? 'var(--sage)' : score >= 70 ? 'var(--gold)' : 'var(--blush)'

  useEffect(() => {
    let raf
    const start = performance.now()
    const run = (now) => {
      const p = Math.min((now - start) / 1300, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(Math.round(eased * score))
      if (p < 1) raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <svg width={size} height={size} style={{ filter: `drop-shadow(0 0 14px ${color}55)` }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={7} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
        strokeDasharray={+circ.toFixed(3)}
        strokeDashoffset={+(circ - (displayed / 100) * circ).toFixed(3)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="20" fontWeight="800">{displayed}%</text>
      <text x="50%" y="68%" textAnchor="middle" dominantBaseline="central"
        fill="rgba(255,255,255,0.4)" fontSize="8" letterSpacing="1">MATCH</text>
    </svg>
  )
}

function TypewriterText({ text, delay = 500 }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    let iv
    const t = setTimeout(() => {
      let i = 0
      iv = setInterval(() => {
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, 16)
    }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, delay])
  return <span>{shown}<span className={styles.cursor}>|</span></span>
}

function BreakdownBars({ breakdown }) {
  const [animate, setAnimate] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 700); return () => clearTimeout(t) }, [])
  const dims = [
    { label: 'Values',        key: 'values',        color: 'var(--sage)' },
    { label: 'Emotional',     key: 'emotional',     color: 'var(--blush-light)' },
    { label: 'Lifestyle',     key: 'lifestyle',     color: 'var(--gold)' },
    { label: 'Intent',        key: 'intent',        color: 'var(--sage-light)' },
    { label: 'Communication', key: 'communication', color: 'var(--muted)' },
  ]
  return (
    <div className={styles.breakdown}>
      <div className={styles.sLabel}>Compatibility breakdown</div>
      {dims.map(d => (
        <div key={d.key} className={styles.bdRow}>
          <span className={styles.bdLabel}>{d.label}</span>
          <div className={styles.bdTrack}>
            <div className={styles.bdFill} style={{ width: animate ? `${breakdown[d.key]}%` : '0%', background: d.color }} />
          </div>
          <span className={styles.bdPct} style={{ color: d.color }}>{breakdown[d.key]}</span>
        </div>
      ))}
    </div>
  )
}

const SKIP_REASONS = ["Not what I'm looking for", "Didn't feel the compatibility",
  "Profile felt incomplete", "Already in a good conversation", "Other"]

export default function MatchRevealPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const match = MATCHES.find(m => m.id === id) || MATCHES[0]
  const convId = MATCH_TO_CONV[match.id]

  const [photoRevealed, setPhotoRevealed] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [skipping, setSkipping] = useState(false)

  const handleConnect = () => {
    setPhotoRevealed(true)
    setConnecting(true)
    setTimeout(() => router.push(`/chat/${convId}`), 800)
  }

  const handleSkip = () => {
    router.push('/home')
  }

  return (
    <MobileShell>
      <div className={styles.page}>

        {/* Back button — absolute over photo */}
        <button className={styles.backBtn} onClick={() => router.push('/home')}>
          ← Back
        </button>

        {/* FULL-BLEED PHOTO HERO */}
        <div className={styles.photoHero}>
          <Image src={match.photo} alt={match.name} fill
            style={{
              objectFit: 'cover', objectPosition: 'top',
              transform: photoRevealed ? 'scale(1)' : 'scale(1.06)',
              filter: photoRevealed ? 'none' : 'blur(22px) brightness(0.55)',
              transition: 'filter 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            sizes="390px" priority />

          <div className={styles.heroGradient} />

          {/* Floating score ring */}
          <div className={styles.scoreFloat}>
            <AnimatedScoreRing score={match.totalScore} size={90} />
          </div>

          {/* Verify */}
          <div className={styles.verifyFloat}>
            <span className={match.verified === 'id' ? styles.badgeGold : styles.badgeSage}>
              {match.verified === 'id' ? '🛡 ID Verified' : '✓ Verified'}
            </span>
          </div>

          {/* Blur hint */}
          {!photoRevealed && (
            <div className={styles.blurHint}>
              🔒 Photo reveals when you connect
            </div>
          )}

          {/* Name */}
          <div className={styles.heroName}>
            <h1 className={styles.name}>{match.name}, {match.age}</h1>
            <div className={styles.nameSub}>{match.city} · {match.profession}</div>
          </div>
        </div>

        {/* Intent chip row */}
        <div className={styles.intentRow}>
          <span className={`chip ${match.intentLevel === 'marriage' ? 'chip-gold' : 'chip-sage'}`}
            style={{ fontSize: '0.6875rem' }}>
            {match.intentLevel === 'long_term' ? '💚 Long-term'
              : match.intentLevel === 'marriage' ? '💛 Marriage-minded'
              : '🔵 Exploring seriously'}
          </span>
          <span className={styles.modeChip}>Serious mode</span>
        </div>

        {/* AI Explanation */}
        <div className={styles.explanationCard}>
          <div className={styles.explanationLabel}>Why we matched you</div>
          <p className={styles.explanationText}>
            <TypewriterText text={match.explanation} delay={300} />
          </p>
        </div>

        {/* Insights */}
        <div className={styles.insightsList}>
          {match.insights.map((ins, i) => (
            <div key={i} className={styles.insightRow}>
              <span className={styles.insightDot} />
              <span>{ins}</span>
            </div>
          ))}
        </div>

        {/* Breakdown bars */}
        <BreakdownBars breakdown={match.breakdown} />

        {/* Prompts */}
        <div className={styles.promptsSection}>
          <div className={styles.sLabel}>From {match.name}</div>
          {match.prompts.map((p, i) => (
            <div key={i} className={styles.promptCard}>
              <div className={styles.promptQ}>{p.q}</div>
              <div className={styles.promptA}>"{p.a}"</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={styles.actions}>
          {connecting ? (
            <div className={styles.connectingMsg}>✓ Opening conversation…</div>
          ) : (
            <>
              <button className="btn btn-primary btn-full btn-lg" onClick={handleConnect} style={{ boxShadow: '0 8px 24px rgba(123, 163, 140, 0.4)' }}>
                🟢 Start conversation
              </button>
              <button className="btn btn-ghost btn-full" onClick={() => setSkipping(true)} style={{ marginTop: '8px', opacity: 0.7 }}>
                Pass — not the right fit
              </button>
            </>
          )}
        </div>

        {/* Skip modal */}
        {skipping && (
          <div className={styles.overlay} onClick={() => setSkipping(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHandle} />
              <div className={styles.modalTitle}>Why passing?</div>
              <div className={styles.modalSub}>Helps calibrate your next cycle</div>
              {SKIP_REASONS.map((r, i) => (
                <button key={i} className={styles.modalOption}
                  onClick={handleSkip}>{r}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  )
}
