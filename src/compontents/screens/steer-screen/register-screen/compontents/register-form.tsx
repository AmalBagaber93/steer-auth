"use client";

import { useState } from "react";
import { registerDefaultValues } from "./schema/register-default-values";
import {
  RegisterSchema,
  RegisterSchemaType,
} from "./schema/register-form-schema";
import { useRegisterMutation } from "@/src/api/auth/hooks/mutations/use-register.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm, FormProvider } from "react-hook-form";
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/src/utils/utils";
import { useBanksQuery } from "@/src/api/common/hooks/queries/use-banks.query";
import PersonalInfo from "./register-steps/personal-info ";
import CompanyInfo from "./register-steps/company-info ";
import BankInfo from "./register-steps/bank-info";
import Security from "./register-steps/security-info";
import StepProgress from "./register-steps/step-progress";
import { STEPS } from "./register-steps/steps-data";



export const RegisterForm = () => {
  const t = useTranslations("Auth");
  const [currentStep, setCurrentStep] = useState(0);
  const defaultValues = registerDefaultValues();

  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema(t)),
    defaultValues,
    mode: "onChange",
  });


  const { handleSubmit, setError, trigger } = methods;

  const mutation = useRegisterMutation({ setError });

  const { data: banks } = useBanksQuery();

  const stepFields: (keyof RegisterSchemaType)[][] = [
    ["first_name", "last_name", "email", "phone_number"],
    ["company_name", "main_branch", "cr_number", "tga_number", "vat_number"],
    ["bank_id", "iban_number", "iban_letter"],
    ["password", "password_confirmation", "termsAndConditions"],
  ];


  const nextStep = async () => {
    const fields = stepFields[currentStep];
    const isValid = await trigger(fields as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: RegisterSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <StepProgress STEPS={STEPS} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 min-h-75">

          {currentStep === 0 && (
            <PersonalInfo />
          )}

          {currentStep === 1 && (
            <CompanyInfo />
          )}


          {currentStep === 2 && (
            <BankInfo banks={banks?.data} />
          )}

          {currentStep === 3 && (
            <Security />
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-2 sm:px-6 px-1 h-11 rounded-lg sm:text-xl text-base font-semibold transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none",
              "text-slate-600 hover:bg-slate-50 cursor-pointer",
            )}
          >
            <ChevronLeft size={20} />
            {t("back")}
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#06b6f4] text-white sm:px-8 px-2 h-11 sm:text-xl text-base  rounded-lg font-semibold hover:bg-[#05a5dc] transition-all flex items-center justify-center min-w-35 shadow-lg shadow-blue-200 cursor-pointer"
            >
              {mutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t("register_submit")
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#06b6f4] text-white sm:px-8 px-2 h-11 sm:text-xl text-base rounded-lg font-semibold hover:bg-[#05a5dc] transition-all flex items-center justify-center gap-2 min-w-35 shadow-lg shadow-blue-200 cursor-pointer"
            >
              {t("next")}
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
