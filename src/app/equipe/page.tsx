'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { Users, Plus, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';

export default function EquipePage() {
  const { memberships, inviteTeamMember, isCurrentUserAdmin } = useAppStore();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('cerimonialista');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isAdmin = isCurrentUserAdmin();

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setSaving(true);
    setError('');
    const result = await inviteTeamMember(inviteEmail, inviteRole);
    setSaving(false);
    if (!result.success) {
      setError(result.error || 'Não foi possível criar o convite.');
      return;
    }
    setInviteEmail('');
    setShowInviteModal(false);
    setFeedback('Convite registrado. O envio por e-mail depende da configuração do provedor transacional.');
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Governança & Controle de Acesso RBAC
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Membros da Equipe & Permissões do Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            As permissões de acesso são validadas com base no perfil atribuído a cada membro no banco de dados.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
          >
            <Plus className="w-4 h-4" /> Convidar Membro
          </button>
        )}
      </div>

      {/* Members Table */}
      {feedback && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">{feedback}</p>}
      {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{error}</p>}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-base font-bold text-charcoal">Membros com Acesso Autorizado</h2>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
            <tr>
              <th className="p-4">Nome / E-mail</th>
              <th className="p-4">Perfil RBAC</th>
              <th className="p-4">Permissões Específicas</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {memberships.map((mem) => (
              <tr key={mem.id} className="hover:bg-surface-muted/40 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-charcoal block">{mem.userName || mem.userEmail}</span>
                  <span className="text-[11px] text-slate-400">{mem.userEmail}</span>
                </td>
                <td className="p-4">
                  <span className="font-bold uppercase text-[10px] text-marsala-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    {mem.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-[11px] text-slate-600 space-y-0.5">
                  <p>Orçamento: {mem.permissions.canEditBudget ? 'Edição' : 'Visualização'}</p>
                  <p>Convidados: {mem.permissions.canEditGuests ? 'Edição' : 'Visualização'}</p>
                  <p>Fornecedores: {mem.permissions.canEditVendors ? 'Edição' : 'Visualização'}</p>
                </td>
                <td className="p-4 text-right">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full capitalize">
                    {mem.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleInvite} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Convidar Novo Membro</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">E-mail do Convidado</label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="colaborador@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Perfil de Acesso</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as UserRole)}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
              >
                <option value="casal_admin">Casal (Administrador)</option>
                <option value="cerimonialista">Cerimonialista / Assessor</option>
                <option value="familiar">Familiar / Colaborador</option>
                <option value="fornecedor">Fornecedor (Acesso Restrito)</option>
                <option value="convidado">Convidado</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 rounded-xl shadow-card"
              >
                {saving ? 'Registrando...' : 'Registrar Convite'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
