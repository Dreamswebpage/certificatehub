import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-coursehub-jwt-key';

export async function POST(req: Request) {
  try {
    const { email, password, requestedRole } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Default admin creation if not exists
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('Admin@2026', 10);
      await prisma.user.create({
        data: {
          email: 'admin@coursehub.in',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if the role matches the requested login type
    if (requestedRole === 'ADMIN' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Not authorized as Admin' }, { status: 403 });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged in successfully',
      role: user.role
    });

    const cookieName = user.role === 'ADMIN' ? 'admin_token' : 'user_token';
    
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
