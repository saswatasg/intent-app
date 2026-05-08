// ─── COMPATIBILITY MODULES — Research-backed questionnaire ─────────────────
// Based on: Big Five personality model, Attachment Theory (Bowlby/Ainsworth),
// Gottman's relationship research, and behavioral compatibility indicators.
//
// 1 entry module (5 questions) required at onboarding → instant match eligibility
// 6 progressive modules (30 questions) unlock better accuracy in-app
// Total: 7 modules, 35 questions

export const ENTRY_MODULE = {
  id: 'entry_intent',
  title: 'Quick Start',
  emoji: '⚡',
  color: 'var(--sage)',
  bgColor: 'rgba(123,163,140,0.08)',
  borderColor: 'rgba(123,163,140,0.25)',
  description: '5 high-signal questions to start matching immediately',
  researchBasis: 'Drawn from the most predictive questions across Values (Schwartz) and Attachment Theory (Bowlby). These 5 questions capture the highest-signal compatibility dimensions in under 2 minutes.',
  matchImpact: 'Baseline compatibility',
  weight: 0.30,
  required: true,
  progressive: false,
  questions: [
    {
      id: 'ei1', type: 'scenario',
      question: "Your partner gets a dream job offer in another city. You:",
      options: [
        { label: 'Support them fully, even if it means long-distance', trait: 'supportive' },
        { label: 'Expect them to factor in your career equally', trait: 'egalitarian' },
        { label: "Hope they'd prioritize the relationship", trait: 'relationship-first' },
        { label: 'Need time to process before responding', trait: 'reflective' },
      ]
    },
    {
      id: 'ei2', type: 'mcq',
      question: "Which matters most in a life partner?",
      options: [
        { label: 'Shared ambitions and goals', trait: 'ambition-match' },
        { label: 'Emotional security and stability', trait: 'security-oriented' },
        { label: 'Intellectual stimulation and growth', trait: 'intellectual' },
        { label: 'Fun, adventure, and spontaneity', trait: 'experience-oriented' },
      ]
    },
    {
      id: 'ei3', type: 'scenario',
      question: "After a heated argument, you typically:",
      options: [
        { label: 'Need space before talking it through', trait: 'avoidant-leaning' },
        { label: 'Want to resolve it immediately', trait: 'anxious-leaning' },
        { label: 'Can discuss calmly after a brief pause', trait: 'secure' },
        { label: 'Shut down and have trouble communicating', trait: 'disorganized' },
      ]
    },
    {
      id: 'ei4', type: 'slider',
      question: "How much emotional vulnerability are you comfortable with early on?",
      leftLabel: 'Very guarded',
      rightLabel: 'Open book from the start',
      trait: 'vulnerability_comfort'
    },
    {
      id: 'ei5', type: 'mcq',
      question: "What is your relationship goals timeline?",
      options: [
        { label: "Ready to settle down within a year", trait: 'immediate' },
        { label: "Looking for the right person — no rush, but serious", trait: 'intentional' },
        { label: "Focused on connection first, timeline later", trait: 'organic' },
        { label: "Want marriage within 2-3 years", trait: 'marriage-track' },
      ]
    }
  ]
}

export const MODULES = [
  {
    id: 'core_values',
    title: 'Core Values',
    emoji: '🧭',
    color: 'var(--sage)',
    bgColor: 'rgba(123,163,140,0.08)',
    borderColor: 'rgba(123,163,140,0.25)',
    description: 'What matters most to you in life and love',
    researchBasis: 'Based on Schwartz Theory of Basic Human Values — shared values are the #1 predictor of long-term relationship satisfaction.',
    matchImpact: 'Values alignment',
    weight: 0.15,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock deeper values matching',
    questions: [
      {
        id: 'cv1', type: 'mcq',
        question: "What does 'loyalty' mean most to you in a relationship?",
        options: [
          { label: "Always being honest, even when it's hard", trait: 'honesty-first' },
          { label: "Choosing your partner, even when it's inconvenient", trait: 'commitment-first' },
          { label: "Being emotionally present and consistent", trait: 'stability-first' },
          { label: "Growing together through challenges", trait: 'growth-first' },
        ]
      },
      {
        id: 'cv2', type: 'slider',
        question: "Where do you fall on career vs. personal life priority?",
        leftLabel: 'Career-focused',
        rightLabel: 'Relationship-first',
        trait: 'work_life_balance'
      },
      {
        id: 'cv3', type: 'scenario',
        question: "You discover your partner told a small lie to avoid conflict. You:",
        options: [
          { label: 'Confront them directly — honesty is non-negotiable', trait: 'direct' },
          { label: 'Wait for the right moment to bring it up', trait: 'measured' },
          { label: "Let it go — it was small, intentions matter more", trait: 'forgiving' },
          { label: 'Feel hurt but try to understand their intention', trait: 'empathetic' },
        ]
      },
      {
        id: 'cv4', type: 'mcq',
        question: "How do you handle disagreements about money in a relationship?",
        options: [
          { label: "We should have fully transparent finances", trait: 'transparent' },
          { label: "Keep some financial independence", trait: 'independent' },
          { label: "Whoever earns more should have more say", trait: 'traditional' },
          { label: "We figure it out as we go — not a dealbreaker", trait: 'flexible' },
        ]
      },
      {
        id: 'cv5', type: 'mcq',
        question: "What role does personal growth play in your relationship expectations?",
        options: [
          { label: "Essential — we should push each other to grow", trait: 'growth-driven' },
          { label: "Important, but comfort and stability matter more", trait: 'stability-first' },
          { label: "I want a partner who accepts me as I am", trait: 'acceptance' },
          { label: "Growth happens naturally — I don't force it", trait: 'organic' },
        ]
      }
    ]
  },
  {
    id: 'attachment_style',
    title: 'Emotional Style',
    emoji: '💙',
    color: 'var(--blush-light)',
    bgColor: 'rgba(196,130,122,0.08)',
    borderColor: 'rgba(196,130,122,0.25)',
    description: 'How you connect, process emotions, and handle closeness',
    researchBasis: 'Based on Attachment Theory (Bowlby & Ainsworth) — your attachment style shapes how you respond to intimacy, conflict, and emotional needs.',
    matchImpact: 'Emotional compatibility',
    weight: 0.15,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock emotional compatibility insights',
    questions: [
      {
        id: 'as1', type: 'mcq',
        question: "Your partner is going through a tough week but won't talk about it. You:",
        options: [
          { label: 'Give them space and gently check in later', trait: 'secure' },
          { label: "Push gently — they shouldn't bottle it up", trait: 'anxious-leaning' },
          { label: 'Distract them with something fun', trait: 'avoidant-leaning' },
          { label: "Feel anxious that they're shutting you out", trait: 'anxious' },
        ]
      },
      {
        id: 'as2', type: 'mcq',
        question: "How do you most naturally show love?",
        options: [
          { label: "Words — I tell people how I feel", trait: 'words-of-affirmation' },
          { label: "Touch — physical closeness matters most", trait: 'physical-touch' },
          { label: "Actions — I do things for people I care about", trait: 'acts-of-service' },
          { label: "Time — being fully present and attentive", trait: 'quality-time' },
        ]
      },
      {
        id: 'as3', type: 'scenario',
        question: "Your partner hasn't texted all day. Your first thought is:",
        options: [
          { label: "They're probably busy — I'll hear from them later", trait: 'secure' },
          { label: "I wonder if something is wrong between us", trait: 'anxious' },
          { label: "Good — I like having space in my day too", trait: 'avoidant' },
          { label: "I'll send a quick check-in text, no big deal", trait: 'secure-engaged' },
        ]
      },
      {
        id: 'as4', type: 'slider',
        question: "How quickly do you typically develop trust in a new relationship?",
        leftLabel: 'Very slowly — trust is earned',
        rightLabel: 'Quickly — I lead with trust',
        trait: 'trust_speed'
      },
      {
        id: 'as5', type: 'mcq',
        question: "When you feel insecure in a relationship, you tend to:",
        options: [
          { label: "Talk about it openly with my partner", trait: 'secure-communicator' },
          { label: "Seek reassurance — I need to hear it", trait: 'reassurance-seeking' },
          { label: "Pull back and protect myself emotionally", trait: 'self-protective' },
          { label: "Overanalyze everything in my head", trait: 'anxious-processor' },
        ]
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    emoji: '💬',
    color: 'var(--gold)',
    bgColor: 'rgba(212,168,92,0.08)',
    borderColor: 'rgba(212,168,92,0.25)',
    description: 'How you express needs, handle conflict, and listen',
    researchBasis: "Based on Gottman's Four Horsemen research — communication patterns are the strongest predictor of whether a relationship will last or fail.",
    matchImpact: 'Conflict compatibility',
    weight: 0.15,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock conflict style matching',
    questions: [
      {
        id: 'cc1', type: 'scenario',
        question: "You and your partner disagree on something important. Your approach:",
        options: [
          { label: 'Present your case logically and expect the same', trait: 'rational' },
          { label: 'Share how you feel first, facts second', trait: 'emotional-first' },
          { label: 'Look for compromise — meeting in the middle', trait: 'compromiser' },
          { label: 'Avoid the topic until emotions settle', trait: 'avoider' },
        ]
      },
      {
        id: 'cc2', type: 'mcq',
        question: "When giving critical feedback to your partner, you tend to:",
        options: [
          { label: 'Be direct and specific', trait: 'direct-communicator' },
          { label: 'Soften it with positives first', trait: 'diplomatic' },
          { label: 'Hint at it indirectly', trait: 'indirect' },
          { label: 'Avoid it unless absolutely necessary', trait: 'conflict-avoidant' },
        ]
      },
      {
        id: 'cc3', type: 'slider',
        question: "How important is daily texting/messaging in a relationship?",
        leftLabel: 'Fine with minimal contact',
        rightLabel: 'Need consistent daily conversation',
        trait: 'contact_frequency'
      },
      {
        id: 'cc4', type: 'mcq',
        question: "How often should couples have 'check-in' conversations about the relationship?",
        options: [
          { label: 'Regularly — monthly or biweekly', trait: 'proactive' },
          { label: 'When something comes up', trait: 'reactive' },
          { label: "Only when there's a problem", trait: 'issue-driven' },
          { label: "Rarely — if it's good, don't overthink it", trait: 'minimal' },
        ]
      },
      {
        id: 'cc5', type: 'scenario',
        question: "Your partner says something that hurts your feelings unintentionally. You:",
        options: [
          { label: 'Tell them right away — they should know', trait: 'assertive' },
          { label: "Wait to see if they notice on their own", trait: 'passive' },
          { label: "Mention it casually later so it doesn't feel heavy", trait: 'measured' },
          { label: "Let it go — holding on to it isn't worth the energy", trait: 'resilient' },
        ]
      }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    emoji: '🌿',
    color: '#6BB5A0',
    bgColor: 'rgba(107,181,160,0.08)',
    borderColor: 'rgba(107,181,160,0.25)',
    description: 'Daily habits, social energy, and how you live',
    researchBasis: 'Based on Big Five trait research — Conscientiousness and Extraversion are strongly correlated with day-to-day relationship friction or harmony.',
    matchImpact: 'Day-to-day harmony',
    weight: 0.10,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock lifestyle compatibility',
    questions: [
      {
        id: 'ls1', type: 'mcq',
        question: "Your ideal weekend looks like:",
        options: [
          { label: 'Social outings, events, or meetups', trait: 'extrovert' },
          { label: 'Quiet time at home — reading, cooking, Netflix', trait: 'introvert' },
          { label: 'Outdoor adventures — hiking, exploring, travel', trait: 'adventurous' },
          { label: 'A mix — depends on the week and my mood', trait: 'flexible' },
        ]
      },
      {
        id: 'ls2', type: 'slider',
        question: "How social are you in daily life?",
        leftLabel: 'Homebody',
        rightLabel: 'Social butterfly',
        trait: 'social_energy'
      },
      {
        id: 'ls3', type: 'mcq',
        question: "Your relationship with health and fitness:",
        options: [
          { label: "Daily discipline — it's non-negotiable", trait: 'disciplined' },
          { label: 'Regular but flexible (3-4x/week)', trait: 'moderate' },
          { label: 'Occasional (walks, weekend activities)', trait: 'casual' },
          { label: 'Not a priority right now', trait: 'inactive' },
        ]
      },
      {
        id: 'ls4', type: 'mcq',
        question: "Morning person or night owl?",
        options: [
          { label: 'Early riser — up before 7am', trait: 'morning' },
          { label: 'Night owl — energy peaks after 9pm', trait: 'night' },
          { label: "Flexible — I adapt to the situation", trait: 'flexible' },
          { label: "Chaotic — no consistent pattern", trait: 'chaotic' },
        ]
      },
      {
        id: 'ls5', type: 'mcq',
        question: "Your stance on alcohol:",
        options: [
          { label: "I don't drink at all", trait: 'non-drinker' },
          { label: 'Social drinker (occasionally)', trait: 'social-drinker' },
          { label: 'Regular but moderate', trait: 'moderate-drinker' },
          { label: "I enjoy it often — it\u0027s part of my social life", trait: 'regular-drinker' },
        ]
      }
    ]
  },
  {
    id: 'future_vision',
    title: 'Future Vision',
    emoji: '🔮',
    color: 'var(--gold-light)',
    bgColor: 'rgba(232,196,122,0.08)',
    borderColor: 'rgba(232,196,122,0.25)',
    description: 'Where you see your life heading in the next 5 years',
    researchBasis: 'Aligned life goals reduce relationship conflict by 40% (Gottman Institute). Misaligned timelines on major life decisions are the #1 cause of breakups in serious relationships.',
    matchImpact: 'Long-term alignment',
    weight: 0.10,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock future alignment matching',
    questions: [
      {
        id: 'fv1', type: 'mcq',
        question: "Where do you see yourself in 5 years?",
        options: [
          { label: 'Settled with a partner, building a home', trait: 'nesting' },
          { label: 'Growing in career, with a strong relationship alongside', trait: 'career-driven' },
          { label: "Open to anything — I don't plan that far ahead", trait: 'spontaneous' },
          { label: 'Focused on personal milestones first (travel, education)', trait: 'individual-growth' },
        ]
      },
      {
        id: 'fv2', type: 'mcq',
        question: "Your view on children:",
        options: [
          { label: "Want kids — it's a life goal", trait: 'wants-kids' },
          { label: 'Open to it — depends on the partner and timing', trait: 'flexible-kids' },
          { label: 'Prefer not to have children', trait: 'childfree' },
          { label: "Haven't decided yet", trait: 'undecided-kids' },
        ]
      },
      {
        id: 'fv3', type: 'slider',
        question: "How involved should family be in your relationship decisions?",
        leftLabel: 'Completely independent',
        rightLabel: 'Family input matters a lot',
        trait: 'family_involvement'
      },
      {
        id: 'fv4', type: 'mcq',
        question: "How important is financial alignment with a partner?",
        options: [
          { label: "Very — we should save and spend similarly", trait: 'aligned' },
          { label: "Somewhat — as long as we communicate about it", trait: 'communicative' },
          { label: "Not much — we can manage independently", trait: 'independent' },
          { label: "Depends on who earns more", trait: 'conditional' },
        ]
      },
      {
        id: 'fv5', type: 'mcq',
        question: "What does 'success' in a relationship look like to you?",
        options: [
          { label: 'Growing together as a team', trait: 'teamwork' },
          { label: 'Deep emotional intimacy and understanding', trait: 'emotional-depth' },
          { label: 'Shared experiences and adventures', trait: 'experiential' },
          { label: 'Stability, trust, and mutual respect', trait: 'stability' },
        ]
      }
    ]
  },
  {
    id: 'dealbreakers',
    title: 'Dealbreakers',
    emoji: '🚩',
    color: '#E06B6B',
    bgColor: 'rgba(224,107,107,0.08)',
    borderColor: 'rgba(224,107,107,0.25)',
    description: 'Hard lines that help us filter before matching',
    researchBasis: 'Research shows that dealbreaker alignment is more important than shared interests. People overweight positives and underweight negatives in early attraction.',
    matchImpact: 'Dealbreaker filtering',
    weight: 0.05,
    required: false,
    progressive: true,
    unlockMessage: 'Unlock dealbreaker filtering',
    questions: [
      {
        id: 'db1', type: 'mcq',
        question: "How do you feel about smoking?",
        options: [
          { label: "Absolute dealbreaker — I won't date a smoker", trait: 'no-smoking' },
          { label: "Prefer non-smoker, but not rigid", trait: 'flexible' },
          { label: "Don't mind at all", trait: 'no-preference' },
          { label: "I smoke myself", trait: 'smoker' },
        ]
      },
      {
        id: 'db2', type: 'mcq',
        question: "How important is religious or spiritual alignment?",
        options: [
          { label: "Very — we should share the same faith", trait: 'same-faith' },
          { label: "Somewhat — mutual respect is enough", trait: 'respectful' },
          { label: "Not important at all", trait: 'indifferent' },
          { label: "I'd prefer someone non-religious", trait: 'secular' },
        ]
      },
      {
        id: 'db3', type: 'mcq',
        question: "Your partner's political views:",
        options: [
          { label: "Must align closely with mine", trait: 'aligned' },
          { label: "Should be compatible but not identical", trait: 'compatible' },
          { label: "Don't matter if we respect each other", trait: 'respectful' },
          { label: "I actually prefer someone who challenges my views", trait: 'challenger' },
        ]
      },
      {
        id: 'db4', type: 'mcq',
        question: "Could you date someone who is very close with their ex?",
        options: [
          { label: "Absolutely not — clean break or nothing", trait: 'strict' },
          { label: "Depends on the context and boundaries", trait: 'conditional' },
          { label: "Yes — maturity means handling it well", trait: 'secure' },
          { label: "I'm close with my own ex, so yes", trait: 'open' },
        ]
      },
      {
        id: 'db5', type: 'slider',
        question: "How important is physical attraction vs. emotional connection?",
        leftLabel: 'Emotional connection is everything',
        rightLabel: 'Physical attraction matters equally',
        trait: 'attraction_weight'
      }
    ]
  }
]

// All modules including entry (for the modules page)
export const ALL_MODULES = [ENTRY_MODULE, ...MODULES]

// ── MODULE COMPLETION TIERS (1 = entry only, 7 = all complete) ──────────────
// completedCount includes the entry module
export const MODULE_TIERS = {
  1: {
    label: 'Starter',
    matchAccuracy: '~50%',
    matchesMen: 2,
    matchesWomen: 1,
    features: [
      'Basic matching enabled',
      'No AI icebreakers',
      'No "Why we matched" insights',
    ],
    nextUnlock: 'Complete 1 more module → 65% accuracy',
    color: 'var(--muted)',
    badge: '🔓',
  },
  2: {
    label: 'Rising',
    matchAccuracy: '~65%',
    matchesMen: 2,
    matchesWomen: 1,
    features: [
      'Improved matching accuracy',
      'Basic icebreakers',
      'Limited compatibility breakdown',
    ],
    nextUnlock: 'Complete 1 more module → 75% accuracy + AI icebreakers',
    color: 'var(--gold)',
    badge: '⭐',
  },
  3: {
    label: 'Strong',
    matchAccuracy: '~75%',
    matchesMen: 3,
    matchesWomen: 1,
    features: [
      'AI-generated custom icebreakers',
      'Detailed compatibility breakdown',
      'Partial "Why we matched" insights',
    ],
    nextUnlock: 'Complete 1 more module → 82% accuracy',
    color: 'var(--sage)',
    badge: '🌟',
  },
  4: {
    label: 'Deep',
    matchAccuracy: '~82%',
    matchesMen: 3,
    matchesWomen: 1,
    features: [
      'Full compatibility breakdown',
      'Detailed "Why we matched" insights',
      'Full AI insights',
    ],
    nextUnlock: 'Complete 1 more module → 88% accuracy',
    color: 'var(--sage)',
    badge: '💎',
  },
  5: {
    label: 'Elite',
    matchAccuracy: '~88%',
    matchesMen: 3,
    matchesWomen: 1,
    features: [
      'Near-maximum match accuracy',
      'All AI features unlocked',
      'Priority in matching queue',
    ],
    nextUnlock: 'Complete 1 more module → 93% accuracy',
    color: 'var(--sage-light)',
    badge: '🏆',
  },
  6: {
    label: 'Master',
    matchAccuracy: '~93%',
    matchesMen: 3,
    matchesWomen: 1,
    features: [
      'Near-complete profile',
      'Maximum matching priority',
    ],
    nextUnlock: 'Complete final module → 95%+ accuracy + Complete badge',
    color: 'var(--gold-light)',
    badge: '💫',
  },
  7: {
    label: 'Complete',
    matchAccuracy: '95%+',
    matchesMen: 3,
    matchesWomen: 1,
    features: [
      'Maximum match accuracy',
      'Priority matching queue',
      'All AI features unlocked',
      '"Complete Profile" badge visible to matches',
    ],
    nextUnlock: null,
    color: 'var(--gold-light)',
    badge: '👑',
  },
}

export function getModuleTier(completedCount) {
  const clamped = Math.min(Math.max(completedCount, 1), 7)
  return MODULE_TIERS[clamped]
}

// Helper to get next accuracy jump text
export function getNextAccuracyNudge(completedCount) {
  const tier = getModuleTier(completedCount)
  return tier.nextUnlock
}
