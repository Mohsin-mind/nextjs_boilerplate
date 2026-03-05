'use client';

import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
