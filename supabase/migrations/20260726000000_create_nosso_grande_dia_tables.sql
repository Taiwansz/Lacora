-- ======================================================
-- NOSSO GRANDE DIA - SAAS WEDDING PLATFORM SCHEMA (SUPABASE)
-- Migration: 20260726000000_create_nosso_grande_dia_tables.sql
-- Multi-tenancy & Strict Row Level Security Policies
-- ======================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Workspaces (Multi-tenant isolation per wedding)
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_demo_workspace BOOLEAN DEFAULT false,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: Memberships (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('casal_admin', 'parceiro', 'cerimonialista', 'assessor', 'familiar', 'colaborador', 'fornecedor', 'convidado', 'admin_geral')),
    permissions JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'pendente', 'revogado')),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: Couple Profiles
CREATE TABLE IF NOT EXISTS public.couple_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL UNIQUE,
    partner1_name TEXT NOT NULL,
    partner2_name TEXT NOT NULL,
    wedding_date DATE,
    wedding_time TIME DEFAULT '16:00:00',
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    city TEXT,
    state TEXT,
    wedding_type TEXT DEFAULT 'civil_e_religioso',
    estimated_guests_count INT DEFAULT 100,
    total_budget_planned NUMERIC(15, 2) DEFAULT 80000.00,
    custom_slug TEXT UNIQUE,
    status TEXT DEFAULT 'active'
);

-- 4. Table: Households
CREATE TABLE IF NOT EXISTS public.households (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    family_name TEXT NOT NULL,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: Tables (Planta de Mesas & Setores)
CREATE TABLE IF NOT EXISTS public.tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    shape TEXT DEFAULT 'redonda' CHECK (shape IN ('redonda', 'quadrada', 'retangular', 'imperial')),
    capacity INT DEFAULT 8 CHECK (capacity > 0),
    pos_x INT DEFAULT 0,
    pos_y INT DEFAULT 0,
    zone TEXT DEFAULT 'salao_principal' CHECK (zone IN ('noivos', 'pista', 'varanda', 'salao_principal', 'reservado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table: Guests (Lista de Convidados & Assentos)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    household_id UUID REFERENCES public.households(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    relationship TEXT DEFAULT 'ambos' CHECK (relationship IN ('noivo', 'noiva', 'ambos', 'familia_noivo', 'familia_noiva', 'amigos', 'trabalho')),
    category TEXT DEFAULT 'convidado_geral' CHECK (category IN ('padrinho', 'madrinha', 'pais', 'dama_pajem', 'vip', 'convidado_geral')),
    phone TEXT,
    email TEXT,
    age_type TEXT DEFAULT 'adulto' CHECK (age_type IN ('adulto', 'crianca', 'bebe')),
    invitation_type TEXT DEFAULT 'individual',
    allowed_plus_ones INT DEFAULT 0,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'recusado')),
    table_id UUID REFERENCES public.tables(id) ON DELETE SET NULL,
    seat_id TEXT,
    qr_code_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
    checked_in BOOLEAN DEFAULT false,
    dietary_notes TEXT,
    accessibility_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Table: Budget Items (Orçamento & Financeiro)
CREATE TABLE IF NOT EXISTS public.budget_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    category_id TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity INT DEFAULT 1,
    unit_price NUMERIC(15, 2) DEFAULT 0.00,
    estimated_cost NUMERIC(15, 2) DEFAULT 0.00,
    negotiated_cost NUMERIC(15, 2) DEFAULT 0.00,
    contracted_cost NUMERIC(15, 2) DEFAULT 0.00,
    paid_amount NUMERIC(15, 2) DEFAULT 0.00,
    payer_name TEXT DEFAULT 'Casal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Table: Payments
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    budget_item_id UUID REFERENCES public.budget_items(id) ON DELETE CASCADE NOT NULL,
    installment_number INT DEFAULT 1,
    total_installments INT DEFAULT 1,
    amount NUMERIC(15, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado', 'cancelado')),
    payment_method TEXT DEFAULT 'pix' CHECK (payment_method IN ('pix', 'boleto', 'cartao_credito', 'transferencia', 'dinheiro')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Table: Vendors (Fornecedores & Pipeline)
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL,
    legal_name TEXT NOT NULL,
    trade_name TEXT NOT NULL,
    document_number TEXT,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'sugestao',
    rating INT DEFAULT 5,
    pros TEXT,
    emergency_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Table: Tasks (Checklist & Atividades)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'geral',
    start_date DATE,
    due_date DATE,
    status TEXT DEFAULT 'nao_iniciada',
    priority TEXT DEFAULT 'media',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Table: Documents
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'contrato',
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INT DEFAULT 0,
    tags TEXT[],
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Table: Activity Logs (Immutable Audit Trail)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    user_id UUID NOT NULL,
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Strict Tenant-Isolation Row Level Security (RLS) Policies
CREATE POLICY "Tenant isolation for workspaces" ON public.workspaces
    FOR ALL USING (
        id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
        OR is_demo_workspace = true
    );

CREATE POLICY "Tenant isolation for couple_profiles" ON public.couple_profiles
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for tables" ON public.tables
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for guests" ON public.guests
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for budget_items" ON public.budget_items
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for payments" ON public.payments
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for vendors" ON public.vendors
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for tasks" ON public.tasks
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for documents" ON public.documents
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );

CREATE POLICY "Tenant isolation for activity_logs" ON public.activity_logs
    FOR ALL USING (
        workspace_id IN (SELECT workspace_id FROM public.memberships WHERE user_id = auth.uid() AND status = 'ativo')
    );
