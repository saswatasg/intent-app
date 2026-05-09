'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './MobileShell.module.css'

const NAV = [
  { href: '/home',    label: 'Home',     icon: 'home' },
  { href: '/modules', label: 'Modules',  icon: 'modules' },
  { href: '/chats',   label: 'Chat',     icon: 'chat' },
  { href: '/profile', label: 'Profile',  icon: null },
]

function isActive(pathname, href) {
  if (href === '/home')    return pathname === '/home'
  if (href === '/modules') return pathname === '/modules'
  if (href === '/chats')   return pathname.startsWith('/chat') || pathname === '/chats'
  if (href === '/profile') return pathname.startsWith('/profile') || pathname.startsWith('/settings')
  return false
}

const SHELL_HIDDEN = ['/onboarding']

function NavIcon({ type, active }) {
  const color = active ? 'var(--coral)' : 'var(--text-muted)'
  const svgProps = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  
  if (type === 'home') return (
    <svg {...svgProps}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
  if (type === 'modules') return (
    <svg {...svgProps}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
    </svg>
  )
  if (type === 'chat') return (
    <svg {...svgProps}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill={active ? 'rgba(224,122,95,0.15)' : 'none'} />
    </svg>
  )
  return null
}

export default function MobileShell({ children }) {
  const pathname = usePathname()
  const hideNav = SHELL_HIDDEN.some(p => pathname.startsWith(p))

  return (
    <div className={styles.shell}>
      <div className={styles.phone}>
        <main className={styles.content}>
          {children}
        </main>

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
                    <NavIcon type={item.icon} active={active} />
                  ) : (
                    <div className={`${styles.navAvatar} ${active ? styles.navAvatarActive : ''}`}>
                      <Image src={CURRENT_USER.photo} alt="Me" fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="24px" />
                    </div>
                  )}
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
