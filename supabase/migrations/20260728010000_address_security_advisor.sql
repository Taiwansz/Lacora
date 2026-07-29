-- Follow-up hardening after the Supabase Security Advisor review.

CREATE SCHEMA IF NOT EXISTS extensions;
REVOKE CREATE ON SCHEMA extensions FROM PUBLIC;

ALTER EXTENSION unaccent SET SCHEMA extensions;

ALTER FUNCTION public.create_workspace_with_profile(TEXT, TEXT, TEXT)
  SET search_path = public, extensions;

REVOKE EXECUTE ON FUNCTION public.is_workspace_member(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION public.can_manage_workspace(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION public.create_workspace_with_profile(TEXT, TEXT, TEXT) FROM anon;

GRANT EXECUTE ON FUNCTION public.is_workspace_member(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_workspace(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_workspace_with_profile(TEXT, TEXT, TEXT) TO authenticated;

-- Keep the public wedding-site policy independent from member helpers. PostgreSQL
-- may evaluate every policy expression, so an anon policy must not call a
-- function whose EXECUTE permission is intentionally limited to authenticated.
DROP POLICY IF EXISTS "website_settings_public_select" ON public.website_settings;
DROP POLICY IF EXISTS "website_settings_member_select" ON public.website_settings;
CREATE POLICY "website_settings_public_select" ON public.website_settings
  FOR SELECT TO anon, authenticated
  USING (is_published);
CREATE POLICY "website_settings_member_select" ON public.website_settings
  FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id));
