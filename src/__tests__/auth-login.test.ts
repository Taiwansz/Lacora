import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../lib/store';

describe('Autenticação & Login de Parceiros (Noivo / Noiva)', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentUser: null,
      isAuthenticated: false,
    });
  });

  it('deve permitir cadastro da noiva e salvar credenciais no estado e cache', () => {
    const store = useAppStore.getState();
    const res = store.signup('Virginia Fonseca', 'virginia@noiva.com', 'senha123');

    expect(res.success).toBe(true);
    const state = useAppStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUser?.email).toBe('virginia@noiva.com');
    expect(state.currentUser?.name).toBe('Virginia Fonseca');
  });

  it('deve permitir login automático para e-mail da noiva sem bloquear com erro de conta inexistente', () => {
    const store = useAppStore.getState();
    const res = store.login('virginia.noiva@gmail.com', 'qualquersenha');

    expect(res.success).toBe(true);
    const state = useAppStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUser?.email).toBe('virginia.noiva@gmail.com');
    expect(state.currentUser?.name).toBe('Virginia noiva');
  });
});
