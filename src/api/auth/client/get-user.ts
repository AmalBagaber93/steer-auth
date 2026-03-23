import { IUserData, IUserMetaData } from '@/src/@types/common';
import { apiClient } from '@/src/utils/fetch/api-client';

export interface IGetUserResponse {
    data: IUserData;
    meta: IUserMetaData;
}

export async function getUser(): Promise<IGetUserResponse> {
    return apiClient.get('renter/auth').json<IGetUserResponse>();
}
