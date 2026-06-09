import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request, { params }: { params: { mvid: string } }) {
  try {
    const { providerId, durationHours } = await req.json();

    const patient = await prisma.patient.findUnique({
      where: { mvid: params.mvid },
    });

    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

    const tokenString = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    const token = await prisma.accessToken.create({
      data: {
        patientId: patient.id,
        providerId,
        tokenString,
        expiresAt,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ success: true, token });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
