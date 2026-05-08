'use client'
import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { CONVERSATIONS, formatTimeAgo, getDepthColor, getDepthLabel } from '@/lib/mockData'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

const AI_REPLIES = [
  "That's a really interesting way to look at it. I've never put it in those terms but it just clicked.",
  "Yes, exactly. And I think the people who get that are worth keeping around.",
  "Can I ask something a bit more personal about that? I feel like we're just scratching the surface.",
  "I completely relate. That's something I've been sitting with lately but couldn't articulate.",
  "Haha okay that's unexpectedly profound. I like you.",
  "I need a moment to think about this one. You're not making this easy — in the best way.",
  "That's actually really close to how I think about it. Didn't expect to find that here.",
]

const DEPTH_MILESTONES = [
  { threshold: 30,  label: 'Building',  msg: "You're building something real — keep going.",     emoji: '🌿' },
  { threshold: 60,  label: 'Deep',      msg: 'Deep level reached — conversation insights unlocked.', emoji: '🌊' },
  { threshold: 82,  label: 'Connected', msg: 'Connected! This is rare — consider meeting in person.', emoji: '🫀' },
]

function DepthBar({ percent }) {
  const label = getDepthLabel(percent)
  const color = getDepthColor(percent)
  const desc = { Surface: 'Just getting started', Building: 'Getting somewhere real', Deep: 'Genuine depth here', Connected: 'Rare level of connection' }[label]
  const r = 10, circ = +(2 * Math.PI * r).toFixed(3), offset = +(circ - (percent / 100) * circ).toFixed(3)
  return (
    <div className={styles.depthBar}>
      <svg width={28} height={28}>
        <circle cx={14} cy={14} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={3} />
        <circle cx={14} cy={14} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 14 14)" />
      </svg>
      <div>
        <div className={styles.depthLabel} style={{ color }}>{label}</div>
        <div className={styles.depthDesc}>{desc}</div>
      </div>
      <div className={styles.depthPct}>{percent}%</div>
    </div>
  )
}

function MilestoneToast({ milestone, onDismiss }) {
  useEffect(() => { const t = setTimeout(onDismiss, 4500); return () => clearTimeout(t) }, [onDismiss])
  return (
    <div className={styles.milestoneToast} onClick={onDismiss}>
      <span className={styles.milestoneEmoji}>{milestone.emoji}</span>
      <div>
        <div className={styles.milestoneTitle}>{milestone.label} reached</div>
        <div className={styles.milestoneSub}>{milestone.msg}</div>
      </div>
      <span className={styles.milestoneDismiss}>✕</span>
    </div>
  )
}

function Bubble({ msg, partnerPhoto, partnerName }) {
  const sent = msg.type === 'sent'
  return (
    <div className={`${styles.msgRow} ${sent ? styles.msgSent : ''}`}>
      {!sent && (
        <div className={styles.msgAvatar}>
          <Image src={partnerPhoto} alt={partnerName} fill style={{ objectFit: 'cover' }} sizes="28px" />
        </div>
      )}
      <div className={`${styles.bubble} ${sent ? styles.bubbleSent : styles.bubbleRecv}`}>
        <div className={styles.bubbleText}>{msg.content}</div>
        <div className={styles.bubbleMeta}>
          {formatTimeAgo(msg.sentAt)}
          {sent && <span className={msg.readAt ? styles.readReceipt : styles.unreadReceipt}>{msg.readAt ? ' ✓✓' : ' ✓'}</span>}
        </div>
      </div>
    </div>
  )
}

function FeedbackModal({ matchId, partnerName, onClose }) {
  const [step, setStep] = useState(1)
  const [outcome, setOutcome] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitFeedback = async (finalOutcome, followUpData = {}) => {
    setIsSubmitting(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          match_id: matchId,
          user_id: 'user_self', // prototype static ID
          outcome: finalOutcome,
          ...followUpData,
          trigger_context: 'manual'
        })
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  const handleOutcome = (val) => {
    setOutcome(val)
    if (val === 'skipped') {
      submitFeedback(val)
    } else if (val === 'still_talking') {
      submitFeedback(val)
    } else {
      setStep(2)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {step === 1 && (
          <>
            <h3 className={styles.modalTitle}>What happened with {partnerName}?</h3>
            <div className={styles.modalOptions}>
              <button className={`${styles.fbBtn} ${styles.fbGreen}`} onClick={() => handleOutcome('we_met')}>We met in person</button>
              <button className={`${styles.fbBtn} ${styles.fbSage}`} onClick={() => handleOutcome('still_talking')}>Still talking, haven't met</button>
              <button className={`${styles.fbBtn} ${styles.fbMuted}`} onClick={() => handleOutcome('didnt_click')}>Didn't click</button>
              <button className={styles.fbTextBtn} onClick={() => handleOutcome('skipped')}>Skip this</button>
            </div>
          </>
        )}
        
        {step === 2 && outcome === 'we_met' && (
          <>
            <h3 className={styles.modalTitle}>Did it go well?</h3>
            <div className={styles.modalOptions}>
              <button className={`${styles.fbBtn} ${styles.fbSage}`} onClick={() => submitFeedback(outcome, { went_well: 'great' })} disabled={isSubmitting}>Great!</button>
              <button className={`${styles.fbBtn} ${styles.fbSage}`} onClick={() => submitFeedback(outcome, { went_well: 'okay' })} disabled={isSubmitting}>It was okay</button>
              <button className={`${styles.fbBtn} ${styles.fbMuted}`} onClick={() => submitFeedback(outcome, { went_well: 'not_for_me' })} disabled={isSubmitting}>Not for me</button>
            </div>
          </>
        )}

        {step === 2 && outcome === 'didnt_click' && (
          <>
            <h3 className={styles.modalTitle}>What was missing? <span style={{fontSize:'0.8rem', color:'var(--muted)'}}>(Optional)</span></h3>
            <div className={styles.fbChips}>
              {['No chemistry', 'Different goals', 'Communication mismatch', 'Something off'].map(reason => (
                <button key={reason} className={styles.fbChip} onClick={() => submitFeedback(outcome, { didnt_click_reason: reason })} disabled={isSubmitting}>{reason}</button>
              ))}
            </div>
            <button className={styles.fbTextBtn} onClick={() => submitFeedback(outcome, { didnt_click_reason: 'prefer_not_to_say' })} disabled={isSubmitting}>Prefer not to say</button>
          </>
        )}
      </div>
    </div>
  )
}

export default function ChatPage({ params }) {
  const { id } = use(params)
  const router = useRouter()

  // Find conversation — fall back to first
  const conv = CONVERSATIONS.find(c => c.id === id) || CONVERSATIONS[0]

  const [messages, setMessages] = useState(conv.messages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [depth, setDepth] = useState(conv.depthPercent)
  const [milestone, setMilestone] = useState(null)
  const [showIce, setShowIce] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const shownMilestones = useRef(new Set())
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Supabase Realtime Subscription
  useEffect(() => {
    const channel = supabase.channel('realtime:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${id}` }, payload => {
        const newMsg = payload.new;
        // Check if we didn't already add it locally
        setMessages(prev => {
          if (prev.find(m => m.id === newMsg.id)) return prev;
          return [...prev, {
            id: newMsg.id,
            senderId: newMsg.sender_id,
            content: newMsg.content,
            sentAt: new Date(newMsg.created_at),
            type: newMsg.sender_id === 'user_self' ? 'sent' : 'received'
          }]
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [id])

  const checkMilestone = (d) => {
    for (const m of DEPTH_MILESTONES) {
      if (d >= m.threshold && !shownMilestones.current.has(m.threshold)) {
        shownMilestones.current.add(m.threshold)
        setMilestone(m)
        break
      }
    }
  }

  const send = async (text) => {
    const t = text.trim()
    if (!t) return
    const msgId = `msg_${Date.now()}`
    const msg = { id: msgId, senderId: 'user_self', content: t, sentAt: new Date(), readAt: null, type: 'sent' }
    setMessages(prev => [...prev, msg])
    setInput('')
    setShowIce(false)
    
    // Simulate API match saving (Fail silently if DB not set up)
    supabase.from('messages').insert([{ id: msgId, match_id: id, sender_id: 'user_self', receiver_id: conv.partnerId, content: t }]).then()

    const newDepth = Math.min(depth + 1.8 + Math.random() * 2, 95)
    setDepth(newDepth)
    checkMilestone(newDepth)
    setTyping(true)
    const delay = 1600 + Math.random() * 1400
    setTimeout(() => {
      setTyping(false)
      const replyId = `reply_${Date.now()}`
      const replyContent = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)]
      const reply = {
        id: replyId,
        senderId: conv.partnerId,
        content: replyContent,
        sentAt: new Date(), readAt: new Date(), type: 'received'
      }
      setMessages(prev => [...prev, reply])
      
      // Simulate reply from AI
      supabase.from('messages').insert([{ id: replyId, match_id: id, sender_id: conv.partnerId, receiver_id: 'user_self', content: replyContent }]).then()

      const d2 = Math.min(newDepth + 1.5, 95)
      setDepth(d2)
      checkMilestone(d2)
    }, delay)
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        
        {/* Feedback Modal Overlay */}
        {showFeedback && (
          <FeedbackModal matchId={id} partnerName={conv.partnerName} onClose={() => setShowFeedback(false)} />
        )}

        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.push('/chats')}>←</button>
          <div className={styles.partnerRow}>
            <div className={styles.partnerAvatar}>
              <Image src={conv.partnerPhoto} alt={conv.partnerName} fill style={{ objectFit: 'cover' }} sizes="36px" />
              {conv.isOnline && <div className={styles.onlineDot} />}
            </div>
            <div>
              <div className={styles.partnerName}>{conv.partnerName}</div>
              <div className={styles.partnerStatus}>{conv.isOnline ? '● Active now' : 'Recently active'}</div>
            </div>
          </div>
          <button className={styles.feedbackBtn} onClick={() => setShowFeedback(true)} title="Rate this connection">
            ⭐
          </button>
          <button className={styles.insightsBtn} onClick={() => router.push(`/insights/${id}`)}>
            📊 Insights
          </button>
        </div>

        {/* Depth bar */}
        <div className={styles.depthWrap}>
          <DepthBar percent={Math.round(depth)} />
        </div>

        {/* Milestone toast */}
        {milestone && (
          <MilestoneToast milestone={milestone} onDismiss={() => setMilestone(null)} />
        )}

        {/* Icebreakers */}
        {showIce && (
          <div className={styles.icePanel}>
            <div className={styles.icePanelTop}>
              <span className={styles.icePanelTitle}>✨ Suggested starters</span>
              <button className={styles.icePanelDone} onClick={() => setShowIce(false)}>Done</button>
            </div>
            {conv.icebreakers.map((ice, i) => (
              <button key={i} className={styles.iceBtn} onClick={() => send(ice)}>
                💬 {ice}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className={styles.messages}>
          <div className={styles.dateDivider}>{conv.messageCount} messages · {conv.daysActive || 5} days</div>
          {messages.map(msg => (
            <Bubble key={msg.id} msg={msg} partnerPhoto={conv.partnerPhoto} partnerName={conv.partnerName} />
          ))}
          {typing && (
            <div className={styles.msgRow}>
              <div className={styles.msgAvatar}>
                <Image src={conv.partnerPhoto} alt={conv.partnerName} fill style={{ objectFit: 'cover' }} sizes="28px" />
              </div>
              <div className={`${styles.bubble} ${styles.bubbleRecv} ${styles.typingBubble}`}>
                <span className={styles.dot} />
                <span className={styles.dot} style={{ animationDelay: '0.18s' }} />
                <span className={styles.dot} style={{ animationDelay: '0.36s' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className={styles.inputPanel}>
          <div className={styles.inputBar}>
            <button className={styles.iceToggle} onClick={() => setShowIce(v => !v)} title="AI starters">✨</button>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Say something genuine…"
              autoComplete="off"
            />
            <button
              className={`${styles.sendBtn} ${input.trim() ? styles.sendActive : ''}`}
              onClick={() => send(input)}
              disabled={!input.trim()}
            >↑</button>
          </div>
        </div>
      </div>
    </MobileShell>
  )
}
