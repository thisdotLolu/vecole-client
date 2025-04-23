import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  cookieStore.set('access_token', data.access_token, {secure:true}
);

  return response;
}
