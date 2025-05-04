import { z } from 'zod';
import { $Enums } from '@/generated/prisma';
import Role = $Enums.Role;

export const validationFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name' }),
  email: z.string().email({ message: 'Please enter a correct email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
export type TFormData = z.infer<typeof validationFormSchema>;

export const latestUsersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.date(),
});
export type TLatestUsers = z.infer<typeof latestUsersSchema>;

export const usersSchema = latestUsersSchema.extend({
  status: z.boolean(),
  role: z.nativeEnum(Role),
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

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(100),
  required: z.boolean(),
  placeholder: z.string().max(50),
});
export type TPropertiesSchema = z.infer<typeof propertiesSchema>;

export const propertiesSchemaTitleField = z.object({
  title: z.string().min(2).max(50),
});
export type TPropertiesSchemaTitleField = z.infer<typeof propertiesSchemaTitleField>;

export const propertiesSchemaParagraphField = z.object({
  text: z.string().min(2).max(500),
});
export type TPropertiesSchemaParagraphField = z.infer<typeof propertiesSchemaParagraphField>;

export const propertiesSchemaSpacerField = z.object({
  height: z.number().min(5).max(100),
});
export type TPropertiesSchemaSpacerField = z.infer<typeof propertiesSchemaSpacerField>;

export const propertiesSchemaTextArea = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(100),
  required: z.boolean(),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
});
export type TPropertiesSchemaTextArea = z.infer<typeof propertiesSchemaTextArea>;

export const propertiesSchemaDate = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(100),
  required: z.boolean(),
});
export type TPropertiesSchemaDate = z.infer<typeof propertiesSchemaDate>;

export const propertiesSchemaSelect = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(100),
  required: z.boolean(),
  placeholder: z.string().max(50),
  options: z.array(z.string()),
});
export type TPropertiesSchemaSelect = z.infer<typeof propertiesSchemaSelect>;

export const propertiesSchemaCheckbox = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(100),
  required: z.boolean(),
});
export type TPropertiesSchemaCheckbox = z.infer<typeof propertiesSchemaCheckbox>;
