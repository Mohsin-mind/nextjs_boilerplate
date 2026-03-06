import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateUserProfile } from '@/services/api/user.api';
import { isSuccess, toApiError } from '@/lib/api-envelope';

// Query key factory — centralised, prevents typos and enables targeted invalidation
export const userKeys = {
  all: ['users'],
  me: () => [...userKeys.all, 'me'],
};

/**
 * Hook to fetch the current user's profile.
 * Returns response envelope: { success, message, data, meta }.
 * Throws on unsuccessful envelopes so TanStack `error` state works consistently.
 * @returns {import("@tanstack/react-query").UseQueryResult<{ success: boolean, message: string, data: import('@/types').User | null, meta: any }>}
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const response = await getCurrentUser();
      if (!isSuccess(response)) throw toApiError(response);
      return response;
    },
  });
}

/**
 * Hook to update the current user's profile.
 * Automatically invalidates the "me" query on success.
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateUserProfile(payload);
      if (!isSuccess(response)) throw toApiError(response);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
