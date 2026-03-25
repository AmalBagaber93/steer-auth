import { InputController } from '@/src/compontents/common/controllers/input-controller'
import { useTranslations } from 'next-intl';

const CompanyInfo = () => {
    const t = useTranslations("Auth");

    return (
        <>
            <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                    {t("company_info")}
                </h3>
                <p className="text-sm text-slate-500">
                    {t("company_info_desc")}
                </p>
            </div>
            <InputController
                name="company_name"
                label={t("company_name.label")}
                placeholder={t("company_name.placeholder")}
            />
            <InputController
                name="main_branch"
                label={t("main_branch.label")}
                placeholder={t("main_branch.placeholder")}
            />
            <InputController
                name="cr_number"
                label={t("cr_number.label")}
                placeholder={t("cr_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
            />
            <InputController
                name="tga_number"
                label={t("tga_number.label")}
                placeholder={t("tga_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
            />
            <InputController
                name="vat_number"
                label={t("vat_number.label")}
                placeholder={t("vat_number.placeholder")}
                type="number"
                formatter={(val) => (val === "0" ? "" : val)}
            />
        </>
    )
}

export default CompanyInfo 
