import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { setFormErrors } from '@/src/hooks/use-response-error';
import {
  IResetPasswordRequest,
  IResetPasswordResponse,
  resetPassword,
} from '../../client/reset-password';

export function useResetPasswordMutation(setError: UseFormSetError<any>) {
  return useMutation<IResetPasswordResponse, Error, IResetPasswordRequest>({
    mutationFn: resetPassword,
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      setFormErrors(setError, data);
    },
  });
}
