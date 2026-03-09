import { z } from 'zod';
import { emailSchema, passwordSchema, nameSchema } from './common.schema';
import { FORM_MESSAGES } from '@/constants/messages';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, FORM_MESSAGES.REQUIRED.replace('{{field}}', 'Confirm password')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: FORM_MESSAGES.PASSWORDS_MISMATCH,
    path: ['confirmPassword'],
  });
