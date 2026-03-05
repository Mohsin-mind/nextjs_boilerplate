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
    },
  },
};
