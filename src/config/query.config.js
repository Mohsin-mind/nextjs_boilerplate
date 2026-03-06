// Centralised TanStack Query defaults — imported by src/lib/query-client.js

export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute — data considered fresh
      gcTime: 5 * 60 * 1000, // 5 minutes — cache garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
      // Global error handler - called on any mutation error
      // eslint-disable-next-line no-unused-vars
      onError: (error, variables, context) => {
        // Handle global auth errors (401, 403)
        // This runs after the mutation fails
        // You can import and use toast here for global error notifications
        // import { toast } from 'sonner' or similar
        // Example: Check for auth errors
        // if (error?.status === 401 || error?.status === 403) {
        //   // Redirect to login or show session expired
        // }
      },
    },
  },
};
