'use server';
import prisma from '@/lib/prisma';

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      created_at: true,
    },
  });
}
export async function blockUserApi(userId: string[]) {
  try {
    await prisma.user.updateMany({
      where: { id: { in: userId } },
      data: { status: false },
    });
    return {
      success: true,
      message: 'User(s) blocked',
    };
  } catch (error) {
    console.error('Error while fetching users', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
