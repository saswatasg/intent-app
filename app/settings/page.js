'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import MobileShell from '@/components/layout/MobileShell'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './page.module.css'

function Toggle({ value, onChange }) {
  return (
    <div className={`${styles.toggle} ${value ? styles.toggleOn : ''}`} onClick={() => onChange(!value)}>
      <div className={styles.toggleThumb} />
    </div>
  )
}

function SettingRow({ label, sub, children }) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.settingInfo}>
        <div className={styles.settingLabel}>{label}</div>
        {sub && <div className={styles.settingSub}>{sub}</div>}
      </div>
      <div className={styles.settingControl}>{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const user = CURRENT_USER
  const [mode, setMode] = useState('serious')
  const [paused, setPaused] = useState(false)
  const [readReceipts, setReadReceipts] = useState(true)
  const [insightsOptIn, setInsightsOptIn] = useState(true)
  const [notifs, setNotifs] = useState({
    newMatches: true, replies: true, stalling: true,
    expiry: true, insights: true, depth: true,
  })
  const toggleNotif = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <MobileShell>
      <div className={styles.page}>
        {/* Header with self photo */}
        <div className={styles.profileHeader}>
          <div className={styles.selfPhotoWrap}>
            <Image src={user.photo} alt={user.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="60px" />
          </div>
          <div className={styles.selfInfo}>
            <div className={styles.selfName}>{user.name}, {user.age}</div>
            <div className={styles.selfMeta}>{user.city} · {user.profession}</div>
            <div className={styles.selfBadges}>
              <span className="chip chip-sage" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>💚 Serious</span>
              <span className={styles.streakBadge}>🔥 {user.streak} days</span>
            </div>
          </div>
          <button className={styles.backBtn} onClick={() => router.back()} style={{ marginLeft: 'auto' }}>←</button>
        </div>
        <div className={styles.settingsTitle}>Settings</div>

        {/* MODE SECTION */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Dating mode</div>

          <div className={styles.modeCards}>
            <button className={`${styles.modeCard} ${mode === 'serious' ? styles.modeCardActive : ''}`} onClick={() => setMode('serious')}>
              <div className={styles.modeIcon}>💚</div>
              <div className={styles.modeName}>Serious</div>
              <div className={styles.modeDesc}>Full compatibility engine · All features · Soul-level matching</div>
              {mode === 'serious' && <div className={styles.modeCheck}>✓</div>}
            </button>
            <button className={`${styles.modeCard} ${mode === 'exploratory' ? styles.modeCardActive : ''}`} onClick={() => setMode('exploratory')}>
              <div className={styles.modeIcon}>🔵</div>
              <div className={styles.modeName}>Exploratory</div>
              <div className={styles.modeDesc}>Lighter scoring · Open to where it goes · Still intentional</div>
              {mode === 'exploratory' && <div className={styles.modeCheck}>✓</div>}
            </button>
          </div>

          {mode === 'exploratory' && (
            <div className={styles.modeNote}>Changing mode resets your current match cycle. Next delivery in 24 hours.</div>
          )}
        </div>

        {/* MATCH DELIVERY */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Match delivery</div>

          <SettingRow
            label="Pause new matches"
            sub="Existing conversations continue. You can re-activate anytime."
          >
            <Toggle value={paused} onChange={setPaused} />
          </SettingRow>

          {paused && (
            <div className={styles.pausedBanner}>
              ⏸ Matches paused. We&apos;ve saved your spot — your next cycle resumes within 24h of reactivating.
            </div>
          )}

          <SettingRow label="Delivery time" sub="Your matches arrive at 8:00 PM IST">
            <span className={styles.settingValue}>8:00 PM</span>
          </SettingRow>

          <SettingRow label="Matches per cycle" sub="Upgrade to get up to 5 matches">
            <span className={styles.settingValue}>3</span>
          </SettingRow>
        </div>

        {/* CONVERSATION */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Conversations</div>
          <SettingRow label="Read receipts" sub="Show when you've read messages">
            <Toggle value={readReceipts} onChange={setReadReceipts} />
          </SettingRow>
          <SettingRow label="Conversation insights" sub="Allow Intent to generate behavioral reports on your chats">
            <Toggle value={insightsOptIn} onChange={setInsightsOptIn} />
          </SettingRow>
        </div>

        {/* NOTIFICATIONS */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Notifications</div>
          <div className={styles.notifNote}>Max 3 per day · Quiet hours: 11 PM – 7 AM IST</div>
          {[
            { key: 'newMatches', label: 'New matches delivered', sub: '"3 people aligned with your values are ready."' },
            { key: 'replies', label: 'Match replied', sub: '"Your conversation with [Name] just got deeper."' },
            { key: 'stalling', label: 'Conversation stalling', sub: '"It\'s been quiet with [Name]. A check-in might help."' },
            { key: 'expiry', label: 'Match expiry warning', sub: '"Your match expires in 6 hours."' },
            { key: 'insights', label: 'Insight report ready', sub: '"Your conversation report is ready."' },
            { key: 'depth', label: 'Depth milestone', sub: '"Conversation depth hit Deep — extended profile unlocked."' },
          ].map(item => (
            <SettingRow key={item.key} label={item.label} sub={item.sub}>
              <Toggle value={notifs[item.key]} onChange={() => toggleNotif(item.key)} />
            </SettingRow>
          ))}
        </div>

        {/* SUBSCRIPTION */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Subscription</div>
          {(!user.premiumTier || user.premiumTier === 'free' || user.premiumTier === 'free_women') ? (
            <>
              <div className={styles.subCard}>
                <div className={styles.subPlan}>
                  <div className={styles.subPlanName}>{user.premiumTier === 'free_women' ? 'Verified Premium' : 'Free Plan'}</div>
                  <div className={styles.subPlanDesc}>{user.premiumTier === 'free_women' ? 'All Plus features included' : '3 matches/cycle · Basic features'}</div>
                </div>
                {user.premiumTier !== 'free_women' && (
                  <button className="btn btn-gold btn-sm" onClick={() => router.push('/upgrade')}>Upgrade ₹499/mo</button>
                )}
              </div>
              {user.premiumTier !== 'free_women' && (
                <div className={styles.subFeatureGrid}>
                  <div className={styles.subFeature}><span>✓</span> 4 matches per cycle</div>
                  <div className={styles.subFeature}><span>✓</span> Unlimited insights</div>
                  <div className={styles.subFeature}><span>✓</span> Priority matching</div>
                  <div className={styles.subFeature}><span>✓</span> Marriage Track option</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.subCard} style={user.premiumTier === 'marriage' ? { background: 'linear-gradient(135deg, rgba(212,168,92,0.1), rgba(195,149,70,0.05))', borderColor: 'rgba(212,168,92,0.3)' } : {}}>
                <div className={styles.subPlan}>
                  <div className={styles.subPlanName} style={user.premiumTier === 'marriage' ? { color: 'var(--gold)' } : { color: 'var(--sage)' }}>
                    {user.premiumTier === 'marriage' ? 'Marriage Track 👑' : 'Intent Plus ⭐'}
                  </div>
                  <div className={styles.subPlanDesc}>Active · Renews on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <button className={styles.dangerBtn} onClick={() => alert('Subscription paused for 30 days.')}>
                  Pause Subscription
                </button>
                <button className={styles.dangerBtn} style={{ color: 'var(--blush)' }} onClick={() => {
                  if(confirm('Cancel subscription? You will keep your benefits until the end of your billing cycle.')) {
                    alert('Subscription cancelled. No aggressive retention surveys shown.');
                  }
                }}>
                  Cancel Subscription
                </button>
              </div>
            </>
          )}
        </div>

        {/* DANGER */}
        <div className={styles.sectionGroup}>
          <div className={styles.groupLabel}>Account</div>
          <button className={styles.dangerBtn}>Pause account</button>
          <button className={styles.dangerBtn} style={{ color: 'var(--blush)' }}>Delete account</button>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLogo}>◈ intent</div>
          <div className={styles.footerVersion}>v1.0.0 · Made with care in Bangalore</div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Safety</a>
          </div>
        </div>
      </div>
    </MobileShell>
  )
}
