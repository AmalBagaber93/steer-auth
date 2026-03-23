import ky, { BeforeRequestHook } from "ky"
import merge from "lodash/merge"
import { kyConfigs } from "./config"
import Cookies from "js-cookie"
import useAuthState from "@/store/auth/useAuthState";


const cookieInterceptor: BeforeRequestHook = async (request) => {
    const state = useAuthState.getState();


    const token = Cookies.get("token") || state.token;
    const company = Cookies.get("company") || state.company_id;
    const locale = Cookies.get("NEXT_LOCALE");

    if (token && company) {
        request.headers.set("Authorization", `Bearer ${token}`);
        request.headers.set("X-Company", company.toString());
    }

    if (locale) {
        request.headers.set("X-Locale", locale);
    }

    request.headers.set("Accept", "application/json, text/plain, */*");
};


export const apiClient = ky.create({
    ...kyConfigs,
    throwHttpErrors: false,
    hooks: {
        ...kyConfigs.hooks,
        beforeRequest: [cookieInterceptor],
    },
})


