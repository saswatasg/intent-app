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

// ── SECTION A: Identity ────────────────────────────────────────────────────
function SectionA({ data, setData, onNext }) {
  const complete = data.name && data.dob && data.gender && data.location

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>👤</div>
        <h2 className={styles.sectionTitle}>Let&apos;s start with the basics</h2>
        <p className={styles.sectionSub}>This helps us find people in your area who are looking for the same thing.</p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label}>Your first name</label>
          <input className="input" value={data.name || ''} onChange={e => setData({...data, name: e.target.value})} placeholder="Arjun" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Date of birth <span className={styles.note}>(21+ only)</span></label>
          <input className="input" type="date" value={data.dob || ''} onChange={e => setData({...data, dob: e.target.value})} max="2005-01-01" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>I identify as</label>
          <div className={styles.optionRow}>
            {['Man', 'Woman', 'Non-binary', 'Prefer to self-describe'].map(g => (
              <button key={g} className={`${styles.optionBtn} ${data.gender === g ? styles.optionBtnActive : ''}`} onClick={() => setData({...data, gender: g})}>{g}</button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>My orientation</label>
          <div className={styles.optionRow}>
            {['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Queer', 'Prefer not to say'].map(o => (
              <button key={o} className={`${styles.optionBtn} ${data.orientation === o ? styles.optionBtnActive : ''}`} onClick={() => setData({...data, orientation: o})}>{o}</button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>City</label>
          <div className={styles.optionRow}>
            {['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Other'].map(c => (
              <button key={c} className={`${styles.optionBtn} ${data.location === c ? styles.optionBtnActive : ''}`} onClick={() => setData({...data, location: c})}>{c}</button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Photos <span className={styles.note}>(min. 3)</span></label>
          <div className={styles.photoGrid}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className={`${styles.photoSlot} ${i < (data.photos?.length || 0) ? styles.photoSlotFilled : ''}`}>
                {i < (data.photos?.length || 0) ? <span>📷</span> : <span className={styles.photoAdd}>+</span>}
              </div>
            ))}
          </div>
          <div className={styles.photoNote}>At least 1 clear face photo. We&apos;ll verify later.</div>
          <button className={styles.simulatePhotos} onClick={() => setData({...data, photos: [1,2,3]})}>
            ✓ Simulate adding 3 photos
          </button>
        </div>
      </div>

      <button className={`btn btn-primary btn-full ${!complete ? styles.btnDisabled : ''}`} onClick={onNext} disabled={!complete}>
        Continue →
      </button>
    </div>
  )
}

// ── SECTION B: Intent Gate ─────────────────────────────────────────────────
function SectionB({ data, setData, onNext }) {
  const INTENT_OPTIONS = [
    { value: 'long_term', label: 'A long-term relationship', emoji: '💚', allowed: true },
    { value: 'marriage', label: 'Marriage within 2–3 years', emoji: '💛', allowed: true },
    { value: 'exploring_seriously', label: 'Exploring seriously — open to where it goes', emoji: '🔵', allowed: true },
    { value: 'casual', label: 'Something casual / just looking around', emoji: '🔴', allowed: false },
  ]

  const TIMELINE = [
    'Within the first week of matching',
    'Within the first month',
    'I prefer to take it slow online first',
    'Depends on the connection',
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
          <p className={styles.gateSub}>We&apos;d love to have you when you&apos;re ready for something real. For now, here are some apps that might fit better:</p>
          <div className={styles.altApps}>
            <div className={styles.altApp}>Hinge</div>
            <div className={styles.altApp}>Bumble</div>
            <div className={styles.altApp}>Tinder</div>
          </div>
          <button className={`btn btn-outline-sage btn-full`} onClick={() => setBlocked(false)}>← Go back</button>
        </div>
      ) : (
        <>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEmoji}>🎯</div>
            <h2 className={styles.sectionTitle}>What are you looking for?</h2>
            <p className={styles.sectionSub}>This gates who you&apos;ll see and who sees you. Your honesty improves everyone&apos;s experience.</p>
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

          {data.intentLevel && (
            <div className={styles.timelineSection}>
              <label className={styles.label}>How soon are you open to meeting someone in person?</label>
              <div className={styles.formGrid}>
                {TIMELINE.map(t => (
                  <button key={t} className={`${styles.timelineOption} ${data.timeline === t ? styles.timelineOptionActive : ''}`} onClick={() => setData({...data, timeline: t})}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className={`btn btn-primary btn-full ${!data.intentLevel || !data.timeline ? styles.btnDisabled : ''}`} onClick={onNext} disabled={!data.intentLevel || !data.timeline} style={{ marginTop: 'auto' }}>
            Continue →
          </button>
        </>
      )}
    </div>
  )
}

// ── SECTION C: Personality Assessment ─────────────────────────────────────
function SectionC({ data, setData, onNext }) {
  const [qIndex, setQIndex] = useState(0)
  const q = ONBOARDING_QUESTIONS_C[qIndex]
  const answers = data.answers || {}
  const current = answers[q.id]
  const total = ONBOARDING_QUESTIONS_C.length
  const answered = Object.keys(answers).length

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [q.id]: val }
    setData({ ...data, answers: newAnswers })
    if (qIndex < total - 1) {
      setTimeout(() => setQIndex(qIndex + 1), 300)
    }
  }

  const DIM_COLORS = { values: 'var(--sage)', emotional: 'var(--blush)', lifestyle: 'var(--gold)', communication: 'var(--sage-light)', intent: 'var(--gold-light)' }

  return (
    <div className={styles.section}>
      <div className={styles.assessmentHeader}>
        <div className={styles.assessProgress}>
          <div className={styles.assessProgressBar}>
            <div className={styles.assessProgressFill} style={{ width: `${(answered / total) * 100}%` }} />
          </div>
          <span className={styles.assessCount}>{answered}/{total}</span>
        </div>
        <div className={styles.dimBadge} style={{ borderColor: DIM_COLORS[q.dim], color: DIM_COLORS[q.dim] }}>
          {q.dimLabel}
        </div>
      </div>

      <div className={styles.questionCard} key={q.id}>
        <div className={styles.questionType}>{q.type === 'scenario' ? '📖 Scenario' : q.type === 'slider' ? '🎚 Scale' : '⚪ Choose one'}</div>
        <h3 className={styles.questionText}>{q.question}</h3>

        {(q.type === 'mcq' || q.type === 'scenario') && (
          <div className={styles.answerOptions}>
            {q.options.map((opt, i) => (
              <button key={i} className={`${styles.answerOption} ${current === opt ? styles.answerOptionActive : ''}`} onClick={() => handleAnswer(opt)}>
                <span className={styles.answerLetter}>{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        )}

        {q.type === 'slider' && (
          <div style={{ marginTop: 24 }}>
            <SliderInput
              value={current ?? 50}
              onChange={(v) => setData({ ...data, answers: { ...answers, [q.id]: v } })}
              leftLabel={q.leftLabel}
              rightLabel={q.rightLabel}
            />
            {current !== undefined && (
              <button className={`btn btn-primary btn-full`} style={{ marginTop: 24 }} onClick={() => qIndex < total - 1 ? setQIndex(qIndex + 1) : null}>
                Next →
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.navRow}>
        {qIndex > 0 && <button className={`btn btn-ghost btn-sm`} onClick={() => setQIndex(qIndex - 1)}>← Back</button>}
        <div style={{ flex: 1 }} />
        {answered >= total && <button className={`btn btn-primary`} onClick={onNext}>Complete Assessment →</button>}
        {qIndex < total - 1 && <span className="text-muted text-sm">{qIndex + 1} of {total}</span>}
      </div>
    </div>
  )
}

// ── SECTION D: Lifestyle & Dealbreakers ───────────────────────────────────
function SectionD({ data, setData, onNext }) {
  const LIFESTYLE = {
    'Smoking': ['Never', 'Socially', 'Regularly'],
    'Drinking': ['Never', 'Socially', 'Regularly'],
    'Diet': ['No preference', 'Vegetarian', 'Vegan', 'Non-veg', 'Jain'],
    'Pets': ['Love them', 'Allergic', 'No preference'],
    'Religion': ['Specific faith', 'Spiritual', 'Not religious', 'Prefer not to say'],
  }

  const DEALBREAKERS = ['Smoking (regular smoker)', 'Long-distance (different city)', 'Different religion', "Doesn't want children", 'Significant age gap (> 10 years)', 'Non-vegetarian']

  const lp = data.lifestyle || {}
  const db = data.dealbreakers || []

  const toggleDB = (d) => {
    const newDB = db.includes(d) ? db.filter(x => x !== d) : [...db, d]
    setData({ ...data, dealbreakers: newDB })
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>🌿</div>
        <h2 className={styles.sectionTitle}>Lifestyle & dealbreakers</h2>
        <p className={styles.sectionSub}>Soft preferences shape your matches. Dealbreakers eliminate incompatible profiles entirely.</p>
      </div>

      <div className={styles.lifestyleGrid}>
        {Object.entries(LIFESTYLE).map(([cat, opts]) => (
          <div key={cat} className={styles.lifestyleRow}>
            <label className={styles.label}>{cat}</label>
            <div className={styles.optionRow}>
              {opts.map(o => (
                <button key={o} className={`${styles.optionBtn} ${lp[cat] === o ? styles.optionBtnActive : ''}`} onClick={() => setData({ ...data, lifestyle: { ...lp, [cat]: o } })}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Dealbreakers <span className={styles.note}>(hard filters — zero tolerance)</span></label>
        <div className={styles.dbGrid}>
          {DEALBREAKERS.map(d => (
            <button key={d} className={`${styles.dbItem} ${db.includes(d) ? styles.dbItemActive : ''}`} onClick={() => toggleDB(d)}>
              <span className={styles.dbCheck}>{db.includes(d) ? '✗' : '○'}</span>
              <span>{d}</span>
            </button>
          ))}
        </div>
      </div>

      <button className={`btn btn-primary btn-full`} onClick={onNext}>
        Almost there →
      </button>
    </div>
  )
}

// ── SECTION E: Profile Prompts ─────────────────────────────────────────────
function SectionE({ data, setData, onNext }) {
  const prompts = data.prompts || []
  const [activePrompt, setActivePrompt] = useState(null)
  const [text, setText] = useState('')

  const addPrompt = (q) => {
    if (activePrompt) return
    setActivePrompt(q)
    setText('')
  }

  const savePrompt = () => {
    if (!text.trim()) return
    setData({ ...data, prompts: [...prompts, { q: activePrompt, a: text }] })
    setActivePrompt(null)
    setText('')
  }

  const removePrompt = (i) => {
    setData({ ...data, prompts: prompts.filter((_, idx) => idx !== i) })
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionEmoji}>✍️</div>
        <h2 className={styles.sectionTitle}>Tell your story</h2>
        <p className={styles.sectionSub}>Choose 3 prompts and answer them honestly. This is what people connect with — not just your photos.</p>
      </div>

      {/* Saved prompts */}
      {prompts.length > 0 && (
        <div className={styles.savedPrompts}>
          {prompts.map((p, i) => (
            <div key={i} className={styles.promptCard}>
              <div className={styles.promptQ}>{p.q}</div>
              <div className={styles.promptA}>&ldquo;{p.a}&rdquo;</div>
              <button className={styles.promptRemove} onClick={() => removePrompt(i)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Active prompt editor */}
      {activePrompt && (
        <div className={styles.promptEditor}>
          <div className={styles.promptEditQ}>{activePrompt}</div>
          <textarea className={`input ${styles.promptTextarea}`} value={text} onChange={e => setText(e.target.value)} placeholder="Write something genuine..." rows={3} maxLength={200} />
          <div className={styles.promptEditorActions}>
            <span className={styles.charCount}>{text.length}/200</span>
            <button className={`btn btn-primary btn-sm`} onClick={savePrompt} disabled={!text.trim()}>Save</button>
            <button className={`btn btn-ghost btn-sm`} onClick={() => setActivePrompt(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Prompt picker */}
      {prompts.length < 3 && !activePrompt && (
        <div className={styles.promptPicker}>
          <div className={styles.promptPickerLabel}>Choose a prompt ({3 - prompts.length} more needed):</div>
          <div className={styles.promptList}>
            {PROMPT_OPTIONS.filter(p => !prompts.find(sp => sp.q === p)).map((p, i) => (
              <button key={i} className={styles.promptPickItem} onClick={() => addPrompt(p)}>
                <span>💬</span>
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button className={`btn btn-primary btn-full`} onClick={onNext} disabled={prompts.length < 3} style={{ marginTop: 'auto', opacity: prompts.length < 3 ? 0.5 : 1 }}>
        Build my profile →
      </button>
    </div>
  )
}

// ── PERSONALITY SUMMARY ────────────────────────────────────────────────────
function PersonalitySummary({ data, onDone }) {
  const ps = CURRENT_USER.personalitySnapshot

  return (
    <div className={styles.summaryPage}>
      <div className={styles.summaryBg}>
        <div className={styles.summaryOrb1} />
        <div className={styles.summaryOrb2} />
      </div>
      <div className={styles.summaryContent}>
        <div className={styles.summaryDone}>✨</div>
        <h2 className={styles.summaryTitle}>Your compatibility profile is ready</h2>
        <div className={styles.summaryCard}>
          <p className={styles.summaryText}>&ldquo;{ps.summary}&rdquo;</p>
          <div className={styles.summaryTraits}>
            {ps.traits.map(t => <span key={t} className="chip chip-sage">{t}</span>)}
          </div>
          <div className={styles.summaryMeta}>
            <div className={styles.summaryMetaItem}>
              <span className={styles.summaryMetaLabel}>Attachment style</span>
              <span className={styles.summaryMetaValue}>{ps.attachmentStyle}</span>
            </div>
            <div className={styles.summaryMetaItem}>
              <span className={styles.summaryMetaLabel}>Conflict style</span>
              <span className={styles.summaryMetaValue}>{ps.conflictStyle}</span>
            </div>
            <div className={styles.summaryMetaItem}>
              <span className={styles.summaryMetaLabel}>Love language</span>
              <span className={styles.summaryMetaValue}>{ps.loveLanguage}</span>
            </div>
          </div>
        </div>
        <div className={styles.summaryDelivery}>
          <div className={styles.deliveryIcon}>🎯</div>
          <div>
            <div className={styles.deliveryTitle}>Your first 3 matches arrive at</div>
            <div className={styles.deliveryTime}>8:00 PM tonight</div>
          </div>
        </div>
        <button className={`btn btn-primary btn-full btn-lg`} onClick={onDone}>
          Go to my matches →
        </button>
      </div>
    </div>
  )
}

// ── MAIN ONBOARDING PAGE ───────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({ photos: [] })

  if (done) {
    return <PersonalitySummary data={data} onDone={() => router.push('/home')} />
  }

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

        <ProgressBar step={step} total={TOTAL_STEPS} />

        <div className={styles.body}>
          {step === 1 && <SectionA data={data} setData={setData} onNext={() => setStep(2)} />}
          {step === 2 && <SectionB data={data} setData={setData} onNext={() => setStep(3)} />}
          {step === 3 && <SectionC data={data} setData={setData} onNext={() => setStep(4)} />}
          {step === 4 && <SectionD data={data} setData={setData} onNext={() => setStep(5)} />}
          {step === 5 && <SectionE data={data} setData={setData} onNext={() => setDone(true)} />}
        </div>
      </div>
    </div>
  )
}
