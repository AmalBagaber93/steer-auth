import { DEFAULT_LOCALE, LOCALES } from '@/config';
import createMiddleware from 'next-intl/middleware';

import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    const handleRouting = createMiddleware({
        locales: LOCALES,
        defaultLocale: DEFAULT_LOCALE,
    });

    request.headers.set('accept-language', '');
    const response = handleRouting(request);

    return response;
}

export const config = {
    matcher: ['/', '/(en|ar)/:path*'],
};
