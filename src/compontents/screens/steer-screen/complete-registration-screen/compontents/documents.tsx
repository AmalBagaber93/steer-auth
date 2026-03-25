import { UploadController } from '@/src/compontents/common/controllers/upload-controller'
import CollapsibleSection from '@/src/compontents/ui/collapsible-section'
import { FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { OpenSection } from '../complete-registration-screen'

interface DocumentsProps {
    openSection: OpenSection;
    toggle: (s: Exclude<OpenSection, null>) => void
}

const Documents = ({ openSection, toggle }: DocumentsProps) => {
    const t = useTranslations();

    return (
        <CollapsibleSection
            icon={<FileText className="w-5 h-5 text-[#06b6f4]" />}
            title={t('auth.complete_registration.upload_title')}
            open={openSection === 'docs'}
            onToggle={() => toggle('docs')}
        >
            <UploadController
                name="logo"
                label={t('auth.complete_registration.fields.logo')}
                accept="image/jpeg,image/png"
            />

            <UploadController
                name="cr_attachment"
                label={t('auth.complete_registration.fields.cr_attachment')}
                accept="application/pdf"
            />

            <UploadController
                name="tga_license"
                label={t('auth.complete_registration.fields.tga_license')}
                accept="application/pdf"
            />

            <UploadController
                name="vat_certificate"
                label={t('auth.complete_registration.fields.vat_certificate')}
                accept="application/pdf"
            />
        </CollapsibleSection>
    )
}

export default Documents
