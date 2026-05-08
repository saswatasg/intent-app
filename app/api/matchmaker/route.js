import { NextResponse } from 'next/server';
import { generateCompatibility, MODEL_VERSION, PROMPT_VERSION } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

// Mock users with valid UUIDs for prototype testing
const MOCK_MALE_1 = '11111111-1111-1111-1111-111111111111';
const MOCK_FEMALE_1 = '22222222-2222-2222-2222-222222222222';
const MOCK_FEMALE_2 = '33333333-3333-3333-3333-333333333333';

const mockUsers = {
  [MOCK_MALE_1]: { id: MOCK_MALE_1, name: 'Arjun', gender: 'Man', intent: 'long_term', values: 'Ambitious, family-oriented', tier: 3 },
  [MOCK_FEMALE_1]: { id: MOCK_FEMALE_1, name: 'Priya', gender: 'Woman', intent: 'long_term', values: 'Career-focused, loves travel', tier: 3 },
  [MOCK_FEMALE_2]: { id: MOCK_FEMALE_2, name: 'Neha', gender: 'Woman', intent: 'long_term', values: 'Traditional, homebody', tier: 1 },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body; 
    
    // Determine requesting user (fallback for previous mock test format)
    const requestingUserId = userId || body.userA_id || MOCK_MALE_1;
    const currentUser = mockUsers[requestingUserId];
    
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let candidates = [];
    const intentPrefs = currentUser.intent_preferences || [currentUser.intent];
    
    // Simulate Adaptive Geo-Radius Expansion
    // In production: PostGIS ST_DWithin query ordered by ST_Distance.
    let simulatedRadius = 8;
    const allEligible = Object.values(mockUsers).filter(u => {
      // Basic gender filter logic
      if (currentUser.gender === 'Man' && u.gender !== 'Woman') return false;
      if (currentUser.gender === 'Woman' && u.gender !== 'Man') return false;
      // Self check
      if (u.id === currentUser.id) return false;
      // Cross-intent matching
      if (!intentPrefs.includes(u.intent)) return false;
      return true;
    });

    if (allEligible.length < 50) {
      simulatedRadius = 999; // City-wide
    } else if (allEligible.length < 100) {
      simulatedRadius = 25;
    } else if (allEligible.length < 200) {
      simulatedRadius = 15;
    }

    console.log(`[Matching Service] Pool size: ${allEligible.length}. Adaptive radius expanded to: ${simulatedRadius}km`);

    // 1. Asymmetric Delivery Logic
    if (currentUser.gender === 'Man') {
      const limit = currentUser.tier === 1 ? 2 : 3;
      candidates = allEligible.slice(0, limit);
    } else if (currentUser.gender === 'Woman') {
      candidates = allEligible.slice(0, 1);
    } else {
      candidates = allEligible.slice(0, 2);
    }

    // Simulate Resurfacing Logic (mocking that 1 candidate is resurfaced)
    if (candidates.length > 0) {
      candidates[0].is_resurfaced = Math.random() > 0.7; // 30% chance in mock
      candidates[0].previous_score = candidates[0].is_resurfaced ? 65 : null;
    }

    const matchesCreated = [];

    for (const candidate of candidates) {
      // 2. A/B Testing Instrumentation
      // 80% AI curated, 20% random control
      const isAiCurated = Math.random() < 0.8;
      const bucket = isAiCurated ? 'ai_curated' : 'random_control';
      
      let matchData;
      let frameworkScores = null;

      if (isAiCurated) {
        // 3. Framework-Anchored Gemini Scoring
        matchData = await generateCompatibility(currentUser, candidate);
        frameworkScores = {
          big5: matchData.big5_score,
          attachment: matchData.attachment_score,
          gottman: matchData.gottman_score,
          values: matchData.values_score
        };
      } else {
        // Random control: bypass Gemini, generic baseline
        const randomScore = Math.floor(Math.random() * (85 - 50 + 1)) + 50;
        matchData = {
          aggregate_score: randomScore,
          why_matched_paragraph: "You were matched based on mutual hard-filter preferences and intent alignment.",
          icebreakers: ["What's your favorite weekend activity?", "Tell me about a recent trip you took.", "What are you looking for in a relationship?"]
        };
      }

      // Save to Supabase Matches Table
      const { data, error } = await supabase
        .from('matches')
        .insert([{ 
          user_a: currentUser.id, 
          user_b: candidate.id, 
          compatibility_score: matchData.aggregate_score,
          insight_reason: matchData.why_matched_paragraph,
          icebreakers: matchData.icebreakers,
          bucket: bucket,
          model_version: isAiCurated ? MODEL_VERSION : 'control_none',
          prompt_version: isAiCurated ? PROMPT_VERSION : 'control_none',
          framework_scores: frameworkScores,
          distance_km: simulatedRadius,
          is_resurfaced: candidate.is_resurfaced || false,
          previous_score: candidate.previous_score || null,
          current_score: matchData.aggregate_score
        }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        matchesCreated.push({ 
          success: false, 
          warning: 'Failed to save to Supabase', 
          ai_match: matchData,
          error: error.message 
        });
      } else {
        matchesCreated.push(data[0]);
      }
    }

    return NextResponse.json({ success: true, generated_matches: matchesCreated });
    
  } catch (error) {
    console.error('Matchmaker Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
