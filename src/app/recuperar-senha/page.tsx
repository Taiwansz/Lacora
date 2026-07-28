'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <div className="w-12 h-12 rounded-2xl marsala-gradient mx-auto flex items-center justify-center text-white font-serif font-bold text-xl shadow-subtle">
            ND
          </div>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-charcoal">Recuperação de Senha</h1>
        <p className="text-xs text-slate-500">
          Informe seu e-mail cadastrado para receber as instruções de redefinição
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 text-center rounded-2xl space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-sm text-emerald-900">E-mail de Redefinição Enviado!</h3>
          <p className="text-xs text-emerald-700">
            Enviamos um link seguro de recuperação para <strong className="text-emerald-900">{email}</strong>. Verifique sua caixa de entrada e spam.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-marsala-500 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recovery-email" className="block text-xs font-semibold text-charcoal mb-1">
              Seu E-mail Cadastrado
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="recovery-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Enviando Link...' : 'Enviar Link de Redefinição'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-border text-center">
        <Link href="/login" className="text-xs text-slate-500 hover:text-marsala-500 font-semibold flex items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar à tela de login
        </Link>
      </div>
    </div>
  );
}
