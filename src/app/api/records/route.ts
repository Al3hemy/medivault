import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { tokenString, mvid, clinicianId, complaint, examination, diagnosis, treatment } = await req.json();

    // Verify token
    const token = await prisma.accessToken.findUnique({
      where: { tokenString },
      include: { patient: true },
    });

    if (!token || token.patient.mvid !== mvid || token.status !== 'ACTIVE' || token.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired access token' }, { status: 401 });
    }

    // Get previous entry for chaining
    const previousEntry = await prisma.clinicalEntry.findFirst({
      where: { patientId: token.patientId },
      orderBy: { createdAt: 'desc' },
    });
    
    const previousHash = previousEntry ? previousEntry.entryHash : '0';

    // Create signature
    const dataString = `${token.patientId}:${clinicianId}:${complaint}:${diagnosis}:${previousHash}`;
    const entryHash = crypto.createHash('sha256').update(dataString).digest('hex');

    const entry = await prisma.clinicalEntry.create({
      data: {
        patientId: token.patientId,
        clinicianId,
        presentingComplaint: complaint,
        examination,
        diagnosisIcd10: diagnosis,
        treatmentPlan: treatment,
        previousEntryHash: previousHash,
        entryHash,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
