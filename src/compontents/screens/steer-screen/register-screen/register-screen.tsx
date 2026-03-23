import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { RegisterForm } from './compontents/register-form';
import Link from 'next/link';

export default function RegisterScreen() {
    const t = useTranslations();
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-slate-50'>
            <div className='w-full max-w-200 bg-white rounded-2xl shadow-xl border border-slate-100 p-8'>
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
                        {t('auth.register.title')}
                    </h1>
                    <p className='text-slate-500 text-sm'>
                        {t('auth.register.subtitle')}
                    </p>
                </div>

                <RegisterForm />

                <div className='mt-4 text-center pt-6 border-t border-slate-100'>
                    <p className='text-sm text-slate-500'>
                        {t('auth.register.already_have_account')}{' '}
                        <Link href='/en/auth/login' className='font-semibold text-blue-600 hover:text-blue-700 hover:underline'>
                            {t('auth.register.sign_in')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}