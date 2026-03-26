import { setFormErrors } from "@/src/hooks/use-response-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/i18n/routing";
import { completeRegistration } from "../../client/complete-registration";

type UseCompleteRegistrationMutationProps<T extends FieldValues = any> = {
  setError: UseFormSetError<T>;
};

export const useCompleteRegistrationMutation = <T extends FieldValues = any>({
  setError,
}: UseCompleteRegistrationMutationProps<T>) => {
  const t = useTranslations();
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      toast.success(t('validation.complete_registration_success'));
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const data = JSON.parse(error.message);
      toast.error(data.message);
      setFormErrors(setError, data);
    },
    mutationKey: ['COMPLETE_REGISTRATION'],
    mutationFn: completeRegistration,
  });
};
