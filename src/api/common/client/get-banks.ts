import { apiClient } from "@/src/utils/fetch/api-client";

export interface IGetBanksResponse {
  data: {
    id: number,
    name: string,
  }[]
}

export async function getBanks(): Promise<IGetBanksResponse> {
  return apiClient.get('renter/banks').json<IGetBanksResponse>();
}
