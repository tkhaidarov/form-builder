import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { TFormSchema } from '@/definitions/schemas';

class UserNotFoundErr extends Error {}

export async function getCurrentAuthenticatedUser() {
  const session = await auth();
  const currentUser = session?.user;
  if (!currentUser || !currentUser.id) {
    throw new UserNotFoundErr();
  }
  return currentUser;
}

export const formService = {
  async createForm(userId: string, data: TFormSchema) {
    const form = await prisma.form.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
      },
    });
    if (!form) {
      throw new Error('Something went wrong creating form');
    }
    return form;
  },

  async getForms(userId: string) {
    return await prisma.form.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },
  async getFormById(userId: string, formId: string) {
    return await prisma.form.findUnique({
      where: {
        userId: userId,
        id: formId,
      },
    });
  },
  async updateForm(userId: string, formId: string, jsonContent: string) {
    return await prisma.form.update({
      where: {
        userId: userId,
        id: formId,
      },
      data: {
        content: jsonContent,
      },
    });
  },
  async publishForm(userId: string, formId: string) {
    return await prisma.form.update({
      data: {
        published: true,
      },
      where: {
        userId: userId,
        id: formId,
      },
    });
  },
};
