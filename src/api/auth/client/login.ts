
import { IRole } from "@/src/@types/common";
import { apiClient } from "@/src/utils/fetch/api-client";

export interface ILoginRequest {
    email: string;
    password: string;
    source?: string;
}
export interface ILoginData {
    token: string;
    type: string;
    company_id: number;
    step: string;
    roles: IRole[];
}

export interface ILoginResponse {
    data: ILoginData;
}

export async function login(data: ILoginRequest): Promise<ILoginResponse> {
    return apiClient.post('auth/login', {
        json: {
            ...data,
            source: 'web'
        }
    }).json<ILoginResponse>();
}
