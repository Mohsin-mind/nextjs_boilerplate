import { APP_NAME } from '@/constants/app';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        &copy; {year} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
