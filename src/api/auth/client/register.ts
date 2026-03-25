
import { IRole } from "@/src/@types/common";
import { apiClient } from "@/src/utils/fetch/api-client";

export interface IRegisterResponse {
    token: string;
    company_id: number;
    step: string;
    roles: IRole[];
};

export interface IRegisterRequest {
    company_name: string;
    cr_number: number;
    tga_number: number;
    main_branch: string;
    bank_id?: number;
    vat_number?: number
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    iban_number?: string;
    phone_number: string;
    phone_country_code: string;
    termsAndConditions?: boolean;
    iban_letter: string;
};

export async function register(
    data: any
): Promise<IRegisterResponse> {
    const formData = new FormData();

    const scalarFields: [string, any][] = [
        ['first_name', data.first_name],
        ['last_name', data.last_name],
        ['email', data.email],
        ['password', data.password],
        ['password_confirmation', data.password_confirmation],
        ['phone_number', Number(data.phone_number)],
        ['phone_country_code', data.phone_country_code],
        ['company_name', data.company_name],
        ['main_branch', data.main_branch],
        ['cr_number', data.cr_number],
        ['tga_number', data.tga_number],
        ['vat_number', data.vat_number],
        ['bank_id', Number(data.bank_id)],
        ['iban_number', data.iban_number],
        ['source', 'web'],
    ];

    scalarFields.forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    const ibanFile = Array.isArray(data.iban_letter) ? data.iban_letter[0] : data.iban_letter;
    if (ibanFile) {
        formData.append('iban_letter', ibanFile);
    }

    const response = await apiClient.post('renter/register', {
        body: formData,
    }).json<IRegisterResponse>();

    return response;
};