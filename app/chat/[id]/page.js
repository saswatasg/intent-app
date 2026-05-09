'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { MATCHES } from '@/lib/mockData'
import styles from './page.module.css'

export default function ChatPage({ params }) {
  const router = useRouter()
  const { id } = use(params)
  
  // Fake match mapping
  const matchId = id.replace('conv', 'match')
  const match = MATCHES.find(m => m.id === matchId) || MATCHES[0]

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'her', text: "Hey! I noticed we both value ambition but also love lazy Sundays. That's rare." },
    { id: 2, sender: 'me', text: "Right? I think the best people are weirdly good at both extremes." },
    { id: 3, sender: 'sys', text: "Today, 6:42 PM" },
    { id: 4, sender: 'her', text: "Exactly. I spent last Sunday reading at a cafe in Indiranagar for 4 hours straight. Zero guilt." },
  ])

  const [showAi, setShowAi] = useState(true)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), sender: 'me', text: input.trim() }])
    setInput('')
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className={styles.headerCenter}>
            <div className={styles.avatar}>
              <Image src={match.photo} alt={match.name} fill style={{ objectFit: 'cover' }} sizes="36px" />
            </div>
            <div className={styles.name}>{match.name}</div>
            <div className={styles.compLabel}>{match.totalScore}% compatible</div>
          </div>
          
          <button className={styles.menuBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </header>

        {/* Depth Indicator */}
        <div className={styles.depthIndicator}>
          <div className={styles.depthLabel}>Depth</div>
          <div className={styles.depthBar}><div className={styles.depthFill} /></div>
          <div className={styles.depthState}>Surface</div>
        </div>

        {/* Chat Area */}
        <div className={styles.chatArea}>
          {showAi && (
            <div className={styles.aiCard}>
              <div className={styles.aiText}>Based on her prompts — ask about the cafe she mentioned in Indiranagar.</div>
              <div className={styles.aiDismiss} onClick={() => setShowAi(false)}>Dismiss</div>
            </div>
          )}

          {messages.map(m => {
            if (m.sender === 'sys') {
              return <div key={m.id} className={styles.timestamp}>{m.text}</div>
            }
            const isMe = m.sender === 'me'
            return (
              <div key={m.id} className={`${styles.messageRow} ${isMe ? styles.messageRowRight : styles.messageRowLeft}`}>
                <div className={`${styles.bubble} ${isMe ? styles.bubbleRight : styles.bubbleLeft}`}>
                  {m.text}
                </div>
              </div>
            )
          })}
        </div>

        {/* Input Bar */}
        <div className={styles.inputArea}>
          <input 
            type="text" 
            className={styles.inputField}
            placeholder="Say something thoughtful..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className={styles.sendBtn} onClick={handleSend}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </MobileShell>
  )
}
