import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest,{ params } : { params: Promise<{ classId: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const {classId} = await params;
  
    console.log(classId)
    console.log(token)
  
    try {  

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${classId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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


export async function PUT(req: NextRequest,{ params } : { params: Promise<{ studentId: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const {studentId} = await params;

  console.log(studentId)
  console.log(token)

  try {
    const body = await req.json();

    console.log(body)

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/students/${studentId}`, {
      method: 'PUT',
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const { studentId } = await params;
  
    console.log(studentId);
    console.log(token);
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.log('error', errorData);
        const message = errorData?.detail || errorData?.message || 'An error occurred';
        return NextResponse.json({ error: message }, { status: res.status });
      }
  
      return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.detail || 'Something went wrong' }, { status: 500 });
    }
  }



