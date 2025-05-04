'use server';
import { getCurrentAuthenticatedUser } from '@/utils/form-utils';
import { formService } from '@/utils/form-utils';
import prisma from '@/lib/prisma';
import { formSchema, TFormSchema } from '@/definitions/schemas';

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
export async function updateFormContent(id: string, jsonContent: string) {
  const currentUser = await getCurrentAuthenticatedUser();
  return await formService.updateForm(currentUser.id, id, jsonContent);
}
export async function publishForm(id: string) {
  const currentUser = await getCurrentAuthenticatedUser();
  return await formService.publishForm(currentUser.id, id);
}
export async function getFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}
export async function getFormStats() {
  const currentUser = await getCurrentAuthenticatedUser();
  const stats = await prisma.form.aggregate({
    where: {
      userId: currentUser.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }
  let bounceRate = 0;
  if (submissionsRate > 0) {
    bounceRate = 100 - submissionsRate;
  }
  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}
export async function onSubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      formSubmiss: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}
export async function getFormWithSubmissions(id: string) {
  const currentUser = await getCurrentAuthenticatedUser();
  return await prisma.form.findUnique({
    where: {
      userId: currentUser.id,
      id,
    },
    include: {
      formSubmiss: true,
    },
  });
}
