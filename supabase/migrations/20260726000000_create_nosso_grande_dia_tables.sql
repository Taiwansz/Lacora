-- ======================================================
-- NOSSO GRANDE DIA - SAAS WEDDING PLATFORM SCHEMA (SUPABASE)
-- Migration: 20260726000000_create_nosso_grande_dia_tables.sql
-- ======================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Workspaces (Multi-tenant isolation per wedding)
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    wedding_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: Couple Profiles
CREATE TABLE IF NOT EXISTS public.couple_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    partner1_name TEXT NOT NULL,
    partner2_name TEXT NOT NULL,
    wedding_date DATE NOT NULL,
    wedding_time TIME DEFAULT '16:00:00',
    city TEXT DEFAULT 'São Paulo',
    state TEXT DEFAULT 'SP',
    wedding_type TEXT DEFAULT 'civil_religioso',
    estimated_guests_count INT DEFAULT 100,
    total_budget_planned NUMERIC(15, 2) DEFAULT 80000.00,
    custom_slug TEXT UNIQUE,
    status TEXT DEFAULT 'active'
);

-- 3. Table: Tables (Planta de Mesas & Setores)
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

-- 4. Table: Guests (Lista de Convidados & Assentos)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    household_id UUID,
    full_name TEXT NOT NULL,
    relationship TEXT DEFAULT 'ambos' CHECK (relationship IN ('noivo', 'noiva', 'ambos', 'familia_noivo', 'familia_noiva', 'amigos', 'trabalho')),
    category TEXT DEFAULT 'convidado_geral' CHECK (category IN ('padrinho', 'madrinha', 'pais', 'dama_pajem', 'vip', 'convidado_geral')),
    phone TEXT,
    email TEXT,
    age_type TEXT DEFAULT 'adulto' CHECK (age_type IN ('adulto', 'crianca', 'bebe')),
    status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'recusado')),
    table_id UUID REFERENCES public.tables(id) ON DELETE SET NULL,
    seat_id TEXT,
    qr_code_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
    checked_in BOOLEAN DEFAULT false,
    dietary_notes TEXT,
    accessibility_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: Budget Items (Orçamento & Financeiro)
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

-- 6. Table: Vendors (Fornecedores & Contratos)
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    category_id TEXT NOT NULL,
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'sugestao',
    contract_value NUMERIC(15, 2) DEFAULT 0.00,
    payment_terms TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Table: Tasks (Checklist & Atividades)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'geral',
    due_date DATE,
    status TEXT DEFAULT 'nao_iniciada',
    priority TEXT DEFAULT 'media',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Permissive RLS Policies for SaaS Public/Anon Client Access (Customizable per Tenant)
CREATE POLICY "Allow public read access to tables" ON public.tables FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to tables" ON public.tables FOR ALL USING (true);

CREATE POLICY "Allow public read access to guests" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to guests" ON public.guests FOR ALL USING (true);

CREATE POLICY "Allow public read access to budget_items" ON public.budget_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to budget_items" ON public.budget_items FOR ALL USING (true);

CREATE POLICY "Allow public read access to vendors" ON public.vendors FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to vendors" ON public.vendors FOR ALL USING (true);

CREATE POLICY "Allow public read access to tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to tasks" ON public.tasks FOR ALL USING (true);
