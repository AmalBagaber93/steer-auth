import { AfterResponseHook, BeforeErrorHook, Options } from "ky";

export const afterResponseInterceptor: AfterResponseHook = async (_input: Request, _options: any, response: Response) => {
    if (response.ok) return;

    const body = await response.clone().json();
    if (body.errors || body.message) {
        throw new Error(JSON.stringify(body));
    }
}

const beforeErrorInterceptor: BeforeErrorHook = async (error) => {
    return error;
};

export const kyConfigs: Options = {
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
    },
    hooks: {
        afterResponse: [afterResponseInterceptor],
        beforeError: [beforeErrorInterceptor],

    },
}