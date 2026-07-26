import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  UserRole,
  CoupleProfile,
  Guest,
  Household,
  Task,
  Vendor,
  BudgetItem,
  Payment,
  Palette,
  PaletteColor,
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
  MenuItem
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

export interface ApplicationState {
  // Active Tenant / Workspace State
  activeWorkspaceId: string;
  activeRole: UserRole;
  workspaces: { id: string; name: string; slug: string }[];
  
  // Entities Store
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

  // Actions & Cross-module triggers
  setActiveWorkspace: (workspaceId: string) => void;
  setActiveRole: (role: UserRole) => void;
  createNewWorkspace: (name: string, coupleNames: string) => void;
  resetToDemoData: () => void;

  // Onboarding
  completeOnboarding: (data: Partial<CoupleProfile>) => void;

  // Couple Profile
  updateCoupleProfile: (data: Partial<CoupleProfile>) => void;

  // Tasks (Checklist)
  addTask: (task: Omit<Task, 'id' | 'workspaceId' | 'attachmentsCount' | 'commentsCount'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  deleteTask: (id: string) => void;

  // Guests & RSVP
  addGuest: (guest: Omit<Guest, 'id' | 'workspaceId' | 'qrCodeToken' | 'checkedIn'>) => void;
  updateGuestRSVP: (guestId: string, status: Guest['status'], notes?: string) => void;
  toggleGuestCheckIn: (guestId: string) => void;
  importGuestsFromCSV: (guestList: Partial<Guest>[]) => void;
  deleteGuest: (id: string) => void;

  // Budget & Payments
  addBudgetItem: (item: Omit<BudgetItem, 'id' | 'workspaceId' | 'paidAmount' | 'costPerGuest'>) => void;
  addPayment: (payment: Omit<Payment, 'id' | 'workspaceId'>) => void;
  markPaymentAsPaid: (paymentId: string) => void;

  // Vendors
  addVendor: (vendor: Omit<Vendor, 'id' | 'workspaceId'>) => void;
  updateVendorStatus: (id: string, status: Vendor['status']) => void;

  // Palette & Visual Identity
  updatePaletteColor: (colorId: string, hex: string, name?: string) => void;

  // Outfits
  addOutfit: (outfit: Omit<Outfit, 'id' | 'workspaceId'>) => void;
  updateOutfitStatus: (id: string, status: Outfit['status']) => void;

  // Tables & Seating
  assignGuestToSeat: (guestId: string, tableId: string, seatId?: string) => void;

  // Documents
  addDocument: (doc: Omit<Document, 'id' | 'workspaceId' | 'uploadedAt'>) => void;

  // Timeline
  addTimelineItem: (item: Omit<TimelineItem, 'id' | 'workspaceId'>) => void;

  // Helper Calculations (Derived reactive state)
  getConfirmedGuestsCount: () => number;
  getTotalBudgetSpent: () => number;
  getCostPerGuest: () => number;
  getBuffetEstimates: () => {
    buffetMeals: number;
    softDrinksLiters: number;
    sparklingBottles: number;
    sweetsCount: number;
    favorsCount: number;
    invitesCount: number;
  };
}

export const useAppStore = create<ApplicationState>()(
  persist(
    (set, get) => ({
      activeWorkspaceId: DEMO_WORKSPACE_ID,
      activeRole: 'casal_admin',
      workspaces: [
        { id: DEMO_WORKSPACE_ID, name: 'Casamento Matheus & Virginia', slug: 'matheus-virginia' },
      ],

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
        {
          id: 'mb2',
          workspaceId: DEMO_WORKSPACE_ID,
          category: 'convite',
          imageUrl: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&w=600&q=80',
          title: 'Convite em Papel Algodão com Lacre de Cera Marsala',
          votesCount: 4,
        },
      ],
      decorItems: [
        {
          id: 'dec1',
          workspaceId: DEMO_WORKSPACE_ID,
          section: 'altar',
          title: 'Arco Botânico Desconstruído com Proteas e Rosas Marsala',
          referenceColor: '#8B263E',
          floralsOrMaterials: 'Rosas, Eucaliptos, Proteas e Orquídeas Phalaenopsis',
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
          title: 'Medalhão de Mignon ao Molho Roti com Risoto de Grana Padano',
          description: 'Acompanha crispi de alho-poró e aspargos grelhados',
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          isNutFree: true,
          tastingApproved: true,
        },
        {
          id: 'mi2',
          workspaceId: DEMO_WORKSPACE_ID,
          course: 'prato_principal',
          title: 'Ravioli de Abóbora Cabotiá com Manteiga de Sálvia e Nozes Caramelizadas',
          description: 'Opção vegetariana e sem lactose mediante solicitação',
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          isNutFree: false,
          tastingApproved: true,
        },
      ],

      // Actions
      setActiveWorkspace: (workspaceId) => set({ activeWorkspaceId: workspaceId }),
      setActiveRole: (role) => set({ activeRole: role }),

      createNewWorkspace: (name, coupleNames) => {
        const newId = `ws-${Date.now()}`;
        const newWorkspace = { id: newId, name, slug: name.toLowerCase().replace(/\s+/g, '-') };
        set((state) => ({
          workspaces: [...state.workspaces, newWorkspace],
          activeWorkspaceId: newId,
          coupleProfile: {
            ...demoCoupleProfile,
            workspaceId: newId,
            partner1Name: coupleNames.split('&')[0]?.trim() || 'Noivo(a) 1',
            partner2Name: coupleNames.split('&')[1]?.trim() || 'Noivo(a) 2',
          },
          guests: [],
          tasks: [],
          vendors: [],
          budgetItems: [],
          payments: [],
        }));
      },

      resetToDemoData: () => set({
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
      }),

      completeOnboarding: (data) => {
        set((state) => {
          const updatedProfile = { ...state.coupleProfile, ...data, status: 'active' as const };
          
          // Auto-generate Checklist Tasks based on monthsBeforeWedding
          const autoTasks: Task[] = [
            {
              id: `task-auto-1`,
              workspaceId: state.activeWorkspaceId,
              title: 'Definir estilo do casamento e contratar Assessoria/Cerimonial',
              category: 'Planejamento Inicial',
              assignedToUserIds: ['user-1'],
              dueDate: '2026-08-15',
              priority: 'urgente',
              status: 'nao_iniciada',
              subtasks: [{ id: 'st1', title: 'Entrevistar 3 cerimonialistas recomendados', completed: false }],
              attachmentsCount: 0,
              commentsCount: 0,
              monthsBeforeWedding: 12,
            },
            {
              id: `task-auto-2`,
              workspaceId: state.activeWorkspaceId,
              title: 'Visitar espaços e degustar cardápios de Buffet',
              category: 'Local & Gastronomia',
              assignedToUserIds: ['user-1'],
              dueDate: '2026-09-01',
              priority: 'alta',
              status: 'nao_iniciada',
              subtasks: [{ id: 'st2', title: 'Conferir alvarás e plano de chuva', completed: false }],
              attachmentsCount: 0,
              commentsCount: 0,
              monthsBeforeWedding: 12,
            },
          ];

          return {
            coupleProfile: updatedProfile,
            tasks: [...state.tasks, ...autoTasks],
            activityLogs: [
              {
                id: `act-${Date.now()}`,
                workspaceId: state.activeWorkspaceId,
                userId: 'system',
                userName: 'Sistema Nosso Grande Dia',
                action: 'Onboarding Concluído',
                details: 'Perfil do casal configurado e checklist gerado automaticamente.',
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              },
              ...state.activityLogs,
            ],
          };
        });
      },

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
        set((state) => {
          const newGuest: Guest = {
            ...guestData,
            id: `g-${Date.now()}`,
            workspaceId: state.activeWorkspaceId,
            qrCodeToken: `QR-${guestData.fullName.toUpperCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-4)}`,
            checkedIn: false,
          };
          return { guests: [...state.guests, newGuest] };
        }),

      updateGuestRSVP: (guestId, status, notes) =>
        set((state) => {
          const updatedGuests = state.guests.map((g) =>
            g.id === guestId ? { ...g, status, notes: notes || g.notes } : g
          );

          // Trigger cross-module sync log
          const guestName = state.guests.find((g) => g.id === guestId)?.fullName;

          return {
            guests: updatedGuests,
            activityLogs: [
              {
                id: `act-${Date.now()}`,
                workspaceId: state.activeWorkspaceId,
                userId: 'user-rsvp',
                userName: guestName || 'Convidado',
                action: 'Atualização de RSVP',
                details: `Status alterado para: ${status.toUpperCase()}`,
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
              },
              ...state.activityLogs,
            ],
          };
        }),

      toggleGuestCheckIn: (guestId) =>
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === guestId ? { ...g, checkedIn: !g.checkedIn } : g
          ),
        })),

      importGuestsFromCSV: (guestList) =>
        set((state) => {
          const newGuests: Guest[] = guestList.map((g, idx) => ({
            id: `g-import-${Date.now()}-${idx}`,
            workspaceId: state.activeWorkspaceId,
            fullName: g.fullName || 'Convidado Sem Nome',
            relationship: g.relationship || 'amigos',
            category: g.category || 'convidado_geral',
            ageType: g.ageType || 'adulto',
            invitationType: g.invitationType || 'individual',
            allowedPlusOnes: g.allowedPlusOnes || 0,
            status: g.status || 'pendente',
            eventsPermitted: ['ev1', 'ev2'],
            qrCodeToken: `QR-IMPORT-${idx}-${Date.now().toString().slice(-4)}`,
            checkedIn: false,
            email: g.email,
            phone: g.phone,
          }));
          return { guests: [...state.guests, ...newGuests] };
        }),

      deleteGuest: (id) =>
        set((state) => ({ guests: state.guests.filter((g) => g.id !== id) })),

      addBudgetItem: (itemData) =>
        set((state) => {
          const newItem: BudgetItem = {
            ...itemData,
            id: `bi-${Date.now()}`,
            workspaceId: state.activeWorkspaceId,
            paidAmount: 0,
            costPerGuest: itemData.contractedCost
              ? itemData.contractedCost / (state.coupleProfile.estimatedGuestsCount || 1)
              : 0,
          };
          return { budgetItems: [...state.budgetItems, newItem] };
        }),

      addPayment: (paymentData) =>
        set((state) => ({
          payments: [
            ...state.payments,
            {
              ...paymentData,
              id: `p-${Date.now()}`,
              workspaceId: state.activeWorkspaceId,
            },
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

          // Recalculate paid amount on corresponding Budget Item
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
        set((state) => {
          const updatedVendors = state.vendors.map((v) =>
            v.id === id ? { ...v, status } : v
          );

          // Cross-module trigger: when vendor is contratado, update related budget item or tasks
          const vendor = state.vendors.find((v) => v.id === id);
          let updatedTasks = state.tasks;

          if (status === 'contratado' && vendor) {
            updatedTasks = state.tasks.map((t) =>
              t.category.toLowerCase().includes(vendor.category.toLowerCase())
                ? { ...t, status: 'concluida' as const }
                : t
            );
          }

          return { vendors: updatedVendors, tasks: updatedTasks };
        }),

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

      assignGuestToSeat: (guestId, tableId, seatId) =>
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === guestId ? { ...g, tableId, seatId } : g
          ),
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

      addTimelineItem: (itemData) =>
        set((state) => ({
          timeline: [
            ...state.timeline,
            { ...itemData, id: `tl-${Date.now()}`, workspaceId: state.activeWorkspaceId },
          ].sort((a, b) => a.time.localeCompare(b.time)),
        })),

      // Derived Calculations
      getConfirmedGuestsCount: () => {
        const { guests } = get();
        return guests.reduce((acc, g) => {
          if (g.status === 'confirmado') {
            return acc + 1 + (g.allowedPlusOnes || 0);
          }
          return acc;
        }, 0);
      },

      getTotalBudgetSpent: () => {
        const { budgetItems } = get();
        return budgetItems.reduce((acc, item) => acc + (item.contractedCost || item.estimatedCost || 0), 0);
      },

      getCostPerGuest: () => {
        const total = get().getTotalBudgetSpent();
        const confirmed = get().getConfirmedGuestsCount() || get().coupleProfile.estimatedGuestsCount || 1;
        return Math.round(total / confirmed);
      },

      getBuffetEstimates: () => {
        const confirmed = get().getConfirmedGuestsCount() || get().coupleProfile.estimatedGuestsCount;
        return {
          buffetMeals: confirmed,
          softDrinksLiters: Math.round(confirmed * 0.8), // 800ml por pessoa
          sparklingBottles: Math.ceil(confirmed / 3),    // 1 garrafa a cada 3 pessoas
          sweetsCount: confirmed * 6,                    // 6 doces finos por pessoa
          favorsCount: Math.ceil(confirmed * 1.1),       // 10% de margem para lembrancinhas
          invitesCount: Math.ceil(confirmed / 2),        // ~1 convite por casal/família
        };
      },
    }),
    {
      name: 'nosso-grande-dia-storage',
    }
  )
);
