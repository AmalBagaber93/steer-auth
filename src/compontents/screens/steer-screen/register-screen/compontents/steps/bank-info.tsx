import { IGetBanksResponse } from '@/src/api/common/client/get-banks';
import { InputController } from '@/src/compontents/common/controllers/input-controller'
import { SelectController } from '@/src/compontents/common/controllers/select-controller'
import { UploadController } from '@/src/compontents/common/controllers/upload-controller'
import { useTranslations } from 'next-intl';

interface BankInfoProps {
    banks?: IGetBanksResponse['data'];
}

const BankInfo = ({ banks }: BankInfoProps) => {
    const t = useTranslations("Auth");
    return (
        <>
            <div className="md:col-span-2 mt-5">
                <h3 className="text-xl font-bold text-slate-800">
                    {t("bank_info")}
                </h3>
                <p className="text-sm text-slate-500">{t("bank_info_desc")}</p>
            </div>
            <SelectController
                name="bank_id"
                label={t("bank_name.label")}
                placeholder={t("bank_name.placeholder")}
                options={
                    banks?.map((bank) => ({
                        value: bank.id.toString(),
                        label: bank.name,
                    })) || []
                }
            />

            <InputController
                name="iban_number"
                label={t("iban_number.label")}
                placeholder={t("iban_number.placeholder")}
            />
            <div className="md:col-span-2">
                <UploadController
                    name="iban_letter"
                    label={t("iban_letter.label")}
                    maxFiles={1}
                    accept="application/pdf"
                />
            </div>
        </>
    )
}

export default BankInfo
