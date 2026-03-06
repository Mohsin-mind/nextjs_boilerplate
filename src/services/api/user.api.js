import { api } from '@/lib/api';

/**
 * Fetch the current authenticated user's profile.
 * Returns full response { success, message, data, meta }
 * @returns {Promise<{ success: boolean, message: string, data: any, meta: any }>}
 */
export async function getCurrentUser() {
  return api.get('/api/users/me');
}

/**
 * Update the current user's profile.
 * Returns full response { success, message, data, meta }
 * @param {Partial<import('@/types').User>} data
 * @returns {Promise<{ success: boolean, message: string, data: any, meta: any }>}
 */
export async function updateUserProfile(data) {
  return api.patch('/api/users/me', data);
}
