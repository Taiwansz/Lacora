export interface Plan {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  billingPeriod: string;
  description: string;
  trialDays: number;
  features: string[];
  maxGuests: number;
  maxStorageGB: number;
}

export const SUBSCRIPTION_PLANS: Record<string, Plan> = {
  starter: {
    id: 'starter',
    name: 'Starter Gratuito',
    price: 0,
    formattedPrice: 'R$ 0',
    billingPeriod: 'grátis para sempre',
    description: 'Ideal para iniciar o planejamento e organizar dados essenciais.',
    trialDays: 0,
    maxGuests: 50,
    maxStorageGB: 1,
    features: [
      'Até 50 convidados cadastrados',
      'Orçamento com categorias básicas',
      'Checklist essencial de tarefas',
      'Suporte via central de atendimento',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Plano Pro Completo',
    price: 89.90,
    formattedPrice: 'R$ 89,90',
    billingPeriod: 'mês',
    description: 'A experiência completa de gestão do evento com 14 dias de teste grátis.',
    trialDays: 14,
    maxGuests: 9999,
    maxStorageGB: 10,
    features: [
      'Convidados e RSVPs ilimitados',
      'Planta de mesas e seating chart interativo',
      'Site do casal com domínio/slug personalizado',
      'Cofre seguro de contratos e documentos (10 GB)',
      '14 dias de teste grátis inclusos',
    ],
  },
  assessoria: {
    id: 'assessoria',
    name: 'Assessoria & Cerimonial',
    price: 199.00,
    formattedPrice: 'R$ 199,00',
    billingPeriod: 'mês',
    description: 'Para assessores e cerimonialistas que gerenciam múltiplos eventos simultâneos.',
    trialDays: 14,
    maxGuests: 99999,
    maxStorageGB: 50,
    features: [
      'Múltiplos workspaces simultâneos de casais',
      'Permissões RBAC avançadas por cliente',
      'Exportação de relatórios executivos em PDF e CSV',
      'Atendimento comercial e suporte prioritário',
    ],
  },
};
