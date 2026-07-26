'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Task, TaskStatus } from '@/types';
import { CheckSquare, Plus, List, Grid, Calendar as CalendarIcon, Clock, Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ChecklistPage() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useAppStore();
  const [viewMode, setViewMode] = useState<'lista' | 'kanban' | 'linha_tempo'>('kanban');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<number | 'todos'>('todos');
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Planejamento Geral',
    dueDate: '2026-09-15',
    priority: 'alta' as any,
    status: 'nao_iniciada' as TaskStatus,
    monthsBeforeWedding: 6,
  });

  const filteredTasks = tasks.filter((t) => {
    if (selectedMonthFilter !== 'todos' && t.monthsBeforeWedding !== selectedMonthFilter) return false;
    return true;
  });

  const kanbanColumns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'nao_iniciada', label: 'Não Iniciada', color: 'bg-slate-100 text-slate-700' },
    { status: 'em_pesquisa', label: 'Em Pesquisa / Cotação', color: 'bg-blue-100 text-blue-800' },
    { status: 'em_andamento', label: 'Em Andamento', color: 'bg-amber-100 text-amber-800' },
    { status: 'aguardando_terceiro', label: 'Aguardando Terceiro', color: 'bg-purple-100 text-purple-800' },
    { status: 'concluida', label: 'Concluída', color: 'bg-emerald-100 text-emerald-800' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...newTask,
      assignedToUserIds: ['user-1'],
      subtasks: [],
    });
    setShowModal(false);
    setNewTask({
      title: '',
      category: 'Planejamento Geral',
      dueDate: '2026-09-15',
      priority: 'alta',
      status: 'nao_iniciada',
      monthsBeforeWedding: 6,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Checklist Regressivo Inteligente
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão de Tarefas & Decorações por Prazo
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visualização flexível em Kanban, Lista e Linha do Tempo de 24 a 3 meses antes do grande dia.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-muted p-1 rounded-xl border border-border">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-marsala-500 shadow-subtle' : 'text-slate-500'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('lista')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'lista' ? 'bg-white text-marsala-500 shadow-subtle' : 'text-slate-500'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Lista
            </button>
            <button
              onClick={() => setViewMode('linha_tempo')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'linha_tempo' ? 'bg-white text-marsala-500 shadow-subtle' : 'text-slate-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Timeline
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Nova Tarefa
          </button>
        </div>
      </div>

      {/* Month Filter Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filtro:
        </span>
        {['todos', 24, 18, 12, 9, 6, 3].map((month) => (
          <button
            key={String(month)}
            onClick={() => setSelectedMonthFilter(month as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedMonthFilter === month
                ? 'bg-marsala-500 text-white shadow-subtle'
                : 'bg-surface border border-border text-slate-600 hover:bg-rose-50'
            }`}
          >
            {month === 'todos' ? 'Todas as Tarefas' : `${month} Meses Antes`}
          </button>
        ))}
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
          {kanbanColumns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="bg-surface-muted/50 p-4 rounded-2xl border border-border space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{colTasks.length}</span>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-surface p-4 rounded-xl border border-border shadow-subtle hover:shadow-card transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-charcoal leading-snug">{task.title}</h4>
                        {task.priority === 'urgente' && (
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                            Urgente
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">Cat: {task.category}</p>

                      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Prazo: {task.dueDate}</span>
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                          className="text-[10px] font-semibold text-marsala-500 bg-transparent border-none focus:ring-0 cursor-pointer"
                        >
                          {kanbanColumns.map((c) => (
                            <option key={c.status} value={c.status}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <p className="text-[11px] text-slate-400 text-center py-6 border border-dashed border-border rounded-xl">
                      Nenhuma tarefa
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'lista' && (
        <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Status</th>
                <th className="p-4">Título da Tarefa</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Prazo</th>
                <th className="p-4">Prioridade</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-muted/40 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() =>
                        updateTaskStatus(task.id, task.status === 'concluida' ? 'nao_iniciada' : 'concluida')
                      }
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          task.status === 'concluida' ? 'text-emerald-500 fill-emerald-100' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="p-4 font-bold text-charcoal">{task.title}</td>
                  <td className="p-4 text-slate-500">{task.category}</td>
                  <td className="p-4 text-slate-500">{task.dueDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        task.priority === 'urgente'
                          ? 'bg-rose-100 text-rose-700'
                          : task.priority === 'alta'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteTask(task.id)}
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
      )}

      {/* Timeline View */}
      {viewMode === 'linha_tempo' && (
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
          <h3 className="font-serif text-base font-bold text-charcoal">Linha do Tempo Regressiva</h3>
          <div className="relative border-l-2 border-marsala-500 pl-6 space-y-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-marsala-500 border-4 border-white shadow-subtle" />
                <div className="p-4 rounded-2xl border border-border bg-surface-muted/30">
                  <span className="text-[10px] font-mono font-bold text-rose-500 uppercase">
                    {task.monthsBeforeWedding} Meses Antes ({task.dueDate})
                  </span>
                  <h4 className="text-xs font-bold text-charcoal mt-0.5">{task.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Categoria: {task.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Nova Tarefa do Checklist</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Título da Tarefa</label>
              <input
                type="text"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Definir playlist de recepção"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Categoria</label>
                <input
                  type="text"
                  required
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Prazo Data</label>
                <input
                  type="date"
                  required
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
                Criar Tarefa
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
