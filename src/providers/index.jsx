'use client';

import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        {children}
        <ToastProvider />
      </QueryProvider>
    </ReduxProvider>
  );
}
