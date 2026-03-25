import { OpenSection } from '../complete-registration-screen';
import CollapsibleSection from '@/src/compontents/ui/collapsible-section';
import { Building2 } from 'lucide-react';
import { InputController } from '@/src/compontents/common/controllers/input-controller';
import { useTranslations } from 'next-intl';
import PhoneFieldController from '@/src/compontents/common/controllers/phone-field-controller';

interface EntityInfoProps {
    openSection: OpenSection;
    toggle: (s: Exclude<OpenSection, null>) => void
}

const EntityInfo = ({ openSection, toggle }: EntityInfoProps) => {
    const t = useTranslations();
    return (
        <CollapsibleSection
            icon={<Building2 className="w-5 h-5 text-[#06b6f4]" />}
            title={t('auth.complete_registration.entity_info')}
            open={openSection === 'entity'}
            onToggle={() => toggle('entity')}
        >
            <InputController
                name="name"
                label={t('auth.complete_registration.fields.company_name')}
                placeholder={t('auth.complete_registration.fields.company_name')}
            />
            <InputController
                name="main_branch"
                label={t('auth.complete_registration.fields.main_branch')}
                placeholder={t('auth.complete_registration.fields.main_branch')}
            />
            <div className="sm:col-span-2">
                <PhoneFieldController
                    phoneNumberName="phone_number"
                    countryCodeName="phone_country_code"
                    label={t('auth.complete_registration.fields.phone')}
                    placeholder="5xxxxxxxx"
                />
            </div>
            <InputController
                name="cr_number"
                label={t('auth.complete_registration.fields.cr_number')}
                placeholder="1010..."
            />
            <InputController
                name="tga_number"
                label={t('auth.complete_registration.fields.tga_number')}
                placeholder="1234..."
                optional
            />
            <InputController
                name="vat_number"
                label={t('auth.complete_registration.fields.vat_number')}
                placeholder="3000..."
            />
        </CollapsibleSection>

    )
}

export default EntityInfo
