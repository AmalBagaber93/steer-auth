'use client';
import { useTranslations } from 'next-intl';
import useAuthState from '@/store/auth/useAuthState';
import { useRouter } from '@/src/utils/i18n/routing';

export default function DashboardPage() {
    const t = useTranslations('dashboard');
    const { data: user, logout } = useAuthState();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{t('title')}</h1>
                        <p className="text-slate-500 mt-1">
                            {t('welcome', { name: user?.first_name || 'User' })}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    >
                        {t('logout')}
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Example Dashboard Cards */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('stats.total_users')}</h3>
                        <p className="text-3xl font-bold text-[#06b6f4]">1,234</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('stats.active_sessions')}</h3>
                        <p className="text-3xl font-bold text-[#06b6f4]">56</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('stats.revenue')}</h3>
                        <p className="text-3xl font-bold text-[#06b6f4]">$12,345</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
