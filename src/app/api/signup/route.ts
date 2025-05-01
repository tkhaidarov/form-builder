import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;
    const isExistingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (isExistingUserByEmail) {
      return NextResponse.json(
        { user: null, message: `User with this email already exists` },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({ user: rest, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Oops. Please try again later' }, { status: 500 });
  }
}
