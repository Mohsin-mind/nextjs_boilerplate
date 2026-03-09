import { api } from '@/lib/api';

/**
 * Check if a user exists for a given email.
 * Returns full response envelope (success or error).
 * @param {string} email
 * @returns {Promise<any>}
 */
export async function checkUserExists(email) {
  const query = new URLSearchParams({ email }).toString();
  return api.get(`/api/auth/user-exists?${query}`, { cache: 'no-store' });
}
