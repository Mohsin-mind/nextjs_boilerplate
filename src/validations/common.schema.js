import { z } from 'zod';
import { PAGINATION } from '@/constants/app';

// Reusable field schemas — compose these into larger schemas to avoid duplication

export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters');

export const idSchema = z.string().cuid('Invalid ID format');

// Reusable pagination schema — use with API route query params
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(PAGINATION.MAX_PAGE_SIZE)
    .default(PAGINATION.DEFAULT_PAGE_SIZE),
});
