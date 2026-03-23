import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { setFormErrors } from '@/src/hooks/use-response-error';
import {
  ISendEmailVerificationRequest,
  ISendEmailVerificationResponse,
  sendEmailVerification,
} from '../../client/send-email-verification';

export function useSendEmailVerificationMutation(
  setError: UseFormSetError<any>
) {
  const t = useTranslations('responses');

  return useMutation<
    ISendEmailVerificationResponse,
    Error,
    ISendEmailVerificationRequest
  >({
    mutationFn: sendEmailVerification,
    onSuccess: () => {
      toast.success(t('email_verification_sent'));
    },
    onError: async (error: any) => {
      const data = JSON.parse(error.message);
      setFormErrors(setError, data);
      toast.error(data.message || 'An error occurred');
    },
  });
}
