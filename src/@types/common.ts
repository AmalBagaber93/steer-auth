
export interface IUserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    permissions: IRole[];
    phone_number: string;
    phone_country_code: string;
    formatted_phone_number: string;
    step: string;
    token: string;
    company: {
        id: number;
        name: string;
        logo: IFileType;
        is_tajeer_linked: boolean;
    };

};

export interface IRole {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
    permissions: IPermission[];
};

export interface IPermission {
    id: number;
    name: string;
    subject: string;
    action: string;
};

export interface IFileType {
    uuid: string;
    name: string;
    file_size?: number;
    file_name: string;
    mime_type: string;
    url: string;
};

export interface IOptionType {
    id?: number | string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    slug?: string;
    code?: string;
    key?: string;
};

export interface IPhone {
    code: string;
    label: string;
    phone: string;
};

export interface ICountry {
    label: string;
    label_ar: string;
    code: string;
    dial_code: string;
    mobile_starts_with?: string[];
    phone_number_lengths?: number[];
};

export interface IUserMetaData {
  total_count: number;
  renRequest_count: number;
  contract_extension_count: number;
  contract_early_return_count: number;
  upcoming_renRequest_count: number;
};