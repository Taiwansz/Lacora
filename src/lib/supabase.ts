import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for Node.js / Vitest environment if missing
if (typeof window === 'undefined' && typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = class DummyWebSocket {
    readyState = 3;
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://icqpzzwymejjpdhvjaze.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljcXB6end5bWVqanBkaHZqYXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNzYwNjYsImV4cCI6MjEwMDg1MjA2Nn0.lICTmVCCcFpvSatv0CL0kV5R_1UFNM04TK2Bp7jYDdw';

export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes('placeholder-project')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: typeof window !== 'undefined',
    detectSessionInUrl: typeof window !== 'undefined',
  },
  global: {
    headers: { 'x-application-name': 'nosso-grande-dia' },
  },
});
