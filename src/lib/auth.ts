// Módulo de Autenticação Real & Controle de Sessão Persistente (Simulação Supabase / JWT Engine)

import { User } from '../types';

export const AUTH_STORAGE_KEY = 'nosso_grande_dia_auth_user';
export const USERS_DB_KEY = 'nosso_grande_dia_registered_users';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

// Helpers para Gerenciamento de Usuários Registrados
export function getRegisteredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

// Helpers de Sessão de Usuário Autenticado
export function getStoredSessionUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeSessionUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } else {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
}
