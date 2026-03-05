import { LoginForm } from "@/components/auth/LoginForm";
import { APP_NAME } from "@/constants/app";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to your account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
