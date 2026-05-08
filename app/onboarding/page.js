'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ENTRY_MODULE } from '@/lib/modules'
import styles from './page.module.css'

// ── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ step, total, label }) {
  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <div className={styles.progressLabel}>{label}</div>
    </div>
  )
}

// ── Slider Input ────────────────────────────────────────────────────────────
function SliderInput({ value, onChange, leftLabel, rightLabel }) {
  return (
    <div className={styles.sliderWrap}>
      <input type="range" min="0" max="100" value={value} onChange={e => onChange(Number(e.target.value))} className={styles.slider} />
      <div className={styles.sliderLabels}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

// ── SECTION A: Phone Auth ───────────────────────────────────────────────────
function SectionAuth({ data, setData, onNext }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('otp') }, 1000)
  }
  const handleVerify = async () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setData({ ...data, phone }); onNext() }, 1000)
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>🔐</div>
        <h2 className={styles.sectionTitle}>Your intentional space</h2>
        <p className={styles.sectionSub}>We verify everyone to maintain a high-intent, safe community.</p>
      </div>
      <div className={styles.formGrid}>
        {step === 'phone' ? (
          <div className={styles.field}>
            <label className={styles.label}>Phone number</label>
            <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            <button className="btn btn-primary btn-full" style={{ marginTop: 24 }} onClick={handleSendOtp} disabled={phone.length < 10 || loading}>
              {loading ? 'Sending...' : 'Send code'}
            </button>
          </div>
        ) : (
          <div className={styles.field}>
            <label className={styles.label}>Enter the 6-digit code</label>
            <input className="input" type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="000000" maxLength={6} style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' }} />
            <button className="btn btn-primary btn-full" style={{ marginTop: 24 }} onClick={handleVerify} disabled={otp.length < 6 || loading}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── SECTION B: Identity ─────────────────────────────────────────────────────
function SectionIdentity({ data, setData, onNext }) {
  const complete = data.name && data.gender && data.location
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>👤</div>
        <h2 className={styles.sectionTitle}>Let&apos;s start with the basics</h2>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label}>Your first name</label>
          <input className="input" value={data.name || ''} onChange={e => setData({...data, name: e.target.value})} placeholder="Arjun" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>I identify as</label>
          <div className={styles.optionRow}>
            {['Man', 'Woman', 'Non-binary'].map(g => (
              <button key={g} className={`${styles.optionBtn} ${data.gender === g ? styles.optionBtnActive : ''}`} onClick={() => setData({...data, gender: g})}>{g}</button>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>City</label>
          <div className={styles.optionRow}>
            {['Bangalore', 'Mumbai', 'Delhi', 'Pune'].map(c => (
              <button key={c} className={`${styles.optionBtn} ${data.location === c ? styles.optionBtnActive : ''}`} onClick={() => setData({...data, location: c})}>{c}</button>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Photo <span className={styles.note}>(Just 1 for now)</span></label>
          <div className={styles.photoGrid}>
            <div className={`${styles.photoSlot} ${data.photos?.length ? styles.photoSlotFilled : ''}`} onClick={() => setData({...data, photos: [1]})}>
              {data.photos?.length ? <span>📷</span> : <span className={styles.photoAdd}>+</span>}
            </div>
          </div>
        </div>
      </div>
      <button className={`btn btn-primary btn-full ${!complete ? styles.btnDisabled : ''}`} onClick={onNext} disabled={!complete}>
        Continue →
      </button>
    </div>
  )
}

// ── SECTION C: Intent Gate ──────────────────────────────────────────────────
function SectionIntent({ data, setData, onNext }) {
  const INTENT_OPTIONS = [
    { value: 'long_term', label: 'I want a serious relationship', emoji: '💚', allowed: true },
    { value: 'marriage', label: "I'm ready for marriage in the next 2-3 years", emoji: '💛', allowed: true },
    { value: 'casual', label: 'Something casual / just looking around', emoji: '🔴', allowed: false },
  ]
  const [blocked, setBlocked] = useState(false)

  const handleIntent = (opt) => {
    if (!opt.allowed) { setBlocked(true); return }
    setData({...data, intentLevel: opt.value})
    setBlocked(false)
  }

  return (
    <div className={styles.section}>
      {blocked ? (
        <div className={styles.softGate}>
          <div className={styles.gateEmoji}>🌱</div>
          <h2 className={styles.gateTitle}>Built for intent</h2>
          <p className={styles.gateSub}>Intent isn't built for casual. We respect that you might be there now — come back when you're ready for something real. We'll be here.</p>
          <button className="btn btn-outline-sage btn-full" onClick={() => setBlocked(false)}>← Go back</button>
        </div>
      ) : (
        <>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEmoji}>🎯</div>
            <h2 className={styles.sectionTitle}>What are you looking for?</h2>
            <p className={styles.sectionSub}>This gates who you&apos;ll see and who sees you.</p>
          </div>
          <div className={styles.intentOptions}>
            {INTENT_OPTIONS.map(opt => (
              <button key={opt.value} className={`${styles.intentOption} ${data.intentLevel === opt.value ? styles.intentOptionActive : ''} ${!opt.allowed ? styles.intentOptionCasual : ''}`} onClick={() => handleIntent(opt)}>
                <span className={styles.intentEmoji}>{opt.emoji}</span>
                <span className={styles.intentLabel}>{opt.label}</span>
                {data.intentLevel === opt.value && <span className={styles.intentCheck}>✓</span>}
              </button>
            ))}
          </div>
          <button className={`btn btn-primary btn-full ${!data.intentLevel ? styles.btnDisabled : ''}`} onClick={onNext} disabled={!data.intentLevel} style={{ marginTop: 'auto' }}>
            Almost there — 5 quick questions →
          </button>
        </>
      )}
    </div>
  )
}

// ── SECTION D: Quick Start (Entry Module) ───────────────────────────────────
function QuickStartModule({ onComplete }) {
  const mod = ENTRY_MODULE
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})

  const q = mod.questions[currentQ]
  const totalQ = mod.questions.length
  const answered = answers[q.id] !== undefined

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1)
    } else {
      onComplete(mod.id, answers)
    }
  }

  return (
    <div className={styles.section}>
      {/* Quick Start header */}
      <div className={styles.quickStartHeader}>
        <div className={styles.quickStartBadge}>⚡ Quick Start</div>
        <div className={styles.quickStartCount}>{currentQ + 1} of {totalQ}</div>
      </div>

      {/* Question progress dots */}
      <div className={styles.qDots}>
        {mod.questions.map((_, i) => (
          <div key={i} className={`${styles.qDot} ${i < currentQ ? styles.qDotDone : ''} ${i === currentQ ? styles.qDotActive : ''}`} />
        ))}
      </div>

      {/* Intro text on first question */}
      {currentQ === 0 && (
        <div className={styles.quickStartIntro} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--warm-white)' }}>Five quick questions to set the foundation. We'll build from here.</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>Your matches get sharper as you do.</div>
        </div>
      )}

      {/* Question card */}
      <div className={styles.questionCard} key={q.id}>
        <div className={styles.questionType}>
          {q.type === 'scenario' ? '🎭 Scenario' : q.type === 'slider' ? '📊 Spectrum' : '📋 Choose one'}
        </div>
        <h3 className={styles.questionText}>{q.question}</h3>

        {q.type === 'slider' ? (
          <div style={{ marginTop: 20 }}>
            <SliderInput
              value={answers[q.id] ?? 50}
              onChange={(val) => setAnswers(prev => ({...prev, [q.id]: val}))}
              leftLabel={q.leftLabel}
              rightLabel={q.rightLabel}
            />
          </div>
        ) : (
          <div className={styles.answerOptions}>
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i)
              const isSelected = answers[q.id] === opt.trait
              return (
                <button
                  key={i}
                  className={`${styles.answerOption} ${isSelected ? styles.answerOptionActive : ''}`}
                  onClick={() => setAnswers(prev => ({...prev, [q.id]: opt.trait}))}
                >
                  <span className={styles.answerLetter}>{letter}</span>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Next button */}
      <button
        className={`btn btn-primary btn-full ${!answered && q.type !== 'slider' ? styles.btnDisabled : ''}`}
        onClick={handleNext}
        disabled={!answered && q.type !== 'slider'}
        style={{ marginTop: 'auto' }}
      >
        {currentQ < totalQ - 1 ? 'Next →' : "Start matching ✓"}
      </button>
    </div>
  )
}

// ── MAIN ONBOARDING PAGE ────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1=auth, 2=identity, 3=intent, 4=quick-start
  const [data, setData] = useState({ photos: [] })

  // Capture referral code if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      if (refCode) {
        localStorage.setItem('intent_referred_by', refCode);
      }
    }
  }, []);

  const handleEntryComplete = (moduleId, answers) => {
    // Save entry module completion and go straight to home
    localStorage.setItem('intent_onboarded', 'true')
    localStorage.setItem('intent_completed_modules', JSON.stringify([moduleId]))
    localStorage.setItem('intent_answers', JSON.stringify({ [moduleId]: answers }))
    router.push('/home')
  }

  const STEP_LABELS = ['Verify', 'Identity', 'Intent', 'Quick Start']

  return (
    <div className={styles.page}>
      <div className={styles.phoneBg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
      </div>

      <div className={styles.phone}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topLogo}>
            <span className={styles.logoMark}>◈</span>
            <span>intent</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="btn btn-ghost btn-sm" style={{ padding: '6px 10px', fontSize: '0.7rem' }} onClick={() => {
              localStorage.setItem('intent_onboarded', 'true');
              router.push('/home');
            }}>Skip (Dev)</button>
            {step > 1 && step < 4 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>← Back</button>
            )}
          </div>
        </div>

        <ProgressBar
          step={step}
          total={4}
          label={`Step ${step} of 4 · ${STEP_LABELS[step - 1]}`}
        />

        <div className={styles.body}>
          {step === 1 && <SectionAuth data={data} setData={setData} onNext={() => setStep(2)} />}
          {step === 2 && <SectionIdentity data={data} setData={setData} onNext={() => setStep(3)} />}
          {step === 3 && <SectionIntent data={data} setData={setData} onNext={() => setStep(4)} />}
          {step === 4 && <QuickStartModule onComplete={handleEntryComplete} />}
        </div>
      </div>
    </div>
  )
}
