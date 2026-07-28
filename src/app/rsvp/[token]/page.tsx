'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useAppStore } from '@/lib/store';
import { formatDateLong } from '@/lib/utils';
import { Heart, CheckCircle2, XCircle, Utensils, Music, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PublicRSVPPage() {
  const { coupleProfile } = useAppStore();
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState('');
  const [dietary, setDietary] = useState('');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const partner1 = coupleProfile.partner1Name || 'Parceiro 1';
  const partner2 = coupleProfile.partner2Name || 'Parceiro 2';
  const dateStr = coupleProfile.weddingDate ? formatDateLong(coupleProfile.weddingDate) : 'Data a definir';
  const cityStr = coupleProfile.city || 'Local do Casamento';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || attending === null) return;
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Confirmação de Presença — {partner1} & {partner2}</title>
      </Head>

      <div className="min-h-screen bg-background p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-lg w-full bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full marsala-gradient mx-auto flex items-center justify-center text-white font-serif font-bold text-xl">
              {partner1[0]}
              {partner2[0]}
            </div>
            <span className="text-xs uppercase font-semibold text-rose-500 tracking-wider block">
              Confirmação de Presença (RSVP)
            </span>
            <h1 className="font-serif text-2xl font-bold text-charcoal">
              {partner1} & {partner2}
            </h1>
            <p className="text-xs text-slate-500">
              {dateStr} • {cityStr}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="font-serif text-lg font-bold text-emerald-900">
                {attending ? 'Presença Confirmada com Sucesso!' : 'Agradecemos sua Resposta'}
              </h2>
              <p className="text-xs text-emerald-700">
                Sua resposta foi salva com segurança. Agradecemos por fazer parte desta história!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-800 font-bold hover:underline pt-2 block mx-auto"
              >
                Atualizar ou editar minha resposta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="rsvp-guest-name" className="block text-xs font-semibold text-charcoal mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Digite seu nome conforme no convite..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    attending === true
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-subtle'
                      : 'bg-surface border-border text-slate-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-xs block">Sim, Eu Vou!</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    attending === false
                      ? 'bg-rose-50 border-rose-500 text-rose-800 font-bold shadow-subtle'
                      : 'bg-surface border-border text-slate-600 hover:bg-rose-50/50'
                  }`}
                >
                  <XCircle className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                  <span className="text-xs block">Não Poderei Ir</span>
                </button>
              </div>

              {attending === true && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <div>
                    <label htmlFor="rsvp-dietary" className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-marsala-500" /> Restrição Alimentar ou Alergia
                    </label>
                    <input
                      id="rsvp-dietary"
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                      placeholder="Ex: Vegetariano, intolerância a lactose"
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-song" className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-marsala-500" /> Sugestão de Música para a Pista
                    </label>
                    <input
                      id="rsvp-song"
                      type="text"
                      value={song}
                      onChange={(e) => setSong(e.target.value)}
                      className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                      placeholder="Sua música favorita para dançar..."
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-message" className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-marsala-500" /> Mensagem para o Casal
                    </label>
                    <textarea
                      id="rsvp-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-2.5 border border-border rounded-xl outline-none h-16 focus:ring-2 focus:ring-marsala-500"
                      placeholder="Escreva um recado carinhoso..."
                    />
                  </div>
                </div>
              )}

              {/* Guest Data Privacy Notice */}
              <div className="p-3 bg-surface-muted rounded-xl text-[10px] text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Seus dados são coletados exclusivamente para a organização da recepção deste casamento. Não compartilhamos informações com terceiros.
                </span>
              </div>

              <button
                type="submit"
                disabled={attending === null || !guestName}
                className="w-full py-3 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card disabled:opacity-50 transition-colors"
              >
                Enviar Resposta
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
