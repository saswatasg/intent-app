'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MODULES } from '@/lib/modules'
import styles from './page.module.css'

const REQUIRED_MODULES = MODULES.filter(m => m.required).map(m => m.id)
const MIN_MODULES = 2

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

  return (
    <div className={styles.section}>
      {blocked ? (
        <div className={styles.softGate}>
          <div className={styles.gateEmoji}>🌱</div>
          <h2 className={styles.gateTitle}>Intent is built for meaningful connections</h2>
          <p className={styles.gateSub}>We&apos;d love to have you when you&apos;re ready for something real.</p>
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
            Continue to personality →
          </button>
        </>
      )}
    </div>
  )
}

// ── SECTION D: Module Picker ────────────────────────────────────────────────
function ModulePicker({ completedModules, onSelectModule }) {
  const completedCount = completedModules.length
  const canProceed = completedCount >= MIN_MODULES

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>🧠</div>
        <h2 className={styles.sectionTitle}>Your compatibility profile</h2>
        <p className={styles.sectionSub}>
          Complete at least <strong>2 modules</strong> to start matching. 
          The more you complete, the better your matches.
        </p>
      </div>

      {/* Progress indicator */}
      <div className={styles.moduleProgress}>
        <div className={styles.moduleProgressBar}>
          <div className={styles.moduleProgressFill} style={{ width: `${(completedCount / 6) * 100}%` }} />
        </div>
        <div className={styles.moduleProgressText}>
          <span>{completedCount}/6 modules completed</span>
          <span className={styles.moduleAccuracy}>
            {completedCount < 2 ? '—' : completedCount < 3 ? '~55%' : completedCount < 4 ? '~70%' : completedCount < 5 ? '~82%' : completedCount < 6 ? '~90%' : '95%+'} match accuracy
          </span>
        </div>
      </div>

      {/* Module cards */}
      <div className={styles.moduleGrid}>
        {MODULES.map(mod => {
          const done = completedModules.includes(mod.id)
          const isRequired = mod.required
          return (
            <button
              key={mod.id}
              className={`${styles.moduleCard} ${done ? styles.moduleCardDone : ''}`}
              style={{ '--mod-color': mod.color, '--mod-bg': mod.bgColor, '--mod-border': mod.borderColor }}
              onClick={() => !done && onSelectModule(mod.id)}
              disabled={done}
            >
              <div className={styles.moduleCardTop}>
                <span className={styles.moduleEmoji}>{done ? '✅' : mod.emoji}</span>
                {isRequired && !done && <span className={styles.requiredBadge}>Required</span>}
                {done && <span className={styles.doneBadge}>Done</span>}
              </div>
              <div className={styles.moduleTitle}>{mod.title}</div>
              <div className={styles.moduleDesc}>{mod.description}</div>
              <div className={styles.moduleQuestionCount}>5 questions · ~2 min</div>
            </button>
          )
        })}
      </div>

      {/* Shortcomings warning if only minimum */}
      {completedCount >= MIN_MODULES && completedCount < 6 && (
        <div className={styles.shortcomingsCard}>
          <div className={styles.shortcomingsIcon}>⚠️</div>
          <div className={styles.shortcomingsContent}>
            <div className={styles.shortcomingsTitle}>
              {6 - completedCount} module{6 - completedCount > 1 ? 's' : ''} remaining
            </div>
            <div className={styles.shortcomingsList}>
              {completedCount < 3 && <div className={styles.shortcomingItem}>• Only 2 matches per cycle (instead of 3)</div>}
              {completedCount < 4 && <div className={styles.shortcomingItem}>• No AI-generated icebreakers</div>}
              {completedCount < 5 && <div className={styles.shortcomingItem}>• Limited &quot;Why we matched&quot; insights</div>}
              {completedCount < 6 && <div className={styles.shortcomingItem}>• Missing the &quot;Complete Profile&quot; badge</div>}
            </div>
            <div className={styles.shortcomingsNote}>You can complete more modules anytime from your profile.</div>
          </div>
        </div>
      )}

      {canProceed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={() => onSelectModule('__done__')}>
            {completedCount >= 6 ? 'Enter Intent →' : `Enter Intent (${completedCount}/6 complete) →`}
          </button>
          {completedCount < 6 && (
            <div className={styles.skipNote}>You can answer more modules later from your profile</div>
          )}
        </div>
      )}

      {!canProceed && (
        <div className={styles.lockMessage}>
          <span className={styles.lockIcon}>🔒</span>
          Complete at least {MIN_MODULES - completedCount} more module{MIN_MODULES - completedCount > 1 ? 's' : ''} to unlock matching
        </div>
      )}
    </div>
  )
}

// ── SECTION E: Module Questionnaire ─────────────────────────────────────────
function ModuleQuestionnaire({ moduleId, onComplete, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})

  if (!mod) return null
  const q = mod.questions[currentQ]
  const totalQ = mod.questions.length
  const answered = answers[q.id] !== undefined

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [q.id]: value }))
  }

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(prev => prev + 1)
    } else {
      // Module complete
      onComplete(moduleId, answers)
    }
  }

  return (
    <div className={styles.section}>
      {/* Module header */}
      <div className={styles.moduleHeader}>
        <button className={styles.moduleBack} onClick={currentQ > 0 ? () => setCurrentQ(prev => prev - 1) : onBack}>←</button>
        <div className={styles.moduleHeaderInfo}>
          <span className={styles.moduleHeaderEmoji}>{mod.emoji}</span>
          <span className={styles.moduleHeaderTitle}>{mod.title}</span>
        </div>
        <span className={styles.moduleHeaderCount}>{currentQ + 1}/{totalQ}</span>
      </div>

      {/* Question progress */}
      <div className={styles.qProgressBar}>
        <div className={styles.qProgressFill} style={{ width: `${((currentQ + 1) / totalQ) * 100}%`, background: mod.color }} />
      </div>

      {/* Research basis */}
      <div className={styles.researchTag} style={{ borderColor: mod.borderColor, background: mod.bgColor }}>
        <span className={styles.researchIcon}>📚</span>
        <span>{mod.researchBasis}</span>
      </div>

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
              onChange={(val) => handleAnswer(val)}
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
                  onClick={() => handleAnswer(opt.trait)}
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
        {currentQ < totalQ - 1 ? 'Next →' : `Complete ${mod.title} ✓`}
      </button>
    </div>
  )
}

// ── MAIN ONBOARDING PAGE ────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1=auth, 2=identity, 3=intent, 4=modules, 5=answering
  const [data, setData] = useState({ photos: [] })
  const [completedModules, setCompletedModules] = useState([])
  const [allAnswers, setAllAnswers] = useState({})
  const [activeModuleId, setActiveModuleId] = useState(null)

  const handleSelectModule = (moduleId) => {
    if (moduleId === '__done__') {
      // Save to localStorage and go to home
      localStorage.setItem('intent_onboarded', 'true')
      localStorage.setItem('intent_completed_modules', JSON.stringify(completedModules))
      localStorage.setItem('intent_answers', JSON.stringify(allAnswers))
      router.push('/home')
      return
    }
    setActiveModuleId(moduleId)
    setStep(5)
  }

  const handleModuleComplete = (moduleId, answers) => {
    setCompletedModules(prev => [...prev, moduleId])
    setAllAnswers(prev => ({ ...prev, [moduleId]: answers }))
    setActiveModuleId(null)
    setStep(4)
  }

  const STEP_LABELS = ['Verify', 'Identity', 'Intent', 'Personality', 'Module']
  const totalSteps = step <= 3 ? 4 : (step === 4 ? 4 : 4)
  const displayStep = step <= 3 ? step : (step === 4 ? 4 : 4)

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
            {step > 1 && step !== 5 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>← Back</button>
            )}
          </div>
        </div>

        <ProgressBar
          step={displayStep}
          total={totalSteps}
          label={step <= 3 ? `Step ${step} of 4 · ${STEP_LABELS[step - 1]}` : `Step 4 of 4 · Personality`}
        />

        <div className={styles.body}>
          {step === 1 && <SectionAuth data={data} setData={setData} onNext={() => setStep(2)} />}
          {step === 2 && <SectionIdentity data={data} setData={setData} onNext={() => setStep(3)} />}
          {step === 3 && <SectionIntent data={data} setData={setData} onNext={() => setStep(4)} />}
          {step === 4 && <ModulePicker completedModules={completedModules} onSelectModule={handleSelectModule} />}
          {step === 5 && activeModuleId && (
            <ModuleQuestionnaire
              moduleId={activeModuleId}
              onComplete={handleModuleComplete}
              onBack={() => { setActiveModuleId(null); setStep(4) }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
