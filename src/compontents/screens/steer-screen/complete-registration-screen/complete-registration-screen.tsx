'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileQuery } from '@/src/api/renter/hooks/queries/use-profile.query';
import { useBanksQuery } from '@/src/api/common/hooks/queries/use-banks.query';
import { Loader2 } from 'lucide-react';
import { IProfile } from '@/src/api/renter/client/get-profile';
import { useCompleteRegistrationMutation } from '@/src/api/auth/hooks/mutations/use-complete-registration.mutation';
import {
    CompleteRegistrationSchema,
    CompleteRegistrationFormValues,
} from './complete-registration-schema';
import BankInfo from './compontents/bank-info';
import Documents from './compontents/documents';
import EntityInfo from './compontents/entity-info';

export type OpenSection = 'entity' | 'bank' | 'docs' | null;

function calcCompletion(p: IProfile) {
    const fields: (string | null | undefined | object)[] = [
        p.name, p.phone_number, p.main_branch, p.cr_number,
        p.tga_number, p.vat_number, p.bank, p.iban_number,
        p.iban_letter, p.logo, p.cr_attachment, p.tga_license, p.vat_certificate,
    ];
    const filled = fields.filter(Boolean).length;
    return { filled, total: fields.length, percentage: Math.round((filled / fields.length) * 100) };
}

export default function CompleteRegistrationScreen() {
    const t = useTranslations();
    const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();
    const { data: banksData, isLoading: isBanksLoading } = useBanksQuery();
    const isLoading = isProfileLoading || isBanksLoading;
    const profile = profileData?.data;

    const methods = useForm<CompleteRegistrationFormValues>({
        resolver: zodResolver(CompleteRegistrationSchema),
        defaultValues: {
            name: '', phone_number: '', phone_country_code: 'SA',
            main_branch: '', cr_number: '', tga_number: '', vat_number: '',
            bank_id: '', iban_number: '', iban_letter: [],
            logo: [], cr_attachment: [], tga_license: [], vat_certificate: [],
        },
    });

    const { handleSubmit, setError } = methods;

    const { mutate: submitRegistration, isPending } = useCompleteRegistrationMutation({ setError });

    const [openSection, setOpenSection] = useState<OpenSection>('entity');

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
            bank_id: profile.bank?.id ? String(profile.bank.id) : '',
            iban_number: profile.iban_number ?? '',
            iban_letter: profile.iban_letter ? [profile.iban_letter] : [], logo: [], cr_attachment: [], tga_license: [], vat_certificate: [],
        });
    }, [profile, banksData]);

    const completion = profile ? calcCompletion(profile) : { filled: 0, total: 13, percentage: 0 };

    const toggle = (s: Exclude<OpenSection, null>) =>
        setOpenSection((prev) => (prev === s ? null : s));

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#06b6f4]" />
            </div>
        );
    }

    const onSubmit = (data: CompleteRegistrationFormValues) => {
        submitRegistration(data);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8">

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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">


                        <EntityInfo openSection={openSection} toggle={toggle} />

                        <BankInfo banksData={banksData?.data} openSection={openSection} toggle={toggle} />


                        <Documents openSection={openSection} toggle={toggle} />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#06b6f4] text-white font-semibold h-11 rounded-lg hover:bg-[#05a5dc] transition-all flex items-center justify-center mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                t('auth.complete_registration.submit')
                            )}
                        </button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
