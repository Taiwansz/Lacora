-- Commercial hardening: tenant isolation, atomic onboarding, cloud snapshots,
-- public wedding pages and private document storage.

CREATE EXTENSION IF NOT EXISTS unaccent;

ALTER TABLE public.couple_profiles
  ADD COLUMN IF NOT EXISTS financial_responsibles TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS style TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS formality_level TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS priorities TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS available_weekly_hours INTEGER DEFAULT 0;

ALTER TABLE public.guests
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS song_suggestion TEXT,
  ADD COLUMN IF NOT EXISTS guest_message TEXT,
  ADD COLUMN IF NOT EXISTS rsvp_updated_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.workspace_snapshots (
  workspace_id UUID PRIMARY KEY REFERENCES public.workspaces(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.website_settings (
  workspace_id UUID PRIMARY KEY REFERENCES public.workspaces(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  story_text TEXT NOT NULL DEFAULT '',
  dress_code_notes TEXT NOT NULL DEFAULT '',
  lodging_notes TEXT NOT NULL DEFAULT '',
  partner1_name TEXT NOT NULL,
  partner2_name TEXT NOT NULL,
  wedding_date DATE,
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workspace_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('parceiro', 'cerimonialista', 'assessor', 'familiar', 'colaborador')),
  token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'revogado', 'expirado')),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (workspace_id, email)
);

CREATE TABLE IF NOT EXISTS public.workspace_subscriptions (
  workspace_id UUID PRIMARY KEY REFERENCES public.workspaces(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT NOT NULL DEFAULT 'starter' CHECK (plan_id IN ('starter', 'pro', 'assessoria')),
  status TEXT NOT NULL DEFAULT 'inactive',
  trial_end TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.workspace_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_workspace_member(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.memberships
    WHERE workspace_id = target_workspace_id
      AND user_id = auth.uid()
      AND status = 'ativo'
  );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_workspace(target_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.memberships
    WHERE workspace_id = target_workspace_id
      AND user_id = auth.uid()
      AND status = 'ativo'
      AND role IN ('casal_admin', 'admin_geral')
  );
$$;

REVOKE ALL ON FUNCTION public.is_workspace_member(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_manage_workspace(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_workspace_member(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_workspace(UUID) TO authenticated;

DROP POLICY IF EXISTS "Tenant isolation for workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Tenant isolation for couple_profiles" ON public.couple_profiles;
DROP POLICY IF EXISTS "Tenant isolation for tables" ON public.tables;
DROP POLICY IF EXISTS "Tenant isolation for guests" ON public.guests;
DROP POLICY IF EXISTS "Tenant isolation for budget_items" ON public.budget_items;
DROP POLICY IF EXISTS "Tenant isolation for payments" ON public.payments;
DROP POLICY IF EXISTS "Tenant isolation for vendors" ON public.vendors;
DROP POLICY IF EXISTS "Tenant isolation for tasks" ON public.tasks;
DROP POLICY IF EXISTS "Tenant isolation for documents" ON public.documents;
DROP POLICY IF EXISTS "Tenant isolation for activity_logs" ON public.activity_logs;

DROP POLICY IF EXISTS "workspaces_select_member" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_update_admin" ON public.workspaces;
DROP POLICY IF EXISTS "workspaces_delete_admin" ON public.workspaces;
CREATE POLICY "workspaces_select_member" ON public.workspaces
  FOR SELECT TO authenticated
  USING (public.is_workspace_member(id));
CREATE POLICY "workspaces_update_admin" ON public.workspaces
  FOR UPDATE TO authenticated
  USING (public.can_manage_workspace(id))
  WITH CHECK (public.can_manage_workspace(id));
CREATE POLICY "workspaces_delete_admin" ON public.workspaces
  FOR DELETE TO authenticated
  USING (public.can_manage_workspace(id));

DROP POLICY IF EXISTS "memberships_select_scoped" ON public.memberships;
DROP POLICY IF EXISTS "memberships_insert_admin" ON public.memberships;
DROP POLICY IF EXISTS "memberships_update_admin" ON public.memberships;
DROP POLICY IF EXISTS "memberships_delete_admin" ON public.memberships;
CREATE POLICY "memberships_select_scoped" ON public.memberships
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_manage_workspace(workspace_id));
CREATE POLICY "memberships_insert_admin" ON public.memberships
  FOR INSERT TO authenticated
  WITH CHECK (public.can_manage_workspace(workspace_id));
CREATE POLICY "memberships_update_admin" ON public.memberships
  FOR UPDATE TO authenticated
  USING (public.can_manage_workspace(workspace_id))
  WITH CHECK (public.can_manage_workspace(workspace_id));
CREATE POLICY "memberships_delete_admin" ON public.memberships
  FOR DELETE TO authenticated
  USING (public.can_manage_workspace(workspace_id));

DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'couple_profiles',
    'households',
    'tables',
    'guests',
    'budget_items',
    'payments',
    'vendors',
    'tasks',
    'documents',
    'workspace_snapshots'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', table_name || '_member_all', table_name);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id))',
      table_name || '_member_all',
      table_name
    );
  END LOOP;
END
$$;

DROP POLICY IF EXISTS "activity_logs_select_member" ON public.activity_logs;
DROP POLICY IF EXISTS "activity_logs_insert_member" ON public.activity_logs;
CREATE POLICY "activity_logs_select_member" ON public.activity_logs
  FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id));
CREATE POLICY "activity_logs_insert_member" ON public.activity_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_workspace_member(workspace_id)
    AND user_id = auth.uid()
  );

DROP POLICY IF EXISTS "website_settings_public_select" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_member_insert" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_member_update" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_member_delete" ON public.website_settings;
CREATE POLICY "website_settings_public_select" ON public.website_settings
  FOR SELECT TO anon, authenticated
  USING (is_published OR public.is_workspace_member(workspace_id));
CREATE POLICY "website_settings_member_insert" ON public.website_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "website_settings_member_update" ON public.website_settings
  FOR UPDATE TO authenticated
  USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "website_settings_member_delete" ON public.website_settings
  FOR DELETE TO authenticated
  USING (public.can_manage_workspace(workspace_id));

DROP POLICY IF EXISTS "workspace_invitations_admin_all" ON public.workspace_invitations;
DROP POLICY IF EXISTS "workspace_invitations_recipient_select" ON public.workspace_invitations;
CREATE POLICY "workspace_invitations_admin_all" ON public.workspace_invitations
  FOR ALL TO authenticated
  USING (public.can_manage_workspace(workspace_id))
  WITH CHECK (public.can_manage_workspace(workspace_id));
CREATE POLICY "workspace_invitations_recipient_select" ON public.workspace_invitations
  FOR SELECT TO authenticated
  USING (
    LOWER(email) = LOWER(COALESCE(auth.jwt()->>'email', ''))
    AND status = 'pendente'
    AND expires_at > NOW()
  );

DROP POLICY IF EXISTS "workspace_subscriptions_member_select" ON public.workspace_subscriptions;
DROP POLICY IF EXISTS "workspace_subscriptions_admin_insert" ON public.workspace_subscriptions;
DROP POLICY IF EXISTS "workspace_subscriptions_admin_update" ON public.workspace_subscriptions;
CREATE POLICY "workspace_subscriptions_member_select" ON public.workspace_subscriptions
  FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id));
CREATE POLICY "workspace_subscriptions_admin_insert" ON public.workspace_subscriptions
  FOR INSERT TO authenticated
  WITH CHECK (public.can_manage_workspace(workspace_id));
CREATE POLICY "workspace_subscriptions_admin_update" ON public.workspace_subscriptions
  FOR UPDATE TO authenticated
  USING (public.can_manage_workspace(workspace_id))
  WITH CHECK (public.can_manage_workspace(workspace_id));

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'workspaces_owner_id_auth_users_fkey'
  ) THEN
    ALTER TABLE public.workspaces
      ADD CONSTRAINT workspaces_owner_id_auth_users_fkey
      FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'memberships_user_id_auth_users_fkey'
  ) THEN
    ALTER TABLE public.memberships
      ADD CONSTRAINT memberships_user_id_auth_users_fkey
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.create_workspace_with_profile(
  workspace_name TEXT,
  partner1_name TEXT,
  partner2_name TEXT
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_workspace_id UUID := gen_random_uuid();
  safe_name TEXT := COALESCE(NULLIF(TRIM(workspace_name), ''), 'Meu casamento');
  safe_partner1 TEXT := COALESCE(NULLIF(TRIM(partner1_name), ''), 'Parceiro 1');
  safe_partner2 TEXT := COALESCE(NULLIF(TRIM(partner2_name), ''), 'Parceiro 2');
  generated_slug TEXT;
  account_email TEXT;
  account_name TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'authentication_required';
  END IF;

  generated_slug := LOWER(
    REGEXP_REPLACE(UNACCENT(safe_name), '[^a-zA-Z0-9]+', '-', 'g')
  );
  generated_slug := TRIM(BOTH '-' FROM generated_slug) || '-' || SUBSTRING(new_workspace_id::TEXT, 1, 8);

  SELECT email, COALESCE(raw_user_meta_data->>'full_name', SPLIT_PART(email, '@', 1))
    INTO account_email, account_name
  FROM auth.users
  WHERE id = auth.uid();

  INSERT INTO public.workspaces (id, name, slug, is_demo_workspace, owner_id)
  VALUES (new_workspace_id, safe_name, generated_slug, FALSE, auth.uid());

  INSERT INTO public.memberships (
    workspace_id, user_id, user_name, user_email, role, permissions, status
  )
  VALUES (
    new_workspace_id,
    auth.uid(),
    COALESCE(account_name, safe_partner1),
    COALESCE(account_email, ''),
    'casal_admin',
    '{"canEditBudget":true,"canEditGuests":true,"canEditVisualIdentity":true,"canEditTasks":true,"canEditVendors":true,"canEditContracts":true,"canManageTeam":true}'::JSONB,
    'ativo'
  );

  INSERT INTO public.couple_profiles (
    workspace_id,
    partner1_name,
    partner2_name,
    custom_slug,
    status,
    total_budget_planned,
    estimated_guests_count
  )
  VALUES (
    new_workspace_id,
    safe_partner1,
    safe_partner2,
    generated_slug,
    'onboarding',
    0,
    0
  );

  INSERT INTO public.workspace_snapshots (workspace_id, payload)
  VALUES (new_workspace_id, '{}'::JSONB);

  INSERT INTO public.website_settings (
    workspace_id,
    slug,
    title,
    partner1_name,
    partner2_name
  )
  VALUES (
    new_workspace_id,
    generated_slug,
    'Casamento ' || safe_partner1 || ' & ' || safe_partner2,
    safe_partner1,
    safe_partner2
  );

  RETURN new_workspace_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_workspace_with_profile(TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_workspace_with_profile(TEXT, TEXT, TEXT) TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_rsvp(
  invitation_token TEXT,
  attendance_status TEXT,
  response_notes TEXT DEFAULT NULL,
  dietary_notes_input TEXT DEFAULT NULL,
  song_suggestion_input TEXT DEFAULT NULL,
  guest_message_input TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF attendance_status NOT IN ('confirmado', 'recusado') THEN
    RAISE EXCEPTION 'invalid_rsvp_status';
  END IF;

  UPDATE public.guests
  SET
    status = attendance_status,
    notes = NULLIF(TRIM(response_notes), ''),
    dietary_notes = NULLIF(TRIM(dietary_notes_input), ''),
    song_suggestion = NULLIF(TRIM(song_suggestion_input), ''),
    guest_message = NULLIF(TRIM(guest_message_input), ''),
    rsvp_updated_at = NOW()
  WHERE qr_code_token = invitation_token;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_rsvp(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_rsvp(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_rsvp_invitation(invitation_token TEXT)
RETURNS TABLE (
  guest_name TEXT,
  partner1_name TEXT,
  partner2_name TEXT,
  wedding_date DATE,
  city TEXT,
  state TEXT,
  current_status TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    g.full_name,
    cp.partner1_name,
    cp.partner2_name,
    cp.wedding_date,
    cp.city,
    cp.state,
    g.status
  FROM public.guests g
  JOIN public.couple_profiles cp ON cp.workspace_id = g.workspace_id
  WHERE g.qr_code_token = invitation_token
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_rsvp_invitation(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_rsvp_invitation(TEXT) TO anon, authenticated;

INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-documents', 'wedding-documents', FALSE)
ON CONFLICT (id) DO UPDATE SET public = FALSE;

DROP POLICY IF EXISTS "wedding_documents_select" ON storage.objects;
DROP POLICY IF EXISTS "wedding_documents_insert" ON storage.objects;
DROP POLICY IF EXISTS "wedding_documents_update" ON storage.objects;
DROP POLICY IF EXISTS "wedding_documents_delete" ON storage.objects;

CREATE POLICY "wedding_documents_select" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'wedding-documents'
    AND EXISTS (
      SELECT 1 FROM public.memberships
      WHERE user_id = auth.uid()
        AND status = 'ativo'
        AND workspace_id::TEXT = (storage.foldername(name))[1]
    )
  );
CREATE POLICY "wedding_documents_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'wedding-documents'
    AND EXISTS (
      SELECT 1 FROM public.memberships
      WHERE user_id = auth.uid()
        AND status = 'ativo'
        AND workspace_id::TEXT = (storage.foldername(name))[1]
    )
  );
CREATE POLICY "wedding_documents_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'wedding-documents'
    AND EXISTS (
      SELECT 1 FROM public.memberships
      WHERE user_id = auth.uid()
        AND status = 'ativo'
        AND workspace_id::TEXT = (storage.foldername(name))[1]
    )
  );
CREATE POLICY "wedding_documents_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'wedding-documents'
    AND EXISTS (
      SELECT 1 FROM public.memberships
      WHERE user_id = auth.uid()
        AND status = 'ativo'
        AND workspace_id::TEXT = (storage.foldername(name))[1]
    )
  );
