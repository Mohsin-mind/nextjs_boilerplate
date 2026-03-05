'use client';

import { useSession, signIn, signOut, signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { AUTH_MESSAGES } from '@/constants/messages';

/**
 * Auth state hook — wraps Better Auth client with app-specific helpers.
 * @returns {{ session: any, user: any, isLoading: boolean, isAuthenticated: boolean, login: Function, register: Function, logout: Function }}
 */
export function useAuth() {
  const { data: session, isPending: isLoading } = useSession();
  const router = useRouter();

  const user = session?.user ?? null;
  const isAuthenticated = !!session;

  /**
   * Sign in with email and password.
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ error?: string }>}
   */
  async function login({ email, password }) {
    const result = await signIn.email({ email, password });
    if (result.error) {
      return { error: result.error.message || AUTH_MESSAGES.LOGIN_ERROR };
    }
    router.push(ROUTES.HOME);
    return {};
  }

  /**
   * Register a new account with email and password.
   * @param {{ firstName: string, lastName: string, email: string, password: string }} data
   * @returns {Promise<{ error?: string }>}
   */
  async function register({ firstName, lastName, email, password }) {
    const result = await signUp.email({
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      email,
      password,
    });
    if (result.error) {
      return { error: result.error.message || AUTH_MESSAGES.REGISTER_ERROR };
    }
    router.push(ROUTES.HOME);
    return {};
  }

  /**
   * Sign out the current user.
   */
  async function logout() {
    await signOut();
    router.push(ROUTES.LOGIN);
  }

  return {
    session,
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
