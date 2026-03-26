'use client';

import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/src/utils/i18n/routing';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/src/compontents/ui/dropdown-menu';

const LOCALES = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher() {
    const params = useParams();
    const currentLocale = (params?.locale as string) ?? 'en';
    const pathname = usePathname();
    const router = useRouter();

    const handleSwitch = (locale: string) => {
        router.replace(pathname, { locale });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors outline-none cursor-pointer">
                <Globe className="h-4 w-4" />
                <span>{LOCALES.find((l) => l.value === currentLocale)?.label ?? currentLocale}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LOCALES.map((locale) => (
                    <DropdownMenuItem
                        key={locale.value}
                        className={currentLocale === locale.value ? 'font-medium text-[#06b6f4]' : ''}
                        onClick={() => handleSwitch(locale.value)}
                    >
                        {locale.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
