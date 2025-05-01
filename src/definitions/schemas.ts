import { z } from 'zod';

export const validationFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name' }),
  email: z.string().email({ message: 'Please enter a correct email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
export type TFormData = z.infer<typeof validationFormSchema>;

export const latestUsersSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  lastSeen: z.string().datetime(),
});
export type TLatestUsers = z.infer<typeof latestUsersSchema>;

export const usersSchema = latestUsersSchema.extend({
  status: z.enum(['blocked', 'active']),
  position: z.enum(['user', 'admin']),
});
export type TUsers = z.infer<typeof usersSchema>;

export const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  description: z.string().max(100).optional(),
});
export type TFormSchema = z.infer<typeof formSchema>;

export const validationLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a correct email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
export type TLoginSchema = z.infer<typeof validationLoginSchema>;
