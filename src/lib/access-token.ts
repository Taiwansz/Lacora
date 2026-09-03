import { ACCESS_PUBLIC_KEY } from './access-constants';

function decodeBase64Url(value: string) {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export async function verifyAccessToken(token: string | undefined) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const key = await crypto.subtle.importKey(
      'jwk',
      ACCESS_PUBLIC_KEY,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    );
    const verified = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key,
      decodeBase64Url(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    );
    if (!verified) return false;

    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[1])));
    return (
      payload.scope === 'lacora-private' &&
      Number(payload.exp) > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
