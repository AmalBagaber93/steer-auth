import ky, { BeforeRequestHook } from 'ky'
import { cookies } from 'next/headers'
import { getLocale } from 'next-intl/server';
import { kyConfigs } from './config';

const authInterceptor: BeforeRequestHook = async (request) => {
    const token = (await cookies()).get('token')?.value
    const company = (await cookies()).get('company')?.value;
    const newLocale = await getLocale();

    if (token) {
        request.headers.set('Authorization', `Bearer ${token}`)
    }
    if (company) {
        request.headers.set('X-Company', company);
    }

    if (newLocale) {
        request.headers.set('X-Locale', newLocale);
    }

}

export const apiServer = ky.create({
    ...kyConfigs,
    hooks: {
        ...kyConfigs.hooks,
        beforeRequest: [authInterceptor],
    }
})
