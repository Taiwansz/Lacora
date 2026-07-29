'use client';

import React from 'react';

export default function TermosPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Termos de Uso e Serviço</h1>
        <p className="text-xs text-slate-500 mt-1">
          Condições gerais de prestação de serviços da plataforma Laçora. Última atualização: Julho de 2026 (Versão 2.1).
        </p>
      </div>

      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">1. Identificação do Operador e Aceitação</h2>
          <p>
            Laçora é a marca da plataforma de planejamento de casamentos. A identificação completa do operador, CNPJ, endereço e canal jurídico constará no documento contratual antes do início da comercialização. Ao cadastrar-se ou criar um workspace, o usuário concorda com estes Termos de Uso e com a Política de Privacidade.
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
            Dúvidas operacionais ou solicitações comerciais devem ser encaminhadas pelo canal de contato oficial disponível na plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}
