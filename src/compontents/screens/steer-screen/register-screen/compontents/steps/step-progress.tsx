import { cn } from '@/src/utils/utils';
import { LucideProps } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface StepProgressProps {
    STEPS: {
        id: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[];
    currentStep: number
}

const StepProgress = ({ STEPS, currentStep }: StepProgressProps) => {
    const t = useTranslations("Auth");

    return (
        <div className="mb-1 px-5">
            <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                    style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                />

                {STEPS.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div
                            key={step.id}
                            className="relative z-10 flex flex-col items-center"
                        >
                            <div
                                className={cn(
                                    "sm:w-10 w-8 sm:h-10 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isActive
                                        ? "bg-white border-blue-500 text-blue-500 shadow-md scale-110"
                                        : isCompleted
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "bg-white border-slate-200 text-slate-400",
                                )}
                            >
                                <StepIcon size={18} />
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] sm:text-xs font-medium mt-2  absolute sm:-bottom-6 -bottom-8 sm:whitespace-nowrap  transition-colors duration-300",
                                    isActive
                                        ? "text-blue-600"
                                        : isCompleted
                                            ? "text-slate-600"
                                            : "text-slate-400",
                                )}
                            >
                                {t(`${step.id}_info`)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default StepProgress
