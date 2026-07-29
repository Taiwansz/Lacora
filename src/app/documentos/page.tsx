'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Document } from '@/types';
import { SupabaseService } from '@/lib/supabase-service';
import { FileText, Plus, Download, ShieldAlert, Sparkles, Trash2, Upload } from 'lucide-react';

export default function DocumentosPage() {
  const { documents, addDocument, deleteDocument, activeWorkspaceId } = useAppStore();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0] || null);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Document['category']>('contrato');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedDoc && documents[0]) setSelectedDoc(documents[0]);
  }, [documents, selectedDoc]);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!file || !title.trim()) return;
    if (file.size > 20 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 20 MB.');
      return;
    }

    setUploading(true);
    const result = await SupabaseService.uploadDocument(activeWorkspaceId, file);
    setUploading(false);
    if (result.error || !result.path) {
      setError(result.error?.message || 'Não foi possível enviar o documento.');
      return;
    }

    addDocument({
      title: title.trim(),
      category,
      fileUrl: result.path,
      fileName: file.name,
      fileSize: file.size,
      tags: [],
    });
    setFile(null);
    setTitle('');
    setShowUpload(false);
  };

  const downloadDocument = async (document: Document) => {
    setError('');
    const result = await SupabaseService.createDocumentDownloadUrl(document.fileUrl);
    if (result.error || !result.url) {
      setError(result.error?.message || 'Não foi possível gerar o download.');
      return;
    }
    window.location.assign(result.url);
  };

  const removeDocument = async (document: Document) => {
    if (!window.confirm(`Excluir permanentemente "${document.title}"?`)) return;
    const result = await deleteDocument(document.id);
    if (!result.success) {
      setError(result.error || 'Não foi possível excluir o documento.');
      return;
    }
    setSelectedDoc(null);
  };

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
            Arquivos privados por workspace, links temporários de download e organização por categoria.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-xl bg-marsala-500 px-5 py-2.5 text-xs font-semibold text-white shadow-card"
        >
          <Plus className="h-4 w-4" /> Enviar documento
        </button>
      </div>

      {/* Legal Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Aviso Importante (LGPD & Jurídico):</strong> A leitura assistida por IA identifica prazos, entregáveis e penalidades para auxiliar seu planejamento, porém <strong>não substitui a orientação jurídica de um advogado especialista</strong>.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          {error}
        </p>
      )}

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
                <div className="flex gap-2">
                  <button onClick={() => removeDocument(selectedDoc)} className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                    <Trash2 className="h-4 w-4" /> Excluir
                  </button>
                  <button
                    onClick={() => downloadDocument(selectedDoc)}
                    className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-marsala-500 text-white rounded-xl shadow-card"
                  >
                    <Download className="w-4 h-4" /> Baixar
                  </button>
                </div>
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

      {showUpload && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <form onSubmit={handleUpload} className="w-full max-w-md space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-floating">
            <h2 className="font-serif text-lg font-bold text-charcoal">Enviar documento privado</h2>
            <label className="block text-xs font-semibold text-charcoal">
              Título
              <input required value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} className="mt-1 w-full rounded-xl border border-border p-3 font-normal" />
            </label>
            <label className="block text-xs font-semibold text-charcoal">
              Categoria
              <select value={category} onChange={(event) => setCategory(event.target.value as Document['category'])} className="mt-1 w-full rounded-xl border border-border p-3 font-normal">
                <option value="contrato">Contrato</option>
                <option value="orcamento">Orçamento</option>
                <option value="recibo">Recibo</option>
                <option value="planta">Planta</option>
                <option value="licenca">Licença</option>
                <option value="certidao">Certidão</option>
                <option value="briefing">Briefing</option>
                <option value="outros">Outros</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-charcoal">
              Arquivo — máximo de 20 MB
              <input required type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={(event) => setFile(event.target.files?.[0] || null)} className="mt-1 w-full rounded-xl border border-border p-3 font-normal" />
            </label>
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setShowUpload(false)} className="rounded-xl border border-border px-4 py-2 text-xs font-semibold">Cancelar</button>
              <button type="submit" disabled={uploading} className="flex items-center gap-2 rounded-xl bg-marsala-500 px-4 py-2 text-xs font-bold text-white disabled:opacity-50">
                <Upload className="h-4 w-4" /> {uploading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
