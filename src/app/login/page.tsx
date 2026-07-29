'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Lock, Mail, ArrowRight, Eye } from 'lucide-react';
import { LacoraLogo } from '@/components/brand/LacoraLogo';

export default function LoginPage() {
  const router = useRouter();
  const { login, enterDemoMode } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await login(email, password);
      setIsLoading(false);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setErrorMsg(res.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err?.message || 'Erro ao realizar login.');
    }
  };

  const handleDemoMode = async () => {
    setErrorMsg('');
    setIsLoading(true);
    const result = await enterDemoMode();
    setIsLoading(false);
    if (!result.success) {
      setErrorMsg(result.error || 'Não foi possível iniciar a demonstração.');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="bg-surface p-8 rounded-3xl border border-border shadow-floating space-y-6 max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <LacoraLogo className="justify-center text-left" />
        </Link>
        <h1 className="font-serif text-2xl font-bold text-charcoal">Acessar Workspace</h1>
        <p className="text-xs text-slate-500">
          Entre com seu e-mail e senha para gerenciar seu casamento
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-charcoal mb-1">
            E-mail Cadastrado *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="login-email"
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
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="login-password" className="block text-xs font-semibold text-charcoal">
              Senha de Acesso *
            </label>
            <Link href="/recuperar-senha" className="text-[11px] text-marsala-500 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="login-password"
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
          disabled={isLoading}
          className="w-full py-3 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Autenticando...' : 'Entrar no Workspace'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Demo & Register Controls */}
      <div className="pt-4 border-t border-border space-y-3 text-center">
        <button
          type="button"
          onClick={handleDemoMode}
          disabled={isLoading}
          className="w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border hover:bg-rose-50 hover:text-marsala-500 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4 text-marsala-500" />
          <span>Explorar Workspace de Demonstração</span>
        </button>

        <p className="text-xs text-slate-500">
          Ainda não possui uma conta?{' '}
          <Link href="/cadastro" className="text-marsala-500 font-bold hover:underline">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
