import { NextResponse } from 'next/server';
export function middleware() {
  const response = NextResponse.next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
  );
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  return response;
}
