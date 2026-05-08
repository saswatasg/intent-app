-- Supabase Schema for Intent

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  phone_number TEXT UNIQUE,
  name TEXT,
  gender TEXT,
  intent_mode TEXT,
  photo_url TEXT,
  onboarding_stage TEXT DEFAULT 'entry', -- 'entry' or 'unlocked'
  -- Stage 2 data
  personality_answers JSONB DEFAULT '{}'::jsonb,
  lifestyle_answers JSONB DEFAULT '{}'::jsonb,
  dealbreakers JSONB DEFAULT '[]'::jsonb,
  prompts JSONB DEFAULT '[]'::jsonb,
  intent_score INTEGER DEFAULT 50,
  streak_days INTEGER DEFAULT 0,
  -- Referral additions
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES users(id),
  founding_member BOOLEAN DEFAULT FALSE,
  -- Monetization additions
  premium_tier TEXT DEFAULT 'free' CHECK (premium_tier IN ('free', 'free_women', 'plus', 'marriage')),
  premium_started_at TIMESTAMPTZ,
  premium_expires_at TIMESTAMPTZ,
  coaching_sessions_remaining INTEGER DEFAULT 0,
  -- Matching Pool Expansion Additions
  geo_lat DECIMAL(10, 8),
  geo_lng DECIMAL(11, 8),
  geo_radius_km INTEGER DEFAULT 8,
  intent_preferences TEXT[] DEFAULT ARRAY['long_term', 'marriage']
);

-- CREATE POSTGIS INDEX (Requires PostGIS extension to be enabled in DB)
CREATE INDEX IF NOT EXISTS idx_users_geo ON users USING gist (
  -- geography(ST_MakePoint(geo_lng, geo_lat))
  -- Note: We comment this out for local syntax parsing, but run it in production.
  (ST_MakePoint(geo_lng, geo_lat))
);

-- COACHING BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS coaching_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMPTZ,
  coach_name TEXT,
  status TEXT DEFAULT 'scheduled', -- 'scheduled' | 'completed' | 'cancelled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REFERRALS TABLE
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES users(id),
  referred_user_id UUID REFERENCES users(id),
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending' | 'completed' | 'rewarded'
  reward_granted TEXT, -- 'plus_1mo' | 'extra_match_30d' | 'founding_badge' | NULL
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- MATCHES TABLE
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_a UUID REFERENCES users(id),
  user_b UUID REFERENCES users(id),
  compatibility_score INTEGER,
  insight_reason TEXT,
  icebreakers JSONB DEFAULT '[]'::jsonb,
  user_a_status TEXT DEFAULT 'pending', 
  user_b_status TEXT DEFAULT 'pending',
  -- Validation additions
  bucket TEXT,
  model_version TEXT,
  prompt_version TEXT,
  framework_scores JSONB,
  -- Pool Expansion Additions
  distance_km INTEGER,
  is_resurfaced BOOLEAN DEFAULT FALSE,
  previous_score INTEGER,
  current_score INTEGER
);

-- MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  match_id UUID REFERENCES matches(id),
  sender_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  content TEXT,
  read_at TIMESTAMPTZ
);

-- MATCH METRICS TABLE
CREATE TABLE IF NOT EXISTS match_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id),
  time_to_first_message INTERVAL,
  conversation_length INTEGER DEFAULT 0,
  depth_score_at_7d INTEGER,
  mutual_reveal_at TIMESTAMPTZ
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (For prototyping, we allow authenticated users to read/write their own data)
CREATE POLICY "Users can read their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read their matches" ON matches FOR SELECT USING (auth.uid() = user_a OR auth.uid() = user_b);
CREATE POLICY "Users can update their matches" ON matches FOR UPDATE USING (auth.uid() = user_a OR auth.uid() = user_b);

CREATE POLICY "Users can read messages in their matches" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can insert messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- FEEDBACK EVENTS TABLE
CREATE TABLE IF NOT EXISTS feedback_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID REFERENCES matches(id),
  user_id UUID REFERENCES users(id),
  outcome TEXT NOT NULL,
  went_well TEXT,
  didnt_click_reason TEXT,
  trigger_context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE feedback_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert feedback" ON feedback_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read their own feedback" ON feedback_events FOR SELECT USING (auth.uid() = user_id);
