'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Lock, Mail, User as UserIcon, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, enterDemoMode } = useAppStore();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      const res = login(email, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setErrorMsg(res.error || 'Falha ao autenticar.');
      }
    } else {
      const res = signup(name, email, password);
      if (res.success) {
        router.push('/onboarding');
      } else {
        setErrorMsg(res.error || 'Falha ao criar conta.');
      }
    }
  };

  const handleDemoMode = () => {
    enterDemoMode();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl marsala-gradient mx-auto flex items-center justify-center text-white font-serif font-bold text-xl shadow-subtle">
            ND
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Nosso Grande Dia</h1>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Acesse seu workspace de casamento com segurança'
              : 'Crie sua conta e comece o planejamento do seu grande dia'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Seu Nome Completo</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Ex: Gabriel Silva"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">E-mail Profissional ou Pessoal</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="seuemail@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Senha de Acesso</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Entrar no Workspace' : 'Criar Minha Conta & Casamento'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Mode Button */}
        <div className="pt-4 border-t border-border space-y-3 text-center">
          <button
            onClick={handleDemoMode}
            className="w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border hover:bg-rose-50 hover:text-marsala-500 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-marsala-500" />
            <span>Visualizar demonstração (Matheus & Virginia)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setErrorMsg('');
            }}
            className="text-xs text-slate-500 hover:text-marsala-500 font-medium transition-colors"
          >
            {mode === 'login' ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
}
