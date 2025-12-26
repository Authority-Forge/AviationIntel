import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  // Sentinel: Enforce authentication boundary on dashboard (ASVS V2/V3)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionToken = req.cookies.get('session_token')?.value;

    // 1. Explicit Authorization: No token = No access
    if (!sessionToken) {
        return redirectToLogin(req);
    }

    // 2. Verify Token (Zero Trust: Don't trust the cookie, verify the signature)
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                auth: {
                    persistSession: false, // Middleware is stateless
                    autoRefreshToken: false,
                    detectSessionInUrl: false,
                }
            }
        );

        const { data: { user }, error } = await supabase.auth.getUser(sessionToken);

        if (error || !user) {
            console.error('Sentinel: Invalid session token detected', error);
            return redirectToLogin(req);
        }

        // Token is valid, user is authenticated.
        // We can attach the user ID to headers if needed for downstream logic
        // const requestHeaders = new Headers(req.headers);
        // requestHeaders.set('x-user-id', user.id);

        return NextResponse.next();

    } catch (e) {
        console.error('Sentinel: Middleware verification failed', e);
        return redirectToLogin(req);
    }
  }
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
