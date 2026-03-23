
import { IOptionType, IPhone, IRole } from "@/src/@types/common";
import { apiClient } from "@/src/utils/fetch/api-client";

export interface ICompleteRegistrationResponse {
    token: string;
    company_id: number;
    step: string;
    roles: IRole[];
};

export interface ICompleteRegistrationRequest {
    iban_letter: string,
    vat_certificate: string,
    tga_license: string,
    cr_attachment: string,
    logo:string
    phone_country_code: string
    phone_number: string,
    bank_id: number,

};

export async function completeRegistration(
    data: any
): Promise<ICompleteRegistrationResponse> {

    const response = await apiClient.post('renter/profile', {
        body: data,
    }).json<ICompleteRegistrationResponse>();

    return response;
};