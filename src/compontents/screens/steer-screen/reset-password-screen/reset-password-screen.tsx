'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { PasswordFieldController } from '@/src/compontents/common/controllers/password-field-controller';
import { useResetPasswordMutation } from '@/src/api/auth/hooks/mutations/use-reset-password.mutation';

const resetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z.string().min(8, t('validation.errors.password_min_length')),
      password_confirmation: z.string().min(1, t('validation.errors.password_required')),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('auth.reset_password.mismatch'),
      path: ['password_confirmation'],
    });

type ResetPasswordFormData = z.infer<ReturnType<typeof resetPasswordSchema>>;

export default function ResetPasswordScreen({ token }: { token: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: { password: '', password_confirmation: '' },
  });

  const { handleSubmit, setError } = methods;

  const { mutate, isPending, isSuccess } = useResetPasswordMutation(setError);

  const onSubmit = (data: ResetPasswordFormData) => {
    mutate({ email, token, ...data });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-100 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Image
              src="https://gosteer.sa/colored_logo.svg"
              alt="Steer Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          {isSuccess ? (
            <>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {t('auth.reset_password.success_title')}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                {t('auth.reset_password.success_message')}
              </p>
              <Link
                href={`/${locale}/auth/login`}
                className="w-full bg-[#06b6f4] text-white font-semibold h-10 rounded-lg hover:bg-[#05a5dc] transition-all flex items-center justify-center"
              >
                {t('auth.reset_password.back_to_login')}
              </Link>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <KeyRound className="w-7 h-7 text-[#06b6f4]" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {t('auth.reset_password.title')}
              </h1>
              <p className="text-sm text-slate-500 text-center">
                {t('auth.reset_password.description')}
              </p>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <PasswordFieldController
                    name="password"
                    label={t('auth.reset_password.password')}
                    autoComplete="new-password"
                    placeholder="••••••••"
                  />

                  <PasswordFieldController
                    name="password_confirmation"
                    label={t('auth.reset_password.confirm_password')}
                    autoComplete="new-password"
                    placeholder="••••••••"
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#06b6f4] text-white font-semibold h-10 rounded-lg hover:bg-[#05a5dc] focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isPending ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        t('auth.reset_password.submit')
                      )}
                    </button>
                  </div>
                </form>
              </FormProvider>

              <div className="mt-6 text-center pt-6 border-t border-slate-100">
                <Link
                  href={`/${locale}/auth/login`}
                  className="font-semibold text-[#06b6f4] hover:text-[#05a5dc] hover:underline text-sm"
                >
                  {t('auth.reset_password.back_to_login')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
