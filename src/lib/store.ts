import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  login: (email: string, pass: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  verifyEmail: () => void;
  updatePassword: (newPass: string) => void;
  deleteAccount: () => void;
  enterDemoMode: () => void;

  // Workspace & Membership Actions
  setActiveWorkspace: (workspaceId: string) => void;
  createNewRealWorkspace: (weddingName: string, partner1: string, partner2: string) => void;
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
  addVenue: (venue: Omit<Venue, 'id' | 'workspaceId'>) => void;
  addDocument: (doc: Omit<Document, 'id' | 'workspaceId' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;

  addTimelineItem: (item: Omit<TimelineItem, 'id' | 'workspaceId'>) => void;
  addRiskItem: (risk: Omit<RiskItem, 'id' | 'workspaceId'>) => void;
  updateRiskStatus: (id: string, status: RiskItem['status']) => void;

  updateCivilChecklist: (itemId: string, completed: boolean) => void;
  updateWebsiteSettings: (data: Partial<AppStoreState['websiteSettings']>) => void;

  // Dynamic Math & Report Helpers
  getConfirmedGuestsCount: () => number;
  getCostPerGuestMetrics: () => {
    plannedCostPerGuest: number;
    contractedCostPerGuest: number;
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

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // Auth Initial State
      currentUser: null,
      isAuthenticated: false,

      // Initial Workspaces & Memberships
      activeWorkspaceId: DEMO_WORKSPACE_ID,
      workspaces: [
        {
          id: DEMO_WORKSPACE_ID,
          name: 'Casamento Matheus & Virginia (Demonstração)',
          slug: 'matheus-virginia-demo',
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
          userName: 'Matheus Sousa',
          userEmail: 'matheus@exemplo.com',
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
          ownerName: 'Cerimonialista Juliana',
          triggerEvent: 'Previsão do tempo superior a 60% de chuva',
          preventivePlan: 'Instalação da cobertura envidraçada na pergola 24h antes',
          responsePlan: 'Mudar a cerimônia para a área coberta às 13:30h',
          status: 'mitigado',
        },
      ],
      civilInfo: {
        workspaceId: DEMO_WORKSPACE_ID,
        cartorioName: 'Cartório de Registro Civil de Campos do Jordão',
        cartorioCity: 'Campos do Jordão',
        cartorioState: 'SP',
        regimeDeBens: 'comunhao_parcial',
        hasPactoAntenupcial: false,
        processStatus: 'habilitado',
        expirationDate: '2026-12-10',
        checklists: [
          { id: 'c1', title: 'Certidões de nascimento atualizadas (90 dias)', completed: true },
          { id: 'c2', title: 'Comprovantes de residência dos noivos', completed: true },
          { id: 'c3', title: 'RG e CPF das 2 testemunhas', completed: true },
        ],
      },

      websiteSettings: {
        title: 'Casamento Matheus & Virginia',
        storyText: 'Nos conhecemos em uma tarde fria e decidimos compartilhar a vida juntos.',
        dressCodeNotes: 'Traje Passeio Completo / Semi-Formal',
        lodgingNotes: 'Indicação de hotéis parceiros em Campos do Jordão',
        isPublished: true,
        customSlug: 'matheus-virginia-2026',
      },

      // Auth Implementation
      login: (email, pass) => {
        const users = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('nosso_users') || '[]') : [];
        const user = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user && email !== 'demo@nossograndedia.app') {
          return { success: false, error: 'Usuário não encontrado. Crie uma conta para acessar.' };
        }

        const validUser: User = user || {
          id: 'user-auth-real',
          name: email.split('@')[0] || 'Usuário',
          email,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          currentUser: validUser,
          isAuthenticated: true,
        });
        return { success: true };
      },

      signup: (name, email, pass) => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          emailVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          currentUser: newUser,
          isAuthenticated: true,
        });

        // Automatically create clean workspace for real user
        get().createNewRealWorkspace(`Casamento de ${name}`, name.split(' ')[0] || 'Noivo(a) 1', 'Noivo(a) 2');
        return { success: true };
      },

      logout: () => set({ currentUser: null, isAuthenticated: false }),
      verifyEmail: () => set((state) => ({
        currentUser: state.currentUser ? { ...state.currentUser, emailVerified: true } : null
      })),
      updatePassword: () => {},
      deleteAccount: () => set({ currentUser: null, isAuthenticated: false }),

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
        const userId = get().currentUser?.id || 'owner';

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
          weddingDate: '2026-11-14',
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

        set((state) => ({
          workspaces: [...state.workspaces, newWorkspace],
          memberships: [...state.memberships, newMembership],
          activeWorkspaceId: newWsId,
          coupleProfile: emptyCoupleProfile,
          guests: [],
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
        }));
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

      addGuest: (guestData) =>
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
        })),

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

      deleteGuest: (id) =>
        set((state) => ({ guests: state.guests.filter((g) => g.id !== id) })),

      addBudgetItem: (itemData) =>
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
        })),

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

      assignGuestToSeat: (guestId, tableId, seatId) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === guestId ? { ...g, tableId, seatId } : g)),
        })),

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
          ].sort((a, b) => a.time.localeCompare(b.time)),
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
        const estimated = coupleProfile.estimatedGuestsCount || 1;
        const confirmed = get().getConfirmedGuestsCount() || estimated;

        const totalPlanned = coupleProfile.totalBudgetPlanned;
        const totalContracted = budgetItems.reduce((acc, i) => acc + (i.contractedCost || i.estimatedCost || 0), 0);
        const totalPaid = budgetItems.reduce((acc, i) => acc + i.paidAmount, 0);

        return {
          plannedCostPerGuest: Math.round(totalPlanned / estimated),
          contractedCostPerGuest: Math.round(totalContracted / confirmed),
          paidCostPerGuest: Math.round(totalPaid / confirmed),
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
      name: 'nosso_grande_dia_store_v2',
    }
  )
);
