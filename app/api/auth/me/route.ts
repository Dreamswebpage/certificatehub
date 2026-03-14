import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-coursehub-jwt-key';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    
    // Check both tokens
    const adminToken = cookieHeader.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
    const userToken = cookieHeader.split('; ').find(row => row.startsWith('user_token='))?.split('=')[1];

    if (adminToken) {
      try {
        const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
        return NextResponse.json({ authenticated: true, role: 'ADMIN', userId: decoded.userId });
      } catch (e) {}
    }

    if (userToken) {
      try {
        const decoded = jwt.verify(userToken, JWT_SECRET) as any;
        return NextResponse.json({ authenticated: true, role: 'USER', userId: decoded.userId });
      } catch (e) {}
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
  response.cookies.set('user_token', '', { maxAge: 0, path: '/' });
  return response;
}
