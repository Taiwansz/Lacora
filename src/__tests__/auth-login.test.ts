import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore, validateStrongPassword } from '../lib/store';

describe('Autenticação, Regras de Senha & Multi-Tenancy', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentUser: null,
      isAuthenticated: false,
      workspaces: [],
      memberships: [],
      guests: [],
      budgetItems: [],
      tasks: [],
    });
  });

  it('deve validar regras de senha forte', () => {
    expect(validateStrongPassword('12345').valid).toBe(false);
    expect(validateStrongPassword('semnumero!').valid).toBe(false);
    expect(validateStrongPassword('SemSimbolo123').valid).toBe(false);
    expect(validateStrongPassword('SenhaForte123!').valid).toBe(true);
  });

  it('deve exigir aceite dos Termos de Uso no cadastro', () => {
    const store = useAppStore.getState();
    const res = store.signup('Usuário Teste', 'usuario@exemplo.example', 'SenhaForte123!', 'SenhaForte123!', false);

    expect(res.success).toBe(false);
    expect(res.error).toContain('Termos de Uso');
  });

  it('deve cadastrar usuário com sucesso e criar workspace limpo sem dados fictícios', () => {
    const store = useAppStore.getState();
    const res = store.signup('Usuário Teste', 'usuario@exemplo.example', 'SenhaForte123!', 'SenhaForte123!', true);

    expect(res.success).toBe(true);
    const state = useAppStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUser?.email).toBe('usuario@exemplo.example');
    expect(state.currentUser?.name).toBe('Usuário Teste');

    // Workspace do usuário real deve estar completamente limpo
    expect(state.guests.length).toBe(0);
    expect(state.tasks.length).toBe(0);
    expect(state.budgetItems.length).toBe(0);
  });

  it('deve garantir isolamento multi-tenant entre workspaces distintos', () => {
    const store = useAppStore.getState();

    // 1. Criar Workspace A
    const wsAId = store.createNewRealWorkspace('Casamento A', 'Parceiro A1', 'Parceiro A2');
    store.addGuest({
      fullName: 'Convidado Exclusivo A',
      relationship: 'amigos',
      category: 'convidado_geral',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 0,
      status: 'pendente',
      eventsPermitted: [],
    });

    const stateA = useAppStore.getState();
    const guestInA = stateA.guests.find((g) => g.fullName === 'Convidado Exclusivo A');
    expect(guestInA).toBeDefined();
    expect(guestInA?.workspaceId).toBe(wsAId);

    // 2. Criar Workspace B
    const wsBId = store.createNewRealWorkspace('Casamento B', 'Parceiro B1', 'Parceiro B2');

    // No Workspace B, a lista de convidados criada para B deve começar limpa
    const stateB = useAppStore.getState();
    expect(stateB.activeWorkspaceId).toBe(wsBId);
    expect(stateB.guests.length).toBe(0);
  });
});
