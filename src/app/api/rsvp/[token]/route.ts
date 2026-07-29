import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { demoCoupleProfile } from '@/lib/demo-data';
import { hasSameOrigin } from '@/lib/request-security';

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (token === 'alex-taylor-demo') {
    return NextResponse.json({
      guestName: 'Convidado de Demonstração',
      partner1Name: demoCoupleProfile.partner1Name,
      partner2Name: demoCoupleProfile.partner2Name,
      weddingDate: demoCoupleProfile.weddingDate,
      city: demoCoupleProfile.city,
      state: demoCoupleProfile.state,
      currentStatus: 'pendente',
      isDemo: true,
    });
  }

  const supabase = publicClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 503 });
  }

  const { data, error } = await supabase
    .rpc('get_rsvp_invitation', { invitation_token: token })
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: 'Não foi possível consultar o convite.' }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Convite não encontrado.' }, { status: 404 });
  }
  const invitation = data as {
    guest_name: string;
    partner1_name: string;
    partner2_name: string;
    wedding_date: string | null;
    city: string | null;
    state: string | null;
    current_status: string;
  };

  return NextResponse.json({
    guestName: invitation.guest_name,
    partner1Name: invitation.partner1_name,
    partner2Name: invitation.partner2_name,
    weddingDate: invitation.wedding_date,
    city: invitation.city,
    state: invitation.state,
    currentStatus: invitation.current_status,
    isDemo: false,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const attending = body?.attending;
  if (typeof attending !== 'boolean') {
    return NextResponse.json({ error: 'Informe sua presença.' }, { status: 400 });
  }

  if (token === 'alex-taylor-demo') {
    return NextResponse.json({ success: true, isDemo: true });
  }

  const supabase = publicClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 503 });
  }

  const { data, error } = await supabase.rpc('submit_rsvp', {
    invitation_token: token,
    attendance_status: attending ? 'confirmado' : 'recusado',
    response_notes: cleanText(body.notes, 500) || null,
    dietary_notes_input: cleanText(body.dietary, 300) || null,
    song_suggestion_input: cleanText(body.song, 200) || null,
    guest_message_input: cleanText(body.message, 1000) || null,
  });

  if (error) {
    return NextResponse.json({ error: 'Não foi possível salvar sua resposta.' }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Convite não encontrado.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
