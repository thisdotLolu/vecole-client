import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const token =  cookieStore.get('access_token')?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/students`,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData)
      const message = errorData?.detail || errorData?.message || 'An error occurred';
      
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;


  try {
    const body = await req.json();

    console.log(body)

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/students/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log('error',errorData)
      const message = errorData?.detail || errorData?.message || 'An error occurred';
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.detail || 'Something went wrong' }, { status: 500 });
  }
}

