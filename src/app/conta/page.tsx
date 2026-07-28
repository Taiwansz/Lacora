'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Settings, Lock, Mail, User as UserIcon, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContaPage() {
  const { currentUser, verifyEmail, updatePassword, deleteAccount } = useAppStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deletePass, setDeletePass] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [msg, setMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setErrorMsg('');

    if (!oldPassword || !newPassword) {
      setErrorMsg('Preencha a senha atual e a nova senha.');
      return;
    }

    const res = updatePassword(oldPassword, newPassword);
    if (res.success) {
      setOldPassword('');
      setNewPassword('');
      setMsg('Senha atualizada com sucesso!');
      setTimeout(() => setMsg(''), 3000);
    } else {
      setErrorMsg(res.error || 'Erro ao atualizar senha.');
    }
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = deleteAccount(deletePass);
    if (!res.success) {
      setErrorMsg(res.error || 'Senha incorreta.');
    }
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
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
        <h2 className="font-serif text-base font-bold text-charcoal">Informações da Conta</h2>

        {msg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {msg}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3 text-xs">
          <div>
            <label htmlFor="user-name-display" className="block font-semibold text-charcoal mb-1">Nome</label>
            <input
              id="user-name-display"
              type="text"
              readOnly
              value={currentUser?.name || 'Usuário'}
              className="w-full p-2.5 bg-surface-muted border border-border rounded-xl text-slate-700 outline-none"
            />
          </div>

          <div>
            <label htmlFor="user-email-display" className="block font-semibold text-charcoal mb-1">E-mail</label>
            <div className="flex items-center gap-3">
              <input
                id="user-email-display"
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
                  className="text-xs font-bold text-white bg-marsala-500 hover:bg-marsala-600 px-3 py-1.5 rounded-xl shadow-card shrink-0"
                >
                  Verificar E-mail
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="pt-4 border-t border-border space-y-3">
          <h3 className="font-serif text-sm font-bold text-charcoal">Alterar Senha de Acesso</h3>
          <div>
            <label htmlFor="old-pass" className="block text-xs font-semibold text-charcoal mb-1">Senha Atual *</label>
            <input
              id="old-pass"
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="new-pass" className="block text-xs font-semibold text-charcoal mb-1">Nova Senha Forte *</label>
            <input
              id="new-pass"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors"
          >
            Atualizar Senha
          </button>
        </form>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-border space-y-3">
          <h3 className="font-serif text-sm font-bold text-rose-700">Exclusão de Conta</h3>
          <p className="text-xs text-slate-500">
            A exclusão da conta exige confirmação de senha. Esta ação não poderá ser desfeita.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
            >
              Excluir Minha Conta
            </button>
          ) : (
            <form onSubmit={handleDeleteAccount} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-3">
              <div>
                <label htmlFor="confirm-del-pass" className="block text-xs font-semibold text-rose-900 mb-1">
                  Digite sua senha para confirmar a exclusão *
                </label>
                <input
                  id="confirm-del-pass"
                  type="password"
                  required
                  value={deletePass}
                  onChange={(e) => setDeletePass(e.target.value)}
                  className="w-full text-xs p-2.5 border border-rose-300 rounded-xl outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded-xl bg-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 rounded-xl shadow-card hover:bg-rose-700"
                >
                  Confirmar Exclusão Definitiva
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
