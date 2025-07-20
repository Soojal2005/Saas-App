// app/api/test/route.ts
// app/api/test/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth(); // No await needed for server auth
    console.log('Auth object:', auth()); // Debug log
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json({ userId });
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}