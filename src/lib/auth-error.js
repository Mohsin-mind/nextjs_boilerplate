import { AUTH_MESSAGES } from '@/constants/messages';

/**
 * Better Auth intentionally uses one generic error for invalid credentials.
 * This helper keeps message mapping in one place for consistency.
 * @param {{ code?: string, message?: string, statusText?: string } | undefined} error
 * @param {{ userExists?: boolean | null }} [context]
 * @returns {string}
 */
export function mapLoginError(error, context = {}) {
  const isInvalidCredentials = isInvalidCredentialsError(error);

  if (isInvalidCredentials) {
    if (context.userExists === false) return AUTH_MESSAGES.USER_NOT_FOUND;
    return AUTH_MESSAGES.LOGIN_ERROR;
  }

  return error?.message || error?.statusText || AUTH_MESSAGES.LOGIN_ERROR;
}

/**
 * Check if Better Auth returned generic invalid-credentials response.
 * @param {{ code?: string, message?: string } | undefined} error
 * @returns {boolean}
 */
export function isInvalidCredentialsError(error) {
  const message = error?.message || '';
  return error?.code === 'INVALID_EMAIL_OR_PASSWORD' || /invalid email or password/i.test(message);
}
