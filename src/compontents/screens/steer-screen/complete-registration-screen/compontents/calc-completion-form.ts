import { CompleteRegistrationFormValues } from "../complete-registration-schema";

export function calcCompletionFromForm(values: CompleteRegistrationFormValues) {
    const fields = [
        values.name,
        values.phone_number,
        values.main_branch,
        values.cr_number,
        values.tga_number,
        values.vat_number,
        values.bank_id,
        values.iban_number,
        values.iban_letter,
        values.logo,
        values.cr_attachment,
        values.tga_license,
        values.vat_certificate,
    ];

    const isFilled = (value: unknown) => {
        if (Array.isArray(value)) return value.length > 0; // للملفات
        return Boolean(value); // للنصوص
    };

    const filled = fields.filter(isFilled).length;

    return {
        filled,
        total: fields.length,
        percentage: Math.round((filled / fields.length) * 100),
    };
}