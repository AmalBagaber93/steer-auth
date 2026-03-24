import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { setFormErrors } from '@/src/hooks/use-response-error';
import {
  ISendResetPasswordLinkRequest,
  ISendResetPasswordLinkResponse,
  sendResetPasswordLink,
} from '../../client/send-reset-password-link';

export function useSendResetPasswordLinkMutation(
  setError: UseFormSetError<any>
) {
  return useMutation<
    ISendResetPasswordLinkResponse,
    Error,
    ISendResetPasswordLinkRequest
  >({
    mutationFn: sendResetPasswordLink,
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      setFormErrors(setError, data);
    },
  });
}
