'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react';

export function AccessForm({ nextPath }: { nextPath: string }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/access', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: password.trim(), next: nextPath }),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setLoading(false);
      setError(result.error || 'Não foi possível liberar o acesso.');
      return;
    }

    window.location.assign(result.next || '/dashboard');
  }

  return (
    <form onSubmit={submit} className="relative overflow-hidden rounded-[2rem] border border-[#D8CDBD] bg-[#FFFAF0] p-6 shadow-[0_28px_80px_rgba(4,8,23,.32)] sm:p-8">
      <span className="pointer-events-none absolute inset-3 rounded-[1.35rem] border border-[#D8CDBD]/70" aria-hidden="true" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E2E2] text-[#7A2738]">
        <LockKeyhole className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="relative mt-7 block text-[10px] font-bold uppercase tracking-[.2em] text-[#7A2738]">Área do casal</span>
      <h1 className="relative mt-3 font-serif text-4xl font-normal tracking-[-.045em] text-[#111B3A]">Nosso espaço, só nosso.</h1>
      <p className="relative mt-3 text-sm leading-6 text-[#626474]">Use a senha compartilhada para abrir o planejamento do casamento.</p>

      <label className="relative mt-7 block">
        <span className="mb-2 block text-xs font-semibold text-[#30364C]">Senha de acesso</span>
        <span className="flex items-center overflow-hidden rounded-xl border border-[#D8CDBD] bg-white focus-within:border-[#7A2738] focus-within:ring-2 focus-within:ring-[#7A2738]/15">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            inputMode="numeric"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            placeholder="••••••"
            required
          />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="p-3 text-[#666A7A]" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>

      {error && <p role="alert" className="relative mt-3 rounded-xl bg-[#F3E1E5] px-3 py-2 text-xs font-medium text-[#7A2738]">{error}</p>}

      <button type="submit" disabled={loading} className="brand-button-primary relative mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold disabled:cursor-wait disabled:opacity-70">
        {loading ? 'Abrindo...' : 'Entrar no planejamento'}
        {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
