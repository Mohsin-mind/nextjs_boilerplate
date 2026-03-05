import { RegisterForm } from '@/components/auth/RegisterForm';
import { APP_NAME } from '@/constants/app';

export const metadata = {
  title: 'Create account',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <p className="text-sm text-muted-foreground mt-1">Create a new account</p>
      </div>
      <RegisterForm />
    </div>
  );
}
