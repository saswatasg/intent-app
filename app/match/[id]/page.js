'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { MATCHES } from '@/lib/mockData'
import styles from './page.module.css'

const MATCH_TO_CONV = {
  match_001: 'conv_001',
  match_002: 'conv_002',
  match_003: 'conv_003',
}

function AnimatedScoreRing({ score, size = 80 }) {
  const [displayed, setDisplayed] = useState(0)
  const r = (size - 8) / 2, circ = 2 * Math.PI * r

  useEffect(() => {
    let raf
    const start = performance.now()
    const run = (now) => {
      const p = Math.min((now - start) / 1200, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(Math.round(eased * score))
      if (p < 1) raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <svg width={size} height={size} style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--coral)" strokeWidth={4}
        strokeDasharray={+circ.toFixed(3)}
        strokeDashoffset={+(circ - (displayed / 100) * circ).toFixed(3)}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central"
        fill="var(--text-primary)" fontSize="17" fontWeight="700">{displayed}%</text>
      <text x="50%" y="66%" textAnchor="middle" dominantBaseline="central"
        fill="var(--text-muted)" fontSize="7" letterSpacing="1" fontWeight="500">MATCH</text>
    </svg>
  )
}

function BreakdownBars({ breakdown }) {
  const [animate, setAnimate] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimate(true), 600); return () => clearTimeout(t) }, [])
  const dims = [
    { label: 'Values',        key: 'values',        color: 'var(--sage)' },
    { label: 'Emotional',     key: 'emotional',     color: 'var(--coral-light)' },
    { label: 'Lifestyle',     key: 'lifestyle',     color: 'var(--gold)' },
    { label: 'Intent',        key: 'intent',        color: 'var(--sage-light)' },
    { label: 'Communication', key: 'communication', color: 'var(--text-muted)' },
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
          <span className={styles.bdPct}>{breakdown[d.key]}</span>
        </div>
      ))}
    </div>
  )
}

export default function MatchRevealPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const match = MATCHES.find(m => m.id === id) || MATCHES[0]
  const convId = MATCH_TO_CONV[match.id]

  const [photoRevealed, setPhotoRevealed] = useState(false)
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    setPhotoRevealed(true)
    setConnecting(true)
    setTimeout(() => router.push(`/chat/${convId}`), 800)
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Back */}
        <button className={styles.backBtn} onClick={() => router.push('/home')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Hero Photo */}
        <div className={styles.photoHero}>
          <Image src={match.photo} alt={match.name} fill
            style={{
              objectFit: 'cover', objectPosition: 'top',
              filter: photoRevealed ? 'none' : 'blur(18px) brightness(0.5)',
              transition: 'filter 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            sizes="430px" priority />
          <div className={styles.heroGradient} />
          <div className={styles.scoreFloat}>
            <AnimatedScoreRing score={match.totalScore} size={80} />
          </div>
          {!photoRevealed && (
            <div className={styles.blurHint}>Photo reveals when you connect</div>
          )}
          <div className={styles.heroName}>
            <h1 className={styles.name}>{match.name}, {match.age}</h1>
            <div className={styles.nameSub}>{match.city} · {match.profession}</div>
          </div>
        </div>

        {/* Chips */}
        <div className={styles.chipRow}>
          {match.verified && (
            <span className="chip chip-sage" style={{ fontSize: '0.75rem' }}>
              {match.verified === 'id' ? 'ID Verified' : 'Verified'}
            </span>
          )}
          <span className={`chip ${match.intentLevel === 'marriage' ? 'chip-gold' : ''}`} style={{ fontSize: '0.75rem' }}>
            {match.intentLevel === 'long_term' ? 'Long-term' : match.intentLevel === 'marriage' ? 'Marriage-minded' : 'Exploring'}
          </span>
        </div>

        {/* Analysis */}
        <div className={styles.analysisCard}>
          <div className={styles.analysisTitle}>What makes this work</div>
          <p className={styles.analysisText}>
            Based on your responses across Core Values, Emotional Style, and Communication — {match.explanation}
          </p>
        </div>

        {/* Breakdown */}
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

        {/* Actions */}
        <div className={styles.actions}>
          {connecting ? (
            <div className={styles.connectingMsg}>Opening conversation...</div>
          ) : (
            <>
              <button className="btn btn-primary btn-full btn-lg" onClick={handleConnect}>
                Start a conversation
              </button>
              <button className={styles.passBtn} onClick={() => router.push('/home')}>
                Not for me
              </button>
            </>
          )}
        </div>
      </div>
    </MobileShell>
  )
}
