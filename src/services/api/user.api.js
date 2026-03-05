import { api } from '@/lib/api';

/**
 * Fetch the current authenticated user's profile.
 * @returns {Promise<import("@/types").User>}
 */
export async function getCurrentUser() {
  return api.get('/api/users/me');
}

/**
 * Update the current user's profile.
 * @param {Partial<import("@/types").User>} data
 * @returns {Promise<import("@/types").User>}
 */
export async function updateUserProfile(data) {
  return api.patch('/api/users/me', data);
}
