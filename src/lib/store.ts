import { create } from 'zustand';
import { SupabaseService } from './supabase-service';
import { getAuthErrorMessage } from './auth-errors';
import {
  User,
  UserRole,
  Membership,
  WeddingWorkspace,
  CoupleProfile,
  Guest,
  Household,
  Task,
  TaskStatus,
  Vendor,
  BudgetItem,
  Payment,
  Palette,
  Outfit,
  Venue,
  Table,
  Seat,
  TimelineItem,
  Document,
  Gift,
  PhotoShot,
  ActivityLog,
  Notification,
  MoodboardItem,
  DecorItem,
  MenuItem,
  StationeryItem,
  RiskItem,
  CivilWeddingInfo
} from '../types';

export interface AppStoreState {
  // Authentication & Session
  currentUser: User | null;
  isAuthenticated: boolean;

  // Workspaces & Real RBAC Memberships
  activeWorkspaceId: string;
  workspaces: WeddingWorkspace[];
  memberships: Membership[];

  // Workspace Content Collections
  coupleProfile: CoupleProfile;
  palette: Palette;
  venues: Venue[];
  outfits: Outfit[];
  households: Household[];
  guests: Guest[];
  tables: Table[];
  seats: Seat[];
  tasks: Task[];
  vendors: Vendor[];
  budgetItems: BudgetItem[];
  payments: Payment[];
  timeline: TimelineItem[];
  documents: Document[];
  gifts: Gift[];
  photoShots: PhotoShot[];
  notifications: Notification[];
  activityLogs: ActivityLog[];
  moodboard: MoodboardItem[];
  decorItems: DecorItem[];
  menuItems: MenuItem[];
  stationeryItems: StationeryItem[];
  risks: RiskItem[];
  civilInfo: CivilWeddingInfo;

  // Website Custom Editor Settings
  websiteSettings: {
    title: string;
    storyText: string;
    dressCodeNotes: string;
    lodgingNotes: string;
    isPublished: boolean;
    customSlug: string;
  };

  // Auth Actions
  initializeSession: () => Promise<void>;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    pass: string,
    confirmPass: string,
    acceptedTerms: boolean
  ) => Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }>;
  logout: () => Promise<void>;
  verifyEmail: () => Promise<{ success: boolean; error?: string }>;
  updatePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: (pass: string) => Promise<{ success: boolean; error?: string }>;
  enterDemoMode: () => Promise<{ success: boolean; error?: string }>;

  // Workspace & Membership Actions
  setActiveWorkspace: (workspaceId: string) => Promise<{ success: boolean; error?: string }>;
  createNewRealWorkspace: (
    weddingName: string,
    partner1: string,
    partner2: string
  ) => Promise<{ success: boolean; workspaceId?: string; error?: string }>;
  deleteCurrentWorkspace: () => Promise<{ success: boolean; error?: string }>;
  inviteTeamMember: (email: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;

  // Onboarding
  completeRealOnboarding: (data: Partial<CoupleProfile>) => void;

  // Current User Active Role in Active Workspace
  getCurrentRole: () => UserRole;
  isCurrentUserAdmin: () => boolean;

  // Module Actions
  updateCoupleProfile: (data: Partial<CoupleProfile>) => void;
  addTask: (task: Omit<Task, 'id' | 'workspaceId' | 'attachmentsCount' | 'commentsCount'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  addGuest: (guest: Omit<Guest, 'id' | 'workspaceId' | 'qrCodeToken' | 'checkedIn'>) => void;
  updateGuest: (id: string, data: Partial<Guest>) => void;
  updateGuestRSVP: (guestId: string, status: Guest['status'], notes?: string) => void;
  toggleGuestCheckIn: (guestId: string) => void;
  importGuestsCSV: (list: Partial<Guest>[]) => { added: number; duplicates: number };
  deleteGuest: (id: string) => void;

  addBudgetItem: (item: Omit<BudgetItem, 'id' | 'workspaceId' | 'paidAmount'>) => void;
  updateBudgetItem: (id: string, data: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;
  addPayment: (payment: Omit<Payment, 'id' | 'workspaceId'>) => void;
  markPaymentAsPaid: (paymentId: string) => void;

  addVendor: (vendor: Omit<Vendor, 'id' | 'workspaceId'>) => void;
  updateVendorStatus: (id: string, status: Vendor['status']) => void;
  deleteVendor: (id: string) => void;

  updatePaletteColor: (colorId: string, hex: string, name?: string) => void;
  addOutfit: (outfit: Omit<Outfit, 'id' | 'workspaceId'>) => void;
  updateOutfitStatus: (id: string, status: Outfit['status']) => void;
  deleteOutfit: (id: string) => void;

  assignGuestToSeat: (guestId: string, tableId: string, seatId?: string) => void;
  addTable: (table: Omit<Table, 'id' | 'workspaceId'>) => void;
  updateTable: (id: string, data: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  addVenue: (venue: Omit<Venue, 'id' | 'workspaceId'>) => void;
  deleteVenue: (id: string) => void;
  addDecorItem: (item: Omit<DecorItem, 'id' | 'workspaceId'>) => void;
  deleteDecorItem: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id' | 'workspaceId'>) => void;
  deleteMenuItem: (id: string) => void;
  addStationeryItem: (item: Omit<StationeryItem, 'id' | 'workspaceId'>) => void;
  updateStationeryItemStatus: (id: string, status: StationeryItem['status']) => void;
  deleteStationeryItem: (id: string) => void;
  addPhotoShot: (shot: Omit<PhotoShot, 'id' | 'workspaceId'>) => void;
  togglePhotoShot: (id: string) => void;
  deletePhotoShot: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addDocument: (doc: Omit<Document, 'id' | 'workspaceId' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => Promise<{ success: boolean; error?: string }>;

  addTimelineItem: (item: Omit<TimelineItem, 'id' | 'workspaceId'>) => void;
  addRiskItem: (risk: Omit<RiskItem, 'id' | 'workspaceId'>) => void;
  updateRiskStatus: (id: string, status: RiskItem['status']) => void;

  updateCivilChecklist: (itemId: string, completed: boolean) => void;
  updateWebsiteSettings: (data: Partial<AppStoreState['websiteSettings']>) => void;
  isReadOnlyMode: () => boolean;

  // Dynamic Math & Report Helpers
  getConfirmedGuestsCount: () => number;
  getCostPerGuestMetrics: () => {
    targetCostPerPerson: number;
    contractedCostPerEstimatedGuest: number;
    projectedCostPerConfirmedGuest: number;
    paidCostPerGuest: number;
  };
  getBuffetEstimates: () => {
    buffetMeals: number;
    softDrinksLiters: number;
    sparklingBottles: number;
    sweetsCount: number;
    favorsCount: number;
    invitesCount: number;
  };
}

// Strong Password Rule Check
export function validateStrongPassword(pass: string): { valid: boolean; message?: string } {
  if (pass.length < 8) {
    return { valid: false, message: 'A senha deve conter no mínimo 8 caracteres.' };
  }
  if (!/[A-Z]/.test(pass)) {
    return { valid: false, message: 'A senha deve conter pelo menos uma letra maiúscula.' };
  }
  if (!/[0-9]/.test(pass)) {
    return { valid: false, message: 'A senha deve conter pelo menos um número.' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
    return { valid: false, message: 'A senha deve conter pelo menos um símbolo especial.' };
  }
  return { valid: true };
}

const SNAPSHOT_KEYS = [
  'coupleProfile',
  'palette',
  'venues',
  'outfits',
  'households',
  'guests',
  'tables',
  'seats',
  'tasks',
  'vendors',
  'budgetItems',
  'payments',
  'timeline',
  'documents',
  'gifts',
  'photoShots',
  'notifications',
  'activityLogs',
  'moodboard',
  'decorItems',
  'menuItems',
  'stationeryItems',
  'risks',
  'civilInfo',
  'websiteSettings',
] as const;

function emptyWorkspaceState(
  workspaceId: string,
  partner1: string,
  partner2: string,
  slug: string
): Partial<AppStoreState> {
  return {
    coupleProfile: {
      workspaceId,
      partner1Name: partner1,
      partner2Name: partner2,
      weddingDate: '',
      weddingTime: '16:00',
      timezone: 'America/Sao_Paulo',
      city: '',
      state: '',
      weddingType: 'civil_e_religioso',
      estimatedGuestsCount: 0,
      totalBudgetPlanned: 0,
      financialResponsibles: [],
      style: '',
      formalityLevel: 'Semi-Formal',
      priorities: [],
      availableWeeklyHours: 0,
      customSlug: slug,
      status: 'onboarding',
    },
    palette: {
      workspaceId,
      colors: [],
      primaryTypography: 'Playfair Display',
      secondaryTypography: 'Plus Jakarta Sans',
    },
    guests: [],
    households: [],
    tables: [],
    seats: [],
    tasks: [],
    vendors: [],
    budgetItems: [],
    payments: [],
    outfits: [],
    venues: [],
    documents: [],
    timeline: [],
    decorItems: [],
    risks: [],
    gifts: [],
    photoShots: [],
    notifications: [],
    activityLogs: [],
    moodboard: [],
    menuItems: [],
    stationeryItems: [],
    civilInfo: {
      workspaceId,
      cartorioName: '',
      cartorioCity: '',
      cartorioState: '',
      regimeDeBens: 'comunhao_parcial',
      hasPactoAntenupcial: false,
      processStatus: 'documentos_pendentes',
      checklists: [
        { id: 'c1', title: 'Certidões de nascimento atualizadas (90 dias)', completed: false },
        { id: 'c2', title: 'Comprovantes de residência dos noivos', completed: false },
        { id: 'c3', title: 'RG e CPF das 2 testemunhas', completed: false },
      ],
    },
    websiteSettings: {
      title: `Casamento ${partner1} & ${partner2}`,
      storyText: '',
      dressCodeNotes: '',
      lodgingNotes: '',
      isPublished: false,
      customSlug: slug,
    },
  };
}

const PRIVATE_WORKSPACE_ID = 'lacora-private';
const LOCAL_SNAPSHOT_KEY = 'lacora-private-workspace-v1';
const PRIVATE_USER_ID = 'lacora-couple';
const privateWorkspaceBase = emptyWorkspaceState(
  PRIVATE_WORKSPACE_ID,
  'Jonas',
  'Nome da noiva',
  'nosso-casamento'
);

const privateUser: User = {
  id: PRIVATE_USER_ID,
  name: 'Nós dois',
  email: '',
  emailVerified: true,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

const privateWorkspace: WeddingWorkspace = {
  id: PRIVATE_WORKSPACE_ID,
  name: 'Nosso casamento',
  slug: 'nosso-casamento',
  isDemoWorkspace: false,
  ownerId: PRIVATE_USER_ID,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

const privateMembership: Membership = {
  id: 'lacora-couple-membership',
  workspaceId: PRIVATE_WORKSPACE_ID,
  userId: PRIVATE_USER_ID,
  userName: 'Nós dois',
  userEmail: '',
  role: 'casal_admin',
  permissions: {
    canEditBudget: true,
    canEditGuests: true,
    canEditVisualIdentity: true,
    canEditTasks: true,
    canEditVendors: true,
    canEditContracts: true,
    canManageTeam: true,
  },
  invitedAt: '2026-01-01',
  status: 'ativo',
};

function appUserFromSupabase(user: any): User {
  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário',
    email: user.email || '',
    emailVerified: Boolean(user.email_confirmed_at),
    createdAt: user.created_at || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function newEntityId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

async function authenticatedWorkspaceState(
  user: any,
  preferredWorkspaceId?: string
): Promise<Partial<AppStoreState>> {
  const appUser = appUserFromSupabase(user);
  let workspaceResult = await SupabaseService.loadWorkspace(preferredWorkspaceId);

  if (!workspaceResult.data && !workspaceResult.error && !preferredWorkspaceId) {
    const firstName = appUser.name.trim().split(/\s+/)[0] || 'Parceiro 1';
    const creation = await SupabaseService.createWorkspace({
      name: `Casamento de ${appUser.name}`,
      partner1: firstName,
      partner2: 'Parceiro 2',
    });
    if (creation.error) throw creation.error;
    workspaceResult = await SupabaseService.loadWorkspace(creation.workspaceId || undefined);
  }

  if (workspaceResult.error) throw workspaceResult.error;
  if (!workspaceResult.data) throw new Error('Não foi possível carregar o workspace.');

  const { workspace, membership, profile, snapshot } = workspaceResult.data;
  const base = emptyWorkspaceState(
    workspace.id,
    profile?.partner1Name || appUser.name,
    profile?.partner2Name || 'Parceiro 2',
    profile?.customSlug || workspace.slug
  );
  const safeSnapshot: Partial<AppStoreState> = {};

  for (const key of SNAPSHOT_KEYS) {
    if (snapshot && Object.prototype.hasOwnProperty.call(snapshot, key)) {
      (safeSnapshot as any)[key] = snapshot[key];
    }
  }

  return {
    ...base,
    ...safeSnapshot,
    coupleProfile: (safeSnapshot.coupleProfile || profile || base.coupleProfile) as CoupleProfile,
    currentUser: appUser,
    isAuthenticated: true,
    activeWorkspaceId: workspace.id,
    workspaces: [workspace],
    memberships: [membership],
  };
}

export const useAppStore = create<AppStoreState>()(
    (set, get) => ({
      // Single private workspace for the couple. The access cookie is enforced by proxy.ts.
      currentUser: privateUser,
      isAuthenticated: true,
      activeWorkspaceId: PRIVATE_WORKSPACE_ID,
      workspaces: [privateWorkspace],
      memberships: [privateMembership],

      // A clean local-first workspace. It is restored from localStorage on mount.
      coupleProfile: privateWorkspaceBase.coupleProfile as CoupleProfile,
      palette: privateWorkspaceBase.palette as Palette,
      venues: [],
      outfits: [],
      households: [],
      guests: [],
      tables: [],
      seats: [],
      tasks: [],
      vendors: [],
      budgetItems: [],
      payments: [],
      timeline: [],
      documents: [],
      gifts: [],
      photoShots: [],
      notifications: [],
      activityLogs: [],
      moodboard: [],
      decorItems: [],
      menuItems: [],
      stationeryItems: [],
      risks: [],
      civilInfo: privateWorkspaceBase.civilInfo as CivilWeddingInfo,
      websiteSettings: privateWorkspaceBase.websiteSettings as AppStoreState['websiteSettings'],

      // Auth Implementation
      initializeSession: async () => {
        if (typeof window === 'undefined') return;
        const restoredState: Partial<AppStoreState> = {};
        try {
          const rawSnapshot = window.localStorage.getItem(LOCAL_SNAPSHOT_KEY);
          const snapshot = rawSnapshot ? JSON.parse(rawSnapshot) : null;
          for (const key of SNAPSHOT_KEYS) {
            if (snapshot && Object.prototype.hasOwnProperty.call(snapshot, key)) {
              (restoredState as any)[key] = snapshot[key];
            }
          }
        } catch {
          window.localStorage.removeItem(LOCAL_SNAPSHOT_KEY);
        }

        try {
          const response = await fetch('/api/workspace', { cache: 'no-store' });
          if (response.ok) {
            const cloud = await response.json();
            for (const key of SNAPSHOT_KEYS) {
              if (cloud.snapshot && Object.prototype.hasOwnProperty.call(cloud.snapshot, key)) {
                (restoredState as any)[key] = cloud.snapshot[key];
              }
            }
          }
        } catch {
          // The local snapshot keeps the planner usable during a temporary outage.
        }
        set({
          ...restoredState,
          currentUser: privateUser,
          isAuthenticated: true,
          activeWorkspaceId: PRIVATE_WORKSPACE_ID,
          workspaces: [privateWorkspace],
          memberships: [privateMembership],
        });
      },

      login: async (email, pass) => {
        const cleanEmail = email.trim().toLowerCase();

        if (cleanEmail === 'demo@nossograndedia.app') {
          return get().enterDemoMode();
        }

        if (!cleanEmail || !pass) {
          return { success: false, error: 'Por favor, informe o e-mail e a senha.' };
        }

        await fetch('/api/demo/session', { method: 'DELETE' }).catch(() => undefined);
        const res = await SupabaseService.signInUser(cleanEmail, pass);
        if (res.error || !res.data?.user || !res.data.session) {
          return {
            success: false,
            error: getAuthErrorMessage(res.error, 'E-mail ou senha incorretos.'),
          };
        }

        try {
          const workspaceState = await authenticatedWorkspaceState(res.data.user);
          set(workspaceState);
          return { success: true };
        } catch (workspaceError) {
          await SupabaseService.signOutUser();
          return {
            success: false,
            error:
              workspaceError instanceof Error
                ? workspaceError.message
                : 'Não foi possível carregar seu workspace.',
          };
        }
      },

      signup: async (name, email, pass, confirmPass, acceptedTerms) => {
        const cleanEmail = email.trim().toLowerCase();

        if (!name || !cleanEmail || !pass) {
          return { success: false, error: 'Por favor, preencha todos os campos obrigatórios.' };
        }

        if (!acceptedTerms) {
          return { success: false, error: 'É necessário aceitar os Termos de Uso e a Política de Privacidade para se cadastrar.' };
        }

        if (pass !== confirmPass) {
          return { success: false, error: 'A confirmação de senha não confere com a senha digitada.' };
        }

        const passValidation = validateStrongPassword(pass);
        if (!passValidation.valid) {
          return { success: false, error: passValidation.message };
        }

        const res = await SupabaseService.signUpUser(cleanEmail, pass, name);
        if (res.error || !res.data?.user) {
          return {
            success: false,
            error: getAuthErrorMessage(res.error, 'Não foi possível criar a conta.'),
          };
        }

        if (!res.data.session) {
          return { success: true, requiresEmailConfirmation: true };
        }

        try {
          const workspaceState = await authenticatedWorkspaceState(res.data.user);
          set(workspaceState);
          return { success: true };
        } catch (workspaceError) {
          return {
            success: false,
            error:
              workspaceError instanceof Error
                ? workspaceError.message
                : 'Conta criada, mas o workspace não pôde ser inicializado.',
          };
        }
      },

      logout: async () => {
        await fetch('/api/access/logout', { method: 'POST' }).catch(() => undefined);
        set({ currentUser: null, isAuthenticated: false });
      },

      verifyEmail: async () => {
        const email = get().currentUser?.email;
        if (!email) return { success: false, error: 'Usuário não autenticado.' };
        const { error } = await SupabaseService.resendVerification(email);
        return error
          ? {
              success: false,
              error: getAuthErrorMessage(error, 'Não foi possível reenviar a confirmação.'),
            }
          : { success: true };
      },

      updatePassword: async (oldPass, newPass) => {
        const passValidation = validateStrongPassword(newPass);
        if (!passValidation.valid) {
          return { success: false, error: passValidation.message };
        }
        const email = get().currentUser?.email;
        if (!email) return { success: false, error: 'Usuário não autenticado.' };

        const reauthentication = await SupabaseService.signInUser(email, oldPass);
        if (reauthentication.error) {
          return { success: false, error: 'A senha atual está incorreta.' };
        }

        const { error } = await SupabaseService.updatePassword(newPass);
        return error
          ? { success: false, error: error.message }
          : { success: true };
      },

      deleteAccount: async (pass) => {
        void pass;
        return { success: false, error: 'Este espaço privado não usa contas.' };
      },

      enterDemoMode: async () => {
        return { success: false, error: 'A demonstração foi removida.' };
      },

      // Workspace & Membership Management
      setActiveWorkspace: async (workspaceId) => {
        const { data, error } = await SupabaseService.getCurrentUser();
        if (error || !data.user) return { success: false, error: 'Usuário não autenticado.' };
        try {
          set(await authenticatedWorkspaceState(data.user, workspaceId));
          return { success: true };
        } catch (workspaceError) {
          return {
            success: false,
            error: workspaceError instanceof Error ? workspaceError.message : 'Workspace indisponível.',
          };
        }
      },

      createNewRealWorkspace: async (weddingName, partner1, partner2) => {
        if (!get().isAuthenticated || !get().currentUser) {
          return { success: false, error: 'Faça login para criar um workspace.' };
        }
        const creation = await SupabaseService.createWorkspace({
          name: weddingName,
          partner1,
          partner2,
        });
        if (creation.error || !creation.workspaceId) {
          return {
            success: false,
            error: creation.error?.message || 'Não foi possível criar o workspace.',
          };
        }
        const { data } = await SupabaseService.getCurrentUser();
        if (data.user) set(await authenticatedWorkspaceState(data.user, creation.workspaceId));
        return { success: true, workspaceId: creation.workspaceId };
      },

      deleteCurrentWorkspace: async () => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) {
          return { success: false, error: 'Operação não permitida.' };
        }
        const deletion = await SupabaseService.deleteWorkspace(get().activeWorkspaceId);
        if (deletion.error) return { success: false, error: deletion.error.message };
        const { data } = await SupabaseService.getCurrentUser();
        if (data.user) set(await authenticatedWorkspaceState(data.user));
        return { success: true };
      },

      inviteTeamMember: async (email, role) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated || !get().isCurrentUserAdmin()) {
          return { success: false, error: 'Você não possui permissão para convidar pessoas.' };
        }
        const result = await SupabaseService.createInvitation(
          get().activeWorkspaceId,
          email,
          role
        );
        return result.error
          ? { success: false, error: result.error.message }
          : { success: true };
      },

      completeRealOnboarding: (data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => {
          const updatedProfile = { ...state.coupleProfile, ...data, status: 'active' as const };
          return { coupleProfile: updatedProfile };
        });
      },

      // Role & Permission Checks
      getCurrentRole: () => {
        const { memberships, activeWorkspaceId, currentUser } = get();
        const activeMembership = memberships.find(
          (m) => m.workspaceId === activeWorkspaceId && m.userId === currentUser?.id
        );
        return activeMembership?.role || 'casal_admin';
      },

      isCurrentUserAdmin: () => {
        const role = get().getCurrentRole();
        return role === 'casal_admin' || role === 'admin_geral';
      },

      isReadOnlyMode: () => {
        return false;
      },

      // Module CRUD Actions
      updateCoupleProfile: (data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ coupleProfile: { ...state.coupleProfile, ...data } }));
      },

      addTask: (taskData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskData,
              id: newEntityId('tk'),
              workspaceId: state.activeWorkspaceId,
              attachmentsCount: 0,
              commentsCount: 0,
            },
          ],
        }));
      },

      updateTaskStatus: (id, status) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        }));
      },

      deleteTask: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      addGuest: (guestData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          guests: [
            ...state.guests,
            {
              ...guestData,
              id: newEntityId('g'),
              workspaceId: state.activeWorkspaceId,
              qrCodeToken: crypto.randomUUID().replaceAll('-', ''),
              checkedIn: false,
            },
          ],
        }));
      },

      updateGuest: (id, data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          guests: state.guests.map((g) => (g.id === id ? { ...g, ...data } : g)),
        }));
      },

      updateGuestRSVP: (guestId, status, notes) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === guestId ? { ...g, status, notes: notes || g.notes } : g
          ),
        }));
      },

      toggleGuestCheckIn: (guestId) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, checkedIn: !g.checkedIn } : g)),
        }));
      },

      importGuestsCSV: (importedList) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return { added: 0, duplicates: 0 };
        const existing = get().guests;
        let addedCount = 0;
        let dupCount = 0;
        const newItems: Guest[] = [];

        importedList.forEach((item, idx) => {
          const isDuplicate = existing.some(
            (e) => e.fullName.toLowerCase() === item.fullName?.toLowerCase()
          );
          if (isDuplicate) {
            dupCount++;
          } else {
            addedCount++;
            newItems.push({
              id: newEntityId(`g-csv-${idx}`),
              workspaceId: get().activeWorkspaceId,
              fullName: item.fullName || 'Convidado Sem Nome',
              relationship: item.relationship || 'amigos',
              category: item.category || 'convidado_geral',
              ageType: item.ageType || 'adulto',
              invitationType: 'individual',
              allowedPlusOnes: item.allowedPlusOnes || 0,
              status: item.status || 'pendente',
              eventsPermitted: ['ev1'],
              qrCodeToken: crypto.randomUUID().replaceAll('-', ''),
              checkedIn: false,
              phone: item.phone,
              email: item.email,
            });
          }
        });

        set((state) => ({ guests: [...state.guests, ...newItems] }));
        return { added: addedCount, duplicates: dupCount };
      },

      deleteGuest: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ guests: state.guests.filter((g) => g.id !== id) }));
      },

      addBudgetItem: (itemData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          budgetItems: [
            ...state.budgetItems,
            {
              ...itemData,
              id: newEntityId('bi'),
              workspaceId: state.activeWorkspaceId,
              paidAmount: 0,
            },
          ],
        }));
      },

      updateBudgetItem: (id, data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          budgetItems: state.budgetItems.map((b) => (b.id === id ? { ...b, ...data } : b)),
        }));
      },

      deleteBudgetItem: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ budgetItems: state.budgetItems.filter((b) => b.id !== id) }));
      },

      addPayment: (paymentData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          payments: [
            ...state.payments,
            { ...paymentData, id: newEntityId('p'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      markPaymentAsPaid: (paymentId) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => {
          const payment = state.payments.find((p) => p.id === paymentId);
          if (!payment) return state;

          const updatedPayments = state.payments.map((p) =>
            p.id === paymentId
              ? { ...p, status: 'pago' as const, paidDate: new Date().toISOString().split('T')[0] }
              : p
          );

          const updatedBudgetItems = state.budgetItems.map((item) => {
            if (item.id === payment.budgetItemId) {
              return { ...item, paidAmount: item.paidAmount + payment.amount };
            }
            return item;
          });

          return { payments: updatedPayments, budgetItems: updatedBudgetItems };
        });
      },

      addVendor: (vendorData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          vendors: [
            ...state.vendors,
            { ...vendorData, id: newEntityId('vd'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      updateVendorStatus: (id, status) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, status } : v)),
        }));
      },

      deleteVendor: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ vendors: state.vendors.filter((v) => v.id !== id) }));
      },

      updatePaletteColor: (colorId, hex, name) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          palette: {
            ...state.palette,
            colors: state.palette.colors.map((c) =>
              c.id === colorId ? { ...c, hex, name: name || c.name } : c
            ),
          },
        }));
      },

      addOutfit: (outfitData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          outfits: [
            ...state.outfits,
            { ...outfitData, id: newEntityId('o'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      updateOutfitStatus: (id, status) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          outfits: state.outfits.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },

      deleteOutfit: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ outfits: state.outfits.filter((o) => o.id !== id) }));
      },

      assignGuestToSeat: (guestId, tableId, seatId) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, tableId, seatId } : g)),
        }));
      },

      addTable: (tableData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        const workspaceId = get().activeWorkspaceId;
        const newTable = { ...tableData, id: newEntityId('tbl'), workspaceId };
        set((state) => ({ tables: [...state.tables, newTable] }));
      },

      updateTable: (id, data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          tables: state.tables.map((t) => (t.id === id ? { ...t, ...data } : t)),
        }));
      },

      deleteTable: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          tables: state.tables.filter((t) => t.id !== id),
          guests: state.guests.map((g) => (g.tableId === id ? { ...g, tableId: undefined, seatId: undefined } : g)),
        }));
      },

      addVenue: (venueData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          venues: [
            ...state.venues,
            { ...venueData, id: newEntityId('vn'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      deleteVenue: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ venues: state.venues.filter((venue) => venue.id !== id) }));
      },

      addDecorItem: (itemData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          decorItems: [
            ...state.decorItems,
            { ...itemData, id: newEntityId('decor'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      deleteDecorItem: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ decorItems: state.decorItems.filter((item) => item.id !== id) }));
      },

      addMenuItem: (itemData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          menuItems: [
            ...state.menuItems,
            { ...itemData, id: newEntityId('menu'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      deleteMenuItem: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ menuItems: state.menuItems.filter((item) => item.id !== id) }));
      },

      addStationeryItem: (itemData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          stationeryItems: [
            ...state.stationeryItems,
            { ...itemData, id: newEntityId('stationery'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      updateStationeryItemStatus: (id, status) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          stationeryItems: state.stationeryItems.map((item) => item.id === id ? { ...item, status } : item),
        }));
      },

      deleteStationeryItem: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ stationeryItems: state.stationeryItems.filter((item) => item.id !== id) }));
      },

      addPhotoShot: (shotData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          photoShots: [
            ...state.photoShots,
            { ...shotData, id: newEntityId('shot'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      togglePhotoShot: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          photoShots: state.photoShots.map((shot) => shot.id === id ? { ...shot, taken: !shot.taken } : shot),
        }));
      },

      deletePhotoShot: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ photoShots: state.photoShots.filter((shot) => shot.id !== id) }));
      },

      markNotificationRead: (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          notifications: state.notifications.map((notification) => notification.id === id ? { ...notification, read: true } : notification),
        }));
      },

      markAllNotificationsRead: () => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
        }));
      },

      addDocument: (docData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          documents: [
            ...state.documents,
            {
              ...docData,
              id: newEntityId('doc'),
              workspaceId: state.activeWorkspaceId,
              uploadedAt: new Date().toISOString().split('T')[0],
            },
          ],
        }));
      },

      deleteDocument: async (id) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) {
          return { success: false, error: 'Operação não permitida.' };
        }
        const document = get().documents.find((item) => item.id === id);
        if (!document) return { success: false, error: 'Documento não encontrado.' };
        const deletion = await SupabaseService.deleteDocumentFile(document.fileUrl);
        if (deletion.error) return { success: false, error: deletion.error.message };
        set((state) => ({ documents: state.documents.filter((d) => d.id !== id) }));
        return { success: true };
      },

      addTimelineItem: (itemData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          timeline: [
            ...state.timeline,
            { ...itemData, id: newEntityId('tl'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      addRiskItem: (riskData) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          risks: [
            ...state.risks,
            { ...riskData, id: newEntityId('rk'), workspaceId: state.activeWorkspaceId },
          ],
        }));
      },

      updateRiskStatus: (id, status) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          risks: state.risks.map((r) => (r.id === id ? { ...r, status } : r)),
        }));
      },

      updateCivilChecklist: (itemId, completed) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({
          civilInfo: {
            ...state.civilInfo,
            checklists: state.civilInfo.checklists.map((c) =>
              c.id === itemId ? { ...c, completed } : c
            ),
          },
        }));
      },

      updateWebsiteSettings: (data) => {
        if (get().isReadOnlyMode() || !get().isAuthenticated) return;
        set((state) => ({ websiteSettings: { ...state.websiteSettings, ...data } }));
      },

      // Derived Math Helpers
      getConfirmedGuestsCount: () => {
        const { guests } = get();
        return guests.reduce((acc, g) => (g.status === 'confirmado' ? acc + 1 + (g.allowedPlusOnes || 0) : acc), 0);
      },

      getCostPerGuestMetrics: () => {
        const { coupleProfile, budgetItems } = get();
        const estimated = coupleProfile.estimatedGuestsCount || 100;
        const confirmed = get().getConfirmedGuestsCount();

        const totalPlanned = coupleProfile.totalBudgetPlanned || 0;
        const totalContracted = budgetItems.reduce((acc, i) => acc + (i.contractedCost || i.estimatedCost || 0), 0);
        const totalPaid = budgetItems.reduce((acc, i) => acc + i.paidAmount, 0);

        return {
          targetCostPerPerson: Math.round(totalPlanned / estimated),
          contractedCostPerEstimatedGuest: Math.round(totalContracted / estimated),
          projectedCostPerConfirmedGuest: confirmed > 0 ? Math.round(totalContracted / confirmed) : 0,
          paidCostPerGuest: Math.round(totalPaid / estimated),
        };
      },

      getBuffetEstimates: () => {
        const confirmed = get().getConfirmedGuestsCount() || get().coupleProfile.estimatedGuestsCount || 100;
        return {
          buffetMeals: confirmed,
          softDrinksLiters: Math.round(confirmed * 0.8),
          sparklingBottles: Math.ceil(confirmed / 3),
          sweetsCount: confirmed * 6,
          favorsCount: Math.ceil(confirmed * 1.1),
          invitesCount: Math.ceil(confirmed / 2),
        };
      },
    })
);

let localSaveTimer: ReturnType<typeof setTimeout> | null = null;

function snapshotFromState(state: AppStoreState): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of SNAPSHOT_KEYS) payload[key] = state[key];
  return payload;
}

if (typeof window !== 'undefined') {
  useAppStore.subscribe((state, previousState) => {
    if (!state.isAuthenticated || state.activeWorkspaceId !== PRIVATE_WORKSPACE_ID) return;

    const changed = SNAPSHOT_KEYS.some((key) => state[key] !== previousState[key]);
    if (!changed) return;

    if (localSaveTimer) clearTimeout(localSaveTimer);
    localSaveTimer = setTimeout(() => {
      const currentState = useAppStore.getState();
      if (!currentState.isAuthenticated) return;
      window.localStorage.setItem(
        LOCAL_SNAPSHOT_KEY,
        JSON.stringify(snapshotFromState(currentState))
      );
      void fetch('/api/workspace', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ snapshot: snapshotFromState(currentState) }),
      }).catch(() => undefined);
    }, 300);
  });
}
