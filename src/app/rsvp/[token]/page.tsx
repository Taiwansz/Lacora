'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Heart, CheckCircle2, XCircle, Utensils, Music, MessageSquare } from 'lucide-react';

export default function PublicRSVPPage() {
  const { coupleProfile, updateGuestRSVP } = useAppStore();
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState('');
  const [dietary, setDietary] = useState('');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full marsala-gradient mx-auto flex items-center justify-center text-white font-serif font-bold text-xl">
            {coupleProfile.partner1Name[0]}
            {coupleProfile.partner2Name[0]}
          </div>
          <span className="text-xs uppercase font-semibold text-rose-500 tracking-wider block">
            Confirmação de Presença
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal">
            {coupleProfile.partner1Name} & {coupleProfile.partner2Name}
          </h1>
          <p className="text-xs text-slate-500">
            14 de Novembro de 2026 • Quinta das Flores, Campos do Jordão - SP
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-emerald-900">
              {attending ? 'Presença Confirmada com Sucesso!' : 'Agradecemos sua Resposta'}
            </h3>
            <p className="text-xs text-emerald-700">
              Sua resposta foi registrada no sistema. Mal podemos esperar por este momento inesquecível!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Seu Nome Completo</label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="Digite seu nome para buscar no convite..."
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
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
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
                <XCircle className="w-6 h-6 text-rose-600 mx-auto mb-1" />
                <span className="text-xs block">Não Poderei Ir</span>
              </button>
            </div>

            {attending === true && (
              <div className="space-y-3 pt-3 border-t border-border">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-marsala-500" /> Restrição Alimentar ou Alergia
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                    placeholder="Ex: Vegetariano, intolêrancia a lactose"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-marsala-500" /> Sugestão de Música para a Pista
                  </label>
                  <input
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                    placeholder="Ex: Anitta, Coldplay, Sertanejo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-marsala-500" /> Mensagem Carinhosa ao Casal
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-2.5 border border-border rounded-xl outline-none h-16"
                    placeholder="Deixe um recado para Matheus & Virginia..."
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={attending === null || !guestName}
              className="w-full py-3 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600 disabled:opacity-50 transition-colors"
            >
              Enviar Resposta do RSVP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
