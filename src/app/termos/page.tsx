'use client';

import React from 'react';

export default function TermosPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Termos de Uso e Serviço</h1>
        <p className="text-xs text-slate-500 mt-1">
          Condições gerais de prestação de serviços da plataforma SaaS Nosso Grande Dia Tecnologia Ltda. Última atualização: Julho de 2026 (Versão 2.1).
        </p>
      </div>

      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">1. Identificação do Operador e Aceitação</h2>
          <p>
            Esta plataforma SaaS é desenvolvida e mantida pela <strong>Nosso Grande Dia Tecnologia Ltda.</strong>, empresa brasileira com sede em São Paulo - SP. Ao cadastrar-se ou criar um workspace, o usuário concorda expressamente com os presentes Termos de Uso e com nossa Política de Privacidade.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">2. Responsabilidade pelos Dados e Isolamento Tenant</h2>
          <p>
            Cada conta opera em um workspace isolado via políticas de segurança no banco de dados (Row Level Security). O usuário administrador é o único responsável pela exatidão e legicidade dos dados inseridos no sistema, incluindo dados de convidados, contratos e finanças.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">3. Planos, Teste Grátis de 14 Dias e Cancelamento</h2>
          <p>
            O Plano Pro inclui 14 dias de teste gratuito sem necessidade de pagamento prévio. O cancelamento pode ser efetuado a qualquer momento no módulo de Assinatura, garantindo que o acesso permaneça ativo até o término do período de cobrança contratado, sem taxas rescisórias ocultas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">4. Canais de Atendimento e Suporte</h2>
          <p>
            Dúvidas operacionais ou solicitações de suporte comercial devem ser encaminhadas para{' '}
            <a href="mailto:suporte@nossograndedia.com.br" className="font-bold text-marsala-500 hover:underline">
              suporte@nossograndedia.com.br
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
