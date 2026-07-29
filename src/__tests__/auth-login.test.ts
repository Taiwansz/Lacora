import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore, validateStrongPassword } from '../lib/store';
import { getAuthErrorMessage } from '../lib/auth-errors';

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

  it('deve traduzir o limite de e-mail do Supabase para uma mensagem útil', () => {
    const message = getAuthErrorMessage(
      {
        code: 'over_email_send_rate_limit',
        message: 'email rate limit exceeded',
        status: 429,
      },
      'Falha no cadastro.'
    );

    expect(message).toContain('limite temporário');
    expect(message).toContain('uma hora');
    expect(message).not.toContain('rate limit');
  });

  it('deve exigir aceite dos Termos de Uso no cadastro', async () => {
    const store = useAppStore.getState();
    const res = await store.signup('Usuário Teste', 'usuario@exemplo.com.br', 'SenhaForte123!', 'SenhaForte123!', false);

    expect(res.success).toBe(false);
    expect(res.error).toContain('Termos de Uso');
  });

  it('não deve fabricar usuário quando o Supabase não está configurado', async () => {
    const store = useAppStore.getState();
    const res = await store.signup('Usuário Teste', 'usuario@exemplo.com.br', 'SenhaForte123!', 'SenhaForte123!', true);

    expect(res.success).toBe(false);
    expect(res.error).toContain('autenticação não está configurado');
    const state = useAppStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentUser).toBeNull();
  });

  it('deve impedir mutações sem sessão autenticada', () => {
    const store = useAppStore.getState();
    useAppStore.setState({ activeWorkspaceId: 'workspace-real', isAuthenticated: false });
    store.addGuest({
      fullName: 'Tentativa sem sessão',
      relationship: 'amigos',
      category: 'convidado_geral',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 0,
      status: 'pendente',
      eventsPermitted: [],
    });
    expect(useAppStore.getState().guests).toHaveLength(0);
  });

  it('deve vincular novas entidades ao workspace autenticado ativo', () => {
    useAppStore.setState({
      activeWorkspaceId: 'workspace-real',
      isAuthenticated: true,
      workspaces: [{
        id: 'workspace-real',
        name: 'Casamento Real',
        slug: 'casamento-real',
        isDemoWorkspace: false,
        ownerId: 'user-real',
        createdAt: '2026-07-28',
        updatedAt: '2026-07-28',
      }],
    });
    const store = useAppStore.getState();
    store.addGuest({
      fullName: 'Convidado Válido',
      relationship: 'amigos',
      category: 'convidado_geral',
      ageType: 'adulto',
      invitationType: 'individual',
      allowedPlusOnes: 0,
      status: 'pendente',
      eventsPermitted: [],
    });
    expect(useAppStore.getState().guests[0].workspaceId).toBe('workspace-real');
  });
});
