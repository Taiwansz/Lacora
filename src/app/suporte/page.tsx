'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';

export default function SuportePage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Central de Ajuda & Suporte Técnico</h1>
        <p className="text-xs text-slate-500 mt-1">
          Atendimento oficial para noivos, noivas, assessores e fornecedores cadastrados na plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <HelpCircle className="w-8 h-8 text-marsala-500" />
          <h2 className="font-serif text-base font-bold text-charcoal">Perguntas Frequentes (FAQ)</h2>
          <p className="text-xs text-slate-600">
            Acesse as dúvidas mais comuns sobre RSVP online, exportação de relatórios e gerenciamento de fornecedores.
          </p>
          <Link href="/#faq" className="text-xs font-bold text-marsala-500 hover:underline block pt-2">
            Ver Perguntas Frequentes &rarr;
          </Link>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <Mail className="w-8 h-8 text-emerald-600" />
          <h2 className="font-serif text-base font-bold text-charcoal">Atendimento via E-mail</h2>
          <p className="text-xs text-slate-600">
            Fale com nossa equipe técnica de suporte comercial. Resposta em até 24 horas úteis.
          </p>
          <a href="mailto:suporte@nossograndedia.com.br" className="text-xs font-bold text-emerald-600 hover:underline block pt-2">
            suporte@nossograndedia.com.br
          </a>
        </div>
      </div>
    </div>
  );
}
