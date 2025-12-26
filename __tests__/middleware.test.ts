/** @jest-environment node */
import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';

describe('Middleware Security Headers', () => {
  it('should set Content-Security-Policy and other security headers', () => {
    const req = new NextRequest(new URL('http://localhost:3000/'));
    const res = middleware(req);

    const csp = res.headers.get('Content-Security-Policy');
    expect(csp).toBeDefined();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(csp).toContain("frame-ancestors 'none'");

    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(res.headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains; preload');
  });
});
