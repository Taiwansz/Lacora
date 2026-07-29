// Definições de tipos e entidades da plataforma Laçora

export type UserRole =
  | 'casal_admin'
  | 'parceiro'
  | 'cerimonialista'
  | 'assessor'
  | 'familiar'
  | 'colaborador'
  | 'fornecedor'
  | 'convidado'
  | 'admin_geral';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  emailVerified: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: User | null;
  isAuthenticated: boolean;
  activeWorkspaceId: string | null;
}

export interface WorkspacePermissionFlags {
  canEditBudget: boolean;
  canEditGuests: boolean;
  canEditVisualIdentity: boolean;
  canEditTasks: boolean;
  canEditVendors: boolean;
  canEditContracts: boolean;
  canManageTeam: boolean;
  restrictedVendorCategory?: string;
}

export interface Membership {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  permissions: WorkspacePermissionFlags;
  invitedAt: string;
  acceptedAt?: string;
  status: 'ativo' | 'pendente' | 'revogado';
}

export interface WeddingWorkspace {
  id: string;
  name: string;
  slug: string;
  isDemoWorkspace?: boolean; // Se é workspace descartável de teste
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoupleProfile {
  workspaceId: string;
  partner1Name: string;
  partner2Name: string;
  coverImageUrl?: string;
  weddingDate: string; // ISO date string (YYYY-MM-DD) sem fusos inconsistentes
  weddingTime: string; // 16:30
  timezone: string;
  city: string;
  state: string;
  weddingType: 
    | 'civil'
    | 'religioso'
    | 'simbolico'
    | 'civil_e_religioso'
    | 'mini_wedding'
    | 'destination_wedding'
    | 'elopement'
    | 'comunitario'
    | 'personalizado';
  estimatedGuestsCount: number;
  totalBudgetPlanned: number;
  financialResponsibles: string[];
  style: string;
  formalityLevel: 'Casual' | 'Semi-Formal' | 'Formal' | 'Black Tie';
  priorities: string[];
  culturalTraditions?: string;
  accessibilityNeeds?: string;
  availableWeeklyHours: number;
  customSlug: string;
  status: 'onboarding' | 'active' | 'archived';
}

export interface Event {
  id: string;
  workspaceId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venueId?: string;
  description?: string;
  dressCode?: string;
}

export interface Venue {
  id: string;
  workspaceId: string;
  name: string;
  type: 'ceremonia' | 'recepcao' | 'ambos';
  address: string;
  city: string;
  state: string;
  seatedCapacity: number;
  standingCapacity: number;
  hasParking: boolean;
  valetAvailable: boolean;
  restroomsCount: number;
  hasNursery: boolean;
  hasKitchen: boolean;
  hasDressingRoom: boolean;
  generatorPowerKva?: number;
  airConditioning: boolean;
  accessibleRoute: boolean;
  weatherBackupPlan?: string;
  noiseRestrictions?: string;
  exclusiveVendorsRule?: string;
  overtimeFeePerHour?: number;
  rentalFee: number;
  setupStartTime?: string;
  teardownEndTime?: string;
  notes?: string;
}

export type TaskStatus =
  | 'nao_iniciada'
  | 'em_pesquisa'
  | 'em_andamento'
  | 'aguardando_terceiro'
  | 'aguardando_pagamento'
  | 'concluida'
  | 'cancelada'
  | 'atrasada';

export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';

export interface Task {
  id: string;
  workspaceId: string;
  title: string;
  description?: string;
  category: string;
  assignedToUserIds: string[];
  startDate?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedCost?: number;
  vendorId?: string;
  eventId?: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  attachmentsCount: number;
  commentsCount: number;
  monthsBeforeWedding: number;
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
}

export interface Household {
  id: string;
  workspaceId: string;
  familyName: string;
  address?: string;
  city?: string;
  notes?: string;
}

export interface Guest {
  id: string;
  workspaceId: string;
  householdId?: string;
  fullName: string;
  socialName?: string;
  relationship: 'noivo' | 'noiva' | 'ambos' | 'familia_noivo' | 'familia_noiva' | 'amigos' | 'trabalho';
  category: 'padrinho' | 'madrinha' | 'pais' | 'dama_pajem' | 'vip' | 'convidado_geral';
  phone?: string;
  email?: string;
  address?: string;
  ageType: 'adulto' | 'crianca' | 'bebe';
  invitationType: 'individual' | 'familiar';
  allowedPlusOnes: number;
  plusOneNames?: string[];
  status: 'pendente' | 'confirmado' | 'recusado';
  eventsPermitted: string[];
  tableId?: string;
  seatId?: string;
  qrCodeToken: string;
  checkedIn: boolean;
  notes?: string;
  dietaryNotes?: string;
  accessibilityNotes?: string;
}

export interface Invitation {
  id: string;
  workspaceId: string;
  householdId: string;
  code: string;
  sentDate?: string;
  type: 'digital' | 'fisico' | 'ambos';
  status: 'nao_enviado' | 'enviado' | 'entregue' | 'aberto' | 'respondido';
}

export interface RSVP {
  id: string;
  guestId: string;
  workspaceId: string;
  eventId: string;
  attending: boolean;
  menuChoice?: string;
  dietaryRestrictions?: string;
  songSuggestion?: string;
  messageToCouple?: string;
  confirmedAt: string;
  updatedAt: string;
}

export interface Table {
  id: string;
  workspaceId: string;
  name: string;
  shape: 'redonda' | 'quadrada' | 'retangular' | 'imperial';
  capacity: number;
  posX: number;
  posY: number;
  zone: 'noivos' | 'pista' | 'varanda' | 'salao_principal' | 'reservado';
}

export interface Seat {
  id: string;
  tableId: string;
  seatNumber: number;
  guestId?: string;
}

export type VendorStatus =
  | 'sugestao'
  | 'favorito'
  | 'contato_iniciado'
  | 'aguardando_orcamento'
  | 'orcamento_recebido'
  | 'reuniao_agendada'
  | 'negociacao'
  | 'escolhido'
  | 'contratado'
  | 'concluido'
  | 'descartado';

export interface Vendor {
  id: string;
  workspaceId: string;
  category: string;
  legalName: string;
  tradeName: string;
  documentNumber?: string;
  contactPerson: string;
  phone: string;
  email: string;
  city?: string;
  socialMedia?: string;
  website?: string;
  portfolioUrl?: string;
  status: VendorStatus;
  rating?: number;
  pros?: string;
  cons?: string;
  notes?: string;
  emergencyPhone?: string;
}

export interface Quote {
  id: string;
  vendorId: string;
  workspaceId: string;
  amountProposed: number;
  amountNegotiated?: number;
  includedItems: string;
  extraCostsInfo?: string;
  receivedDate: string;
  validUntil?: string;
  isChosen: boolean;
}

export interface Contract {
  id: string;
  vendorId: string;
  workspaceId: string;
  contractNumber?: string;
  totalAmount: number;
  signedDate?: string;
  serviceDescription: string;
  cancellationClauseNotes?: string;
  forceMajeureClauseNotes?: string;
  overtimeHourRate?: number;
  deliverablesCount: number;
  documentId?: string;
}

export interface ContractDeliverable {
  id: string;
  contractId: string;
  title: string;
  deadlineDate: string;
  delivered: boolean;
}

export interface BudgetCategory {
  id: string;
  workspaceId: string;
  name: string;
  budgetAllocated: number;
}

export interface BudgetItem {
  id: string;
  workspaceId: string;
  categoryId: string;
  description: string;
  vendorId?: string;
  contractId?: string;
  quantity: number;
  unitPrice: number;
  estimatedCost: number;
  negotiatedCost: number;
  contractedCost: number;
  paidAmount: number;
  payerName: string;
  notes?: string;
}

export interface Payment {
  id: string;
  workspaceId: string;
  budgetItemId: string;
  vendorId?: string;
  contractId?: string;
  installmentNumber: number;
  totalInstallments: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'cancelado';
  paymentMethod: 'pix' | 'boleto' | 'cartao_credito' | 'transferencia' | 'dinheiro';
  proofDocumentId?: string;
  notes?: string;
}

export interface Document {
  id: string;
  workspaceId: string;
  title: string;
  category: 'contrato' | 'orcamento' | 'recibo' | 'planta' | 'licenca' | 'certidao' | 'briefing' | 'outros';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  tags: string[];
  vendorId?: string;
  uploadedAt: string;
  parsedSummary?: {
    parties?: string;
    totalValue?: number;
    paymentTerms?: string;
    keyDeliverables?: string[];
    cancellationPenalty?: string;
  };
}

export interface Outfit {
  id: string;
  workspaceId: string;
  participantName: string;
  role: 'noiva' | 'noivo' | 'madrinha' | 'padrinho' | 'pai' | 'mae' | 'dama' | 'pajem' | 'celebrante';
  color: string;
  itemDescription: string;
  rentalOrBuy: 'aluguel' | 'compra' | 'proprio';
  vendorId?: string;
  totalCost: number;
  paidBy: string;
  sizesAndMeasurements?: string;
  status: 'pesquisando' | 'escolhido' | 'em_ajuste' | 'pronto' | 'entregue';
  imageUrl?: string;
  accessoriesNotes?: string;
}

export interface PaletteColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  role: 'principal' | 'secundaria' | 'acento' | 'neutra' | 'proibida';
  appliedTo: string[];
}

export interface Palette {
  workspaceId: string;
  colors: PaletteColor[];
  primaryTypography: string;
  secondaryTypography: string;
  photoStyleDescription?: string;
  texturesAndMaterials?: string[];
  visualVoiceTone?: string;
}

export interface MoodboardItem {
  id: string;
  workspaceId: string;
  category: 'convite' | 'decoracao' | 'flores' | 'vestido' | 'traje_noivo' | 'bolo' | 'mesa_posta' | 'outros';
  imageUrl: string;
  title: string;
  notes?: string;
  votesCount: number;
}

export interface DecorItem {
  id: string;
  workspaceId: string;
  section: 'entrada' | 'altar' | 'corredor' | 'cerimonia' | 'recepcao' | 'lounge' | 'mesa_casal' | 'mesa_doces' | 'bar' | 'banheiros';
  title: string;
  referenceColor: string;
  floralsOrMaterials: string;
  quantity: number;
  rentalOrPurchase: 'aluguel' | 'compra';
  vendorId?: string;
  cost: number;
  teardownPlan?: string;
}

export interface MenuItem {
  id: string;
  workspaceId: string;
  course: 'coquetel' | 'entrada' | 'prato_principal' | 'sobremesa' | 'bolo' | 'doces' | 'lanche_madrugada' | 'menu_infantil' | 'refeicao_fornecedores';
  title: string;
  description: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  tastingApproved: boolean;
}

export interface TimelineItem {
  id: string;
  workspaceId: string;
  time: string;
  durationMinutes: number;
  title: string;
  location: string;
  responsiblePerson: string;
  vendorId?: string;
  phoneContact?: string;
  instructions?: string;
  contingencyNote?: string;
  visibleToProfiles: UserRole[];
}

export interface Gift {
  id: string;
  workspaceId: string;
  title: string;
  category: 'cota' | 'produto' | 'experiencia' | 'doacao';
  price: number;
  imageUrl?: string;
  externalLink?: string;
  giverName?: string;
  giverMessage?: string;
  purchased: boolean;
  purchasedAt?: string;
  thanked: boolean;
}

export interface PhotoShot {
  id: string;
  workspaceId: string;
  moment: 'pre_cerimonia' | 'cerimonia' | 'protocolo_familia' | 'recepcao' | 'festa';
  title: string;
  peopleInvolved: string;
  priority: 'alta' | 'media' | 'opcional';
  taken: boolean;
}

export interface Notification {
  id: string;
  workspaceId: string;
  title: string;
  message: string;
  type: 'alerta_urgente' | 'vencimento' | 'rsvp' | 'orcamento_excedido' | 'tarefa_atrasada';
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface RiskItem {
  id: string;
  workspaceId: string;
  description: string;
  category: 'clima' | 'energia' | 'fornecedor' | 'saude' | 'transporte' | 'seguranca';
  probability: 'baixa' | 'media' | 'alta';
  impact: 'baixo' | 'medio' | 'alto';
  ownerName: string;
  triggerEvent: string;
  preventivePlan: string;
  responsePlan: string;
  status: 'mitigado' | 'monitorando' | 'critico';
}

export interface CivilChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  dueDate?: string;
}

export interface CivilWeddingInfo {
  workspaceId: string;
  cartorioName: string;
  cartorioCity: string;
  cartorioState: string;
  regimeDeBens: 'comunhao_parcial' | 'comunhao_total' | 'separacao_total' | 'participacao_final';
  hasPactoAntenupcial: boolean;
  processStatus: 'documentos_pendentes' | 'em_analise_cartorio' | 'edital_publicado' | 'habilitado';
  expirationDate?: string;
  witness1Name?: string;
  witness1Document?: string;
  witness2Name?: string;
  witness2Document?: string;
  checklists: CivilChecklistItem[];
}
