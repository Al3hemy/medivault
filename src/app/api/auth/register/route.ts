import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, nin, fullName, email, password } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists with this email." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        role,
        nin,
        name: fullName,
        email,
        passwordHash,
      },
    });

    if (role === 'PATIENT') {
      const mvid = `MV-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      await prisma.patient.create({
        data: {
          userId: user.id,
          mvid,
          dateOfBirth: new Date(),
          sex: 'Unknown',
        },
      });
    } else if (role === 'CLINICIAN') {
      await prisma.clinician.create({
        data: {
          userId: user.id,
          mdcnNumber: `MDCN-${Math.floor(100000 + Math.random() * 900000)}`,
        }
      });
    }

    return NextResponse.json({ success: true, user: { id: user.id, role: user.role } });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
