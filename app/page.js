'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    const onboarded = localStorage.getItem('intent_onboarded')
    router.replace(onboarded === 'true' ? '/home' : '/onboarding')
  }, [router])
  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0D1728', color: '#7BA38C', fontSize: '2rem',
      fontFamily: 'system-ui', letterSpacing: '0.05em',
      animation: 'pulse 1.2s ease-in-out infinite'
    }}>
      ◈
    </div>
  )
}
