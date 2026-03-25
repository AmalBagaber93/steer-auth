import { setFormErrors } from "@/src/hooks/use-response-error";
import useAuthState from "@/store/auth/useAuthState";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register } from "../../client/register";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";

type UseRegisterMutationProps<T extends FieldValues = any> = {
  setError: UseFormSetError<T>;
};
export const useRegisterMutation = ({ setError }: UseRegisterMutationProps) => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';
  const authRegister = useAuthState((state) => state.register);

  return useMutation({
    onSuccess: async ({ token, company_id, step, roles }, variables: any) => {
      toast.success(t('validation.register_success'));
      authRegister(token, step, company_id, roles);
      if (step === 'complete_registration') {
        router.push(`/${locale}/complete-registration`);
      } else {
        router.push(`/${locale}/auth/confirm-email?email=${encodeURIComponent(variables.email ?? '')}`);
      }
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);

      toast.error(data.message);
      setFormErrors(setError, data);
    },
    mutationKey: ['REGISTER'],
    mutationFn: register,
  });
};
