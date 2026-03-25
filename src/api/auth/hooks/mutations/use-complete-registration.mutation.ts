import { setFormErrors } from "@/src/hooks/use-response-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UseFormSetError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { completeRegistration } from "../../client/complete-registration";

export const useCompleteRegistrationMutation = (
  setError: UseFormSetError<any>,
) => {
  const t = useTranslations();
  const router = useRouter();

  return useMutation({
    onSuccess: async () => {
      toast.success(t('validation.complete_registration_success'));
      router.push('/dashboard');
      // router.refresh()
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
