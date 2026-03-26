import { IGetBanksResponse } from '@/src/api/common/client/get-banks'
import { InputController } from '@/src/compontents/common/controllers/input-controller'
import { SelectController } from '@/src/compontents/common/controllers/select-controller'
import { UploadController } from '@/src/compontents/common/controllers/upload-controller'
import CollapsibleSection from '@/src/compontents/ui/collapsible-section'
import { Landmark } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { OpenSection } from '../complete-registration-screen'
import { IProfile } from '@/src/api/renter/client/get-profile'

interface BankInfoProps {
    banksData?: IGetBanksResponse;
    openSection: OpenSection;
    toggle: (s: Exclude<OpenSection, null>) => void
    profile?: IProfile
}

const BankInfo = ({ banksData, openSection, toggle, profile }: BankInfoProps) => {
    const t = useTranslations();
    const banks = banksData?.data?.map((b) => ({
        value: String(b.id),
        label: b.name,
    })) ?? [];


    return (
        <CollapsibleSection
            icon={<Landmark className="w-5 h-5 text-[#06b6f4]" />}
            title={t('auth.complete_registration.bank_info')}
            open={openSection === 'bank'}
            onToggle={() => toggle('bank')}
        >
            <SelectController
                name="bank_id"
                label={t('auth.complete_registration.fields.bank')}
                placeholder={t('auth.complete_registration.fields.bank')}
                options={banks}

            />
            <InputController
                name="iban_number"
                label={t('auth.complete_registration.fields.iban')}
                placeholder="SA..."
            />

            <div className="sm:col-span-2">
                <UploadController
                    name="iban_letter"
                    label={t('auth.complete_registration.fields.iban_letter')}
                    accept="application/pdf"
                />
            </div>

        </CollapsibleSection>
    )
}

export default BankInfo
