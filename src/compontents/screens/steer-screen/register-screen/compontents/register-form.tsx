"use client";

import { useState } from "react";
import { InputController } from "@/src/compontents/common/controllers/input-controller";
import { PasswordFieldController } from "@/src/compontents/common/controllers/password-field-controller";
import { CheckboxFieldController } from "@/src/compontents/common/controllers/checkbox-field-controller";
import { PhoneFieldController } from "@/src/compontents/common/controllers/phone-field-controller";
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
  User,
  Building2,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/src/utils/utils";
import { UploadController } from "@/src/compontents/common/controllers/upload-controller";
import { useBanksQuery } from "@/src/api/common/hooks/queries/use-banks.query";
import { SelectController } from "@/src/compontents/common/controllers/select-controller";

const STEPS = [
  { id: "personal", icon: User },
  { id: "company", icon: Building2 },
  { id: "bank", icon: Landmark },
  { id: "security", icon: ShieldCheck },
];

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
console.log(methods.watch("bank_id"));

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
      <div className="mb-1 px-5">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />

          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isActive
                      ? "bg-white border-blue-500 text-blue-500 shadow-md scale-110"
                      : isCompleted
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-slate-200 text-slate-400",
                  )}
                >
                  <StepIcon size={18} />
                </div>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-medium mt-2  absolute sm:-bottom-6 -bottom-8 sm:whitespace-nowrap  transition-colors duration-300",
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                        ? "text-slate-600"
                        : "text-slate-400",
                  )}
                >
                  {t(`${step.id}_info`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 min-h-75">
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <>
              <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                  {t("personal_info")}
                </h3>
                <p className="text-sm text-slate-500">
                  {t("personal_info_desc")}
                </p>
              </div>
              <InputController
                name="first_name"
                label={t("first_name.label")}
                placeholder={t("first_name.placeholder")}
              />
              <InputController
                name="last_name"
                label={t("last_name.label")}
                placeholder={t("last_name.placeholder")}
              />
              <InputController
                name="email"
                label={t("email.label")}
                placeholder={t("email.placeholder")}
                type="email"
              />
              <PhoneFieldController
                phoneNumberName="phone_number"
                countryCodeName="phone_country_code"
                label={t("phone_number.label")}
                placeholder={t("phone_number.placeholder")}
              />
            </>
          )}

          {/* Step 2: Company Info */}
          {currentStep === 1 && (
            <>
              <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                  {t("company_info")}
                </h3>
                <p className="text-sm text-slate-500">
                  {t("company_info_desc")}
                </p>
              </div>
              <InputController
                name="company_name"
                label={t("company_name.label")}
                placeholder={t("company_name.placeholder")}
              />
              <InputController
                name="main_branch"
                label={t("main_branch.label")}
                placeholder={t("main_branch.placeholder")}
              />
              <InputController
                name="cr_number"
                label={t("cr_number.label")}
                placeholder={t("cr_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
              />
              <InputController
                name="tga_number"
                label={t("tga_number.label")}
                placeholder={t("tga_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
              />
              <InputController
                name="vat_number"
                label={t("vat_number.label")}
                placeholder={t("vat_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
              />
            </>
          )}

          {/* Step 3: Bank Info */}
          {currentStep === 2 && (
            <>
              <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                  {t("bank_info")}
                </h3>
                <p className="text-sm text-slate-500">{t("bank_info_desc")}</p>
              </div>
              <SelectController
                name="bank_id"
                label={t("bank_name.label")}
                placeholder={t("bank_name.placeholder")}
                options={
                  banks?.data.map((bank) => ({
                    value: bank.id.toString(),
                    label: bank.name,
                  })) || []
                }
              />

              <InputController
                name="iban_number"
                label={t("iban_number.label")}
                placeholder={t("iban_number.placeholder")}
              />
              <div className="md:col-span-2">
                <UploadController
                  name="iban_letter"
                  label={t("iban_letter.label")}
                  maxFiles={1}
                  accept="application/pdf"
                />
              </div>
            </>
          )}

          {/* Step 4: Security */}
          {currentStep === 3 && (
            <>
              <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                  {t("security")}
                </h3>
                <p className="text-sm text-slate-500">{t("security_desc")}</p>
              </div>
              <PasswordFieldController
                name="password"
                label={t("password.label")}
                placeholder={t("password.placeholder")}
              />
              <PasswordFieldController
                name="password_confirmation"
                label={t("password_confirmation.label")}
                placeholder={t("password_confirmation.placeholder")}
              />
              <div className="md:col-span-2">
                <CheckboxFieldController
                  name="termsAndConditions"
                  label={t("terms_and_conditions.label")}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-2 px-6 h-11 rounded-lg font-semibold transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none",
              "text-slate-600 hover:bg-slate-50",
            )}
          >
            <ChevronLeft size={20} />
            {t("back")}
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#06b6f4] text-white px-8 h-11 rounded-lg font-semibold hover:bg-[#05a5dc] transition-all flex items-center justify-center min-w-[140px] shadow-lg shadow-blue-200"
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
              className="bg-[#06b6f4] text-white px-8 h-11 rounded-lg font-semibold hover:bg-[#05a5dc] transition-all flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-blue-200"
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
