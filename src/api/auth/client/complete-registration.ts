
import { IRole } from "@/src/@types/common";
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
    logo: string
    phone_country_code: string
    phone_number: string,
    bank_id: number,

};

export async function completeRegistration(
    data: any
): Promise<ICompleteRegistrationResponse> {
    const formData = new FormData();
    const iban = data.iban_letter?.[0];

    formData.append('name', data.name ?? '');
    formData.append('phone_number', data.phone_number ?? '');
    formData.append('phone_country_code', data.phone_country_code ?? '');
    formData.append('main_branch', data.main_branch ?? '');
    formData.append('cr_number', data.cr_number ?? '');
    formData.append('tga_number', data.tga_number ?? '');
    formData.append('vat_number', data.vat_number ?? '');
    formData.append('bank_id', data.bank_id ?? '');
    formData.append('iban_number', data.iban_number ?? '');
    formData.append('is_draft', '0');


    if (data.logo?.[0]) formData.append('logo', data.logo[0]);
    if (data.cr_attachment?.[0]) formData.append('cr_attachment', data.cr_attachment[0]);
    if (data.tga_license?.[0]) formData.append('tga_license', data.tga_license[0]);
    if (data.vat_certificate?.[0]) formData.append('vat_certificate', data.vat_certificate[0]);
    if (iban instanceof File) {
        formData.append('iban_letter', iban);
    } else if (iban?.uuid) {
        formData.append('iban_letter_id', iban.uuid);
    }
    formData.append('iban_letter_deleted', '0');
    formData.append('cr_attachment_deleted', '0');
    formData.append('tga_license_deleted', '0');

    return apiClient.post('renter/profile', { body: formData }).json<ICompleteRegistrationResponse>();
};