interface AuthErrorLike {
  code?: string;
  message?: string;
  status?: number;
}

export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
  fallback: string
) {
  const code = error?.code || '';
  const rawMessage = error?.message || '';

  if (
    code === 'over_email_send_rate_limit' ||
    error?.status === 429 ||
    /email rate limit exceeded/i.test(rawMessage)
  ) {
    return 'O limite temporário de envio de e-mails foi atingido. Aguarde até uma hora antes de tentar novamente. Se você já recebeu uma confirmação, use somente o link mais recente.';
  }

  if (code === 'email_address_not_authorized') {
    return 'O envio de confirmação ainda não está disponível para este endereço. Tente novamente mais tarde ou fale com o suporte.';
  }

  if (code === 'email_not_confirmed') {
    return 'Seu e-mail ainda não foi confirmado. Abra o link de confirmação antes de entrar.';
  }

  if (code === 'invalid_credentials') {
    return 'E-mail ou senha incorretos.';
  }

  if (code === 'email_address_invalid') {
    return 'Informe um endereço de e-mail válido.';
  }

  if (code === 'over_request_rate_limit') {
    return 'Muitas tentativas foram realizadas em pouco tempo. Aguarde alguns minutos e tente novamente.';
  }

  return rawMessage || fallback;
}
