'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { History, Search } from 'lucide-react';

export default function AuditoriaPage() {
  const { activityLogs } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = activityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Trilha de Auditoria & Logs</h1>
        <p className="text-xs text-slate-500 mt-1">
          Histórico imutável de ações realizadas pelos usuários no workspace.
        </p>
      </div>

      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por ação ou usuário..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-border rounded-xl outline-none"
            />
          </div>
        </div>

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
          </tbody>
        </table>
      </div>
    </div>
  );
}
