import { z } from 'zod';

export const CompleteRegistrationSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  phone_country_code: z.string(),
  main_branch: z.string().min(1, 'Main branch is required'),
  cr_number: z
    .string()
    .refine((val) => !val || val.length === 10, 'CR number must be 10 digits'),
  tga_number: z
    .string()
    .refine((val) => !val || val.length === 10, 'TGA number must be 10 digits'),
  vat_number: z
    .string()
    .refine((val) => !val || val.length === 15, 'VAT number must be 15 digits'),
  bank_id: z.string(),
  iban_number: z
    .string()
    .refine(
      (val) => !val || /^SA\d{22}$/.test(val),
      'IBAN must start with SA followed by 22 digits'
    ),
  iban_letter: z.any().optional(),
  logo: z.any().optional(),
  cr_attachment: z.any().optional(),
  tga_license: z.any().optional(),
  vat_certificate: z.any().optional(),
});

export type CompleteRegistrationFormValues = z.infer<typeof CompleteRegistrationSchema>;
