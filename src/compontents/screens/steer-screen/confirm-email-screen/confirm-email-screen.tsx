'use client';

import Image from 'next/image';
import { MailCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/src/utils/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ConfirmEmailScreen() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? '';

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col items-center text-center">
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

                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                    <MailCheck className="w-8 h-8 text-[#06b6f4]" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                    {t('auth.confirm_email.title')}
                </h1>

                <p className="text-sm text-slate-500 mb-3">
                    {t('auth.confirm_email.message')}
                </p>

                <div className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-6">
                    <p className="text-sm font-semibold text-[#06b6f4] break-all">{email}</p>
                </div>

                <p className="text-xs text-slate-400 mb-6">
                    {t('auth.confirm_email.spam_note')}
                </p>

                <Link
                    href='/auth/login'
                    className="w-full bg-[#06b6f4] text-white font-semibold h-10 rounded-lg hover:bg-[#05a5dc] transition-all flex items-center justify-center"
                >
                    {t('auth.register.sign_in')}
                </Link>
            </div>
        </div>
    );
}
