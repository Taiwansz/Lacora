import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../lib/store';
import { DEMO_WORKSPACE_ID } from '../lib/demo-data';

describe('Enforcement de Leitura no Modo de Demonstração & Segurança de Atribuição', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentUser: null,
      isAuthenticated: true,
      activeWorkspaceId: DEMO_WORKSPACE_ID,
      workspaces: [
        {
          id: DEMO_WORKSPACE_ID,
          name: 'Casamento Modelo (Demonstração)',
          slug: 'alex-taylor-demo',
          isDemoWorkspace: true,
          ownerId: 'demo-user-owner',
          createdAt: '2026-01-01',
          updatedAt: '2026-07-26',
        },
      ],
      budgetItems: [],
      guests: [],
      vendors: [],
    });
  });

  it('deve identificar workspace ativo como Modo de Demonstração (Apenas Leitura)', () => {
    const store = useAppStore.getState();
    expect(store.isReadOnlyMode()).toBe(true);
  });

  it('deve bloquear a adição de itens financeiros em Modo de Demonstração', () => {
    const store = useAppStore.getState();

    store.addBudgetItem({
      categoryId: 'cat-buffet',
      description: 'Buffet Tentativa Demo',
      quantity: 1,
      unitPrice: 15000,
      estimatedCost: 15000,
      negotiatedCost: 15000,
      contractedCost: 15000,
      payerName: 'Casal',
      notes: 'Tentativa em modo demo',
    });

    const stateAfter = useAppStore.getState();
    expect(stateAfter.budgetItems.length).toBe(0);
  });

  it('deve bloquear a adição de convidados em Modo de Demonstração', () => {
    const store = useAppStore.getState();

    store.addGuest({
      fullName: 'Convidado Teste Demo',
      relationship: 'amigos',
      category: 'convidado_geral',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 0,
      status: 'pendente',
      eventsPermitted: [],
    });

    const stateAfter = useAppStore.getState();
    expect(stateAfter.guests.length).toBe(0);
  });

  it('deve permitir mutações somente com sessão e workspace real', () => {
    const store = useAppStore.getState();
    const realWsId = 'workspace-real';
    useAppStore.setState({
      isAuthenticated: true,
      activeWorkspaceId: realWsId,
      workspaces: [{
        id: realWsId,
        name: 'Casamento Real',
        slug: 'casamento-real',
        isDemoWorkspace: false,
        ownerId: 'real-user',
        createdAt: '2026-07-28',
        updatedAt: '2026-07-28',
      }],
    });
    expect(store.isReadOnlyMode()).toBe(false);

    store.addGuest({
      fullName: 'Convidado Real Válido',
      relationship: 'familia_noiva',
      category: 'padrinho',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 1,
      status: 'confirmado',
      eventsPermitted: [],
    });

    const stateAfter = useAppStore.getState();
    expect(stateAfter.guests.length).toBe(1);
    expect(stateAfter.guests[0].fullName).toBe('Convidado Real Válido');
  });
});
