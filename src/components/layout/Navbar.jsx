"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { APP_NAME } from "@/constants/app";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export function Navbar() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={isAuthenticated ? ROUTES.HOME : ROUTES.ROOT}
          className="flex items-center gap-2 font-semibold"
        >
          {APP_NAME}
        </Link>

        {/* Nav actions */}
        <nav className="flex items-center gap-2">
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.LOGIN}>Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.REGISTER}>Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
