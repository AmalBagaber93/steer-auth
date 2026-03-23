'use client';

import { useEffect } from 'react';
import { UseFormSetError } from 'react-hook-form';

export interface ResponseError {
  message: string;
  errors: { [fieldName: string]: string[] };
}

// Standalone function for use in mutations
export function setFormErrors(
  setError: UseFormSetError<any>,
  error: ResponseError
) {
  if (error.errors) {
    Object.keys(error.errors).forEach(fieldName => {
      const errorMessages = error.errors[fieldName];
      const errorMessage = errorMessages[0];

      setError(fieldName, {
        type: 'backend',
        message: errorMessage,
      });
    });
  }
}

// Hook for use in components with useEffect
export function useResponseError(
  setError: UseFormSetError<any>,
  error: ResponseError | null
) {
  useEffect(() => {
    if (error) {
      setFormErrors(setError, error);
    }
  }, [error]);

  return {
    setFormErrors,
  };
}
