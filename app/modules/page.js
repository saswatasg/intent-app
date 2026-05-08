'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import { MODULES, ALL_MODULES, ENTRY_MODULE, getModuleTier, getNextAccuracyNudge } from '@/lib/modules'
import styles from './page.module.css'

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

function ModuleQuestionnaire({ moduleId, onComplete, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  if (!mod) return null
  const q = mod.questions[currentQ]
  const totalQ = mod.questions.length
  const answered = answers[q.id] !== undefined

  return (
    <div className={styles.moduleFlow}>
      <div className={styles.moduleFlowHeader}>
        <button className={styles.backBtn} onClick={currentQ > 0 ? () => setCurrentQ(p => p - 1) : onBack}>←</button>
        <div className={styles.moduleFlowInfo}>
          <span>{mod.emoji}</span>
          <span className={styles.moduleFlowTitle}>{mod.title}</span>
        </div>
        <span className={styles.moduleFlowCount}>{currentQ + 1}/{totalQ}</span>
      </div>

      <div className={styles.qBar}>
        <div className={styles.qBarFill} style={{ width: `${((currentQ + 1) / totalQ) * 100}%`, background: mod.color }} />
      </div>

      <div className={styles.qCard} key={q.id}>
        <div className={styles.qType}>
          {q.type === 'scenario' ? '🎭 Scenario' : q.type === 'slider' ? '📊 Spectrum' : '📋 Choose one'}
        </div>
        <h3 className={styles.qText}>{q.question}</h3>

        {q.type === 'slider' ? (
          <div style={{ marginTop: 20 }}>
            <SliderInput value={answers[q.id] ?? 50} onChange={(v) => setAnswers(p => ({...p, [q.id]: v}))} leftLabel={q.leftLabel} rightLabel={q.rightLabel} />
          </div>
        ) : (
          <div className={styles.qOptions}>
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i)
              const selected = answers[q.id] === opt.trait
              return (
                <button key={i} className={`${styles.qOption} ${selected ? styles.qOptionActive : ''}`} onClick={() => setAnswers(p => ({...p, [q.id]: opt.trait}))}>
                  <span className={styles.qLetter}>{letter}</span>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <button className={`btn btn-primary btn-full ${!answered && q.type !== 'slider' ? styles.btnDisabled : ''}`}
        onClick={() => currentQ < totalQ - 1 ? setCurrentQ(p => p + 1) : onComplete(moduleId, answers)}
        disabled={!answered && q.type !== 'slider'} style={{ marginTop: 16 }}>
        {currentQ < totalQ - 1 ? 'Next →' : `Complete ${mod.title} ✓`}
      </button>
    </div>
  )
}

export default function ModulesPage() {
  const router = useRouter()
  const [completedModules, setCompletedModules] = useState([])
  const [activeModuleId, setActiveModuleId] = useState(null)
  const [allAnswers, setAllAnswers] = useState({})
  const [celebration, setCelebration] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('intent_completed_modules') || '[]')
      const savedAnswers = JSON.parse(localStorage.getItem('intent_answers') || '{}')
      setCompletedModules(saved)
      setAllAnswers(savedAnswers)
    } catch {}
  }, [])

  const handleComplete = (moduleId, answers) => {
    const updated = [...completedModules, moduleId]
    const updatedAnswers = { ...allAnswers, [moduleId]: answers }
    setCompletedModules(updated)
    setAllAnswers(updatedAnswers)
    localStorage.setItem('intent_completed_modules', JSON.stringify(updated))
    localStorage.setItem('intent_answers', JSON.stringify(updatedAnswers))
    setActiveModuleId(null)

    const tier = getModuleTier(updated.length)
    const mod = MODULES.find(m => m.id === moduleId)
    setCelebration({ module: mod, tier, count: updated.length })
    setTimeout(() => setCelebration(null), 4000)
  }

  const completedCount = completedModules.length
  const tier = getModuleTier(completedCount)
  const totalModules = MODULES.length + 1 // +1 for entry module
  const remaining = MODULES.filter(m => !completedModules.includes(m.id))
  const nextNudge = getNextAccuracyNudge(completedCount)

  if (activeModuleId) {
    return (
      <MobileShell>
        <div className={styles.page}>
          <ModuleQuestionnaire moduleId={activeModuleId} onComplete={handleComplete} onBack={() => setActiveModuleId(null)} />
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Celebration toast */}
        {celebration && (
          <div className={styles.celebrationToast}>
            <span className={styles.celebrationEmoji}>{celebration.module.emoji}</span>
            <div>
              <div className={styles.celebrationTitle}>{celebration.module.title} complete! ✓</div>
              <div className={styles.celebrationSub}>Match accuracy now {celebration.tier.matchAccuracy}</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.push('/profile')}>←</button>
          <h1 className={styles.pageTitle}>Compatibility Modules</h1>
        </div>

        {/* Current tier card */}
        <div className={styles.tierCard}>
          <div className={styles.tierTop}>
            <div>
              <div className={styles.tierBadge}>{tier.badge} {tier.label}</div>
              <div className={styles.tierAccuracy}>{tier.matchAccuracy} match accuracy</div>
            </div>
            <div className={styles.tierRing}>
              <svg width="56" height="56">
                <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle cx="28" cy="28" r="23" fill="none" stroke={tier.color} strokeWidth="4"
                  strokeDasharray={+(2 * Math.PI * 23).toFixed(3)}
                  strokeDashoffset={+((2 * Math.PI * 23) * (1 - completedCount / totalModules)).toFixed(3)}
                  strokeLinecap="round" transform="rotate(-90 28 28)" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill={tier.color} fontSize="14" fontWeight="800">{completedCount}/{totalModules}</text>
              </svg>
            </div>
          </div>
          <div className={styles.tierBar}>
            <div className={styles.tierBarFill} style={{ width: `${(completedCount / totalModules) * 100}%` }} />
          </div>
          {nextNudge && (
            <div className={styles.tierNudge}>{nextNudge}</div>
          )}
        </div>

        {/* Remaining modules */}
        {remaining.length > 0 ? (
          <>
            <div className={styles.sectionLabel}>Unlock better matches</div>
            <div className={styles.remainingList}>
              {remaining.map(mod => {
                const nextTier = getModuleTier(completedCount + 1)
                return (
                  <button key={mod.id} className={styles.remainingCard} onClick={() => setActiveModuleId(mod.id)}>
                    <span className={styles.remainingEmoji}>{mod.emoji}</span>
                    <div className={styles.remainingInfo}>
                      <div className={styles.remainingTitle}>{mod.title}</div>
                      <div className={styles.remainingDesc}>{mod.description}</div>
                      <div className={styles.remainingMeta}>
                        5 questions · ~2 min · {mod.unlockMessage || `Improves ${mod.matchImpact.toLowerCase()}`}
                      </div>
                    </div>
                    <span className={styles.remainingArrow}>→</span>
                  </button>
                )
              })}
            </div>

            {/* What you're missing */}
            <div className={styles.sectionLabel}>What you&apos;re missing</div>
            <div className={styles.missingCard}>
              {completedCount < 3 && <div className={styles.missingItem}><span className={styles.missingDot} style={{ background: 'var(--blush)' }} />Only 2 matches/day for men (3 at tier 3+)</div>}
              {completedCount < 3 && <div className={styles.missingItem}><span className={styles.missingDot} style={{ background: 'var(--gold)' }} />No AI-generated custom icebreakers</div>}
              {completedCount < 4 && <div className={styles.missingItem}><span className={styles.missingDot} style={{ background: 'var(--sage)' }} />Limited &quot;Why we matched you&quot; insights</div>}
              {completedCount < 7 && <div className={styles.missingItem}><span className={styles.missingDot} style={{ background: 'var(--muted)' }} />No &quot;Complete Profile&quot; badge for matches to see</div>}
            </div>
          </>
        ) : (
          <div className={styles.allDone}>
            <div className={styles.allDoneEmoji}>👑</div>
            <div className={styles.allDoneTitle}>All modules complete!</div>
            <div className={styles.allDoneSub}>You have maximum match accuracy and all features unlocked.</div>
          </div>
        )}

        {/* Completed modules */}
        {completedModules.length > 0 && (
          <>
            <div className={styles.sectionLabel}>Completed</div>
            <div className={styles.completedList}>
              {completedModules.map(id => {
                const mod = ALL_MODULES.find(m => m.id === id)
                return mod ? (
                  <div key={id} className={styles.completedItem}>
                    <span>{mod.emoji}</span>
                    <span className={styles.completedName}>{mod.title}</span>
                    <span className={styles.completedCheck}>✓</span>
                  </div>
                ) : null
              })}
            </div>
          </>
        )}
      </div>
    </MobileShell>
  )
}
