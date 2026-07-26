'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Guest } from '@/types';
import { exportToCSV, generateSimplePDF } from '@/lib/utils';
import { Users, Plus, Download, Upload, QrCode, CheckCircle2, XCircle, Search, Filter, ShieldAlert, Heart } from 'lucide-react';

export default function ConvidadosPage() {
  const { guests, addGuest, updateGuestRSVP, toggleGuestCheckIn, deleteGuest, importGuestsCSV } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'confirmado' | 'recusado' | 'pendente'>('todos');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newGuest, setNewGuest] = useState({
    fullName: '',
    relationship: 'amigos' as any,
    category: 'convidado_geral' as any,
    phone: '',
    email: '',
    ageType: 'adulto' as any,
    invitationType: 'individual' as any,
    allowedPlusOnes: 0,
    status: 'pendente' as any,
    eventsPermitted: ['ev1', 'ev2'],
    notes: '',
  });

  const filteredGuests = guests.filter((g) => {
    if (statusFilter !== 'todos' && g.status !== statusFilter) return false;
    if (searchQuery && !g.fullName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleExportCSV = () => {
    const data = guests.map((g) => ({
      Nome: g.fullName,
      Vínculo: g.relationship,
      Categoria: g.category,
      Status_RSVP: g.status,
      Telefone: g.phone || '',
      Email: g.email || '',
      Checked_In: g.checkedIn ? 'Sim' : 'Não',
    }));
    exportToCSV('lista_convidados_nosso_grande_dia', data);
  };

  const handleExportPortariaPDF = () => {
    const headers = ['Nome do Convidado', 'Categoria', 'Status RSVP', 'Portaria Check-In'];
    const rows = guests.map((g) => [
      g.fullName,
      g.category,
      g.status.toUpperCase(),
      g.checkedIn ? 'ENTROU' : '[  ] Pendente',
    ]);
    generateSimplePDF('Lista Oficial para Portaria e Recepção', headers, rows);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addGuest(newGuest);
    setShowAddModal(false);
    setNewGuest({
      fullName: '',
      relationship: 'amigos',
      category: 'convidado_geral',
      phone: '',
      email: '',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 0,
      status: 'pendente',
      eventsPermitted: ['ev1', 'ev2'],
      notes: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            CRM Inteligente de Convidados
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão de Lista, RSVP, Grupos & Portaria
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Controle famílias, restrições alimentares, acessibilidade, QR Code de check-in e relatórios para cerimonial.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-surface-muted text-charcoal rounded-xl border border-border hover:bg-rose-50"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={handleExportPortariaPDF}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-surface-muted text-charcoal rounded-xl border border-border hover:bg-rose-50"
          >
            <Download className="w-4 h-4" /> PDF Portaria
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-card hover:bg-marsala-600"
          >
            <Plus className="w-4 h-4" /> Adicionar Convidado
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome do convidado..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['todos', 'confirmado', 'pendente', 'recusado'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-marsala-500 text-white shadow-subtle'
                  : 'bg-surface-muted text-slate-600 hover:bg-rose-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Check-In</th>
                <th className="p-4">Nome do Convidado</th>
                <th className="p-4">Vínculo & Categoria</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Status RSVP</th>
                <th className="p-4">Acompanhantes</th>
                <th className="p-4">Observações</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-surface-muted/40 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => toggleGuestCheckIn(guest.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        guest.checkedIn
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'bg-surface border-border text-slate-400'
                      }`}
                      title={guest.checkedIn ? 'Check-in realizado' : 'Realizar Check-in'}
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </td>

                  <td className="p-4 font-bold text-charcoal">
                    {guest.fullName}
                    {guest.checkedIn && (
                      <span className="ml-2 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                        Presente
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500 capitalize">
                    {guest.relationship.replace('_', ' ')} • <span className="font-semibold text-charcoal">{guest.category}</span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {guest.phone || guest.email || '-'}
                  </td>
                  <td className="p-4">
                    <select
                      value={guest.status}
                      onChange={(e) => updateGuestRSVP(guest.id, e.target.value as any)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                        guest.status === 'confirmado'
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : guest.status === 'recusado'
                          ? 'bg-rose-100 border-rose-300 text-rose-800'
                          : 'bg-amber-100 border-amber-300 text-amber-800'
                      }`}
                    >
                      <option value="confirmado">Confirmado</option>
                      <option value="pendente">Pendente</option>
                      <option value="recusado">Recusado</option>
                    </select>
                  </td>
                  <td className="p-4 text-slate-500">
                    +{guest.allowedPlusOnes} autorizados
                  </td>
                  <td className="p-4 text-[11px] text-slate-500 max-w-xs truncate">
                    {guest.notes || '-'}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteGuest(guest.id)}
                      className="text-xs text-rose-500 hover:underline font-semibold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Guest */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Novo Convidado</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Nome Completo</label>
              <input
                type="text"
                required
                value={newGuest.fullName}
                onChange={(e) => setNewGuest({ ...newGuest, fullName: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Carlos Eduardo"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Vínculo</label>
                <select
                  value={newGuest.relationship}
                  onChange={(e) => setNewGuest({ ...newGuest, relationship: e.target.value as any })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                >
                  <option value="noivo">Família do Noivo</option>
                  <option value="noiva">Família da Noiva</option>
                  <option value="amigos">Amigos</option>
                  <option value="trabalho">Trabalho</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Categoria</label>
                <select
                  value={newGuest.category}
                  onChange={(e) => setNewGuest({ ...newGuest, category: e.target.value as any })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                >
                  <option value="pais">Pais</option>
                  <option value="padrinho">Padrinho / Madrinha</option>
                  <option value="vip">VIP</option>
                  <option value="convidado_geral">Geral</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Acompanhantes Extras Autorizados</label>
              <input
                type="number"
                value={newGuest.allowedPlusOnes}
                onChange={(e) => setNewGuest({ ...newGuest, allowedPlusOnes: Number(e.target.value) })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 rounded-xl shadow-card"
              >
                Salvar Convidado
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
