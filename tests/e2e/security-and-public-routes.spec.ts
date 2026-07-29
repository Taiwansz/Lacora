import { expect, test } from '@playwright/test';

test('protege o editor administrativo e não aceita demo por query string', async ({ page }) => {
  await page.goto('/site', { waitUntil: 'commit' });
  await expect(page).toHaveURL(/\/login\?redirect=%2Fsite/);

  await page.goto('/dashboard?demo=true', { waitUntil: 'commit' });
  await expect(page).toHaveURL(/\/login\?redirect=/);
});

test('publica a demonstração no endereço novo e mantém o endereço antigo compatível', async ({ page }) => {
  await page.goto('/w/alex-taylor-demo', { waitUntil: 'commit' });
  await expect(page.getByRole('heading', { name: /Alex.*Taylor/ })).toBeVisible();
  await expect(page.getByText('Página demonstrativa com nomes e informações inteiramente fictícios.')).toBeVisible();
  await expect(page.getByRole('link', { name: /Visão Geral/ })).toHaveCount(0);

  await page.goto('/site/alex-taylor-demo', { waitUntil: 'commit' });
  await expect(page).toHaveURL(/\/w\/alex-taylor-demo$/);
});

test('modo demo nasce no servidor, permanece somente leitura e não autoriza APIs privadas', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/login', { waitUntil: 'commit' });
  await page.getByRole('button', { name: 'Explorar Workspace de Demonstração' }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });
  await expect(page.getByText(/Modo de Demonstração \(Apenas Leitura\)/)).toBeVisible();

  const firstWorkspaceButton = page.locator('main button').first();
  if (await firstWorkspaceButton.count()) {
    await expect(firstWorkspaceButton).toBeDisabled();
  }

  const apiResponse = await context.request.delete('/api/account', {
    data: { password: 'qualquer-senha' },
  });
  expect(apiResponse.status()).toBe(401);
  await context.close();
});

test('RSVP demonstrativo consulta e envia sem persistir dados', async ({ page }) => {
  await page.goto('/rsvp/alex-taylor-demo', { waitUntil: 'commit' });
  await expect(page.getByText('Convite de Convidado de Demonstração')).toBeVisible({ timeout: 20_000 });
  await page.getByRole('button', { name: 'Sim, estarei presente' }).click();
  await page.getByRole('button', { name: 'Enviar resposta' }).click();
  await expect(page.getByText(/nenhum dado foi armazenado/)).toBeVisible();
});
