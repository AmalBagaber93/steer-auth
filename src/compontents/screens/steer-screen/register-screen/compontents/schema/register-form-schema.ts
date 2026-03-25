import { z } from 'zod';

export const RegisterSchema = (t: any) =>
  z
    .object({
      phone_number: z
        .string()
        .min(1, t('phone_number.required'))
        .min(6, t('phone_number.len')),
      phone_country_code: z.string().optional(),
      company_name: z.string().min(1, t('company_name.required')),
      cr_number: z
        .string()
        .min(1, t('cr_number.required'))
        .refine((val) => val.length === 10, t('cr_number.len')),
      tga_number: z
        .string()
        .min(1, t('tga_number.required'))
        .refine((val) => val.length === 10, t('tga_number.len')),
      main_branch: z.string().min(1, t('main_branch.required')),
      bank_id: z.string().min(1, t('bank_name.required')),
      vat_number: z
        .string()
        .min(1, t('vat_number.required'))
        .refine((val) => val.length === 15, t('vat_number.len')),
      first_name: z.string().min(1, t('first_name.required')),
      last_name: z.string().min(1, t('last_name.required')),
      email: z.string().min(1, t('email.required')).email(),
      password: z
        .string()
        .min(1, t('password.required'))
        .min(8, t('password.min'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
          t('password.matches')
        ),
      password_confirmation: z.string().min(1, t('password_confirmation.required')),
      iban_number: z
        .string()
        .min(1, t('iban_number.required'))
        .regex(/^SA\d{22}$/, t('iban_number.matches')),
      termsAndConditions: z
        .boolean()
        .refine((val) => val === true, t('terms_and_conditions.required')),
      iban_letter: z.any().refine((file) => file && file.length > 0, {
        message: t('iban_letter.required'),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('validation.errors.passwords_mismatch'),
      path: ['password_confirmation'],
    });

export type RegisterSchemaType = z.infer<ReturnType<typeof RegisterSchema>>;
