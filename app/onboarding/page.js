'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ONBOARDING_QUESTIONS_C, PROMPT_OPTIONS, CURRENT_USER } from '@/lib/mockData'
import styles from './page.module.css'

const SECTIONS = ['Identity', 'Intent', 'Personality', 'Lifestyle', 'Your Profile']
const TOTAL_STEPS = 5

function ProgressBar({ step, total }) {
  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${((step) / total) * 100}%` }} />
      </div>
      <div className={styles.progressLabel}>Section {step} of {total} · {SECTIONS[step - 1]}</div>
    </div>
  )
}

function SliderInput({ value, onChange, leftLabel, rightLabel }) {
  return (
    <div className={styles.sliderWrap}>
      <input type="range" min="0" max="100" value={value} onChange={e => onChange(Number(e.target.value))} className={styles.slider} />
      <div className={styles.sliderLabels}>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className={styles.sliderThumb}>
        <div className={styles.sliderDot} style={{ left: `${value}%` }} />
      </div>
    </div>
  )
}
// ── SECTION A: Phone Auth ────────────────────────────────────────────────────
function SectionAuth({ data, setData, onNext }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    // Simulate Supabase OTP for now since Twilio isn't configured
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handleVerify = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setData({ ...data, phone })
      onNext()
    }, 1000)
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
            <button className={`btn btn-primary btn-full`} style={{ marginTop: 24 }} onClick={handleSendOtp} disabled={phone.length < 10 || loading}>
              {loading ? 'Sending...' : 'Send code'}
            </button>
          </div>
        ) : (
          <div className={styles.field}>
            <label className={styles.label}>Enter the 6-digit code</label>
            <input className="input" type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="000000" maxLength={6} style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' }} />
            <button className={`btn btn-primary btn-full`} style={{ marginTop: 24 }} onClick={handleVerify} disabled={otp.length < 6 || loading}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── SECTION B: Identity ────────────────────────────────────────────────────
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

// ── SECTION C: Intent Gate ─────────────────────────────────────────────────
function SectionIntent({ data, setData, onDone }) {
  const INTENT_OPTIONS = [
    { value: 'long_term', label: 'A long-term relationship', emoji: '💚', allowed: true },
    { value: 'marriage', label: 'Marriage within 2–3 years', emoji: '💛', allowed: true },
    { value: 'casual', label: 'Something casual / just looking around', emoji: '🔴', allowed: false },
  ]

  const [blocked, setBlocked] = useState(false)

  const handleIntent = (opt) => {
    if (!opt.allowed) { setBlocked(true); return }
    setData({...data, intentLevel: opt.value})
    setBlocked(false)
  }

  const handleComplete = async () => {
    // In a real app, save to Supabase here
    localStorage.setItem('intent_onboarded', 'true');
    onDone()
  }

  return (
    <div className={styles.section}>
      {blocked ? (
        <div className={styles.softGate}>
          <div className={styles.gateEmoji}>🌱</div>
          <h2 className={styles.gateTitle}>Intent is built for meaningful connections</h2>
          <p className={styles.gateSub}>We&apos;d love to have you when you&apos;re ready for something real.</p>
          <button className={`btn btn-outline-sage btn-full`} onClick={() => setBlocked(false)}>← Go back</button>
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

          <button className={`btn btn-primary btn-full ${!data.intentLevel ? styles.btnDisabled : ''}`} onClick={handleComplete} disabled={!data.intentLevel} style={{ marginTop: 'auto' }}>
            Enter Intent →
          </button>
        </>
      )}
    </div>
  )
}


// ── MAIN ONBOARDING PAGE ───────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ photos: [] })

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
            <button className={`btn btn-ghost btn-sm`} style={{ padding: '6px 10px', fontSize: '0.7rem' }} onClick={() => {
              localStorage.setItem('intent_onboarded', 'true');
              router.push('/home');
            }}>Skip (Dev)</button>
            {step > 1 && (
              <button className={`btn btn-ghost btn-sm`} onClick={() => setStep(step - 1)}>← Back</button>
            )}
          </div>
        </div>

        <ProgressBar step={step} total={3} />

        <div className={styles.body}>
          {step === 1 && <SectionAuth data={data} setData={setData} onNext={() => setStep(2)} />}
          {step === 2 && <SectionIdentity data={data} setData={setData} onNext={() => setStep(3)} />}
          {step === 3 && <SectionIntent data={data} setData={setData} onDone={() => router.push('/home')} />}
        </div>
      </div>
    </div>
  )
}
