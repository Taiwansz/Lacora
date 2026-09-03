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
      body: JSON.stringify({ password, next: nextPath }),
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
    <form onSubmit={submit} className="rounded-[2rem] border border-[#d8c5aa] bg-[#fbf6ee] p-6 shadow-[0_28px_80px_rgba(61,44,31,.13)] sm:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8ddd0] text-[#a05235]">
        <LockKeyhole className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="mt-7 block text-[10px] font-bold uppercase tracking-[.2em] text-[#a05235]">Área do casal</span>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-[-.045em] text-[#263c35]">Nosso espaço, só nosso.</h1>
      <p className="mt-3 text-sm leading-6 text-[#6b6156]">Use a senha compartilhada para abrir o planejamento do casamento.</p>

      <label className="mt-7 block">
        <span className="mb-2 block text-xs font-semibold text-[#3e3731]">Senha de acesso</span>
        <span className="flex items-center overflow-hidden rounded-xl border border-[#d8c5aa] bg-white focus-within:border-[#b86645] focus-within:ring-2 focus-within:ring-[#b86645]/15">
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
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="p-3 text-[#746a5e]" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>

      {error && <p role="alert" className="mt-3 rounded-xl bg-[#f7e5dc] px-3 py-2 text-xs font-medium text-[#8d4932]">{error}</p>}

      <button type="submit" disabled={loading} className="brand-button-primary mt-5 flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold disabled:cursor-wait disabled:opacity-70">
        {loading ? 'Abrindo...' : 'Entrar no planejamento'}
        {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

