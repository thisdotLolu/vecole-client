import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const token =  cookieStore.get('access_token')?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/teachers`,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message = errorData?.detail || errorData?.message || 'An error occurred';
      
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/teachers`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message = errorData?.detail || errorData?.message || 'An error occurred';
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
