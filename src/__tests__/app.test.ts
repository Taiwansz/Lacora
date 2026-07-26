import { describe, it, expect, beforeEach } from 'vitest';
import { formatDate, formatDateLong, getDaysCountdown, formatBRL } from '../lib/utils';
import { useAppStore } from '../lib/store';

describe('Utilitários de Data & Formatação Civil', () => {
  it('deve formatar data civil YYYY-MM-DD sem recuo de fuso horário UTC (14/11/2026)', () => {
    const formatted = formatDate('2026-11-14');
    expect(formatted).toBe('14/11/2026');
  });

  it('deve formatar data por extenso corretamente', () => {
    const formattedLong = formatDateLong('2026-11-14');
    expect(formattedLong).toBe('14 de Novembro de 2026');
  });

  it('deve calcular contagem regressiva em dias civis sem desvio', () => {
    const countdown = getDaysCountdown('2026-11-14');
    expect(countdown.isPast).toBeDefined();
    expect(typeof countdown.days).toBe('number');
  });

  it('deve formatar valores monetários em BRL', () => {
    expect(formatBRL(12500)).toContain('12.500');
  });
});

describe('Gerenciamento de Estado & Isolamento de Workspaces', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentUser: null,
      isAuthenticated: false,
      activeWorkspaceId: 'ws-test',
      workspaces: [],
      guests: [],
      budgetItems: [],
    });
  });

  it('deve permitir cadastro de novo usuário e gerar workspace limpo sem dados fictícios', () => {
    const store = useAppStore.getState();
    const res = store.signup('João Silva', 'joao@test.com', '123456');
    expect(res.success).toBe(true);

    const updatedState = useAppStore.getState();
    expect(updatedState.currentUser?.name).toBe('João Silva');
    expect(updatedState.isAuthenticated).toBe(true);

    // Deve ser um workspace limpo sem convidados ou tarefas inventadas
    expect(updatedState.guests.length).toBe(0);
    expect(updatedState.tasks.length).toBe(0);
    expect(updatedState.budgetItems.length).toBe(0);
  });

  it('deve calcular corretamente a métrica de custo por convidado', () => {
    useAppStore.setState({
      coupleProfile: {
        workspaceId: 'ws-test',
        partner1Name: 'A',
        partner2Name: 'B',
        weddingDate: '2026-11-14',
        weddingTime: '16:00',
        timezone: 'America/Sao_Paulo',
        city: 'SP',
        state: 'SP',
        weddingType: 'civil',
        estimatedGuestsCount: 100,
        totalBudgetPlanned: 100000,
        financialResponsibles: ['Casal'],
        style: 'Moderno',
        formalityLevel: 'Formal',
        priorities: [],
        availableWeeklyHours: 5,
        customSlug: 'a-b',
        status: 'active',
      },
      budgetItems: [
        {
          id: 'bi1',
          workspaceId: 'ws-test',
          categoryId: 'c1',
          description: 'Buffet',
          quantity: 1,
          unitPrice: 50000,
          estimatedCost: 50000,
          negotiatedCost: 50000,
          contractedCost: 50000,
          paidAmount: 20000,
          payerName: 'Casal',
        },
      ],
    });

    const metrics = useAppStore.getState().getCostPerGuestMetrics();
    expect(metrics.plannedCostPerGuest).toBe(1000); // 100.000 / 100
    expect(metrics.contractedCostPerGuest).toBe(500); // 50.000 / 100
    expect(metrics.paidCostPerGuest).toBe(200); // 20.000 / 100
  });

  it('deve permitir criação, atualização, alocação de convidado e remoção de mesa', () => {
    const store = useAppStore.getState();

    // 1. Criar mesa
    store.addTable({
      name: 'Mesa Família Noiva',
      shape: 'redonda',
      capacity: 8,
      zone: 'reservado',
      posX: 0,
      posY: 0,
    });

    let state = useAppStore.getState();
    const createdTable = state.tables.find((t) => t.name === 'Mesa Família Noiva');
    expect(createdTable).toBeDefined();
    expect(createdTable?.capacity).toBe(8);

    // 2. Alocar convidado à mesa
    useAppStore.setState({
      guests: [
        {
          id: 'g-1',
          fullName: 'Maria da Silva',
          relationship: 'familia_noiva',
          category: 'pais',
          ageType: 'adulto',
          invitationType: 'individual',
          allowedPlusOnes: 0,
          status: 'confirmado',
          eventsPermitted: [],
          qrCodeToken: 'tok1',
          checkedIn: false,
        },
      ],
    });

    store.assignGuestToSeat('g-1', createdTable!.id);
    state = useAppStore.getState();
    expect(state.guests[0].tableId).toBe(createdTable!.id);

    // 3. Excluir a mesa e verificar desvinculação automática do convidado
    store.deleteTable(createdTable!.id);
    state = useAppStore.getState();
    expect(state.tables.find((t) => t.id === createdTable!.id)).toBeUndefined();
    expect(state.guests[0].tableId).toBeUndefined();
  });
});
