import { CheckboxFieldController } from '@/src/compontents/common/controllers/checkbox-field-controller'
import { PasswordFieldController } from '@/src/compontents/common/controllers/password-field-controller'
import { useTranslations } from 'next-intl';

const Security = () => {
    const t = useTranslations("Auth");
    return (
        <>
            <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                    {t("security")}
                </h3>
                <p className="text-sm text-slate-500">{t("security_desc")}</p>
            </div>
            <PasswordFieldController
                name="password"
                label={t("password.label")}
                placeholder={t("password.placeholder")}
            />
            <PasswordFieldController
                name="password_confirmation"
                label={t("password_confirmation.label")}
                placeholder={t("password_confirmation.placeholder")}
            />
            <div className="md:col-span-2">
                <CheckboxFieldController
                    name="termsAndConditions"
                    label={t("terms_and_conditions.label")}
                />
            </div>
        </>
    )
}

export default Security
