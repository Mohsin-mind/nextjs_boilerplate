import { api } from '@/lib/api';

/**
 * Fetch the current authenticated user's profile.
 * Returns full response envelope (success or error).
 * @returns {Promise<any>}
 */
export async function getCurrentUser() {
  return api.get('/api/users/me');
}

/**
 * Update the current user's profile.
 * Returns full response envelope (success or error).
 * @param {Partial<import('@/types').User>} data
 * @returns {Promise<any>}
 */
export async function updateUserProfile(data) {
  return api.patch('/api/users/me', data);
}
