import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ROUTES } from '@/constants/routes';

export default async function RootPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect(ROUTES.HOME);
  }

  redirect(ROUTES.LOGIN);
}
