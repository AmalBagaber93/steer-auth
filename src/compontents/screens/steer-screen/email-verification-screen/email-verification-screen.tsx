'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { InputController } from '@/src/compontents/common/controllers/input-controller';
import { useSendEmailVerificationMutation } from '@/src/api/auth/hooks/mutations/use-send-email-verification.mutation';
import { useSearchParams } from 'next/navigation';

const emailVerificationSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('validation.errors.invalid_email_format')),
  });

type EmailVerificationFormData = z.infer<
  ReturnType<typeof emailVerificationSchema>
>;

export default function EmailVerificationScreen() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const methods = useForm<EmailVerificationFormData>({
    resolver: zodResolver(emailVerificationSchema(t)),
    defaultValues: { email: email ?? '' },
  });

  const { handleSubmit, setError } = methods;

  const { mutate, isPending } = useSendEmailVerificationMutation(setError);

  const onSubmit = (data: EmailVerificationFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex flex-col items-center mb-8">
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
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Mail className="w-7 h-7 text-[#06b6f4]" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('auth.email_verification.title')}
          </h1>
          <p className="text-sm text-slate-500 text-center">
            {t('auth.email_verification.subtitle')}
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputController
              name="email"
              label={t('fields.email')}
              autoComplete="email"
              placeholder={t('fields.email_placeholder')}
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
                  t('auth.email_verification.submit')
                )}
              </button>
            </div>
          </form>
        </FormProvider>

        <div className="mt-6 text-center pt-6 border-t border-slate-100">

          <Link
            href="/en/auth/login"
            className="font-semibold text-[#06b6f4] hover:text-[#05a5dc] hover:underline"
          >
            {t('auth.email_verification.back_to_login')}
          </Link>

        </div>
      </div>
    </div>
  );
}
