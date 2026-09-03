CREATE TABLE IF NOT EXISTS public.private_workspace_snapshots (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT private_workspace_single_row CHECK (id = 'couple')
);

ALTER TABLE public.private_workspace_snapshots ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.private_workspace_snapshots IS
  'Single private Lacora workspace. Access is restricted to the password-protected server API.';
