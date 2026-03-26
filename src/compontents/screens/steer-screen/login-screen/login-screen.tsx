'use client'

import { FormProvider, useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "./schema/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/src/api/auth/hooks/mutations/use-login.mutation";
import { loginDefaultValues } from "./schema/login-default-values";
import { InputController } from "@/src/compontents/common/controllers/input-controller";
import { PasswordFieldController } from "@/src/compontents/common/controllers/password-field-controller";
import { Link } from "@/src/utils/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

const LoginScreen = () => {
    const t = useTranslations();
    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema(t)),
        defaultValues: loginDefaultValues,
    });

    const { handleSubmit, setError } = methods;

    const { mutate, isPending } = useLoginMutation(setError);

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-slate-50'>
            <div className='w-full max-w-100 bg-white rounded-2xl shadow-xl border border-slate-100 p-8'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='mb-6'>
                        <Image
                            src="https://gosteer.sa/colored_logo.svg"
                            alt="Steer Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    </div>
                    <h1 className='text-2xl font-bold text-slate-900 mb-2'>
                        {t('auth.login.title')}
                    </h1>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <InputController
                            name='email'
                            label={t('fields.email')}
                            autoComplete='email'
                            placeholder={t('fields.email_placeholder')}
                        />

                        <div className="space-y-1">
                            <PasswordFieldController
                                name='password'
                                label={t('fields.password')}
                                autoComplete='current-password'
                                placeholder={t('fields.password_placeholder')}
                            />
                            <div className='flex justify-end'>
                                <Link
                                    href='/auth/forgot-password'
                                    className='text-xs font-medium text-[#06b6f4] hover:text-blue-700 hover:underline'
                                >
                                    {t('auth.login.forgot_password')}
                                </Link>
                            </div>
                        </div>

                        <div className='pt-2'>
                            <button
                                type='submit'
                                disabled={isPending}
                                className='w-full bg-[#06b6f4] text-white font-semibold h-10 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                            >
                                {isPending ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    t('auth.login.submit')
                                )}
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-slate-500'>
                        {t('auth.login.no_account')}{' '}
                        <Link href='/auth/signup' className='font-semibold text-[#06b6f4] hover:text-blue-700 hover:underline'>
                            {t('auth.login.sign_up')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen