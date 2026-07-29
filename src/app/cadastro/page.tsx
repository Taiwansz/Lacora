'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';
import { LacoraLogo } from '@/components/brand/LacoraLogo';

export default function CadastroPage() {
  const router = useRouter();
  const { signup } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await signup(name, email, password, confirmPassword, acceptedTerms);
      setIsLoading(false);
      if (res.success) {
        if (res.requiresEmailConfirmation) {
          setSuccessMsg(
            'Conta criada. Confirme seu e-mail pelo link enviado antes de fazer login.'
          );
        } else {
          router.push('/onboarding');
          router.refresh();
        }
      } else {
        setErrorMsg(res.error || 'Erro ao realizar cadastro.');
      }
    } catch (err: unknown) {
      setIsLoading(false);
      setErrorMsg(
        err instanceof Error ? err.message : 'Erro ao realizar cadastro.'
      );
    }
  };

  return (
    <div className="bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6 max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <LacoraLogo className="justify-center text-left" />
        </Link>
        <h1 className="font-serif text-2xl font-bold text-charcoal">Criar Minha Conta</h1>
        <p className="text-xs text-slate-500">
          Comece a organizar seu casamento com um workspace isolado e seguro
        </p>
      </div>

      {errorMsg && (
        <div role="alert" className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
          {successMsg}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-charcoal mb-1">
            Seu Nome Completo *
          </label>
          <div className="relative">
            <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="reg-name"
              name="fullName"
              autoComplete="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="Ex: Gabriel Silva"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-charcoal mb-1">
            E-mail Principal *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="reg-email"
              name="email"
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="seuemail@empresa.com.br"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-xs font-semibold text-charcoal mb-1">
            Senha Forte (mínimo 8 caracteres, 1 maiúscula, 1 número e 1 símbolo) *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="reg-password"
              name="new-password"
              autoComplete="new-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-confirm-password" className="block text-xs font-semibold text-charcoal mb-1">
            Confirmar Senha *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="reg-confirm-password"
              name="confirm-password"
              autoComplete="new-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Mandatory Acceptance Checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <input
            id="reg-terms"
            name="acceptedTerms"
            type="checkbox"
            required
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-marsala-500 focus:ring-marsala-500 border-border"
          />
          <label htmlFor="reg-terms" className="text-xs text-slate-600 leading-relaxed">
            Li e aceito os{' '}
            <Link href="/termos" target="_blank" className="text-marsala-500 font-semibold hover:underline">
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link href="/privacidade" target="_blank" className="text-marsala-500 font-semibold hover:underline">
              Política de Privacidade
            </Link>
            . *
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Criando Conta...' : 'Criar Minha Conta & Iniciar Onboarding'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-border text-center">
        <p className="text-xs text-slate-500">
          Já tem uma conta cadastrada?{' '}
          <Link href="/login" className="text-marsala-500 font-bold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
