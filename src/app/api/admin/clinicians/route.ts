import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clinicians = await prisma.clinician.findMany({
      include: {
        user: true,
      }
    });

    return NextResponse.json({ clinicians });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
