'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MobileShell from '@/components/layout/MobileShell'
import { CURRENT_USER } from '@/lib/mockData'
import styles from './page.module.css'

function RazorpayModal({ plan, onClose, onSuccess }) {
  const [processing, setProcessing] = useState(false)

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onSuccess(plan.id)
    }, 1500)
  }

  return (
    <div className={styles.rpOverlay}>
      <div className={styles.rpModal}>
        <div className={styles.rpHeader}>
          <div className={styles.rpTitle}>Razorpay Simulated Checkout</div>
          <button className={styles.rpClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.rpDetail}>
          <span>Subscription</span>
          <span>{plan.name}</span>
        </div>
        <div className={styles.rpDetail}>
          <span>Billing cycle</span>
          <span>Monthly</span>
        </div>
        <div className={styles.rpTotal}>
          <span>Total</span>
          <span>₹{plan.price}</span>
        </div>
        <button className={styles.rpBtn} onClick={handlePay} disabled={processing}>
          {processing ? 'Processing...' : `Pay ₹${plan.price}`}
        </button>
        <p style={{fontSize:'0.75rem', color:'#888', marginTop:12, textAlign:'center'}}>
          Auto-renews until cancelled.
        </p>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  const router = useRouter()
  // Mock current tier. In reality, read from context/Supabase
  const [currentTier, setCurrentTier] = useState(CURRENT_USER.premiumTier || 'free')
  const [checkoutPlan, setCheckoutPlan] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleUpgrade = (planId) => {
    // In prototype, just set state. In reality, update Supabase user record
    setCurrentTier(planId)
    setCheckoutPlan(null)
    alert(`Successfully upgraded to ${planId.toUpperCase()}!`)
    // If marriage, redirect to coaching or profile
    if (planId === 'marriage') {
      router.push('/coaching')
    } else {
      router.back()
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Intent Free',
      price: '0',
      tag: null,
      style: styles.card,
      checkStyle: styles.featureCheck,
      features: [
        '3 curated matches per cycle',
        'Basic compatibility scores',
        '14-day conversation window'
      ]
    },
    {
      id: 'plus',
      name: 'Intent Plus',
      desc: 'More signal. Less noise.',
      price: '499',
      tag: 'Recommended',
      tagStyle: styles.cardTag,
      style: `${styles.card} ${styles.cardPlus}`,
      checkStyle: styles.featureCheck,
      features: [
        '4 matches per cycle',
        'Unlimited AI conversational insights',
        'Extended 21-day window',
        'Granular psychological scores'
      ]
    },
    {
      id: 'marriage',
      name: 'Marriage Track',
      desc: 'Built for serious commitment. Verified. Coached.',
      price: '1,499',
      tag: 'For when you mean it.',
      tagStyle: `${styles.cardTag} ${styles.cardTagMarriage}`,
      style: `${styles.card} ${styles.cardMarriage}`,
      checkStyle: styles.featureCheckGold,
      features: [
        'Everything in Plus',
        'Marriage-intent-only matching pool',
        'Priority queue placement',
        'Monthly 30-min relationship coaching',
        'Verified "Marriage Intent" badge',
        'Deep compatibility reports post-chat'
      ]
    }
  ]

  const faqs = [
    { q: "Why Marriage Track?", a: "The Marriage Track is designed exclusively for users ready for lifelong commitment. The higher barrier to entry ensures you only match with equally serious people, and the included coaching session helps navigate early relationship building." },
    { q: "How does the coaching work?", a: "Once subscribed to the Marriage Track, you can book a 30-minute monthly video call with one of our vetted relationship coaches to discuss your matches, communication roadblocks, or relationship goals." },
    { q: "Can I cancel anytime?", a: "Yes. You can pause or cancel your subscription instantly from your Settings. No hidden fees or aggressive retention flows." }
  ]

  return (
    <MobileShell>
      <div className={styles.page}>
        
        {checkoutPlan && (
          <RazorpayModal plan={checkoutPlan} onClose={() => setCheckoutPlan(null)} onSuccess={handleUpgrade} />
        )}

        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => router.back()}>←</button>
          <div className={styles.ghostBtn} />
        </div>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Dating with intent. Designed for what's next.</h1>
          <p className={styles.heroSub}>Choose the tier that matches your relationship goals.</p>
        </div>

        <div className={styles.pricingCards}>
          {plans.map(plan => {
            const isCurrent = currentTier === plan.id
            const isDowngrade = (currentTier === 'marriage' && plan.id !== 'marriage') || (currentTier === 'plus' && plan.id === 'free')
            
            return (
              <div key={plan.id} className={plan.style}>
                {plan.tag && <div className={plan.tagStyle}>{plan.tag}</div>}
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>{plan.name}</div>
                  {plan.desc && <div style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px', marginBottom: '12px' }}>{plan.desc}</div>}
                  <div className={styles.cardPrice}>
                    ₹{plan.price} <span className={styles.cardPriceSub}>/ mo</span>
                    {plan.id !== 'free' && <span className={styles.savingBadge}>Save 33% yearly</span>}
                  </div>
                </div>

                <ul className={styles.featuresList}>
                  {plan.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={plan.checkStyle}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`${styles.cardBtn} ${isCurrent ? styles.btnCurrent : plan.id === 'marriage' ? styles.btnMarriage : styles.btnPlus}`}
                  onClick={() => !isCurrent && !isDowngrade && setCheckoutPlan(plan)}
                  disabled={isCurrent || isDowngrade}
                >
                  {isCurrent ? 'Current Plan' : isDowngrade ? 'Included in current plan' : `Select ${plan.name}`}
                </button>
              </div>
            )
          })}
        </div>

        <div className={styles.faqSection}>
          <div style={{fontSize:'0.9375rem', fontWeight:800, marginBottom:16, paddingLeft:4}}>Frequently Asked Questions</div>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.faqItem}>
              <button className={styles.faqQuestion} onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                {faq.q}
                <span style={{color:'var(--sage)', transform: expandedFaq===i ? 'rotate(180deg)' : 'none', transition:'transform 0.2s'}}>▼</span>
              </button>
              {expandedFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>

      </div>
    </MobileShell>
  )
}
