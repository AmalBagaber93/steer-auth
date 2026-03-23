import { setFormErrors } from "@/src/hooks/use-response-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { completeRegistration } from "../../client/complete-registration";

type UseCompleteRegistrationMutationProps<T extends FieldValues = any> = {
  setError: UseFormSetError<T>;
};
export const useCompleteRegistrationMutation = ({ setError }: UseCompleteRegistrationMutationProps) => {
  const t = useTranslations();
  const router = useRouter();

  return useMutation({
    onSuccess: async () => {
      toast.success(t('validation.complete_registration_success'));
      router.refresh()
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
