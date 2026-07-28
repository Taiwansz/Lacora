'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';
import { History, Search, Download, ShieldCheck } from 'lucide-react';

export default function AuditoriaPage() {
  const { activityLogs } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = activityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const data = filtered.map((log) => ({
      Timestamp: log.timestamp,
      Usuário: log.userName,
      Ação: log.action,
      Detalhes: log.details,
    }));
    exportToCSV('trilha_auditoria_workspace', data);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Segurança & Governança
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">Trilha de Auditoria & Logs do Workspace</h1>
          <p className="text-xs text-slate-500 mt-1">
            Histórico imutável de autenticações, alterações de permissão e registros de acesso.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 bg-surface-muted hover:bg-rose-50 text-charcoal font-semibold text-xs px-4 py-2.5 rounded-xl border border-border transition-colors"
        >
          <Download className="w-4 h-4" /> Exportar CSV
        </button>
      </div>

      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="audit-search"
              aria-label="Filtrar registros por ação ou usuário"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por ação ou usuário..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">{filtered.length} registro(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Data / Hora</th>
                <th className="p-4">Usuário</th>
                <th className="p-4">Ação Realizada</th>
                <th className="p-4">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-surface-muted/40 transition-colors">
                  <td className="p-4 text-slate-400 font-mono text-[10px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 font-bold text-charcoal">{log.userName}</td>
                  <td className="p-4 text-marsala-500 font-semibold">{log.action}</td>
                  <td className="p-4 text-slate-600 text-[11px]">{log.details}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    Nenhum registro de auditoria encontrado para o filtro digitado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
