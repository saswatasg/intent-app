'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import MobileShell from '@/components/layout/MobileShell'
import { CURRENT_USER, ACHIEVEMENTS } from '@/lib/mockData'
import styles from './page.module.css'

export default function ProfilePage() {
  const router = useRouter()
  const user = CURRENT_USER

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* HERO — full bleed photo */}
        <div className={styles.heroWrap}>
          <Image src={user.photo} alt={user.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="390px" priority />
          <div className={styles.heroGradient} />
          <div className={styles.heroContent}>
            <div className={styles.heroNameRow}>
              <h1 className={styles.heroName}>{user.name}, {user.age}</h1>
              <div className={styles.heroVerify}>✓</div>
            </div>
            <div className={styles.heroProfession}>{user.city} · {user.profession}</div>
            <div className={styles.heroBadges}>
              <span className="chip chip-sage" style={{ fontSize: '0.6875rem' }}>💚 Long-term</span>
              <span className="chip" style={{ fontSize: '0.6875rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>Free plan</span>
            </div>
          </div>
          <button className={styles.editPhotoBtn} onClick={() => router.push('/settings')}>Edit ✏</button>
        </div>

        {/* Intent score strip */}
        <div className={styles.scoreStrip}>
          <div className={styles.scoreTile}>
            <div className={styles.scoreTileVal} style={{ color: 'var(--sage)' }}>{user.intentScore}</div>
            <div className={styles.scoreTileLbl}>Intent score</div>
          </div>
          <div className={styles.scoreDivider} />
          <div className={styles.scoreTile}>
            <div className={styles.scoreTileVal} style={{ color: '#FF8C00' }}>🔥 {user.streak}</div>
            <div className={styles.scoreTileLbl}>Day streak</div>
          </div>
          <div className={styles.scoreDivider} />
          <div className={styles.scoreTile}>
            <div className={styles.scoreTileVal} style={{ color: 'var(--gold)' }}>{user.profileCompletion}%</div>
            <div className={styles.scoreTileLbl}>Profile strength</div>
          </div>
        </div>

        {/* Profile completion bar */}
        {user.profileCompletion < 100 && (
          <div className={styles.completionBanner}>
            <div className={styles.completionBarWrap}>
              <div className={styles.completionBar}>
                <div className={styles.completionFill} style={{ width: `${user.profileCompletion}%` }} />
              </div>
            </div>
            <div className={styles.completionNote}>Add a voice intro to reach 100% — unlocks 2× match priority</div>
          </div>
        )}

        {/* Personality snapshot */}
        <div className={styles.section}>
          <div className={styles.sLabel}>Your personality</div>
          <div className={styles.snapshotCard}>
            <p className={styles.snapshotText}>{user.personalitySnapshot.summary}</p>
            <div className={styles.traitsWrap}>
              {user.personalitySnapshot.traits.map(t => <span key={t} className="chip chip-sage" style={{ fontSize: '0.6875rem' }}>{t}</span>)}
            </div>
            <div className={styles.snapshotMeta}>
              <div className={styles.metaItem}><div className={styles.metaLbl}>Attachment</div><div className={styles.metaVal}>{user.personalitySnapshot.attachmentStyle}</div></div>
              <div className={styles.metaItem}><div className={styles.metaLbl}>Conflict</div><div className={styles.metaVal}>{user.personalitySnapshot.conflictStyle}</div></div>
              <div className={styles.metaItem}><div className={styles.metaLbl}>Love language</div><div className={styles.metaVal}>{user.personalitySnapshot.loveLanguage}</div></div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className={styles.section}>
          <div className={styles.sLabel}>Achievements</div>
          <div className={styles.achieveGrid}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} className={`${styles.achieveTile} ${!a.earned ? styles.achieveLocked : ''}`} title={a.desc}>
                <div className={styles.achieveEmoji} style={{ filter: a.earned ? 'none' : 'grayscale(1) opacity(0.35)' }}>{a.emoji}</div>
                <div className={styles.achieveName}>{a.title}</div>
                {a.earned && <div className={styles.achieveEarned}>✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div className={styles.section}>
          <div className={styles.sLabel}>In your words</div>
          {user.prompts.map((p, i) => (
            <div key={i} className={styles.promptCard}>
              <div className={styles.promptQ}>{p.q}</div>
              <div className={styles.promptA}>"{p.a}"</div>
            </div>
          ))}
        </div>

        {/* Upgrade */}
        <div className={styles.upgradeCard}>
          <div className={styles.upgradeLeft}>
            <div className={styles.upgradeTitle}>Unlock Premium ⭐</div>
            <div className={styles.upgradeSub}>4 matches/cycle · Unlimited insights · See who passed on you</div>
          </div>
          <button className="btn btn-gold btn-sm" style={{ whiteSpace: 'nowrap' }}>₹499/mo</button>
        </div>

        {/* Edit */}
        <div className={styles.actions}>
          <Link href="/settings" className={`btn btn-ghost btn-full`}>Settings & preferences →</Link>
        </div>
      </div>
    </MobileShell>
  )
}
