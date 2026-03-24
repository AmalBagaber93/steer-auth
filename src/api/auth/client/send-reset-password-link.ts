import { apiClient } from '@/src/utils/fetch/api-client';

export interface ISendResetPasswordLinkRequest {
  email: string;
}

export interface ISendResetPasswordLinkResponse {
  data: {
    message: string;
  };
}

export async function sendResetPasswordLink(
  data: ISendResetPasswordLinkRequest
): Promise<ISendResetPasswordLinkResponse> {
  return apiClient
    .post('auth/send-reset-password-link', { json: data })
    .json<ISendResetPasswordLinkResponse>();
}
