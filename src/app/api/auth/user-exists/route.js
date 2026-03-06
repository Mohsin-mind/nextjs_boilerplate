import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { error, success, NO_STORE_HEADERS } from '@/lib/api-response';

const querySchema = z.object({
  email: z.string().trim().email(),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ email: searchParams.get('email') ?? '' });

  if (!parsed.success) {
    return error(
      400,
      'A valid email query parameter is required.',
      { code: 'INVALID_EMAIL' },
      { headers: NO_STORE_HEADERS }
    );
  }

  const email = parsed.data.email.toLowerCase();
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
