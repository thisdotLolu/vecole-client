import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ classId: string, studentId: string }> }
  ) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
  
    const { classId, studentId } = await params;

    console.log(studentId)
  
    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required in query' }, { status: 400 });
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${classId}/students/${studentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData?.detail || errorData?.message || 'An error occurred';
        return NextResponse.json({ error: message }, { status: res.status });
      }

      console.log(res)

      const data = await res.json();
      console.log(data)
      return NextResponse.json({ data });
    } catch (error: any) {
      console.log('API error:', error);
      return NextResponse.json({ error: error?.message || 'Something went wrong' }, { status: 500 });
    }
  }