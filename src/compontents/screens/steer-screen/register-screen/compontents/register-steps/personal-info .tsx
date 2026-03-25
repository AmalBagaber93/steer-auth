import { InputController } from '@/src/compontents/common/controllers/input-controller'
import PhoneFieldController from '@/src/compontents/common/controllers/phone-field-controller'
import { useTranslations } from 'next-intl';


const PersonalInfo = () => {
    const t = useTranslations("Auth");

    return (
        <>
            <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                    {t("personal_info")}
                </h3>
                <p className="text-sm text-slate-500">
                    {t("personal_info_desc")}
                </p>
            </div>
            <InputController
                name="first_name"
                label={t("first_name.label")}
                placeholder={t("first_name.placeholder")}
            />
            <InputController
                name="last_name"
                label={t("last_name.label")}
                placeholder={t("last_name.placeholder")}
            />
            <InputController
                name="email"
                label={t("email.label")}
                placeholder={t("email.placeholder")}
                type="email"
            />
            <PhoneFieldController
                phoneNumberName="phone_number"
                countryCodeName="phone_country_code"
                label={t("phone_number.label")}
                placeholder={t("phone_number.placeholder")}
            />
        </>
    )
}

export default PersonalInfo 
