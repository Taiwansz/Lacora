'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Vendor, VendorStatus } from '@/types';
import { Briefcase, Plus, Star, Phone, Mail, MapPin, CheckCircle2, ChevronRight, AlertCircle, Shield } from 'lucide-react';

export default function FornecedoresPage() {
  const { vendors, addVendor, updateVendorStatus } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  const [newVendor, setNewVendor] = useState({
    category: 'Cerimonialista',
    tradeName: '',
    legalName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'São Paulo - SP',
    status: 'sugestao' as VendorStatus,
    rating: 5,
    pros: '',
  });

  const statuses: { status: VendorStatus; label: string }[] = [
    { status: 'sugestao', label: 'Sugestão' },
    { status: 'contato_iniciado', label: 'Contato Iniciado' },
    { status: 'orcamento_recebido', label: 'Orçamento Recebido' },
    { status: 'negociacao', label: 'Em Negociação' },
    { status: 'contratado', label: 'Contratado' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addVendor({
      ...newVendor,
      legalName: newVendor.legalName || newVendor.tradeName,
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            CRM & Pipeline de Fornecedores
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Funil de Negociação, Cotações & Fichas Técnicas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Acompanhe propostas lado a lado, contatos de emergência e transições automáticas de status.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
        >
          <Plus className="w-4 h-4" /> Cadastrar Fornecedor
        </button>
      </div>

      {/* Vendor Funnel Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
        {statuses.map((st) => {
          const colVendors = vendors.filter((v) => v.status === st.status);
          return (
            <div key={st.status} className="bg-surface-muted/50 p-4 rounded-2xl border border-border space-y-3 min-w-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal">{st.label}</span>
                <span className="text-xs font-bold text-slate-400">{colVendors.length}</span>
              </div>

              <div className="space-y-3">
                {colVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="bg-surface p-4 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-charcoal">{vendor.tradeName}</h4>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{vendor.category}</span>
                      </div>
                      <div className="flex items-center text-amber-500 text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-amber-400" /> {vendor.rating || 5}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {vendor.phone}</p>
                      <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {vendor.email}</p>
                    </div>

                    {vendor.pros && (
                      <p className="text-[10px] text-slate-500 bg-surface-muted p-2 rounded-xl border border-border/50">
                        {vendor.pros}
                      </p>
                    )}

                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <select
                        value={vendor.status}
                        onChange={(e) => updateVendorStatus(vendor.id, e.target.value as VendorStatus)}
                        className="text-[10px] font-bold text-marsala-500 bg-transparent border-none focus:ring-0 cursor-pointer"
                      >
                        {statuses.map((s) => (
                          <option key={s.status} value={s.status}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Feature Banner */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
        <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
          <Shield className="w-5 h-5 text-marsala-500" />
          Comparativo de Cotações Lado a Lado
        </h3>
        <p className="text-xs text-slate-500">
          Ao contratar um fornecedor via plataforma, suas tarefas de pesquisa associadas são marcadas como concluídas e o contrato é alimentado automaticamente.
        </p>
      </div>

      {/* Modal Add Vendor */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Cadastrar Fornecedor</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Nome Comercial / Fantasia</label>
              <input
                type="text"
                required
                value={newVendor.tradeName}
                onChange={(e) => setNewVendor({ ...newVendor, tradeName: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Quinta das Flores Eventos"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Categoria</label>
                <input
                  type="text"
                  required
                  value={newVendor.category}
                  onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Pessoa de Contato</label>
                <input
                  type="text"
                  required
                  value={newVendor.contactPerson}
                  onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 rounded-xl shadow-card"
              >
                Salvar Fornecedor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
