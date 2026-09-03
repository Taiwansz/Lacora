import { expect, test } from '@playwright/test';

test('landing apresenta a história e leva os convidados aos presentes', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Um encontro que virou casa');
  await expect(page.getByRole('link', { name: /Ver lista de presentes/i })).toBeVisible();
  await expect(page.getByText('Nossa história', { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/plano pro|criar conta|teste grátis/i)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('lista de presentes abre e oferece seis ideias', async ({ page }) => {
  await page.goto('/presentes');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Presentes que viram memórias');
  await expect(page.locator('main article')).toHaveCount(6);
  await expect(page.getByRole('heading', { name: 'A lista oficial será conectada aqui.' })).toBeVisible();
});

test('área de planejamento exige a senha compartilhada', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/acesso\?next=%2Fdashboard$/);

  await page.getByLabel('Senha de acesso').fill('000000');
  await page.getByRole('button', { name: 'Entrar no planejamento' }).click();
  await expect(page.getByRole('alert')).toHaveText('Senha incorreta.');
});

test('senha correta libera o painel e sair bloqueia novamente', async ({ page }) => {
  const password = process.env.LACORA_E2E_PASSWORD;
  test.skip(!password, 'Defina LACORA_E2E_PASSWORD para validar o acesso completo.');

  await page.goto('/acesso');
  await page.getByLabel('Senha de acesso').fill(password!);
  await page.getByRole('button', { name: 'Entrar no planejamento' }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 });
  await expect(page.getByRole('heading', { name: 'Bem-vindos de volta.' })).toBeVisible();

  await page.getByRole('button', { name: /Sair/i }).click();
  await expect(page).toHaveURL(/\/acesso$/);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/acesso\?next=%2Fdashboard$/);
});

test('API privada recusa acesso sem o cookie do casal', async ({ request }) => {
  const response = await request.get('/api/workspace');
  expect(response.status()).toBe(401);
});
