import { api } from '@/lib/api';

/**
 * Check if a user exists for a given email.
 * Returns full response { success, message, data, meta }
 * @param {string} email
 * @returns {Promise<{ success: boolean, message: string, data: { exists: boolean }, meta: any }>}
 */
export async function checkUserExists(email) {
  const query = new URLSearchParams({ email }).toString();
  return api.get(`/api/auth/user-exists?${query}`, { cache: 'no-store' });
}
