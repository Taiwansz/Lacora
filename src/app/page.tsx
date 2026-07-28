'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Users,
  CheckSquare,
  Briefcase,
  Clock,
  Palette,
  Shield,
  Lock,
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Sparkles,
  FileText,
  HeartHandshake
} from 'lucide-react';
import { formatBRL } from '@/lib/utils';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'orcamento' | 'convidados' | 'mesas' | 'cronograma'>('orcamento');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'Como funciona a segurança e o isolamento dos dados do meu casamento?',
      a: 'Cada conta possui um workspace exclusivo isolado logicamente por ID de workspace e protegido por políticas rígidas de segurança (Row Level Security). Seus dados não são compartilhados e apenas usuários convidados por você possuem acesso.',
    },
    {
      q: 'O site do casal e o RSVP online possuem custos adicionais?',
      a: 'Não. O construtor de site do casal e a confirmação de presença (RSVP) online estão inclusos na plataforma, permitindo gerar links únicos e seguros para os convidados.',
    },
    {
      q: 'Posso convidar meu cônjuge, cerimonialista ou assessoria para gerenciar juntos?',
      a: 'Sim! A plataforma suporta múltiplos colaboradores com controle de acesso por função. Você pode atribuir papéis como Administrador do Casal, Cerimonial/Assessoria, Colaborador ou Visualizador Financeiro.',
    },
    {
      q: 'Como é calculado o custo por convidado no módulo financeiro?',
      a: 'Diferente de cálculos simplistas, nossa plataforma separa o custo por convidado previsto no contrato, o custo projetado por confirmações efetuadas e o valor efetivamente pago, garantindo previsões financeiras precisas.',
    },
  ];

  return (
    <div className="space-y-20 py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-12 border-b border-border">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-marsala-600 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gestão Comercial & Inteligente de Casamentos</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight max-w-4xl mx-auto leading-tight">
          Tudo o que seu grande dia precisa em um único <span className="text-marsala-500">workspace seguro</span>.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Substitua planilhas desconexas por uma plataforma SaaS completa: controle orçamentário transparente, CRM de convidados com RSVP seguro, distribuição de assentos, gestão de fornecedores e cronograma do Dia H.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/cadastro"
            className="w-full sm:w-auto px-8 py-3.5 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors flex items-center justify-center gap-2"
          >
            <span>Iniciar Workspace Gratuito</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3.5 bg-surface-muted hover:bg-rose-50 text-charcoal font-semibold text-xs rounded-xl border border-border transition-colors flex items-center justify-center gap-2"
          >
            <span>Testar Modo de Demonstração</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Isolamento Total de Dados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-marsala-500" />
            <span>Criptografia de Ponta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Conformidade LGPD</span>
          </div>
        </div>
      </section>

      {/* Interactive Product Preview Showcase */}
      <section className="space-y-6" id="recursos">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Demonstração do Produto
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Conheça os Módulos da Plataforma
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Alterne entre as abas abaixo para visualizar as ferramentas de gestão integradas.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'orcamento', label: 'Gestão Financeira', icon: DollarSign },
            { id: 'convidados', label: 'Lista & RSVP', icon: Users },
            { id: 'mesas', label: 'Planta de Mesas', icon: LayoutDashboard },
            { id: 'cronograma', label: 'Cronograma Dia H', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-marsala-500 text-white shadow-card'
                    : 'bg-surface text-slate-600 hover:bg-surface-muted border border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Preview Card */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-floating max-w-4xl mx-auto">
          {activeTab === 'orcamento' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">Módulo de Orçamento & Fluxo de Caixa</h3>
                  <p className="text-xs text-slate-500">Categorização de custos, parcelas, fornecedores vinculados e métricas por convidado.</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Previsão Efetiva
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-surface-muted rounded-2xl border border-border">
                  <span className="text-slate-500 block">Orçamento Planejado</span>
                  <span className="font-serif text-xl font-bold text-charcoal block mt-1">{formatBRL(135000)}</span>
                </div>
                <div className="p-4 bg-surface-muted rounded-2xl border border-border">
                  <span className="text-slate-500 block">Contratado</span>
                  <span className="font-serif text-xl font-bold text-emerald-600 block mt-1">{formatBRL(92100)}</span>
                </div>
                <div className="p-4 bg-surface-muted rounded-2xl border border-border">
                  <span className="text-slate-500 block">Pago até o Momento</span>
                  <span className="font-serif text-xl font-bold text-indigo-600 block mt-1">{formatBRL(50900)}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'convidados' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">CRM de Convidados & RSVP Digital</h3>
                  <p className="text-xs text-slate-500">Agrupamento por família, restrições alimentares, acessibilidade e confirmação via token seguro.</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-rose-50 text-marsala-600 rounded-full border border-rose-200">
                  RSVP Online
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
                  <span className="font-bold text-charcoal block">Família Silva (Exemplo)</span>
                  <span className="text-slate-500 block">2 Convidados Confirmados • 1 Restrição Alimentar</span>
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-md font-semibold mt-1">
                    Confirmado
                  </span>
                </div>
                <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
                  <span className="font-bold text-charcoal block">Família Santos (Exemplo)</span>
                  <span className="text-slate-500 block">1 Convidado Confirmado • Sem restrições</span>
                  <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-md font-semibold mt-1">
                    Confirmado
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mesas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">Planta de Mesas & Setores</h3>
                  <p className="text-xs text-slate-500">Distribuição espacial dos convidados por setores com checagem de capacidade.</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  Arrasta e Solta
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-surface-muted rounded-2xl border border-border text-center">
                  <span className="font-bold text-charcoal block">Mesa 01 - Pais & Avós</span>
                  <span className="text-slate-500 block text-[11px] mt-1">Capacidade: 8 assentos</span>
                </div>
                <div className="p-4 bg-surface-muted rounded-2xl border border-border text-center">
                  <span className="font-bold text-charcoal block">Mesa 02 - Padrinhos</span>
                  <span className="text-slate-500 block text-[11px] mt-1">Capacidade: 10 assentos</span>
                </div>
                <div className="p-4 bg-surface-muted rounded-2xl border border-border text-center">
                  <span className="font-bold text-charcoal block">Mesa Imperial Noivos</span>
                  <span className="text-slate-500 block text-[11px] mt-1">Capacidade: 2 assentos</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cronograma' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal">Cronograma Operacional do Dia H</h3>
                  <p className="text-xs text-slate-500">Roteiro minuto a minuto com responsáveis, instruções e nível de privacidade.</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                  Tempo Real
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-surface-muted rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold font-mono text-marsala-500">11:00</span>
                    <span className="text-charcoal font-semibold">Início da Preparação dos Noivos</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Suíte Principal</span>
                </div>
                <div className="p-3 bg-surface-muted rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold font-mono text-marsala-500">16:30</span>
                    <span className="text-charcoal font-semibold">Início da Cerimônia Religiosa / Simbólica</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Altar</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-8" id="precos">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Planos & Assinaturas
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Transparência sem Surpresas
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Escolha o plano ideal para a dimensão do seu evento ou assessoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Starter / Gratuito</span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">R$ 0</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal para iniciar o planejamento inicial e teste.</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Até 50 convidados cadastrados</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Orçamento com categorias básicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Checklist essencial de tarefas</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro"
              className="w-full py-3 bg-surface-muted hover:bg-rose-50 text-charcoal font-bold text-xs rounded-xl border border-border text-center transition-colors block"
            >
              Criar Conta Grátis
            </Link>
          </div>

          {/* Plan 2 - Featured */}
          <div className="bg-surface p-6 rounded-3xl border-2 border-marsala-500 shadow-card space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-marsala-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Mais Recomendado
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-marsala-500 tracking-wider">Plano Pro / Completo</span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
                  R$ 49 <span className="text-xs font-sans text-slate-400 font-normal">/ mês</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Tudo o que você precisa para o seu casamento do início ao fim.</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Convidados ilimitados & RSVP Online</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Planta de Mesas & Seating Chart</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Site do Casal Personalizado com Slug</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Upload de Documentos & Contratos</span>
                </li>
              </ul>
            </div>
            <Link
              href="/cadastro"
              className="w-full py-3 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card text-center transition-colors block"
            >
              Começar Teste de 14 Dias
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Assessoria & Cerimonial</span>
                <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
                  R$ 149 <span className="text-xs font-sans text-slate-400 font-normal">/ mês</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">Para assessores e cerimonialistas gerenciando múltiplos eventos.</p>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Múltiplos workspaces simultâneos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Permissões RBAC avançadas por cliente</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-marsala-500" />
                  <span>Exportação de relatórios executivos em PDF/CSV</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contato"
              className="w-full py-3 bg-surface-muted hover:bg-rose-50 text-charcoal font-bold text-xs rounded-xl border border-border text-center transition-colors block"
            >
              Falar com Vendas
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6 max-w-3xl mx-auto" id="faq">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Perguntas & Respostas
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="bg-surface rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-xs text-charcoal flex items-center justify-between hover:bg-surface-muted transition-colors"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-marsala-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-border/50 bg-surface-muted/30">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
