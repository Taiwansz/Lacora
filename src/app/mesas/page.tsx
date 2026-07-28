'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Table as TableType } from '@/types';
import {
  Grid,
  Users,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Edit2,
  Trash2,
  X,
  Search,
  Printer,
  Filter
} from 'lucide-react';

const ZONE_LABELS: Record<TableType['zone'], { label: string; color: string }> = {
  noivos: { label: 'Mesa dos Noivos / VIP', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  salao_principal: { label: 'Salão Principal', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  pista: { label: 'Próximo à Pista de Dança', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  varanda: { label: 'Varanda / Área Externa', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  reservado: { label: 'Setor Reservado / Família', color: 'bg-purple-100 text-purple-800 border-purple-300' },
};

const SHAPE_LABELS: Record<TableType['shape'], string> = {
  redonda: 'Redonda',
  quadrada: 'Quadrada',
  retangular: 'Retangular',
  imperial: 'Imperial (Banquete)',
};

export default function MesasPage() {
  const { tables, guests, assignGuestToSeat, addTable, updateTable, deleteTable } = useAppStore();

  const [selectedTableId, setSelectedTableId] = useState<string | null>(tables[0]?.id || null);
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  // Modal State for Add/Edit Table
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<TableType | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    shape: TableType['shape'];
    capacity: number;
    zone: TableType['zone'];
  }>({
    name: '',
    shape: 'redonda',
    capacity: 8,
    zone: 'salao_principal',
  });

  const confirmedGuests = guests.filter((g) => g.status === 'confirmado');
  const unassignedGuests = confirmedGuests.filter((g) => !g.tableId);

  // Filtered tables by zone
  const filteredTables = activeZoneFilter === 'todos'
    ? tables
    : tables.filter((t) => t.zone === activeZoneFilter);

  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const seatedInSelectedTable = guests.filter((g) => g.tableId === selectedTableId);

  // Search and filter unassigned guests
  const filteredUnassignedGuests = unassignedGuests.filter((g) => {
    const matchesSearch = g.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'todos' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals
  const totalCapacity = tables.reduce((acc, t) => acc + t.capacity, 0);
  const totalSeated = guests.filter((g) => !!g.tableId).length;

  const handleOpenAddModal = () => {
    setEditingTable(null);
    setFormData({
      name: `Mesa ${String(tables.length + 1).padStart(2, '0')}`,
      shape: 'redonda',
      capacity: 8,
      zone: 'salao_principal',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (t: TableType, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTable(t);
    setFormData({
      name: t.name,
      shape: t.shape,
      capacity: t.capacity,
      zone: t.zone,
    });
    setIsModalOpen(true);
  };

  const handleSaveTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingTable) {
      updateTable(editingTable.id, {
        name: formData.name,
        shape: formData.shape,
        capacity: Number(formData.capacity),
        zone: formData.zone,
      });
    } else {
      addTable({
        name: formData.name,
        shape: formData.shape,
        capacity: Number(formData.capacity),
        zone: formData.zone,
        posX: 0,
        posY: 0,
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteTable = (tableId: string, tableName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir a "${tableName}"? Os convidados alocados retornarão para a lista pendente.`)) {
      deleteTable(tableId);
      if (selectedTableId === tableId) {
        const remaining = tables.filter((t) => t.id !== tableId);
        setSelectedTableId(remaining[0]?.id || null);
      }
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Planta de Layout & Setorização
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Mapa Interativo de Mesas & Assentos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize a distribuição de convidados por setores, visualize restrições alimentares e monitore o limite de capacidade.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrintReport}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-charcoal bg-surface hover:bg-surface-muted flex items-center justify-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Imprimir Planta / Relatório
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-marsala-500 hover:bg-marsala-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card transition-all"
          >
            <Plus className="w-4 h-4" />
            Nova Mesa
          </button>
        </div>
      </div>

      {/* KPI Cards / Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-marsala-500 flex items-center justify-center font-bold text-base shrink-0">
            {tables.length}
          </div>
          <div>
            <span className="text-xs font-bold text-charcoal block">Mesas Criadas</span>
            <span className="text-[11px] text-slate-500">Configuradas na planta</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            {totalSeated} / {totalCapacity}
          </div>
          <div>
            <span className="text-xs font-bold text-charcoal block">Lugares Ocupados</span>
            <span className="text-[11px] text-slate-500">Capacidade máxima alocada</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-amber-200 bg-amber-50/50 flex items-center gap-3 shadow-subtle">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <span className="text-xs font-bold text-amber-900 block">Pendentes de Alocação</span>
            <span className="text-[11px] text-amber-700">{unassignedGuests.length} confirmados sem mesa</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface border border-emerald-200 bg-emerald-50/50 flex items-center gap-3 shadow-subtle">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="text-xs font-bold text-emerald-900 block">Alocação de Confirmados</span>
            <span className="text-[11px] text-emerald-700">
              {confirmedGuests.length > 0
                ? `${Math.round((totalSeated / confirmedGuests.length) * 100)}% concluído`
                : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Zone Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Setor:
        </span>
        <button
          onClick={() => setActiveZoneFilter('todos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            activeZoneFilter === 'todos'
              ? 'bg-charcoal text-white'
              : 'bg-surface text-slate-600 border border-border hover:bg-surface-muted'
          }`}
        >
          Todos os Setores ({tables.length})
        </button>
        {Object.entries(ZONE_LABELS).map(([key, zoneInfo]) => {
          const count = tables.filter((t) => t.zone === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveZoneFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
                activeZoneFilter === key
                  ? 'bg-marsala-500 text-white border-marsala-500'
                  : 'bg-surface text-slate-600 border-border hover:bg-surface-muted'
              }`}
            >
              {zoneInfo.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Visual Floorplan & Seating List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Floorplan View */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-3xl border border-border shadow-subtle space-y-4 min-h-[450px]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
              <Grid className="w-5 h-5 text-marsala-500" />
              Planta do Salão
            </h2>
            <span className="text-xs text-slate-400">Clique em uma mesa para gerenciar a lista</span>
          </div>

          {/* Floorplan Layout Canvas */}
          <div className="relative w-full min-h-[420px] bg-surface-muted/60 rounded-2xl border-2 border-dashed border-border p-6 flex flex-wrap gap-6 items-center justify-center overflow-auto">
            {filteredTables.map((table) => {
              const currentCount = guests.filter((g) => g.tableId === table.id).length;
              const isSelected = selectedTableId === table.id;
              const isFull = currentCount >= table.capacity;
              const isOverloaded = currentCount > table.capacity;

              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTableId(table.id)}
                  className={`group relative p-5 border-2 cursor-pointer transition-all flex flex-col items-center justify-between shadow-subtle hover:shadow-card ${
                    table.shape === 'imperial' || table.shape === 'retangular'
                      ? 'w-72 h-32 rounded-2xl bg-amber-50/60 border-amber-300 hover:border-amber-400'
                      : table.shape === 'quadrada'
                      ? 'w-40 h-40 rounded-2xl bg-surface border-border hover:border-slate-400'
                      : 'w-40 h-40 rounded-full bg-surface border-rose-200 hover:border-rose-400'
                  } ${
                    isSelected
                      ? 'ring-4 ring-marsala-500 border-marsala-500 scale-105 shadow-card z-10'
                      : ''
                  }`}
                >
                  {/* Top Buttons (Edit/Delete) on Hover */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEditModal(table, e)}
                      className="p-1 rounded-lg bg-surface border border-border text-slate-600 hover:bg-surface-muted text-[10px]"
                      title="Editar Mesa"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteTable(table.id, table.name, e)}
                      className="p-1 rounded-lg bg-surface border border-border text-rose-600 hover:bg-rose-50 text-[10px]"
                      title="Excluir Mesa"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="font-serif font-bold text-xs text-charcoal text-center line-clamp-1 mt-1">
                    {table.name}
                  </span>

                  <span className="text-[10px] text-slate-500 font-medium">
                    {SHAPE_LABELS[table.shape]}
                  </span>

                  <div className="flex flex-col items-center">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isOverloaded
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : isFull
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-surface-muted text-charcoal border-border'
                      }`}
                    >
                      {currentCount} / {table.capacity} pessoas
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                    {ZONE_LABELS[table.zone]?.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {filteredTables.length === 0 && (
              <div className="text-center py-12">
                <Grid className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-semibold">Nenhuma mesa encontrada neste setor.</p>
                <button
                  onClick={handleOpenAddModal}
                  className="mt-3 text-xs text-marsala-500 font-bold hover:underline"
                >
                  + Adicionar Nova Mesa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selected Table Seating Manager Panel */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle space-y-6 flex flex-col justify-between">
          {selectedTable ? (
            <div className="space-y-6">
              {/* Selected Table Info Header */}
              <div className="pb-4 border-b border-border flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-rose-500 block">
                    Mesa Selecionada
                  </span>
                  <h3 className="font-serif text-lg font-bold text-charcoal">{selectedTable.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      Capacidade: <strong className="text-charcoal">{selectedTable.capacity} lugares</strong>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-muted text-slate-600 font-medium">
                      {SHAPE_LABELS[selectedTable.shape]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleOpenEditModal(selectedTable, e)}
                    className="p-1.5 rounded-lg border border-border text-slate-600 hover:bg-surface-muted"
                    title="Editar"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteTable(selectedTable.id, selectedTable.name, e)}
                    className="p-1.5 rounded-lg border border-border text-rose-600 hover:bg-rose-50"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Seated Guests List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-marsala-500" />
                    Alocados nesta Mesa ({seatedInSelectedTable.length}/{selectedTable.capacity})
                  </span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {seatedInSelectedTable.map((guest) => (
                    <div
                      key={guest.id}
                      className="p-3 rounded-xl bg-surface-muted border border-border flex items-center justify-between text-xs transition-all"
                    >
                      <div>
                        <span className="font-bold text-charcoal block">{guest.fullName}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 capitalize">{guest.category}</span>
                          {guest.dietaryNotes && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                              Restrição: {guest.dietaryNotes}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => assignGuestToSeat(guest.id, '')}
                        className="text-[11px] text-rose-600 font-semibold hover:underline shrink-0 ml-2"
                      >
                        Remover
                      </button>
                    </div>
                  ))}

                  {seatedInSelectedTable.length === 0 && (
                    <div className="p-4 rounded-xl border border-dashed border-border text-center">
                      <p className="text-xs text-slate-400 font-medium">Nenhum convidado sentado nesta mesa ainda.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Unassigned Guests Quick Add Section */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal block">
                    Alocar Convidado Confirmado Pendente ({unassignedGuests.length})
                  </span>
                </div>

                {/* Filters for Pending List */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="search-unassigned-guest"
                      type="text"
                      placeholder="Buscar por nome..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500 bg-surface-muted"
                    />
                  </div>

                  <select
                    id="filter-guest-category"
                    aria-label="Filtrar por categoria"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-1.5 text-xs rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500 bg-surface-muted text-charcoal"
                  >
                    <option value="todos">Todas as Categorias</option>
                    <option value="padrinho">Padrinhos / Madrinhas</option>
                    <option value="pais">Pais dos Noivos</option>
                    <option value="vip">Convidados VIP</option>
                    <option value="convidado_geral">Geral</option>
                  </select>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredUnassignedGuests.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => assignGuestToSeat(g.id, selectedTable.id)}
                      disabled={seatedInSelectedTable.length >= selectedTable.capacity}
                      className="w-full text-left p-2.5 rounded-xl bg-surface border border-border text-xs text-charcoal hover:bg-rose-50 hover:border-rose-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                    >
                      <div>
                        <span className="font-semibold block group-hover:text-marsala-500">{g.fullName}</span>
                        {g.dietaryNotes && (
                          <span className="text-[9px] text-amber-700 font-medium">Restrição: {g.dietaryNotes}</span>
                        )}
                      </div>
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-marsala-500 shrink-0" />
                    </button>
                  ))}

                  {filteredUnassignedGuests.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">
                      {unassignedGuests.length === 0
                        ? 'Todos os convidados confirmados já estão com assento.'
                        : 'Nenhum convidado encontrado na busca.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium">Selecione uma mesa na planta para gerenciar.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create / Edit Table */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-table-title"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-surface rounded-3xl p-6 max-w-md w-full border border-border shadow-floating space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 id="modal-table-title" className="font-serif text-lg font-bold text-charcoal">
                {editingTable ? 'Editar Mesa' : 'Nova Mesa'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-charcoal hover:bg-surface-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTable} className="space-y-4">
              <div>
                <label htmlFor="table-name-input" className="text-xs font-bold text-charcoal block mb-1">
                  Nome ou Número da Mesa *
                </label>
                <input
                  id="table-name-input"
                  type="text"
                  required
                  placeholder="Ex: Mesa 01 - Família"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="table-shape-select" className="text-xs font-bold text-charcoal block mb-1">
                    Formato
                  </label>
                  <select
                    id="table-shape-select"
                    value={formData.shape}
                    onChange={(e) => setFormData({ ...formData, shape: e.target.value as TableType['shape'] })}
                    className="w-full p-2.5 text-xs rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500 bg-surface"
                  >
                    <option value="redonda">Redonda</option>
                    <option value="quadrada">Quadrada</option>
                    <option value="retangular">Retangular</option>
                    <option value="imperial">Imperial (Banquete)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="table-capacity-input" className="text-xs font-bold text-charcoal block mb-1">
                    Capacidade (Lugares)
                  </label>
                  <input
                    id="table-capacity-input"
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full p-2.5 text-xs rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="table-zone-select" className="text-xs font-bold text-charcoal block mb-1">
                  Setor / Localização no Salão
                </label>
                <select
                  id="table-zone-select"
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value as TableType['zone'] })}
                  className="w-full p-2.5 text-xs rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-marsala-500 bg-surface"
                >
                  <option value="salao_principal">Salão Principal</option>
                  <option value="noivos">Mesa dos Noivos / VIP</option>
                  <option value="pista">Próximo à Pista de Dança</option>
                  <option value="varanda">Varanda / Área Externa</option>
                  <option value="reservado">Setor Reservado / Família</option>
                </select>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-slate-600 hover:bg-surface-muted"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-marsala-500 hover:bg-marsala-600 text-white text-xs font-semibold shadow-card"
                >
                  {editingTable ? 'Salvar Alterações' : 'Criar Mesa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
