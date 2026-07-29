-- Persist public commercial and support enquiries without exposing them through
-- PostgREST. Only trusted server-side code using the service role can access it.

CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (CHAR_LENGTH(name) BETWEEN 2 AND 120),
  email TEXT NOT NULL CHECK (CHAR_LENGTH(email) BETWEEN 5 AND 254),
  message TEXT NOT NULL CHECK (CHAR_LENGTH(message) BETWEEN 10 AND 3000),
  source TEXT NOT NULL DEFAULT 'contact_page',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in_progress', 'closed', 'spam')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_requests_status_created_at_idx
  ON public.contact_requests (status, created_at DESC);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.contact_requests FROM anon, authenticated;
