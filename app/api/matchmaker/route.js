import { NextResponse } from 'next/server';
import { matchModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

// Mock users for the purpose of the prototype
const mockUsers = [
  { id: '1', name: 'Arjun', intent: 'long_term', values: 'Ambitious, family-oriented' },
  { id: '2', name: 'Priya', intent: 'long_term', values: 'Career-focused, loves travel' }
];

export async function POST(request) {
  try {
    const body = await request.json();
    const { userA_id, userB_id } = body;

    // In a real app, fetch these from Supabase
    // const { data: userA } = await supabase.from('users').select('*').eq('id', userA_id).single();
    // const { data: userB } = await supabase.from('users').select('*').eq('id', userB_id).single();
    
    const userA = mockUsers[0];
    const userB = mockUsers[1];

    const prompt = `
      Act as an expert dating matchmaker. Analyze the compatibility between User A and User B.
      
      User A: ${userA.name}, Intent: ${userA.intent}, Values: ${userA.values}
      User B: ${userB.name}, Intent: ${userB.intent}, Values: ${userB.values}

      Provide a JSON response with:
      1. compatibility_score (integer 0-100)
      2. insight_reason (a short 2 sentence explanation of why they match)
      3. icebreakers (an array of 3 specific conversation starters based on their shared interests)

      Return ONLY valid JSON.
    `;

    const result = await matchModel.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up potential markdown formatting in Gemini response
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const matchData = JSON.parse(jsonStr);

    // Save to Supabase
    const { data, error } = await supabase
      .from('matches')
      .insert([
        { 
          user_a: userA_id || 'uuid-1', 
          user_b: userB_id || 'uuid-2', 
          compatibility_score: matchData.compatibility_score,
          insight_reason: matchData.insight_reason,
          icebreakers: matchData.icebreakers
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      // We will still return the AI data even if Supabase fails (e.g. if tables aren't set up yet)
      return NextResponse.json({ success: true, ai_match: matchData, warning: 'Failed to save to Supabase' });
    }

    return NextResponse.json({ success: true, match: data[0] });
    
  } catch (error) {
    console.error('Matchmaker Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
