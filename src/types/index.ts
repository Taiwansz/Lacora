// Definições de Tipos e Entidades da Plataforma Nosso Grande Dia (41 Entidades)

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
  createdAt: string;
  updatedAt: string;
}

export interface WeddingWorkspace {
  id: string;
  name: string; // Ex: "Casamento Matheus & Virginia"
  slug: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface Membership {
  id: string;
  workspaceId: string;
  userId: string;
  role: UserRole;
  permissions: {
    canEditBudget: boolean;
    canEditGuests: boolean;
    canEditVisualIdentity: boolean;
    canEditTasks: boolean;
    canEditVendors: boolean;
    canEditContracts: boolean;
    canManageUsers: boolean;
    restrictedVendorId?: string; // Para perfil de fornecedor
  };
  invitedAt: string;
}

export interface CoupleProfile {
  workspaceId: string;
  partner1Name: string; // Matheus
  partner2Name: string; // Virginia
  coverImageUrl?: string;
  weddingDate: string; // ISO date
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
  financialResponsibles: string[]; // Ex: ["Casal", "Pais da Noiva"]
  style: string; // Ex: "Botânico Chic / Elegante"
  formalityLevel: 'Casual' | 'Semi-Formal' | 'Formal' | 'Black Tie';
  priorities: string[]; // ["Gastronomia", "Fotografia", "Música"]
  culturalTraditions?: string;
  accessibilityNeeds?: string;
  availableWeeklyHours: number;
  status: 'onboarding' | 'active' | 'archived';
}

export interface Event {
  id: string;
  workspaceId: string;
  title: string; // "Cerimônia Civil", "Recepção", "Ensaio"
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
  weatherBackupPlan?: string; // Plano para chuva
  noiseRestrictions?: string;
  exclusiveVendorsRule?: string;
  overtimeFeePerHour?: number;
  rentalFee: number;
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
  category: string; // "Gastronomia", "Papelaria", "Trajes"
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
  monthsBeforeWedding: number; // 24, 18, 12, 9, 6, 3, 1
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
}

export interface Household {
  id: string;
  workspaceId: string;
  familyName: string; // Ex: "Família Silva"
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
  allowedPlusOnes: number; // Acompanhantes extras autorizados
  plusOneNames?: string[];
  status: 'pendente' | 'confirmado' | 'recusado';
  eventsPermitted: string[]; // IDs dos eventos autorizados
  tableId?: string;
  seatId?: string;
  qrCodeToken: string;
  checkedIn: boolean;
  notes?: string;
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

export interface DietaryRequirement {
  id: string;
  guestId: string;
  type: 'vegetariano' | 'vegano' | 'sem_gluten' | 'sem_lactose' | 'alergia_amendoim' | 'alergia_frutos_mar' | 'outros';
  notes?: string;
}

export interface AccessibilityRequirement {
  id: string;
  guestId: string;
  type: 'cadeirante' | 'mobilidade_reduzida' | 'deficiencia_visual' | 'deficiencia_auditiva' | 'idoso' | 'outro';
  details?: string;
}

export interface Table {
  id: string;
  workspaceId: string;
  name: string; // Ex: "Mesa 01 - Família da Noiva"
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

export interface VendorCategory {
  id: string;
  name: string; // "Cerimonial", "Buffet", "Fotografia"
  suggestedPercentOfBudget: number; // Ex: 15% para Buffet
}

export interface Vendor {
  id: string;
  workspaceId: string;
  category: string;
  legalName: string; // Razão Social
  tradeName: string; // Nome Fantasia
  documentNumber?: string; // CPF ou CNPJ
  contactPerson: string;
  phone: string;
  email: string;
  city?: string;
  socialMedia?: string;
  website?: string;
  portfolioUrl?: string;
  status: VendorStatus;
  rating?: number; // 1 a 5
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
  costPerGuest: number;
  payerName: string; // "Casal", "Noivo", "Noiva", "Pais Noiva", "Pais Noivo"
  notes?: string;
}

export interface Payer {
  id: string;
  workspaceId: string;
  name: string;
  percentageContribution?: number;
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
  participantName: string; // "Virginia", "Matheus", "Ana (Madrinha)"
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

export interface OutfitAppointment {
  id: string;
  workspaceId: string;
  outfitId?: string;
  type: 'prova_vestido' | 'ajuste_terno' | 'teste_cabelo_make' | 'manicure' | 'estetica' | 'dia_da_noiva' | 'dia_do_noivo';
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  notes?: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

export interface PaletteColor {
  id: string;
  name: string; // "Marsala Profundo"
  hex: string;  // "#8B263E"
  rgb: string;  // "139, 38, 62"
  role: 'principal' | 'secundaria' | 'acento' | 'neutra' | 'proibida';
  appliedTo: string[]; // ["Trajes Madrinhas", "Flores Altar", "Convites"]
}

export interface Palette {
  workspaceId: string;
  colors: PaletteColor[];
  primaryTypography: string; // "Playfair Display"
  secondaryTypography: string; // "Plus Jakarta Sans"
  photoStyleDescription?: string; // "Luz natural, tons quentes e cinematográficos"
  texturesAndMaterials?: string[]; // ["Linho puro", "Madeira de demolição", "Dourado fosco"]
  visualVoiceTone?: string; // "Acolhedor, elegante, poético e inclusivo"
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
  time: string; // "16:30"
  durationMinutes: number;
  title: string; // "Entrada dos Padrinhos"
  location: string;
  responsiblePerson: string;
  vendorId?: string;
  phoneContact?: string;
  instructions?: string;
  contingencyNote?: string;
  visibleToProfiles: UserRole[];
}

export interface MessageTemplate {
  id: string;
  workspaceId: string;
  type: 'save_the_date' | 'convite_oficial' | 'lembrete_rsvp' | 'mudanca_data' | 'agradecimento' | 'emergencia';
  title: string;
  body: string;
}

export interface MessageDelivery {
  id: string;
  templateId: string;
  guestId: string;
  sentAt: string;
  channel: 'whatsapp' | 'email';
  status: 'enviado' | 'entregue' | 'falha';
}

export interface Gift {
  id: string;
  workspaceId: string;
  title: string; // "Cota Lua de Mel - Jantar Romântico em Paris"
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
  title: string; // "Foto com Padrinhos na Pista"
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

export interface Comment {
  id: string;
  workspaceId: string;
  targetType: 'task' | 'vendor' | 'budget_item' | 'outfit';
  targetId: string;
  userId: string;
  userName: string;
  text: string;
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
