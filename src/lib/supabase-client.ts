import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://icqpzzwymejjpdhvjaze.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljcXB6end5bWVqanBkaHZqYXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNzYwNjYsImV4cCI6MjEwMDg1MjA2Nn0.lICTmVCCcFpvSatv0CL0kV5R_1UFNM04TK2Bp7jYDdw';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
