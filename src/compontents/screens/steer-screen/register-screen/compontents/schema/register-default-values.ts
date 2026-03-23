
import { IFileType } from '@/src/@types/common';

export const registerDefaultValues = () => {
  return {
    phone_number: '',
    phone_country_code: 'SA',
    company_name: '',
    cr_number: '',
    tga_number: '',
    main_branch: '',
    bank_id: '',
    vat_number: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    iban_number: '',
    termsAndConditions: false,
    iban_letter: [] as IFileType[],
  };
};

