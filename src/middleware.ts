import createMiddleware from 'next-intl/middleware';
import { routing } from './utils/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);

    // If intl middleware is redirecting (locale detection), let it through
    if (intlResponse.status !== 200) {
        return intlResponse;
    }

    // Inject x-pathname into request headers so server components can read it via headers()
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    const response = NextResponse.next({ request: { headers: requestHeaders } });

    // Preserve any cookies/headers set by intl middleware
    intlResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
    });

    return response;
}

export const config = {
    matcher: ['/', '/(ar|en)/:path*']
};
