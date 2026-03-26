'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';
import { useRouter } from '@/src/utils/i18n/routing';
import useAuthState from '@/store/auth/useAuthState';
import LanguageSwitcher from '@/src/compontents/common/language-switcher';

export default function ScreenHeader() {
    const t = useTranslations();
    const params = useParams();
    const currentLocale = (params?.locale as string) ?? 'en';
    const router = useRouter();
    const logout = useAuthState((s) => s.logout);

    const handleLogout = () => {
        logout();
        router.replace('/auth/login', { locale: currentLocale });
    };

    return (
        <div className="flex items-center justify-end gap-2 mb-6">
            <LanguageSwitcher />

            <div className="w-px h-5 bg-slate-200" />

            <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
                <LogOut className="h-4 w-4" />
                <span>{t('dashboard.logout')}</span>
            </button>
        </div>
    );
}
