'use server';

import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
  const accessToken = formData.get('access_token') as string;
  const expiresIn = formData.get('expires_in') as string;

  if (!accessToken || !expiresIn) {
    return { error: 'Invalid token data' };
  }

  // Set HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set('session_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: parseInt(expiresIn, 10),
  });

  return { success: true };
}
