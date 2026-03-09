import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { success, NO_STORE_HEADERS } from '@/lib/api-response';
import { validateQuery } from '@/lib/route-validation';
import { normalizedEmailSchema } from '@/validations/common.schema';

const querySchema = z.object({
  email: normalizedEmailSchema,
});

export async function GET(request) {
  const { data, response } = validateQuery(request, querySchema, {
    headers: NO_STORE_HEADERS,
  });
  if (response) return response;

  const email = data.email;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return success(
    200,
    'User lookup completed.',
    { exists: Boolean(user) },
    {},
    { headers: NO_STORE_HEADERS }
  );
}
