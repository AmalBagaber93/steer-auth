import { apiClient } from '@/src/utils/fetch/api-client';

export interface IResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordResponse {
  data: {
    message: string;
  };
}

export async function resetPassword(
  data: IResetPasswordRequest
): Promise<IResetPasswordResponse> {
  return apiClient
    .post('auth/reset-password', { json: data })
    .json<IResetPasswordResponse>();
}
