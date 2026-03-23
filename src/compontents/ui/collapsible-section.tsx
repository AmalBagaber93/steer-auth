import { cn } from "@/src/utils/utils";
import { ChevronDown } from "lucide-react";

export default function CollapsibleSection({
    icon,
    title,
    open,
    onToggle,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <section className="border border-slate-100 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-base font-semibold text-slate-800">{title}</span>
                </div>
                <ChevronDown
                    className={cn(
                        'w-5 h-5 text-slate-400 transition-transform duration-300',
                        open && 'rotate-180'
                    )}
                />
            </button>
            <div
                className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
            >
                <div className="overflow-hidden">
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}