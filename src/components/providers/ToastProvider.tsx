'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#ffffff',
          color: '#333333',
          borderRadius: '0.375rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          style: {
            border: '1px solid #d1fae5',
            borderLeft: '4px solid #10b981',
          },
        },
        error: {
          style: {
            border: '1px solid #fee2e2',
            borderLeft: '4px solid #ef4444',
          },
        },
      }}
    />
  );
} 