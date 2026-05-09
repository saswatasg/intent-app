'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import styles from './page.module.css'

const QS_QUESTIONS = [
  {
    id: 'qs1', category: 'SCENARIO',
    q: 'You come home after a hard day. Your partner also had a rough day. What do you do?',
    options: [
      { id: 'a', text: 'Give them space and decompress alone first' },
      { id: 'b', text: 'Sit together in silence — presence without pressure' },
      { id: 'c', text: 'Talk it through immediately — processing means connection' },
      { id: 'd', text: 'Do something fun together to reset the energy' }
    ]
  },
  {
    id: 'qs2', category: 'VALUES',
    q: 'When thinking about long-term partnership, which feels most true to you?',
    options: [
      { id: 'a', text: 'We should challenge each other to grow' },
      { id: 'b', text: 'We should be each other\'s safe harbor' },
      { id: 'c', text: 'We should build a shared life project together' },
      { id: 'd', text: 'We should maintain strong independent lives' }
    ]
  },
  {
    id: 'qs3', category: 'COMMUNICATION',
    q: 'During a disagreement, what is your instinct?',
    options: [
      { id: 'a', text: 'Address it immediately, even if it\'s messy' },
      { id: 'b', text: 'Take time to process before speaking' },
      { id: 'c', text: 'Keep the peace and let small things go' },
      { id: 'd', text: 'Write down my thoughts to be clear' }
    ]
  },
  {
    id: 'qs4', category: 'LIFESTYLE',
    q: 'How do you prefer to spend your disposable income?',
    options: [
      { id: 'a', text: 'Experiences, travel, dining out' },
      { id: 'b', text: 'Saving and investing for the future' },
      { id: 'c', text: 'Upgrading my daily life (home, convenience)' },
      { id: 'd', text: 'Hobbies, gear, or personal projects' }
    ]
  },
  {
    id: 'qs5', category: 'INTENT',
    q: 'What is your current timeline for a serious commitment?',
    options: [
      { id: 'a', text: 'Ready now for the right person' },
      { id: 'b', text: 'Exploring intentionally, seeing where it goes' },
      { id: 'c', text: 'Focused on career, but open to it' },
      { id: 'd', text: 'Looking for connection without labels' }
    ]
  }
]

// ─── GATE COMPONENT ───
function SectionIntent({ onNext }) {
  return (
    <div className={styles.gateContent}>
      <div className={styles.gateMark}>◈</div>
      <h1 className={styles.gateTitle}>Intent is for serious dating.</h1>
      <p className={styles.gateText}>
        We built this for people who are done with casual swiping. If you're looking for hookups or penpals, this isn't the app for you.
      </p>
      <div className={styles.gateOptions}>
        <button className={styles.gateOption} onClick={onNext}>
          I'm looking for something real
        </button>
        <button className={styles.gateOption} style={{opacity: 0.6}} onClick={() => alert('Thanks for being honest. Intent might not be the right fit right now.')}>
          I'm just browsing casually
        </button>
      </div>
    </div>
  )
}

// ─── ENTRY COMPONENT ───
function QuickStartModule({ onNext }) {
  return (
    <div className={styles.entryContent}>
      <h1 className={styles.entryTitle}>Five quick questions to set the foundation.</h1>
      <p className={styles.entrySub}>
        We don't use swiping to figure you out. We ask. These five questions calibrate your initial match pool.
      </p>
      
      <div className={styles.entryBullets}>
        <div className={styles.entryBullet}>
          <svg className={styles.bulletIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className={styles.bulletText}>Takes 2 minutes</span>
        </div>
        <div className={styles.entryBullet}>
          <svg className={styles.bulletIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className={styles.bulletText}>Improves match quality instantly</span>
        </div>
        <div className={styles.entryBullet}>
          <svg className={styles.bulletIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className={styles.bulletText}>Your answers remain private</span>
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <button className="btn btn-primary btn-full" onClick={onNext}>Begin</button>
      </div>
    </div>
  )
}

// ─── QUESTION COMPONENT ───
function QuestionView({ index, total, onNext, onBack }) {
  const q = QS_QUESTIONS[index]
  const [selected, setSelected] = useState(null)
  
  // reset on next
  useEffect(() => setSelected(null), [index])

  return (
    <div className={styles.scrollArea}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className={styles.progressRow}>
          <div className={styles.dots}>
            {QS_QUESTIONS.map((_, i) => (
              <div key={i} className={`${styles.dot} ${i <= index ? styles.dotFilled : ''}`} />
            ))}
          </div>
          <div className={styles.progressText}>{index + 1} of {total}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{q.category}</div>
        <h2 className={styles.question}>{q.q}</h2>

        <div className={styles.options}>
          {q.options.map((opt) => (
            <div 
              key={opt.id}
              className={`${styles.optionCard} ${selected === opt.id ? styles.optionCardSelected : ''}`}
              onClick={() => setSelected(opt.id)}
            >
              <div className={styles.optLetter}>{opt.id.toUpperCase()}</div>
              <div className={styles.optText}>{opt.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button 
          className="btn btn-primary btn-full" 
          disabled={!selected}
          onClick={() => onNext(q.id, selected)}
          style={{ opacity: selected ? 1 : 0.5 }}
        >
          Next
        </button>
        <div className={styles.subText}>Your matches get sharper as you do.</div>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  // Steps: -2 = gate, -1 = intro, 0-4 = questions, 5 = done
  const [step, setStep] = useState(-2)
  const [answers, setAnswers] = useState({})

  const handleNextGate = () => setStep(-1)
  const handleNextIntro = () => setStep(0)
  
  const handleAnswer = (qId, optionId) => {
    setAnswers(prev => ({ ...prev, [qId]: optionId }))
    if (step < QS_QUESTIONS.length - 1) {
      setStep(s => s + 1)
    } else {
      // Done -> home
      router.push('/home')
    }
  }

  const handleBack = () => {
    if (step > -1) setStep(s => s - 1)
    else if (step === -1) setStep(-2)
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        {step === -2 && <SectionIntent onNext={handleNextGate} />}
        {step === -1 && <QuickStartModule onNext={handleNextIntro} />}
        {step >= 0 && step < QS_QUESTIONS.length && (
          <QuestionView 
            index={step} 
            total={QS_QUESTIONS.length}
            onNext={handleAnswer} 
            onBack={handleBack} 
          />
        )}
      </div>
    </MobileShell>
  )
}
