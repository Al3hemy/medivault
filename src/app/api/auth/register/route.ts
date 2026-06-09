import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, nin, fullName, email, password } = body;

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await prisma.user.create({
      data: {
        role,
        nin,
        fullName,
        email,
        passwordHash,
      },
    });

    if (role === 'PATIENT') {
      const mvid = `MV-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`;
      await prisma.patient.create({
        data: {
          userId: user.id,
          mvid,
          dateOfBirth: new Date(),
          sex: 'Unknown',
        },
      });
    }

    return NextResponse.json({ success: true, user: { id: user.id, role: user.role } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
