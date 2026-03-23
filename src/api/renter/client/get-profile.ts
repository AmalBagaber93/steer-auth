import { apiClient } from '@/src/utils/fetch/api-client';
import { IFileType } from '@/src/@types/common';

export interface IProfile {
    id: number;
    name: string;
    logo: IFileType | null;
    cr_number: string;
    tga_number: string;
    vat_number: string;
    iban_number: string;
    main_branch: string;
    phone_number: string;
    phone_country_code: string;
    formatted_phone_number: string;
    operator_id: number | null;
    branches_count: number;
    bank: { id: number; key: string; name: string } | null;
    iban_letter: IFileType | null;
    cr_attachment: IFileType | null;
    tga_license: IFileType | null;
    vat_certificate: IFileType | null;
}

export interface IGetProfileResponse {
    data: IProfile;
}

export async function getProfile(): Promise<IGetProfileResponse> {
    return apiClient.get('renter/profile').json<IGetProfileResponse>();
}
