'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Document } from '@/types';
import { FileText, Plus, Search, Tag, Eye, Download, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DocumentosPage() {
  const { documents, addDocument } = useAppStore();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0] || null);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Cofre Seguro de Documentos & Contratos
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão Documental & Leitura Assistida de Cláusulas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Armazenamento seguro, tags, controle de parcelas e análise automatizada de multas e cancelamentos.
          </p>
        </div>
      </div>

      {/* Legal Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Aviso Importante (LGPD & Jurídico):</strong> A leitura assistida por IA identifica prazos, entregáveis e penalidades para auxiliar seu planejamento, porém <strong>não substitui a orientação jurídica de um advogado especialista</strong>.
        </p>
      </div>

      {/* Grid: Document List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Documents Vault List */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
          <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <FileText className="w-5 h-5 text-marsala-500" />
            Documentos Armazenados
          </h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id
                    ? 'bg-rose-50 border-marsala-500 shadow-subtle'
                    : 'bg-surface-muted/50 border-border hover:bg-surface-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-charcoal truncate">{doc.title}</h3>
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-white text-marsala-500 border border-border">
                    {doc.category}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Enviado em: {doc.uploadedAt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Clause Reader & Summary */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
          {selectedDoc ? (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">
                    Detalhes do Documento
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal mt-0.5">{selectedDoc.title}</h3>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-marsala-500 text-white rounded-xl shadow-card">
                  <Download className="w-4 h-4" /> Baixar PDF
                </button>
              </div>

              {selectedDoc.parsedSummary && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-200">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Resumo Inteligente da Leitura Assistida de Cláusulas
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-muted/50 border border-border">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Partes Envolvidas</span>
                      <p className="text-xs font-semibold text-charcoal mt-1">{selectedDoc.parsedSummary.parties}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-muted/50 border border-border">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Valor Total do Contrato</span>
                      <p className="text-xs font-bold text-marsala-500 mt-1">
                        R$ {selectedDoc.parsedSummary.totalValue?.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-muted/50 border border-border space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Condições de Cancelamento & Multa</span>
                    <p className="text-xs text-charcoal">{selectedDoc.parsedSummary.cancellationPenalty}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-muted/50 border border-border space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Principais Entregáveis Especificados</span>
                    <ul className="list-disc list-inside text-xs text-charcoal space-y-1">
                      {selectedDoc.parsedSummary.keyDeliverables?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-12">Selecione um documento ao lado para visualizar a análise assistida.</p>
          )}
        </div>
      </div>
    </div>
  );
}
