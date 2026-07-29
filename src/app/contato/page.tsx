'use client';

import React, { useState } from 'react';
import { MessageSquareText, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'Não foi possível enviar sua mensagem.');
      }
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', company: '' });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível enviar sua mensagem.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Contato Comercial & Parcerias</h1>
        <p className="text-xs text-slate-500 mt-1">
          Fale com nossa equipe comercial ou tire dúvidas sobre os planos para assessores e cerimonialistas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
          <h2 className="font-serif text-base font-bold text-charcoal">Fale com a Laçora</h2>
          <div className="space-y-3 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-marsala-500" />
              <span>Use o formulário para registrar seu interesse ou solicitar atendimento.</span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>Seus dados serão usados somente para responder à solicitação.</span>
            </p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card">
          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-center rounded-2xl space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-emerald-900">Mensagem Enviada com Sucesso!</h3>
              <p className="text-xs text-emerald-700">Nossa equipe comercial retornará em até 24h úteis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="ct-company">Empresa</label>
                <input
                  id="ct-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="ct-name" className="block text-xs font-semibold text-charcoal mb-1">Nome *</label>
                <input
                  id="ct-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="ct-email" className="block text-xs font-semibold text-charcoal mb-1">E-mail *</label>
                <input
                  id="ct-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="seuemail@empresa.com.br"
                />
              </div>

              <div>
                <label htmlFor="ct-message" className="block text-xs font-semibold text-charcoal mb-1">Mensagem *</label>
                <textarea
                  id="ct-message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none h-20 focus:ring-2 focus:ring-marsala-500"
                  placeholder="Como podemos ajudar o seu evento?"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-marsala-500 hover:bg-marsala-600 disabled:cursor-wait disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-card flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
