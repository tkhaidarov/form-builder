'use server';
import { getCurrentAuthenticatedUser } from '@/utils/form-utils';
import { formService } from '@/utils/form-utils';
import prisma from '@/lib/prisma';
import { formSchema, TFormSchema } from '@/definitions/schemas';

class UserNotFoundErr extends Error {}

export async function createForm(data: TFormSchema) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) throw new Error('Error creating form');
  const currentUser = await getCurrentAuthenticatedUser();
  const { name, description } = data;

  const form = await formService.createForm(currentUser.id, {
    name: name,
    description: description,
  });
  return form.id;
}

export async function getForms() {
  const currentUser = await getCurrentAuthenticatedUser();
  return await formService.getForms(currentUser.id);
}

export async function getFormById(formId: string) {
  const currentUser = await getCurrentAuthenticatedUser();
  return await formService.getFormById(currentUser.id, formId);
}

// export async function getFormStats() {
//   const session = await auth();
//   if (!session) {
//     throw new UserNotFoundErr();
//   }
//
//   const stats = await prisma.form.aggregate({
//     where: {
//       userId: session?.user?.id,
//     },
//     _sum: {
//       visits: true,
//       submissions: true,
//     },
//   });
//
//   const visits = stats._sum.visits || 0;
//   const submissions = stats._sum.submissions || 0;
//
//   let submissionsRate = 0;
//
//   if (visits > 0) {
//     submissionsRate = (submissions / visits) * 100;
//   }
//
//   const bounceRate = 100 - submissionsRate;
//
//   return {
//     visits,
//     submissions,
//     submissionsRate,
//     bounceRate,
//   };
// }
