import { z } from 'zod';

export const RegisterSchema = (t: any) =>
  z.object({
    phone_number: z
      .string()
      .min(6, t('phone_number.len'))
      .nonempty(t('phone_number.required')),
    phone_country_code: z.any().optional(),
    company_name: z
      .string()
      .nonempty(t('company_name.required')),
    cr_number: z
      .string()
      .refine((val) => val?.toString()?.length === 10, t('cr_number.len'))
      .nonempty(t('cr_number.required')),
    tga_number: z
      .string()
      .refine((val) => val?.toString()?.length === 10, t('tga_number.len')),
    main_branch: z
      .string()
      .nonempty(t('main_branch.required')),
    bank_id: z
      .string()
      .nonempty(t('bank_name.required')),
    vat_number: z
      .string()
      .refine((val) => val?.toString()?.length === 15, t('vat_number.len'))
      .nonempty(t('vat_number.required')),
    first_name: z
      .string()
      .nonempty(t('first_name.required')),
    last_name: z
      .string()
      .nonempty(t('last_name.required')),
    email: z.string().email().nonempty(t('email.required')),
    password: z
      .string()
      .min(8, t('password.min'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        t('password.matches')
      )
      .nonempty(t('password.required')),
    password_confirmation: z.string({
      message: t('errors.passwords_mismatch'),
    }),
    iban_number: z
      .string()
      .regex(/^SA\d{22}$/, t('iban_number.matches'))
      .nonempty(t('iban_number.required'))
      .nullable(),
    termsAndConditions: z.boolean().refine((val) => val === true, t('terms_and_conditions.required')),
    iban_letter: z
      .any()
      .refine((file) => file && file.length > 0, {
        message: t('iban_letter.required'),
      }),
  }).refine(data => data.password === data.password_confirmation, {
    message: t('validation.errors.passwords_mismatch'),
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<ReturnType<typeof RegisterSchema>>;
