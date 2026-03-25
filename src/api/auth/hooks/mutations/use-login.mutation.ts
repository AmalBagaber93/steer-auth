import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ILoginRequest, ILoginResponse, login } from '../../client/login';
import useAuthState from '@/store/auth/useAuthState';
import { setFormErrors } from '@/src/hooks/use-response-error';
import { useRouter } from '@/src/utils/i18n/routing';

export function useLoginMutation(
  setError: UseFormSetError<any>,
) {
  const router = useRouter();
  const t = useTranslations('responses');
  const authLogin = useAuthState((state) => state.login);

  return useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: login,
    onSuccess: (response) => {
      const { token, step, company_id, roles } = response.data;
      authLogin(token, step, company_id, roles);

      toast.success(t('login_success'))

      router.push('/dashboard');
    },
    onError: async (error: any) => {
      const data = JSON.parse(error.message);
      setFormErrors(setError, data);

      toast.error(data.message || "An error occurred during login");

    },
  });
}
