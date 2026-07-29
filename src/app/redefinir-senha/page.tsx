'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SupabaseService } from '@/lib/supabase-service';
import { validateStrongPassword } from '@/lib/store';
import { LacoraLogo } from '@/components/brand/LacoraLogo';

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (password !== confirmation) {
      setError('A confirmação não corresponde à nova senha.');
      return;
    }
    const validation = validateStrongPassword(password);
    if (!validation.valid) {
      setError(validation.message || 'Senha inválida.');
      return;
    }
    setSaving(true);
    const result = await SupabaseService.updatePassword(password);
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    router.replace('/conta?password=updated');
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-8 shadow-floating">
      <LacoraLogo className="mb-6" />
      <h1 className="font-serif text-2xl font-bold text-charcoal">Definir nova senha</h1>
      <p className="mt-2 text-xs text-slate-500">Use no mínimo 8 caracteres, com maiúscula, número e símbolo.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{error}</p>}
        <label className="block text-xs font-semibold">Nova senha<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-xl border border-border p-3 font-normal" /></label>
        <label className="block text-xs font-semibold">Confirmar nova senha<input type="password" required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-1 w-full rounded-xl border border-border p-3 font-normal" /></label>
        <button type="submit" disabled={saving} className="w-full rounded-xl bg-marsala-500 py-3 text-xs font-bold text-white disabled:opacity-50">{saving ? 'Atualizando...' : 'Atualizar senha'}</button>
      </form>
    </div>
  );
}
