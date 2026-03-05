import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { GENERAL_MESSAGES } from "@/constants/messages";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground max-w-sm">
        {GENERAL_MESSAGES.NOT_FOUND}
      </p>
      <Button asChild>
        <Link href={ROUTES.HOME}>Go home</Link>
      </Button>
    </div>
  );
}
