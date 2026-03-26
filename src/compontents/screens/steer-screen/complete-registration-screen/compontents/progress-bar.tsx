import { useTranslations } from 'next-intl';

interface ProgressBarProps {
    completion: {
        filled: number;
        total: number;
        percentage: number;
    }
}
const ProgressBar = ({ completion }: ProgressBarProps) => {
    const t = useTranslations();

    return (
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
    )
}

export default ProgressBar
