'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { useProfileQuery } from '@/src/api/renter/hooks/queries/use-profile.query';
import { useBanksQuery } from '@/src/api/common/hooks/queries/use-banks.query';
import { InputController } from '@/src/compontents/common/controllers/input-controller';
import { PhoneFieldController } from '@/src/compontents/common/controllers/phone-field-controller';
import { SelectController } from '@/src/compontents/common/controllers/select-controller';
import { UploadController } from '@/src/compontents/common/controllers/upload-controller';
import { Loader2, Building2, Landmark, FileText } from 'lucide-react';
import { IProfile } from '@/src/api/renter/client/get-profile';
import CollapsibleSection from '@/src/compontents/ui/collapsible-section';
import { useCompleteRegistrationMutation } from '@/src/api/auth/hooks/mutations/use-complete-registration.mutation';

function calcCompletion(p: IProfile) {
    const fields: (string | null | undefined | object)[] = [
        p.name, p.phone_number, p.main_branch, p.cr_number,
        p.tga_number, p.vat_number, p.bank, p.iban_number,
        p.iban_letter, p.logo, p.cr_attachment, p.tga_license, p.vat_certificate,
    ];
    const filled = fields.filter(Boolean).length;
    return { filled, total: fields.length, percentage: Math.round((filled / fields.length) * 100) };
}


type CompleteRegistrationForm = {
    name: string;
    phone_number: string;
    phone_country_code: string;
    main_branch: string;
    cr_number: string;
    tga_number: string;
    vat_number: string;
    bank_id: number;
    iban_number: string;
    iban_letter: File[];
    logo: File[];
    cr_attachment: File[];
    tga_license: File[];
    vat_certificate: File[];
};

export default function CompleteRegistrationScreen() {
    const t = useTranslations();
    const { data: profileData, isLoading } = useProfileQuery();
    const { data: banksData } = useBanksQuery();
    const profile = profileData?.data;

    const methods = useForm<CompleteRegistrationForm>({
        defaultValues: {
            name: '', phone_number: '', phone_country_code: 'SA',
            main_branch: '', cr_number: '', tga_number: '', vat_number: '',
            bank_id: 0, iban_number: '', iban_letter: [],
            logo: [], cr_attachment: [], tga_license: [], vat_certificate: [],
        },
    });

    const { handleSubmit, setError, trigger } = methods;

    const { mutateAsync: completeRegistration } = useCompleteRegistrationMutation({ setError });

    const [openSection, setOpenSection] = useState<'entity' | 'bank' | 'docs'>('entity');



    useEffect(() => {
        if (!profile) return;
        methods.reset({
            name: profile.name ?? '',
            phone_number: profile.phone_number ?? '',
            phone_country_code: profile.phone_country_code ?? 'SA',
            main_branch: profile.main_branch ?? '',
            cr_number: profile.cr_number ?? '',
            tga_number: profile.tga_number ?? '',
            vat_number: profile.vat_number ?? '',
            bank_id: profile.bank?.id ? profile.bank.id : 0,
            iban_number: profile.iban_number ?? '',
            iban_letter: [], logo: [], cr_attachment: [], tga_license: [], vat_certificate: [],
        });
    }, [profile]);

    const banks = banksData?.data.map((b) => ({ value: String(b.id), label: b.name })) ?? [];
    const completion = profile ? calcCompletion(profile) : { filled: 0, total: 13, percentage: 0 };

    const toggle = (s: 'entity' | 'bank' | 'docs') =>
        setOpenSection((prev) => (prev === s ? ('' as any) : s));

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#06b6f4]" />
            </div>
        );
    }

    const onSubmit = (data: CompleteRegistrationForm) => {
        completeRegistration(data)

    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-6">
                        <Image src="https://gosteer.sa/colored_logo.svg" alt="Steer Logo" width={120} height={40} className="h-10 w-auto" priority />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">
                        {t('auth.complete_registration.title')}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {t('auth.complete_registration.message')}
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-6 bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                            {t('auth.complete_registration.completion')}
                        </span>
                        <span className="text-sm font-bold text-[#06b6f4]">
                            {completion.percentage}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#06b6f4] rounded-full transition-all duration-500"
                            style={{ width: `${completion.percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        {completion.filled} / {completion.total} {t('auth.complete_registration.fields_completed')}
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">

                        {/* Entity Information */}
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

                        {/* Bank Information */}
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
                            {!profile?.iban_letter && (
                                <div className="sm:col-span-2">
                                    <UploadController
                                        name="iban_letter"
                                        label={t('auth.complete_registration.fields.iban_letter')}
                                        accept="application/pdf"
                                    />
                                </div>
                            )}
                        </CollapsibleSection>

                        {/* Required Documents */}
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

                        <button
                            type="submit"
                            className="w-full bg-[#06b6f4] text-white font-semibold h-11 rounded-lg hover:bg-[#05a5dc] transition-all flex items-center justify-center mt-2"
                        >
                            {t('auth.complete_registration.submit')}
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
