import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patient = await prisma.patient.findUnique({
      where: { userId: (session.user as any).id },
      include: {
        accessTokens: {
          include: { provider: true }
        }
      }
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
