import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-coursehub-jwt-key';

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const adminToken = cookieHeader.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];

    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(adminToken, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const data = await req.json();
    const certificate = await prisma.certificate.create({
      data: {
        title: data.title,
        platform: data.platform,
        category: data.category,
        certificateUrl: data.certificateUrl,
        description: data.description,
        imageUrl: data.imageUrl,
        link: data.link,
      },
    });

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const adminToken = cookieHeader.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try { jwt.verify(adminToken, JWT_SECRET); } catch (e) { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }); }

    const data = await req.json();
    const certificate = await prisma.certificate.update({
      where: { id: data.id },
      data: {
        title: data.title,
        platform: data.platform,
        category: data.category,
        certificateUrl: data.certificateUrl,
        description: data.description,
        imageUrl: data.imageUrl,
        link: data.link,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const adminToken = cookieHeader.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try { jwt.verify(adminToken, JWT_SECRET); } catch (e) { return NextResponse.json({ error: 'Invalid token' }, { status: 401 }); }

    const { id } = await req.json();
    await prisma.certificate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
