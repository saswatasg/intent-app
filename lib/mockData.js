// ─── MOCK DATA — Intent App ────────────────────────────────────────────────

export const CURRENT_USER = {
  id: 'user_self',
  name: 'Arjun',
  age: 29,
  gender: 'man',
  city: 'Bangalore',
  profession: 'Senior Product Manager',
  photo: '/photos/arjun.jpg',
  intentLevel: 'long_term',
  mode: 'serious',
  verified: 'selfie',
  premiumTier: 'free',
  matchPaused: false,
  streak: 7,
  intentScore: 84,
  weekStats: { matchesReviewed: 6, conversationsStarted: 2, deepConversations: 1, avgResponseTime: '22 min' },
  achievements: ['first_match', 'deep_conversation', 'week_streak'],
  profileCompletion: 85,
  personalitySnapshot: {
    summary: "You're a reflective communicator who values emotional depth and genuine connection. Career-driven but partnership-first at heart. You prefer deep conversations over surface-level texting — and it shows in how you show up.",
    traits: ['Emotionally perceptive', 'Partnership-first', 'Consistent communicator', 'Values-led', 'Growth-oriented'],
    attachmentStyle: 'Secure',
    conflictStyle: 'Collaborative',
    loveLanguage: 'Quality time'
  },
  prompts: [
    { q: "The most important thing I've learned about relationships is...", a: "That showing up consistently matters more than grand gestures. Anyone can be romantic on Valentine's Day." },
    { q: "A perfect Sunday for me looks like...", a: "A long brunch with good coffee, then a walk somewhere quiet, then cooking dinner while a podcast plays in the background." },
    { q: "I'm looking for someone who...", a: "Has opinions about things, asks real questions, and isn't afraid of a little vulnerability." }
  ]
}

export const MATCHES = [
  {
    id: 'match_001',
    userId: 'user_priya',
    name: 'Priya',
    age: 27,
    city: 'Bangalore',
    profession: 'UX Researcher',
    photo: '/photos/priya.jpg',
    verified: 'selfie',
    totalScore: 82,
    breakdown: { values: 87, emotional: 84, lifestyle: 74, intent: 90, communication: 78 },
    explanation: "You both see loyalty as showing up consistently, not just saying the right things. Priya shares your preference for resolving conflict through calm conversation rather than avoidance. Where you differ — she's more spontaneous on weekends while you prefer planning — could actually bring a fun balance.",
    insights: [
      "You both value emotional honesty and prefer deep conversations over small talk.",
      "Similar career ambition levels, but she's more adventurous on weekends — a complementary dynamic."
    ],
    status: 'delivered',
    deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 46 * 60 * 60 * 1000),
    intentLevel: 'long_term',
    mode: 'serious',
    prompts: [
      { q: "I feel most alive when...", a: "I'm in a coffee shop in a city I don't know, with a good book and absolutely nowhere to be." },
      { q: "My friends would describe me as...", a: "The one who remembers the details — your sister's name, the thing you said three months ago that mattered." },
      { q: "The way to my heart is...", a: "Recommending something you love without overselling it. Books, songs, places. Just 'I think you'd like this.'" }
    ]
  },
  {
    id: 'match_002',
    userId: 'user_kavya',
    name: 'Kavya',
    age: 28,
    city: 'Bangalore',
    profession: 'Sustainability Consultant',
    photo: '/photos/kavya.jpg',
    verified: 'id',
    totalScore: 76,
    breakdown: { values: 91, emotional: 68, lifestyle: 71, intent: 88, communication: 64 },
    explanation: "Kavya and you share an unusually precise alignment on what a long-term relationship should look like — both of you want a partner who's genuinely curious, not just agreeable. The area to watch is communication rhythm: she prefers space to process before talking, while you lean toward resolving things sooner.",
    insights: [
      "Deeply aligned on core values and long-term vision — both want partnership, not dependence.",
      "Different conflict styles could create friction early — but both of you value resolution over avoidance."
    ],
    status: 'delivered',
    deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 46 * 60 * 60 * 1000),
    intentLevel: 'marriage',
    mode: 'serious',
    prompts: [
      { q: "I geek out about...", a: "Urban sustainability — the boring intersection of city planning, public transport, and why European cities work better than ours." },
      { q: "A perfect Sunday for me looks like...", a: "Farmers market in the morning, long lunch with family, nap that goes on too long, guilt-free." },
      { q: "I'm looking for someone who...", a: "Takes their work seriously but doesn't take themselves too seriously." }
    ]
  },
  {
    id: 'match_003',
    userId: 'user_meera',
    name: 'Meera',
    age: 26,
    city: 'Bangalore',
    profession: 'Clinical Psychologist',
    photo: '/photos/meera.jpg',
    verified: 'selfie',
    totalScore: 71,
    breakdown: { values: 78, emotional: 88, lifestyle: 59, intent: 72, communication: 82 },
    explanation: "Meera's emotional intelligence is exceptional, and she'd match your reflective communication style in a way most people don't. The lifestyle gap is real — she's a social butterfly where you lean toward quieter weekends — but she's thoughtful enough to calibrate to a partner.",
    insights: [
      "Highest emotional compatibility score of this cycle — you'd read each other well.",
      "Lifestyle alignment is the wildcard — worth exploring how she thinks about balance."
    ],
    status: 'delivered',
    deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 46 * 60 * 60 * 1000),
    intentLevel: 'exploring_seriously',
    mode: 'serious',
    prompts: [
      { q: "I knew I needed to be on this app when...", a: "I realized I was way better at helping my clients find clarity in relationships than I was at finding it myself." },
      { q: "My friends would describe me as...", a: "The one you call when something real is happening. Also the one who laughs too loud at my own jokes." },
      { q: "I feel most alive when...", a: "I'm on a trek with people I trust, completely off-grid, realizing how little I actually need." }
    ]
  }
]

export const CONVERSATIONS = [
  {
    id: 'conv_001',
    matchId: 'match_001',
    partnerId: 'user_priya',
    partnerName: 'Priya',
    partnerPhoto: '/photos/priya.jpg',
    verified: 'selfie',
    depthScore: 'deep',
    depthPercent: 78,
    messageCount: 31,
    avgResponseTime: '18 min',
    startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastMessageAt: new Date(Date.now() - 35 * 60 * 1000),
    lastMessage: "I think that's exactly it — consistency is the most underrated form of care.",
    lastMessageIsMe: false,
    icebreakerUsed: true,
    status: 'active',
    score: 82,
    isOnline: true,
    messages: [
      { id: 'm1', senderId: 'user_priya', content: "Your icebreaker was too good not to answer immediately 😄 — The last place I discovered that surprised me was Hampi. I went expecting ruins, got completely undone by the scale of everything.", sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm2', senderId: 'user_self', content: "Hampi breaks something open in you, doesn't it? I went two years ago and still think about the boulder landscape. Did you go solo?", sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 22 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm3', senderId: 'user_priya', content: "Solo. Which I was terrified of and then didn't want to end. I think that trip taught me more about what I actually want than any conversation I'd had that year.", sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm4', senderId: 'user_self', content: "That's a beautiful way to put it. Travel as a mirror. I find solo trips strip away the performance of being with people — you figure out who you actually are when no one's watching.", sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm5', senderId: 'user_priya', content: "Yes! And then you come back and realize how much of your social life is just... performance. Not in a cynical way, just — you see it more clearly.", sentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm6', senderId: 'user_self', content: "Do you think that changes how you want to show up in a relationship? Like the clarity you get from that kind of solitude?", sentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm7', senderId: 'user_priya', content: "100%. I used to think I needed constant togetherness to feel close to someone. Now I think I want someone who can be their own person and then choose to be around me. There's a difference.", sentAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm8', senderId: 'user_self', content: "That distinction is everything. Chosen presence vs. default proximity. I feel like most relationships that fail do so because people mistake one for the other.", sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm9', senderId: 'user_priya', content: "You just articulated something I've been thinking about for two years and couldn't find the words for.", sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm10', senderId: 'user_self', content: "I feel like this conversation is going somewhere interesting. Can I ask you something more direct?", sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm11', senderId: 'user_priya', content: "Please do. The small talk phase on apps is always the hardest part for me.", sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 38 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm12', senderId: 'user_self', content: "What's something you've realized you need in a relationship that you thought you could live without?", sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 50 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm13', senderId: 'user_priya', content: "Intellectual challenge. I used to think I just wanted someone kind and stable. Turns out I also need someone who makes me think differently. Who argues well, not loudly.", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'm14', senderId: 'user_self', content: "Argues well, not loudly — I'm using that forever. Mine is consistency. Not grand gestures, just showing up the same way every time. It's boring to say but everything to experience.", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'm15', senderId: 'user_priya', content: "I think that's exactly it — consistency is the most underrated form of care.", sentAt: new Date(Date.now() - 35 * 60 * 1000), readAt: null, type: 'received' }
    ],
    icebreakers: [
      "You both said your ideal weekend involves exploring new places — what's the last place you discovered that surprised you?",
      "So you're a morning person and she's a night owl — who's making breakfast and who's making midnight snacks?",
      "You both value emotional honesty. When was the last time being honest in a relationship felt really hard?"
    ]
  },
  {
    id: 'conv_002',
    matchId: 'match_002',
    partnerId: 'user_kavya',
    partnerName: 'Kavya',
    partnerPhoto: '/photos/kavya.jpg',
    verified: 'id',
    depthScore: 'building',
    depthPercent: 42,
    messageCount: 8,
    avgResponseTime: '2h 14min',
    startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastMessageAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    lastMessage: "Haha okay that's fair — give me a day to think about that one.",
    lastMessageIsMe: false,
    icebreakerUsed: true,
    status: 'active',
    score: 76,
    isOnline: false,
    messages: [
      { id: 'k1', senderId: 'user_self', content: "The farmers market → guilty nap Sunday sounds like a religion I want to join. Which one in Bangalore?", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'k2', senderId: 'user_kavya', content: "Jayanagar 4th Block one! Criminally underrated. They have these little achaar stalls that are worth the entire trip. Do you do markets?", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'k3', senderId: 'user_self', content: "I want to. I keep meaning to and then Sunday mornings happen and suddenly it's noon and I'm still in bed with coffee. Classic.", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'k4', senderId: 'user_kavya', content: "I respect the honesty 😄 What does your ideal Sunday actually look like vs what it is?", sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'k5', senderId: 'user_self', content: "Ideal: farmers market, cook something ambitious, long evening walk. Actual: read, order in, feel mildly guilty about the walk. You?", sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'k6', senderId: 'user_kavya', content: "Mine is alarmingly close to the ideal version actually. Which either means I have my life together or I have no spontaneity left. Haven't decided which.", sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000), readAt: new Date(), type: 'received' },
      { id: 'k7', senderId: 'user_self', content: "Both can be true. I'd argue spontaneity is overrated in daily life — save it for the big things. But that's probably a whole conversation.", sentAt: new Date(Date.now() - 8 * 60 * 60 * 1000), readAt: new Date(), type: 'sent' },
      { id: 'k8', senderId: 'user_kavya', content: "Haha okay that's fair — give me a day to think about that one.", sentAt: new Date(Date.now() - 3 * 60 * 60 * 1000), readAt: new Date(), type: 'received' }
    ],
    icebreakers: [
      "You both care deeply about long-term impact — how does that show up in how you choose your work?",
      "You're structure-first and she's spontaneous at the micro level. Who's planning the first date and who's winging it?",
      "You both want partnership, not dependence. What does that actually look like day-to-day for you?"
    ]
  }
]

export const INSIGHTS_REPORT = {
  id: 'insight_001',
  conversationId: 'conv_001',
  partnerName: 'Priya',
  partnerPhoto: '/photos/priya.jpg',
  matchScore: 82,
  generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  metrics: {
    totalMessages: 31,
    daysActive: 5,
    avgResponseTimeYou: '22 min',
    avgResponseTimeThem: '18 min',
    reciprocityScore: 94,
    longestMessageYou: 142,
    longestMessageThem: 128,
    voiceNotesSent: 0,
    youInitiated: 8,
    theyInitiated: 7,
    peakTimeYou: '9–11 PM',
    peakTimeThem: '7–9 PM',
  },
  behavioralObservations: [
    "She responds quickly and consistently — average 18 minutes — suggesting high interest and a prioritized approach to conversation.",
    "You tend to write slightly longer messages, which indicates investment. She reciprocates in depth rather than length — a healthy dynamic.",
    "Conversation initiation is nearly balanced (8 vs 7), a strong signal of mutual interest rather than one-sided effort.",
    "Response times have gotten faster over the past two days — a consistent pattern of growing comfort and anticipation."
  ],
  compatibilityInsight: "Your initial compatibility was strong across values and emotional style (82% match), and your conversation patterns confirm and amplify this. The balance of effort, the depth of topics, and the natural progression from exploration to genuine vulnerability are all positive signals. The one thing worth noting: your peak engagement times differ slightly (you're most active later in the evening; she's earlier) — not a problem, but worth being aware of as expectations around response cadence develop.",
  recommendation: 'strong_potential',
  recommendationLabel: 'Strong potential',
  recommendationColor: '#7BA38C',
  recommendationText: "High compatibility + strong conversation signals. The depth of this conversation is rare for a first week. Worth investing more time.",
  breakdown: { values: 87, emotional: 84, lifestyle: 74, intent: 90, communication: 78 }
}

export const ACHIEVEMENTS = [
  { id: 'first_match', emoji: '✨', title: 'First Connection', desc: 'Started your first conversation', earned: true },
  { id: 'deep_conversation', emoji: '🌊', title: 'Deep Diver', desc: 'Reached Deep depth level', earned: true },
  { id: 'week_streak', emoji: '🔥', title: '7-Day Streak', desc: 'Active for 7 days in a row', earned: true },
  { id: 'high_scorer', emoji: '⭐', title: 'High Compatibility', desc: 'Got an 80%+ match score', earned: true },
  { id: 'insight_reader', emoji: '🔍', title: 'Pattern Spotter', desc: 'Read your first insight report', earned: false },
  { id: 'connected', emoji: '🫀', title: 'Connected', desc: 'Reach Connected depth level', earned: false },
]

export const NEXT_MATCH_TIME = new Date(Date.now() + 46 * 60 * 60 * 1000 + 12 * 60 * 1000)

export const ONBOARDING_QUESTIONS_C = [
  { id: 'cv1', dim: 'values', dimLabel: 'Core Values', type: 'scenario', weight: 0.30, question: "Your partner gets a dream job offer in another city. You:", options: ['Support them fully, even if it means long-distance', 'Expect them to factor in your career too', "Hope they'd prioritize the relationship", 'Need time to process before responding'] },
  { id: 'cv2', dim: 'values', dimLabel: 'Core Values', type: 'slider', weight: 0.30, question: "Where do you fall on career vs. personal life priority?", leftLabel: 'Career-focused', rightLabel: 'Family/personal-life-first' },
  { id: 'cv3', dim: 'values', dimLabel: 'Core Values', type: 'mcq', weight: 0.30, question: "What does 'loyalty' mean most to you in a relationship?", options: ["Always being honest, even when it's hard", "Choosing your partner, even when it's inconvenient", "Defending your partner publicly, always", "Being emotionally present and consistent"] },
  { id: 'cv4', dim: 'values', dimLabel: 'Core Values', type: 'scenario', weight: 0.30, question: "You discover your partner told a small lie to avoid conflict. You:", options: ['Confront them immediately', 'Wait for the right moment to bring it up', "Let it go — it was small", 'Feel hurt but understand their intention'] },
  { id: 'cv5', dim: 'values', dimLabel: 'Core Values', type: 'mcq', weight: 0.30, question: "Which matters most in a life partner?", options: ['Shared ambitions and goals', 'Emotional security and stability', 'Intellectual stimulation and growth', 'Fun, adventure, and spontaneity'] },
  { id: 'cv6', dim: 'values', dimLabel: 'Core Values', type: 'slider', weight: 0.30, question: "How important is financial alignment with a partner?", leftLabel: 'Not important at all', rightLabel: 'Deal-breaker level important' },
  { id: 'ei1', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'scenario', weight: 0.25, question: "After an argument, you typically:", options: ['Need space before talking', 'Want to resolve it immediately', 'Can discuss calmly after a brief pause', 'Shut down and stop communicating'] },
  { id: 'ei2', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'mcq', weight: 0.25, question: "If your partner cancels plans last minute, your first reaction is:", options: ['Get upset but try to understand their reason', 'Ask what happened — communication first', "Don't mind, things happen", 'Feel disrespected and tell them'] },
  { id: 'ei3', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'slider', weight: 0.25, question: "How much emotional vulnerability are you comfortable with early in a relationship?", leftLabel: 'Very guarded', rightLabel: 'Open book from the start' },
  { id: 'ei4', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'scenario', weight: 0.25, question: "Your partner is going through a tough week but doesn't want to talk about it. You:", options: ['Give them space and check in later', "Gently push — they shouldn't bottle it up", 'Distract them with something fun', "Feel anxious that they're shutting you out"] },
  { id: 'ei5', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'mcq', weight: 0.25, question: "How do you most naturally show affection?", options: ['Words — I tell people how I feel', 'Touch — Physical closeness matters most', 'Actions — I do things for people I care about', 'Time — Being present and attentive'] },
  { id: 'ei6', dim: 'emotional', dimLabel: 'Emotional Intelligence', type: 'slider', weight: 0.25, question: "How important is it that your partner expresses emotions frequently?", leftLabel: 'Not necessary', rightLabel: 'Essential' },
  { id: 'ls1', dim: 'lifestyle', dimLabel: 'Lifestyle', type: 'mcq', weight: 0.20, question: "Your ideal weekend looks like:", options: ['Social outings with friends', 'Quiet time at home (reading, cooking, Netflix)', 'Outdoor adventures / travel / exploring', 'A mix — depends on the week'] },
  { id: 'ls2', dim: 'lifestyle', dimLabel: 'Lifestyle', type: 'slider', weight: 0.20, question: "How social are you in daily life?", leftLabel: 'Homebody', rightLabel: 'Social butterfly' },
  { id: 'ls3', dim: 'lifestyle', dimLabel: 'Lifestyle', type: 'mcq', weight: 0.20, question: "Your relationship with fitness:", options: ["Daily discipline — it's non-negotiable", 'Regular but flexible (3-4x/week)', 'Occasional (walks, weekend activities)', 'Not a priority right now'] },
  { id: 'ls4', dim: 'lifestyle', dimLabel: 'Lifestyle', type: 'mcq', weight: 0.20, question: "Morning person or night owl?", options: ['Early riser (up before 7am)', 'Night owl (energy peaks after 9pm)', "Flexible — I adapt", "Chaotic — no pattern"] },
  { id: 'ls5', dim: 'lifestyle', dimLabel: 'Lifestyle', type: 'mcq', weight: 0.20, question: "Your stance on alcohol:", options: ["I don't drink at all", 'Social drinker (occasional)', 'Regular but moderate', "I enjoy it often"] },
  { id: 'cc1', dim: 'communication', dimLabel: 'Communication', type: 'scenario', weight: 0.15, question: "You and your partner disagree on something important. Your approach:", options: ['Present your case logically and expect the same', 'Share how you feel first, facts second', 'Look for compromise — meeting in the middle', 'Avoid the topic until emotions settle'] },
  { id: 'cc2', dim: 'communication', dimLabel: 'Communication', type: 'mcq', weight: 0.15, question: "How often should couples have 'serious' conversations about the relationship?", options: ['Regularly — monthly check-ins', 'When something comes up', "Only when there's a problem", "Rarely — if it's good, don't overthink it"] },
  { id: 'cc3', dim: 'communication', dimLabel: 'Communication', type: 'slider', weight: 0.15, question: "How important is texting/messaging frequency in a relationship?", leftLabel: "Fine with minimal contact", rightLabel: 'Want consistent daily conversation' },
  { id: 'cc4', dim: 'communication', dimLabel: 'Communication', type: 'mcq', weight: 0.15, question: "When giving feedback to your partner, you tend to:", options: ['Be direct and specific', 'Soften it with positives first', 'Hint at it indirectly', 'Avoid it unless absolutely necessary'] },
  { id: 'ia1', dim: 'intent', dimLabel: 'Future Vision', type: 'mcq', weight: 0.10, question: "Where do you see yourself in 5 years?", options: ['Settled with a partner, building a home', 'Growing in career, with a strong relationship alongside', "Open to anything — I don't plan that far ahead", 'Focused on personal milestones first'] },
  { id: 'ia2', dim: 'intent', dimLabel: 'Future Vision', type: 'mcq', weight: 0.10, question: "Your view on children:", options: ["Want kids — it's a life goal", 'Open to it — depends on the partner', 'Prefer not to have children', "Haven't decided yet"] },
  { id: 'ia3', dim: 'intent', dimLabel: 'Future Vision', type: 'slider', weight: 0.10, question: "How much should families be involved in your relationship decisions?", leftLabel: 'Completely independent', rightLabel: 'Family input matters a lot' },
  { id: 'ia4', dim: 'intent', dimLabel: 'Future Vision', type: 'mcq', weight: 0.10, question: "What does 'success' in a relationship look like to you?", options: ['Growing together as a team', 'Deep emotional intimacy and understanding', 'Shared experiences and adventures', 'Stability, trust, and mutual respect'] }
]

export const PROMPT_OPTIONS = [
  "I'm looking for someone who...", "A perfect Sunday for me looks like...", "The way to my heart is...",
  "I geek out about...", "My friends would describe me as...", "I knew I needed to be on this app when...",
  "The most important thing I've learned about relationships is...", "I feel most alive when...",
  "The best trip I ever took was...", "Right now I'm obsessed with...",
  "The thing that surprised me most about myself is...", "I'm weirdly good at...",
  "A green flag for me is...", "My love language is probably...", "If we met in real life, you'd find me..."
]

export function getDepthLabel(score) {
  if (score < 25) return 'Surface'
  if (score < 55) return 'Building'
  if (score < 80) return 'Deep'
  return 'Connected'
}

export function getDepthColor(score) {
  if (score < 25) return 'var(--muted)'
  if (score < 55) return 'var(--sage-light)'
  if (score < 80) return 'var(--gold)'
  return 'var(--blush-light)'
}

export function formatTimeAgo(date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export function formatCountdown(targetDate) {
  const diff = targetDate.getTime() - Date.now()
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 }
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { hours, minutes, seconds, total: diff }
}
