'use client';

import { useSyncExternalStore } from 'react';

/**
 * Hook to check if a CSS media query matches.
 * Uses useSyncExternalStore for server-side rendering compatibility.
 * @param {string} query - CSS media query string e.g. "(min-width: 768px)"
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

// Convenience hooks for common breakpoints (Tailwind defaults)
export function useIsMobile() {
  return !useMediaQuery('(min-width: 768px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
