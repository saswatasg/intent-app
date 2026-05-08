import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { match_id, user_id, outcome, went_well, didnt_click_reason, trigger_context } = body;

    if (!match_id || !user_id || !outcome) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('feedback_events')
      .insert([
        { 
          match_id,
          user_id,
          outcome,
          went_well: went_well || null,
          didnt_click_reason: didnt_click_reason || null,
          trigger_context: trigger_context || 'manual'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert feedback error:', error);
      // Failsafe for prototype environments without full DB sync
      return NextResponse.json({ success: true, warning: 'Failed to save to Supabase, logged locally', payload: body });
    }

    return NextResponse.json({ success: true, data: data[0] });
    
  } catch (error) {
    console.error('Feedback API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
