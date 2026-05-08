'use client'
import Link from 'next/link'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { CONVERSATIONS, formatTimeAgo, getDepthColor, getDepthLabel } from '@/lib/mockData'
import styles from './page.module.css'

function DepthBar({ percent }) {
  const color = getDepthColor(percent)
  const label = getDepthLabel(percent)
  return (
    <div className={styles.depthWrap}>
      <div className={styles.depthTrack}>
        <div className={styles.depthFill} style={{ width: `${percent}%`, background: color }} />
      </div>
      <span className={styles.depthLabel} style={{ color }}>{label}</span>
    </div>
  )
}

export default function ChatsPage() {
  if (!CONVERSATIONS.length) {
    return (
      <MobileShell>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>✉</div>
          <div className={styles.emptyTitle}>No conversations yet</div>
          <div className={styles.emptySub}>Connect with a match to start a conversation</div>
          <Link href="/home" className="btn btn-primary" style={{ marginTop: 16 }}>See your matches →</Link>
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Conversations</h1>
          <span className={styles.headerCount}>{CONVERSATIONS.length} active</span>
        </div>

        <p className={styles.headerNote}>
          Keep the momentum — conversations expire after 14 days of silence.
        </p>

        <div className={styles.list}>
          {CONVERSATIONS.map((conv, i) => (
            <Link key={conv.id} href={`/chat/${conv.id}`}
              className={styles.card}
              style={{ animationDelay: `${i * 60}ms` }}>

              {/* Avatar */}
              <div className={styles.avatarWrap}>
                <Image src={conv.partnerPhoto} alt={conv.partnerName}
                  fill style={{ objectFit: 'cover' }} sizes="56px" />
                {conv.isOnline && <div className={styles.onlineDot} />}
              </div>

              {/* Body */}
              <div className={styles.body}>
                <div className={styles.topRow}>
                  <span className={styles.name}>{conv.partnerName}</span>
                  <span className={styles.time}>{formatTimeAgo(conv.lastMessageAt)}</span>
                </div>

                <div className={styles.preview}>
                  {conv.lastMessageIsMe && <span className={styles.youPrefix}>You: </span>}
                  {conv.lastMessage}
                </div>

                <DepthBar percent={conv.depthPercent} />
              </div>

              {/* Score pill */}
              <div className={styles.scorePill}>{conv.score}%</div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLine} />
          <div className={styles.footerNote}>
            Your conversations are private and end-to-end safe. Intent never reads your messages.
          </div>
        </div>
      </div>
    </MobileShell>
  )
}
