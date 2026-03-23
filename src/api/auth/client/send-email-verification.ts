import { apiClient } from "@/src/utils/fetch/api-client";

export interface ISendEmailVerificationRequest {
  email: string;
}

export interface ISendEmailVerificationResponse {
  data: {
    message: string;
  };
}

export async function sendEmailVerification(
  data: ISendEmailVerificationRequest
): Promise<ISendEmailVerificationResponse> {
  return apiClient
    .post('auth/send-email-verification', { json: data })
    .json<ISendEmailVerificationResponse>();
}
