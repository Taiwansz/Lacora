import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SupabaseService } from './supabase-service';
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
  RiskItem,
  CivilWeddingInfo
} from '../types';
import {
  DEMO_WORKSPACE_ID,
  demoCoupleProfile,
  demoPalette,
  demoVenues,
  demoOutfits,
  demoHouseholds,
  demoGuests,
  demoTables,
  demoTasks,
  demoVendors,
  demoBudgetItems,
  demoPayments,
  demoTimeline,
  demoDocuments,
  demoGifts,
  demoPhotoShots,
  demoNotifications,
  demoActivityLog
} from './demo-data';

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
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    pass: string,
    confirmPass: string,
    acceptedTerms: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  verifyEmail: () => void;
  updatePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  deleteAccount: (pass: string) => { success: boolean; error?: string };
  enterDemoMode: () => void;

  // Workspace & Membership Actions
  setActiveWorkspace: (workspaceId: string) => void;
  createNewRealWorkspace: (weddingName: string, partner1: string, partner2: string) => string;
  deleteCurrentWorkspace: () => void;
  inviteTeamMember: (email: string, role: UserRole) => void;

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
  addDocument: (doc: Omit<Document, 'id' | 'workspaceId' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;

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

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // Auth Initial State
      currentUser: null,
      isAuthenticated: false,

      // Initial Workspaces & Memberships (Fictional Demo Workspace)
      activeWorkspaceId: DEMO_WORKSPACE_ID,
      workspaces: [
        {
          id: DEMO_WORKSPACE_ID,
          name: 'Casamento Modelo (Demonstração)',
          slug: 'alex-taylor-demo',
          isDemoWorkspace: true,
          ownerId: 'demo-user-owner',
          createdAt: '2026-01-01',
          updatedAt: '2026-07-26',
        },
      ],
      memberships: [
        {
          id: 'mem-demo-1',
          workspaceId: DEMO_WORKSPACE_ID,
          userId: 'demo-user-owner',
          userName: 'Alex Silva',
          userEmail: 'alex@exemplo.example',
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
        },
      ],

      // Demo Data Collections
      coupleProfile: demoCoupleProfile,
      palette: demoPalette,
      venues: demoVenues,
      outfits: demoOutfits,
      households: demoHouseholds,
      guests: demoGuests,
      tables: demoTables,
      seats: [],
      tasks: demoTasks,
      vendors: demoVendors,
      budgetItems: demoBudgetItems,
      payments: demoPayments,
      timeline: demoTimeline,
      documents: demoDocuments,
      gifts: demoGifts,
      photoShots: demoPhotoShots,
      notifications: demoNotifications,
      activityLogs: demoActivityLog,
      moodboard: [
        {
          id: 'mb1',
          workspaceId: DEMO_WORKSPACE_ID,
          category: 'flores',
          imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
          title: 'Arranjos Altos com Orquídeas e Eucalipto',
          votesCount: 5,
        },
      ],
      decorItems: [
        {
          id: 'dec1',
          workspaceId: DEMO_WORKSPACE_ID,
          section: 'altar',
          title: 'Arco Botânico Desconstruído na Paleta Marsala',
          referenceColor: '#8B263E',
          floralsOrMaterials: 'Rosas, Eucaliptos e Orquídeas',
          quantity: 1,
          rentalOrPurchase: 'aluguel',
          cost: 4500,
        },
      ],
      menuItems: [
        {
          id: 'mi1',
          workspaceId: DEMO_WORKSPACE_ID,
          course: 'prato_principal',
          title: 'Medalhão de Mignon ao Molho Roti com Risoto',
          description: 'Opção principal degustada e aprovada',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isNutFree: true,
          tastingApproved: true,
        },
      ],
      risks: [
        {
          id: 'rk1',
          workspaceId: DEMO_WORKSPACE_ID,
          description: 'Chuva forte no horário da cerimônia ao ar livre',
          category: 'clima',
          probability: 'media',
          impact: 'alto',
          ownerName: 'Cerimonialista Responsável',
          triggerEvent: 'Previsão do tempo superior a 60% de chuva',
          preventivePlan: 'Instalação da cobertura envidraçada na pergola 24h antes',
          responsePlan: 'Mudar a cerimônia para a área coberta às 13:30h',
          status: 'mitigado',
        },
      ],
      civilInfo: {
        workspaceId: DEMO_WORKSPACE_ID,
        cartorioName: 'Cartório de Registro Civil das Pessoas Naturais',
        cartorioCity: 'São Paulo',
        cartorioState: 'SP',
        regimeDeBens: 'comunhao_parcial',
        hasPactoAntenupcial: false,
        processStatus: 'habilitado',
        expirationDate: '2027-12-10',
        checklists: [
          { id: 'c1', title: 'Certidões de nascimento atualizadas (90 dias)', completed: true },
          { id: 'c2', title: 'Comprovantes de residência dos noivos', completed: true },
          { id: 'c3', title: 'RG e CPF das 2 testemunhas', completed: true },
        ],
      },

      websiteSettings: {
        title: 'Casamento Alex & Taylor',
        storyText: 'Nos conhecemos em um evento de trabalho e decidimos compartilhar a vida juntos.',
        dressCodeNotes: 'Traje Passeio Completo / Semi-Formal',
        lodgingNotes: 'Indicação de hotéis parceiros na região',
        isPublished: true,
        customSlug: 'alex-taylor-demo',
      },

      // Auth Implementation
      login: async (email, pass) => {
        const cleanEmail = email.trim().toLowerCase();

        // Se for o e-mail de demonstração, ativa o modo demo com dados fictícios
        if (cleanEmail === 'demo@nossograndedia.app') {
          get().enterDemoMode();
          if (typeof document !== 'undefined') {
            document.cookie = 'nosso_grande_dia_demo_mode=true; path=/; max-age=86400';
          }
          return { success: true };
        }

        if (!cleanEmail || !pass) {
          return { success: false, error: 'Por favor, informe o e-mail e a senha.' };
        }

        const res = await SupabaseService.signInUser(cleanEmail, pass);
        if (res.error) {
          return { success: false, error: res.error.message || 'E-mail ou senha incorretos.' };
        }

        if (typeof document !== 'undefined') {
          document.cookie = 'nosso_grande_dia_demo_mode=false; path=/; max-age=0';
        }

        const userObj = res.data?.user;
        const validUser: User = {
          id: userObj?.id || `user-${Date.now()}`,
          name: userObj?.user_metadata?.full_name || cleanEmail.split('@')[0],
          email: cleanEmail,
          emailVerified: !!userObj?.email_confirmed_at,
          createdAt: userObj?.created_at || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          currentUser: validUser,
          isAuthenticated: true,
        });

        const activeWs = get().workspaces.find((w) => w.id === get().activeWorkspaceId);
        if (!activeWs || activeWs.isDemoWorkspace || get().activeWorkspaceId === DEMO_WORKSPACE_ID) {
          const partner1Name = validUser.name.split(' ')[0] || 'Parceiro 1';
          get().createNewRealWorkspace(`Casamento de ${validUser.name}`, partner1Name, 'Parceiro 2');
        }

        return { success: true };
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
        if (res.error) {
          return { success: false, error: res.error.message };
        }

        const userObj = res.data?.user;
        const newUser: User = {
          id: userObj?.id || `user-${Date.now()}`,
          name,
          email: cleanEmail,
          emailVerified: !!userObj?.email_confirmed_at,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          currentUser: newUser,
          isAuthenticated: true,
        });

        get().createNewRealWorkspace(`Casamento de ${name}`, name.split(' ')[0] || 'Parceiro 1', 'Parceiro 2');
        return { success: true };
      },

      logout: async () => {
        await SupabaseService.signOutUser();
        if (typeof document !== 'undefined') {
          document.cookie = 'nosso_grande_dia_demo_mode=false; path=/; max-age=0';
        }
        set({ currentUser: null, isAuthenticated: false, activeWorkspaceId: DEMO_WORKSPACE_ID });
      },

      verifyEmail: () => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, emailVerified: true } : null
      })),

      updatePassword: (oldPass, newPass) => {
        const passValidation = validateStrongPassword(newPass);
        if (!passValidation.valid) {
          return { success: false, error: passValidation.message };
        }
        return { success: true };
      },

      deleteAccount: (pass) => {
        if (!pass) return { success: false, error: 'Confirme sua senha para excluir a conta.' };
        set({ currentUser: null, isAuthenticated: false });
        return { success: true };
      },

      enterDemoMode: () => {
        set({
          activeWorkspaceId: DEMO_WORKSPACE_ID,
          coupleProfile: demoCoupleProfile,
          palette: demoPalette,
          venues: demoVenues,
          outfits: demoOutfits,
          households: demoHouseholds,
          guests: demoGuests,
          tables: demoTables,
          tasks: demoTasks,
          vendors: demoVendors,
          budgetItems: demoBudgetItems,
          payments: demoPayments,
          timeline: demoTimeline,
          documents: demoDocuments,
          gifts: demoGifts,
          photoShots: demoPhotoShots,
          notifications: demoNotifications,
          activityLogs: demoActivityLog,
        });
      },

      // Workspace & Membership Management
      setActiveWorkspace: (workspaceId) => set({ activeWorkspaceId: workspaceId }),

      createNewRealWorkspace: (weddingName, partner1, partner2) => {
        const newWsId = `ws-real-${Date.now()}`;
        const userId = get().currentUser?.id || `user-${Date.now()}`;

        const newWorkspace: WeddingWorkspace = {
          id: newWsId,
          name: weddingName,
          slug: weddingName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          isDemoWorkspace: false,
          ownerId: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const newMembership: Membership = {
          id: `mem-${Date.now()}`,
          workspaceId: newWsId,
          userId,
          userName: get().currentUser?.name || partner1,
          userEmail: get().currentUser?.email || '',
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
          invitedAt: new Date().toISOString(),
          status: 'ativo',
        };

        // Create COMPLETELY EMPTY collections for real user!
        const emptyCoupleProfile: CoupleProfile = {
          workspaceId: newWsId,
          partner1Name: partner1,
          partner2Name: partner2,
          weddingDate: '',
          weddingTime: '16:00',
          timezone: 'America/Sao_Paulo',
          city: '',
          state: '',
          weddingType: 'civil_e_religioso',
          estimatedGuestsCount: 100,
          totalBudgetPlanned: 80000,
          financialResponsibles: ['Casal'],
          style: 'Elegante e Moderno',
          formalityLevel: 'Semi-Formal',
          priorities: ['Gastronomia', 'Música'],
          availableWeeklyHours: 6,
          customSlug: weddingName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          status: 'onboarding',
        };

        const emptyPalette: Palette = {
          workspaceId: newWsId,
          colors: [
            { id: 'c1', name: 'Marsala', hex: '#8B263E', rgb: '139, 38, 62', role: 'principal', appliedTo: [] },
            { id: 'c2', name: 'Rosa Antigo', hex: '#C48B9F', rgb: '196, 139, 159', role: 'secundaria', appliedTo: [] },
            { id: 'c3', name: 'Grafite', hex: '#1E293B', rgb: '30, 41, 59', role: 'acento', appliedTo: [] },
            { id: 'c4', name: 'Verde Sálvia', hex: '#5B7065', rgb: '91, 112, 101', role: 'neutra', appliedTo: [] },
          ],
          primaryTypography: 'Playfair Display',
          secondaryTypography: 'Plus Jakarta Sans',
        };

        set((state) => ({
          workspaces: [...state.workspaces.filter((w) => w.id !== newWsId), newWorkspace],
          memberships: [...state.memberships, newMembership],
          activeWorkspaceId: newWsId,
          coupleProfile: emptyCoupleProfile,
          palette: emptyPalette,
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
          civilInfo: {
            workspaceId: newWsId,
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
            dressCodeNotes: 'Semi-Formal',
            lodgingNotes: '',
            isPublished: false,
            customSlug: weddingName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          },
        }));

        return newWsId;
      },

      deleteCurrentWorkspace: () => {
        const activeId = get().activeWorkspaceId;
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== activeId),
          activeWorkspaceId: DEMO_WORKSPACE_ID,
        }));
      },

      inviteTeamMember: (email, role) => {
        const activeId = get().activeWorkspaceId;
        const newMembership: Membership = {
          id: `mem-${Date.now()}`,
          workspaceId: activeId,
          userId: `user-invited-${Date.now()}`,
          userName: email.split('@')[0],
          userEmail: email,
          role,
          permissions: {
            canEditBudget: role === 'casal_admin' || role === 'cerimonialista',
            canEditGuests: role === 'casal_admin' || role === 'cerimonialista' || role === 'familiar',
            canEditVisualIdentity: role === 'casal_admin',
            canEditTasks: role !== 'convidado',
            canEditVendors: role === 'casal_admin' || role === 'cerimonialista',
            canEditContracts: role === 'casal_admin',
            canManageTeam: role === 'casal_admin',
          },
          invitedAt: new Date().toISOString(),
          status: 'pendente',
        };
        set((state) => ({ memberships: [...state.memberships, newMembership] }));
      },

      completeRealOnboarding: (data) => {
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
        const { workspaces, activeWorkspaceId } = get();
        const activeWs = workspaces.find((w) => w.id === activeWorkspaceId);
        return !!activeWs?.isDemoWorkspace || activeWorkspaceId === DEMO_WORKSPACE_ID;
      },

      // Module CRUD Actions
      updateCoupleProfile: (data) =>
        set((state) => ({ coupleProfile: { ...state.coupleProfile, ...data } })),

      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskData,
              id: `tk-${Date.now()}`,
              workspaceId: state.activeWorkspaceId,
              attachmentsCount: 0,
              commentsCount: 0,
            },
          ],
        })),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      addGuest: (guestData) => {
        if (get().isReadOnlyMode()) return;
        set((state) => ({
          guests: [
            ...state.guests,
            {
              ...guestData,
              id: `g-${Date.now()}`,
              workspaceId: state.activeWorkspaceId,
              qrCodeToken: `QR-${Date.now().toString().slice(-6)}`,
              checkedIn: false,
            },
          ],
        }));
      },

      updateGuest: (id, data) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === id ? { ...g, ...data } : g)),
        })),

      updateGuestRSVP: (guestId, status, notes) =>
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === guestId ? { ...g, status, notes: notes || g.notes } : g
          ),
        })),

      toggleGuestCheckIn: (guestId) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, checkedIn: !g.checkedIn } : g)),
        })),

      importGuestsCSV: (importedList) => {
        if (get().isReadOnlyMode()) return { added: 0, duplicates: 0 };
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
              id: `g-csv-${Date.now()}-${idx}`,
              workspaceId: get().activeWorkspaceId,
              fullName: item.fullName || 'Convidado Sem Nome',
              relationship: item.relationship || 'amigos',
              category: item.category || 'convidado_geral',
              ageType: item.ageType || 'adulto',
              invitationType: 'individual',
              allowedPlusOnes: item.allowedPlusOnes || 0,
              status: item.status || 'pendente',
              eventsPermitted: ['ev1'],
              qrCodeToken: `QR-CSV-${Date.now().toString().slice(-4)}-${idx}`,
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
        if (get().isReadOnlyMode()) return;
        set((state) => ({ guests: state.guests.filter((g) => g.id !== id) }));
      },

      addBudgetItem: (itemData) => {
        if (get().isReadOnlyMode()) return;
        set((state) => ({
          budgetItems: [
            ...state.budgetItems,
            {
              ...itemData,
              id: `bi-${Date.now()}`,
              workspaceId: state.activeWorkspaceId,
              paidAmount: 0,
            },
          ],
        }));
      },

      updateBudgetItem: (id, data) =>
        set((state) => ({
          budgetItems: state.budgetItems.map((b) => (b.id === id ? { ...b, ...data } : b)),
        })),

      deleteBudgetItem: (id) =>
        set((state) => ({ budgetItems: state.budgetItems.filter((b) => b.id !== id) })),

      addPayment: (paymentData) =>
        set((state) => ({
          payments: [
            ...state.payments,
            { ...paymentData, id: `p-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      markPaymentAsPaid: (paymentId) =>
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
        }),

      addVendor: (vendorData) =>
        set((state) => ({
          vendors: [
            ...state.vendors,
            { ...vendorData, id: `vd-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      updateVendorStatus: (id, status) =>
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, status } : v)),
        })),

      deleteVendor: (id) =>
        set((state) => ({ vendors: state.vendors.filter((v) => v.id !== id) })),

      updatePaletteColor: (colorId, hex, name) =>
        set((state) => ({
          palette: {
            ...state.palette,
            colors: state.palette.colors.map((c) =>
              c.id === colorId ? { ...c, hex, name: name || c.name } : c
            ),
          },
        })),

      addOutfit: (outfitData) =>
        set((state) => ({
          outfits: [
            ...state.outfits,
            { ...outfitData, id: `o-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      updateOutfitStatus: (id, status) =>
        set((state) => ({
          outfits: state.outfits.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      deleteOutfit: (id) =>
        set((state) => ({ outfits: state.outfits.filter((o) => o.id !== id) })),

      assignGuestToSeat: (guestId, tableId, seatId) => {
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, tableId, seatId } : g)),
        }));
        SupabaseService.assignGuestToTable(guestId, tableId || null);
      },

      addTable: (tableData) => {
        const workspaceId = get().activeWorkspaceId;
        const newTable = { ...tableData, id: `tbl-${Date.now()}`, workspaceId };
        set((state) => ({ tables: [...state.tables, newTable] }));
        SupabaseService.saveTable(newTable);
      },

      updateTable: (id, data) => {
        set((state) => ({
          tables: state.tables.map((t) => (t.id === id ? { ...t, ...data } : t)),
        }));
        const updatedTable = get().tables.find((t) => t.id === id);
        if (updatedTable) SupabaseService.saveTable(updatedTable);
      },

      deleteTable: (id) => {
        set((state) => ({
          tables: state.tables.filter((t) => t.id !== id),
          guests: state.guests.map((g) => (g.tableId === id ? { ...g, tableId: undefined, seatId: undefined } : g)),
        }));
        SupabaseService.deleteTable(id);
      },

      addVenue: (venueData) =>
        set((state) => ({
          venues: [
            ...state.venues,
            { ...venueData, id: `vn-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      addDocument: (docData) =>
        set((state) => ({
          documents: [
            ...state.documents,
            {
              ...docData,
              id: `doc-${Date.now()}`,
              workspaceId: state.activeWorkspaceId,
              uploadedAt: new Date().toISOString().split('T')[0],
            },
          ],
        })),

      deleteDocument: (id) =>
        set((state) => ({ documents: state.documents.filter((d) => d.id !== id) })),

      addTimelineItem: (itemData) =>
        set((state) => ({
          timeline: [
            ...state.timeline,
            { ...itemData, id: `tl-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      addRiskItem: (riskData) =>
        set((state) => ({
          risks: [
            ...state.risks,
            { ...riskData, id: `rk-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ],
        })),

      updateRiskStatus: (id, status) =>
        set((state) => ({
          risks: state.risks.map((r) => (r.id === id ? { ...r, status } : r)),
        })),

      updateCivilChecklist: (itemId, completed) =>
        set((state) => ({
          civilInfo: {
            ...state.civilInfo,
            checklists: state.civilInfo.checklists.map((c) =>
              c.id === itemId ? { ...c, completed } : c
            ),
          },
        })),

      updateWebsiteSettings: (data) =>
        set((state) => ({ websiteSettings: { ...state.websiteSettings, ...data } })),

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
    }),
    {
      name: 'nosso_grande_dia_store_v3',
    }
  )
);
