import { apiClient } from "@/src/utils/fetch/api-client";



export interface IGetCountriesResponse {
  data: {
    id: number,
    name: string,
    code: string
}[]
}

export async function getCountries(): Promise<IGetCountriesResponse> {
  return apiClient.get('renter/countries').json<IGetCountriesResponse>();
}
