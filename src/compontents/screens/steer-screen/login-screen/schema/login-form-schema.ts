import { z } from 'zod';


export const loginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('validation.errors.invalid_email_format')),
    password: z.string().min(1, t('validation.errors.password_required')),
    remember: z.boolean().default(false).optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;
