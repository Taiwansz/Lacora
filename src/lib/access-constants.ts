export const ACCESS_COOKIE_NAME = 'lacora_private_access';

// Public verification material only. The password and signing key live exclusively
// in the private-access Supabase Edge Function and never enter this repository.
export const ACCESS_PUBLIC_KEY: JsonWebKey = {
  kty: 'EC',
  crv: 'P-256',
  x: 'm2lwu2GcROfJF3M-lA7dF8ko8OKpBNC8NQ2yDubLHXk',
  y: 'pr-Gvhau8QuEZPAsrs7ejFUzzOKrmzeuraG62oJDEKQ',
};

export const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 12;

export function isSafeInternalPath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\')
  );
}
