import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function source(path: string) {
  return readFileSync(resolve(process.cwd(), path), 'utf8');
}

describe('Acesso privado e experiência pública', () => {
  it('valida a senha somente no servidor e cria um cookie httpOnly limitado', () => {
    const route = source('src/app/api/access/route.ts');
    expect(route).not.toContain("runtime = 'edge'");
    expect(route).toContain('/functions/v1/private-access');
    expect(route).toContain('verifyAccessToken');
    expect(route).toContain('body.password');
    expect(route).toContain('httpOnly: true');
    expect(route).toContain("sameSite: 'strict'");
    expect(route).toContain('MAX_ATTEMPTS');
  });

  it('verifica o token assinado localmente no middleware', () => {
    const proxy = source('src/proxy.ts');
    expect(proxy).not.toContain('Supabase');
    expect(proxy).not.toContain('fetch(');
    expect(proxy).toContain('ACCESS_COOKIE_NAME');
    expect(proxy).toContain('verifyAccessToken');
    expect(source('src/lib/access-constants.ts')).toContain("kty: 'EC'");
  });

  it('mantém a landing page como componente de servidor e sem linguagem de SaaS', () => {
    const landing = source('src/app/page.tsx');
    expect(landing).not.toContain("'use client'");
    expect(landing).not.toMatch(/plano pro|criar conta|teste grátis/i);
    expect(landing).toContain('/presentes');
  });

  it('carrega bibliotecas de exportação apenas quando forem usadas', () => {
    const utils = source('src/lib/utils.ts');
    expect(utils).toContain("await import('papaparse')");
    expect(utils).toContain("await import('jspdf')");
    expect(utils).not.toContain("import jsPDF from 'jspdf'");
  });

  it('protege a sincronização compartilhada atrás da API privada', () => {
    const proxy = source('src/proxy.ts');
    const route = source('src/app/api/workspace/route.ts');
    expect(proxy).not.toContain("'/api/workspace'");
    expect(route).toContain("import { createSupabaseAdminClient }");
    expect(route).toContain('MAX_SNAPSHOT_BYTES');
    expect(route).toContain('authorization: `Bearer ${token}`');
    expect(route).toContain("'cache-control': 'private, no-store'");
  });
});
