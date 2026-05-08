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
  streak_days INTEGER DEFAULT 0
);

-- MATCHES TABLE
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_a UUID REFERENCES users(id),
  user_b UUID REFERENCES users(id),
  compatibility_score INTEGER,
  insight_reason TEXT,
  icebreakers JSONB,
  status TEXT DEFAULT 'pending', -- 'pending', 'connected', 'passed'
  depth_percent INTEGER DEFAULT 10
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
