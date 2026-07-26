'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Settings, Lock, Mail, User as UserIcon, Trash2, CheckCircle2 } from 'lucide-react';

export default function ContaPage() {
  const { currentUser, verifyEmail, updatePassword, deleteAccount } = useAppStore();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    updatePassword(newPassword);
    setNewPassword('');
    setMsg('Senha atualizada com sucesso!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Minha Conta</h1>
        <p className="text-xs text-slate-500 mt-1">
          Gerencie seu perfil de usuário, credenciais e configurações de segurança.
        </p>
      </div>

      {/* User Profile Info */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-base font-bold text-charcoal">Informações da Conta</h2>

        {msg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
          </div>
        )}

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-charcoal mb-1">Nome</label>
            <input
              type="text"
              readOnly
              value={currentUser?.name || 'Usuário'}
              className="w-full p-2.5 bg-surface-muted border border-border rounded-xl text-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-charcoal mb-1">E-mail</label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                readOnly
                value={currentUser?.email || 'email@exemplo.com'}
                className="w-full p-2.5 bg-surface-muted border border-border rounded-xl text-slate-700 outline-none"
              />
              {currentUser?.emailVerified ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl shrink-0">
                  Verificado
                </span>
              ) : (
                <button
                  type="button"
                  onClick={verifyEmail}
                  className="text-xs font-bold text-white bg-marsala-500 px-3 py-1.5 rounded-xl shadow-card shrink-0"
                >
                  Verificar E-mail
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="pt-4 border-t border-border space-y-3">
          <h3 className="font-serif text-sm font-bold text-charcoal">Alterar Senha</h3>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Nova Senha</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
              placeholder="Digite sua nova senha..."
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600"
          >
            Atualizar Senha
          </button>
        </form>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-serif text-sm font-bold text-rose-700">Zona de Perigo</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ao excluir sua conta, seus dados de acesso serão removidos do sistema.
          </p>
          <button
            onClick={() => {
              if (confirm('Tem certeza de que deseja excluir sua conta permanentemente?')) {
                deleteAccount();
              }
            }}
            className="mt-3 px-4 py-2 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            Excluir Minha Conta
          </button>
        </div>
      </div>
    </div>
  );
}
