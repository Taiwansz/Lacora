'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, MessageSquare, Music, ShieldCheck, Utensils, XCircle } from 'lucide-react';
import { formatDateLong } from '@/lib/utils';

interface Invitation {
  guestName: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  city: string;
  state: string;
  currentStatus: string;
  isDemo: boolean;
}

export default function RSVPPage() {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [dietary, setDietary] = useState('');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/rsvp/${encodeURIComponent(token)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Convite não encontrado.');
        if (active) setInvitation(result);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (attending === null) return;
    setSaving(true);
    setError('');

    const response = await fetch(`/api/rsvp/${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ attending, dietary, song, message }),
    });
    const result = await response.json().catch(() => ({}));
    setSaving(false);
    if (!response.ok) {
      setError(result.error || 'Não foi possível salvar sua resposta.');
      return;
    }
    setSubmitted(true);
  };

  if (loading) {
    return <p className="py-20 text-center text-sm text-slate-500">Carregando convite...</p>;
  }
  if (!invitation) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
        <h1 className="font-serif text-2xl font-bold text-rose-900">Convite não encontrado</h1>
        <p className="mt-2 text-sm text-rose-700">{error}</p>
      </div>
    );
  }

  const location = [invitation.city, invitation.state].filter(Boolean).join(' — ');

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-border bg-surface p-8 shadow-floating">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">RSVP</span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-charcoal">
          {invitation.partner1Name} & {invitation.partner2Name}
        </h1>
        <p className="mt-2 text-xs text-slate-500">
          {invitation.weddingDate ? formatDateLong(invitation.weddingDate) : 'Data a definir'}
          {location ? ` • ${location}` : ''}
        </p>
        <p className="mt-4 text-sm font-semibold text-charcoal">
          Convite de {invitation.guestName}
        </p>
      </div>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="mt-3 font-serif text-lg font-bold text-emerald-900">
            {attending ? 'Presença confirmada' : 'Resposta registrada'}
          </h2>
          <p className="mt-2 text-xs text-emerald-700">
            {invitation.isDemo
              ? 'Esta é uma demonstração; nenhum dado foi armazenado.'
              : 'Sua resposta foi salva e pode ser atualizada usando este mesmo convite.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`rounded-2xl border p-4 text-xs font-bold ${
                attending === true ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-border'
              }`}
            >
              <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-emerald-600" />
              Sim, estarei presente
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`rounded-2xl border p-4 text-xs font-bold ${
                attending === false ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-border'
              }`}
            >
              <XCircle className="mx-auto mb-2 h-5 w-5 text-rose-600" />
              Não poderei ir
            </button>
          </div>

          {attending && (
            <div className="space-y-4 border-t border-border pt-5">
              <label className="block text-xs font-semibold text-charcoal">
                <span className="mb-1 flex items-center gap-2"><Utensils className="h-4 w-4" /> Restrição alimentar</span>
                <input value={dietary} onChange={(e) => setDietary(e.target.value)} maxLength={300} className="w-full rounded-xl border border-border p-3 font-normal" />
              </label>
              <label className="block text-xs font-semibold text-charcoal">
                <span className="mb-1 flex items-center gap-2"><Music className="h-4 w-4" /> Sugestão de música</span>
                <input value={song} onChange={(e) => setSong(e.target.value)} maxLength={200} className="w-full rounded-xl border border-border p-3 font-normal" />
              </label>
              <label className="block text-xs font-semibold text-charcoal">
                <span className="mb-1 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Mensagem para o casal</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} className="h-24 w-full rounded-xl border border-border p-3 font-normal" />
              </label>
            </div>
          )}

          {error && <p className="text-xs font-medium text-rose-700">{error}</p>}
          <div className="flex items-start gap-2 rounded-xl bg-surface-muted p-3 text-[10px] text-slate-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            Os dados são usados somente para organizar este evento.
          </div>
          <button
            type="submit"
            disabled={attending === null || saving}
            className="w-full rounded-xl bg-marsala-500 py-3 text-xs font-bold text-white disabled:opacity-50"
          >
            {saving ? 'Salvando...' : 'Enviar resposta'}
          </button>
        </form>
      )}
    </div>
  );
}
