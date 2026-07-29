import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function source(path: string) {
  return readFileSync(resolve(process.cwd(), path), 'utf8');
}

describe('Contratos de segurança comercial', () => {
  it('não contém autenticação falsa nem sessão em localStorage', () => {
    const store = source('src/lib/store.ts');
    const service = source('src/lib/supabase-service.ts');
    expect(`${store}\n${service}`).not.toContain('test-user-');
    expect(store).not.toContain('localStorage');
  });

  it('não mantém URL, chave anônima ou segredo de provedor no código-fonte', () => {
    const config = source('src/lib/supabase-config.ts');
    const proxy = source('src/proxy.ts');
    const example = source('.env.example');
    expect(`${config}\n${proxy}`).not.toContain('.supabase.co');
    expect(`${config}\n${proxy}`).not.toContain('eyJ');
    expect(example).not.toMatch(/SUPABASE_SERVICE_ROLE_KEY=.+/);
    expect(example).not.toMatch(/STRIPE_SECRET_KEY=.+/);
  });

  it('não aceita modo demo como autorização de API', () => {
    const proxy = source('src/proxy.ts');
    const apiGuard = proxy.slice(
      proxy.indexOf("if (isApi"),
      proxy.indexOf("if (!isApi")
    );
    expect(apiGuard).not.toContain('hasDemoPageSession');
    expect(proxy).not.toContain("searchParams.get('demo')");
  });

  it('protege todas as ações mutáveis do workspace no modo demo', () => {
    const store = source('src/lib/store.ts');
    const actions = [
      'updateCoupleProfile',
      'addTask',
      'updateTaskStatus',
      'deleteTask',
      'addGuest',
      'updateGuest',
      'updateGuestRSVP',
      'toggleGuestCheckIn',
      'importGuestsCSV',
      'deleteGuest',
      'addBudgetItem',
      'updateBudgetItem',
      'deleteBudgetItem',
      'addPayment',
      'markPaymentAsPaid',
      'addVendor',
      'updateVendorStatus',
      'deleteVendor',
      'updatePaletteColor',
      'addOutfit',
      'updateOutfitStatus',
      'deleteOutfit',
      'assignGuestToSeat',
      'addTable',
      'updateTable',
      'deleteTable',
      'addVenue',
      'addDocument',
      'deleteDocument',
      'addTimelineItem',
      'addRiskItem',
      'updateRiskStatus',
      'updateCivilChecklist',
      'updateWebsiteSettings',
    ];

    for (const action of actions) {
      const start = store.indexOf(`      ${action}:`);
      const end = store.indexOf('\n\n      ', start + 8);
      const implementation = store.slice(start, end === -1 ? undefined : end);
      expect(start, `${action} não foi encontrada`).toBeGreaterThan(-1);
      expect(implementation, `${action} não possui guarda demo`).toContain('isReadOnlyMode()');
      expect(implementation, `${action} não exige autenticação`).toContain('isAuthenticated');
    }
  });

  it('declara isolamento RLS, criação atômica e Storage privado', () => {
    const migration = source(
      'supabase/migrations/20260728000000_harden_multitenancy_and_persistence.sql'
    );
    expect(migration).toContain('CREATE OR REPLACE FUNCTION public.is_workspace_member');
    expect(migration).toContain('create_workspace_with_profile');
    expect(migration).toContain('workspace_snapshots');
    expect(migration).toContain("'wedding-documents', 'wedding-documents', FALSE");
    expect(migration).not.toContain('OR is_demo_workspace = true');
  });

  it('valida assinatura do webhook de cobrança', () => {
    const webhook = source('src/app/api/webhooks/stripe/route.ts');
    expect(webhook).toContain('constructEvent');
    expect(webhook).toContain('stripe-signature');
    expect(webhook).toContain('STRIPE_WEBHOOK_SECRET');
  });
});
