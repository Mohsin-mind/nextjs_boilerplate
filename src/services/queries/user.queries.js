import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateUserProfile } from '@/services/api/user.api';

// Query key factory — centralised, prevents typos and enables targeted invalidation
export const userKeys = {
  all: ['users'],
  me: () => [...userKeys.all, 'me'],
};

/**
 * Hook to fetch the current user's profile.
 * @returns {import("@tanstack/react-query").UseQueryResult<import("@/types").User>}
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getCurrentUser,
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
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
