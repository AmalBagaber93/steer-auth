import { DEFAULT_REMEMBER_ME } from "@/config";
import { IRole, IUserData } from "@/src/@types/common";
import jsCookie from "js-cookie";
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    step: string;
    company_id: number | null;
    roles: IRole[];
    data?: IUserData;
    authenticate: (token: string, step: string, company_id: number, roles: IRole[]) => void;
    login: (token: string, step: string, company_id: number, roles: IRole[]) => void;
    register: (token: string, step: string, company_id: number, roles: IRole[]) => void;
    logout: () => void;
};

const useAuthState = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    token: null,
    step: '',
    data: undefined,
    company_id: null,
    roles: [],

    authenticate: (token, step, company_id, roles) => {
        set({
            isAuthenticated: true,
            token,
            step,
            company_id,
            roles,
        });
        jsCookie.set('token', token, { expires: DEFAULT_REMEMBER_ME, path: '/' });
        jsCookie.set('company', `${company_id}`, { expires: DEFAULT_REMEMBER_ME, path: '/' });
    },

  login: async (token, step, company_id, roles) => {
    set({
      isAuthenticated: true,
      token: token,
      step: step,
      company_id: company_id,
      roles: roles,
    });
    jsCookie.set('token', token, {
      expires: DEFAULT_REMEMBER_ME,
      path: '/',
    });
    jsCookie.set('company', `${company_id}`, {
      expires: DEFAULT_REMEMBER_ME,
      path: '/',
    });
  },
  register: async (token, step, company_id, roles) => {
    set({
      isAuthenticated: true,
      token: token,
      step: step,
      company_id: company_id,
      roles: roles,
    });
    jsCookie.set('token', token, {
      expires: DEFAULT_REMEMBER_ME,
      path: '/',
    });
    jsCookie.set('company', `${company_id}`, {
      expires: DEFAULT_REMEMBER_ME,
      path: '/',
    });
  },

    logout: () => {

        set({
            isAuthenticated: false,
            token: null,
            step: '',
            company_id: null,
            roles: [],
            data: undefined,
        });

        jsCookie.remove('token');
        jsCookie.remove('company');
        jsCookie.remove('origin');
    },


    getStep: () => get().step,

}));

export default useAuthState;