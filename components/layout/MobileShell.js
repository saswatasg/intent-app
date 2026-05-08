'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './MobileShell.module.css'

// 3-tab nav — clean, real-app feel
const NAV = [
  { href: '/home',   label: 'Matches', icon: '◈' },
  { href: '/chats',  label: 'Chats',   icon: '✉' },
  { href: '/profile',label: 'Profile', icon: null },
]

function isActive(pathname, href) {
  if (href === '/home')    return pathname === '/home'
  if (href === '/chats')   return pathname.startsWith('/chat') || pathname === '/chats'
  if (href === '/profile') return pathname.startsWith('/profile') || pathname.startsWith('/settings')
  return false
}

// Routes where the shell nav should be hidden
const SHELL_HIDDEN = ['/onboarding']

export default function MobileShell({ children }) {
  const pathname = usePathname()
  const hideNav = SHELL_HIDDEN.some(p => pathname.startsWith(p))

  return (
    <div className={styles.shell}>
      {/* Desktop ambient orbs */}
      <div className={styles.ambient} aria-hidden>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>

      <div className={styles.phone}>
        {/* Status bar */}
        <div className={styles.statusBar}>
          <span className={styles.statusTime}>9:41</span>
          <div className={styles.statusLogo}>
            <span className={styles.logoMark}>◈</span>
            <span className={styles.logoWord}>intent</span>
          </div>
          <div className={styles.statusRight}>
            <span className={styles.statusSignal}>▪▪▪</span>
            <span className={styles.statusBat}>▮▮▮▯</span>
          </div>
        </div>

        {/* Content */}
        <main className={styles.content}>
          {children}
        </main>

        {/* Bottom nav — hidden on onboarding */}
        {!hideNav && (
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV.map(item => {
              const active = isActive(pathname, item.href)
              return (
                <Link key={item.href} href={item.href}
                  className={`${styles.navItem} ${active ? styles.navActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.icon ? (
                    <span className={styles.navIcon}
                      style={{ color: active ? 'var(--sage-light)' : 'var(--muted-dark)' }}>
                      {item.icon}
                    </span>
                  ) : (
                    <div className={`${styles.navAvatar} ${active ? styles.navAvatarActive : ''}`}>
                      <Image src={CURRENT_USER.photo} alt="Me" fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="26px" />
                    </div>
                  )}
                  <span className={styles.navLabel}
                    style={{ color: active ? 'var(--sage-light)' : 'var(--muted-dark)' }}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
