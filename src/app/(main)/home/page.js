import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { APP_NAME } from '@/constants/app';
import { formatDate } from '@/lib/helpers';

export const metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const firstName = user?.firstName || '';
  const _lastName = user?.lastName || '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="text-muted-foreground mt-1">
          You&apos;re signed in as <span className="font-medium">{user?.email}</span>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards — replace with real content */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Getting Started</h2>
          <p className="text-sm text-muted-foreground mt-2">
            This is your {APP_NAME} boilerplate. Start building your app here.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Account</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Member since {user?.createdAt ? formatDate(user.createdAt) : 'today'}.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Stack</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Next.js 16 · Better Auth · Prisma · Redux · TanStack Query
          </p>
        </div>
      </div>
    </div>
  );
}
