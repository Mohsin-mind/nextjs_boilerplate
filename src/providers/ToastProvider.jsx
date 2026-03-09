'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      closeButton
      toastOptions={{
        classNames: {
          closeButton: '!left-auto !-right-4',
        },
      }}
    />
  );
}
