# Laçora

Plataforma de gestão de casamentos construída com Next.js, Supabase e Stripe.

A direção visual, as regras de uso da marca e o inventário de assets estão em [BRAND_GUIDE.md](./BRAND_GUIDE.md).

## Configuração

1. Use Node.js 20 ou superior.
2. Copie `.env.example` para `.env.local` e configure as variáveis no ambiente local e na Vercel.
3. Aplique, em ordem, os arquivos de `supabase/migrations` no projeto Supabase.
4. Cadastre no Stripe os preços dos planos Pro e Assessoria e configure os respectivos IDs.
5. Configure o webhook do Stripe para `https://SEU_DOMINIO/api/webhooks/stripe`.

`SUPABASE_SERVICE_ROLE_KEY` e `STRIPE_SECRET_KEY` são exclusivamente server-side. Nunca use o prefixo `NEXT_PUBLIC_` nessas variáveis.

## Validação

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

O workflow `.github/workflows/ci.yml` executa essas verificações em pushes e pull requests.

## Segurança

- Sessões reais do Supabase são mantidas em cookies compatíveis com SSR.
- O middleware protege páginas privadas e APIs por padrão.
- O modo demonstração não funciona como credencial de API e bloqueia controles de escrita.
- Dados de workspace e documentos são protegidos por RLS.
- Documentos ficam em bucket privado e são baixados por links temporários.
- Webhooks do Stripe exigem assinatura válida.
