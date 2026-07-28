'use client';

import React from 'react';

export default function TermosPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Termos de Uso e Serviço</h1>
        <p className="text-xs text-slate-500 mt-1">
          Condições de uso da plataforma SaaS Nosso Grande Dia. Última atualização: Julho de 2026.
        </p>
      </div>

      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">1. Objeto e Aceitação</h2>
          <p>
            Estes Termos de Uso regulam o acesso e utilização da plataforma SaaS "Nosso Grande Dia". Ao se cadastrar ou criar um workspace, você declara ter lido, compreendido e aceito integralmente todas as condições descritas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">2. Responsabilidade sobre os Dados</h2>
          <p>
            O usuário administrador é responsável pela exatidão dos dados inseridos no workspace, incluindo dados de convidados, contratos e valores orçamentários. A plataforma fornece isolamento multi-tenant por workspace.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">3. Planos, Assinaturas e Cancelamento</h2>
          <p>
            A plataforma oferece planos com cobrança recorrente. O cancelamento pode ser efetuado a qualquer momento no módulo de Assinatura, garantindo acesso até o término do ciclo vigente.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">4. Propriedade Intelectual</h2>
          <p>
            Todos os direitos sobre a marca, layout, código-fonte e arquitetura SaaS pertencem ao Nosso Grande Dia Tecnologia.
          </p>
        </section>
      </div>
    </div>
  );
}
