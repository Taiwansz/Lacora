'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <h2 className="font-serif text-base font-bold text-charcoal">Canais Oficiais de Atendimento</h2>
          <div className="space-y-3 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-marsala-500" />
              <span>comercial@nossograndedia.com.br</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>(11) 3000-0000 (Central de Atendimento)</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>São Paulo - SP, Brasil</span>
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

              <button
                type="submit"
                className="w-full py-2.5 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
