import type { AuthError, User as SupabaseUser } from '@supabase/supabase-js';
import type { CoupleProfile, Membership, WeddingWorkspace } from '@/types';
import { createClient } from './supabase-client';
import { isSupabaseConfigured } from './supabase-config';

type ServiceError = AuthError | Error | null;

export interface WorkspaceBootstrap {
  workspace: WeddingWorkspace;
  membership: Membership;
  profile: CoupleProfile | null;
  snapshot: Record<string, unknown> | null;
}

function configurationError() {
  return new Error(
    'O serviço de autenticação não está configurado. Contate o suporte antes de continuar.'
  );
}

function client() {
  return createClient();
}

function mapWorkspace(row: any): WeddingWorkspace {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    isDemoWorkspace: Boolean(row.is_demo_workspace),
    ownerId: row.owner_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMembership(row: any): Membership {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    userId: row.user_id,
    userName: row.user_name,
    userEmail: row.user_email,
    role: row.role,
    permissions: row.permissions ?? {},
    invitedAt: row.invited_at,
    status: row.status,
  };
}

function mapProfile(row: any): CoupleProfile {
  return {
    workspaceId: row.workspace_id,
    partner1Name: row.partner1_name,
    partner2Name: row.partner2_name,
    weddingDate: row.wedding_date ?? '',
    weddingTime: row.wedding_time?.slice(0, 5) ?? '16:00',
    timezone: row.timezone ?? 'America/Sao_Paulo',
    city: row.city ?? '',
    state: row.state ?? '',
    weddingType: row.wedding_type ?? 'civil_e_religioso',
    estimatedGuestsCount: row.estimated_guests_count ?? 100,
    totalBudgetPlanned: Number(row.total_budget_planned ?? 0),
    financialResponsibles: row.financial_responsibles ?? [],
    style: row.style ?? '',
    formalityLevel: row.formality_level ?? '',
    priorities: row.priorities ?? [],
    availableWeeklyHours: row.available_weekly_hours ?? 0,
    customSlug: row.custom_slug ?? '',
    status: row.status ?? 'onboarding',
  };
}

export const SupabaseService = {
  isConfigured: isSupabaseConfigured,

  async signUpUser(email: string, password: string, name: string) {
    if (!isSupabaseConfigured()) {
      return { data: { user: null, session: null }, error: configurationError() };
    }

    try {
      return await client().auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo:
            typeof window === 'undefined'
              ? undefined
              : `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      return {
        data: { user: null as SupabaseUser | null, session: null },
        error: error instanceof Error ? error : new Error('Falha ao criar a conta.'),
      };
    }
  },

  async signInUser(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { data: { user: null, session: null }, error: configurationError() };
    }

    try {
      return await client().auth.signInWithPassword({ email, password });
    } catch (error) {
      return {
        data: { user: null as SupabaseUser | null, session: null },
        error: error instanceof Error ? error : new Error('Falha ao autenticar.'),
      };
    }
  },

  async signOutUser() {
    if (!isSupabaseConfigured()) return { error: configurationError() };
    return client().auth.signOut();
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured()) {
      return { data: { user: null }, error: configurationError() };
    }
    return client().auth.getUser();
  },

  async updatePassword(password: string) {
    if (!isSupabaseConfigured()) return { data: null, error: configurationError() };
    return client().auth.updateUser({ password });
  },

  async resendVerification(email: string) {
    if (!isSupabaseConfigured()) return { data: null, error: configurationError() };
    return client().auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo:
          typeof window === 'undefined'
            ? undefined
            : `${window.location.origin}/auth/callback`,
      },
    });
  },

  async requestPasswordReset(email: string) {
    if (!isSupabaseConfigured()) return { data: null, error: configurationError() };
    return client().auth.resetPasswordForEmail(email, {
      redirectTo:
        typeof window === 'undefined'
          ? undefined
          : `${window.location.origin}/auth/callback?next=/redefinir-senha`,
    });
  },

  async createWorkspace(input: {
    name: string;
    partner1: string;
    partner2: string;
  }): Promise<{ workspaceId: string | null; error: ServiceError }> {
    if (!isSupabaseConfigured()) return { workspaceId: null, error: configurationError() };

    const { data, error } = await client().rpc('create_workspace_with_profile', {
      workspace_name: input.name,
      partner1_name: input.partner1,
      partner2_name: input.partner2,
    });

    return {
      workspaceId: typeof data === 'string' ? data : null,
      error,
    };
  },

  async loadWorkspace(
    preferredWorkspaceId?: string
  ): Promise<{ data: WorkspaceBootstrap | null; error: ServiceError }> {
    if (!isSupabaseConfigured()) return { data: null, error: configurationError() };

    const supabase = client();
    let membershipQuery = supabase
      .from('memberships')
      .select('*')
      .eq('status', 'ativo')
      .order('invited_at', { ascending: true })
      .limit(1);

    if (preferredWorkspaceId) {
      membershipQuery = membershipQuery.eq('workspace_id', preferredWorkspaceId);
    }

    const { data: membershipRow, error: membershipError } = await membershipQuery.maybeSingle();
    if (membershipError) return { data: null, error: membershipError };
    if (!membershipRow) return { data: null, error: null };

    const workspaceId = membershipRow.workspace_id;
    const [workspaceResult, profileResult, snapshotResult] = await Promise.all([
      supabase.from('workspaces').select('*').eq('id', workspaceId).single(),
      supabase.from('couple_profiles').select('*').eq('workspace_id', workspaceId).maybeSingle(),
      supabase
        .from('workspace_snapshots')
        .select('payload')
        .eq('workspace_id', workspaceId)
        .maybeSingle(),
    ]);

    const error = workspaceResult.error || profileResult.error || snapshotResult.error;
    if (error) return { data: null, error };

    return {
      data: {
        workspace: mapWorkspace(workspaceResult.data),
        membership: mapMembership(membershipRow),
        profile: profileResult.data ? mapProfile(profileResult.data) : null,
        snapshot:
          snapshotResult.data?.payload &&
          typeof snapshotResult.data.payload === 'object' &&
          !Array.isArray(snapshotResult.data.payload)
            ? (snapshotResult.data.payload as Record<string, unknown>)
            : null,
      },
      error: null,
    };
  },

  async saveWorkspaceSnapshot(
    workspaceId: string,
    payload: Record<string, unknown>
  ): Promise<{ error: ServiceError }> {
    if (!isSupabaseConfigured()) return { error: configurationError() };

    const supabase = client();
    const profile = payload.coupleProfile as CoupleProfile | undefined;
    const website = payload.websiteSettings as
      | {
          title: string;
          storyText: string;
          dressCodeNotes: string;
          lodgingNotes: string;
          isPublished: boolean;
          customSlug: string;
        }
      | undefined;

    const operations = [
      supabase.from('workspace_snapshots').upsert(
        {
          workspace_id: workspaceId,
          payload,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'workspace_id' }
      ),
    ];

    if (profile) {
      operations.push(
        supabase.from('couple_profiles').upsert(
          {
            workspace_id: workspaceId,
            partner1_name: profile.partner1Name,
            partner2_name: profile.partner2Name,
            wedding_date: profile.weddingDate || null,
            wedding_time: profile.weddingTime || '16:00',
            timezone: profile.timezone,
            city: profile.city,
            state: profile.state,
            wedding_type: profile.weddingType,
            estimated_guests_count: profile.estimatedGuestsCount,
            total_budget_planned: profile.totalBudgetPlanned,
            financial_responsibles: profile.financialResponsibles,
            style: profile.style,
            formality_level: profile.formalityLevel,
            priorities: profile.priorities,
            available_weekly_hours: profile.availableWeeklyHours,
            custom_slug: profile.customSlug,
            status: profile.status,
          },
          { onConflict: 'workspace_id' }
        )
      );
    }

    if (profile && website) {
      operations.push(
        supabase.from('website_settings').upsert(
          {
            workspace_id: workspaceId,
            slug: website.customSlug,
            title: website.title,
            story_text: website.storyText,
            dress_code_notes: website.dressCodeNotes,
            lodging_notes: website.lodgingNotes,
            partner1_name: profile.partner1Name,
            partner2_name: profile.partner2Name,
            wedding_date: profile.weddingDate || null,
            city: profile.city,
            state: profile.state,
            is_published: website.isPublished,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'workspace_id' }
        )
      );
    }

    const results = await Promise.all(operations);
    return { error: results.find((result) => result.error)?.error ?? null };
  },

  async deleteWorkspace(workspaceId: string) {
    if (!isSupabaseConfigured()) return { error: configurationError() };
    const { error } = await client().from('workspaces').delete().eq('id', workspaceId);
    return { error };
  },

  async createInvitation(workspaceId: string, email: string, role: string) {
    if (!isSupabaseConfigured()) return { data: null, error: configurationError() };
    return client()
      .from('workspace_invitations')
      .insert({
        workspace_id: workspaceId,
        email: email.trim().toLowerCase(),
        role,
      })
      .select('id,email,role,status,created_at')
      .single();
  },

  async uploadDocument(workspaceId: string, file: File) {
    if (!isSupabaseConfigured()) return { path: null, error: configurationError() };
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${workspaceId}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await client().storage
      .from('wedding-documents')
      .upload(path, file, {
        cacheControl: '3600',
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });
    return { path: error ? null : path, error };
  },

  async createDocumentDownloadUrl(path: string) {
    if (!isSupabaseConfigured()) return { url: null, error: configurationError() };
    const { data, error } = await client().storage
      .from('wedding-documents')
      .createSignedUrl(path, 60);
    return { url: data?.signedUrl ?? null, error };
  },

  async deleteDocumentFile(path: string) {
    if (!isSupabaseConfigured()) return { error: configurationError() };
    const { error } = await client().storage.from('wedding-documents').remove([path]);
    return { error };
  },
};
