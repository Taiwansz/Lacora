import type { NextRequest } from 'next/server';

export function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const expectedHost =
      request.headers.get('x-forwarded-host') || request.headers.get('host');
    const expectedProtocol =
      request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');

    return (
      Boolean(expectedHost) &&
      originUrl.host === expectedHost &&
      originUrl.protocol.replace(':', '') === expectedProtocol
    );
  } catch {
    return false;
  }
}
