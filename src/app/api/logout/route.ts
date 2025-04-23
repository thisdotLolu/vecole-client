import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  const cookieStore = await cookies()
  cookieStore.set('access_token', '', { httpOnly: true, expires: new Date(0) });
  return response;
}
