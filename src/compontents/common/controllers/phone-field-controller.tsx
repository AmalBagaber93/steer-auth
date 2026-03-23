'use client';

import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { COUNTRIES } from '@/constants/countries';
import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { InputController } from './input-controller';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../../ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/src/utils/utils';
import { FormField, FormItem, FormMessage } from '../../ui/form';

interface PhoneFieldControllerProps<TFormValues extends FieldValues> {
    phoneNumberName: Path<TFormValues>;
    countryCodeName: Path<TFormValues>;
    label?: string;
    placeholder?: string;
}

export function PhoneFieldController<TFormValues extends FieldValues>({
    phoneNumberName,
    countryCodeName,
    label,
    placeholder,
}: PhoneFieldControllerProps<TFormValues>) {
    const params = useParams();
    const locale = (params?.locale as string) ?? 'en';
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const { control } = useFormContext<TFormValues>();

    return (
        <div className="flex w-full items-start rtl:flex-row-reverse">

            <FormField
                control={control}
                name={countryCodeName}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    const selected = COUNTRIES.find(c => c.code === (value || 'SA'));
                    return (
                        <FormItem className="shrink-0">
                            {label && (
                               <p className="text-sm">{label}</p>
                            )}
                            <DropdownMenu
                                open={open}
                                onOpenChange={(isOpen) => {
                                    setOpen(isOpen);
                                    if (!isOpen) setSearch('');
                                    else setTimeout(() => searchRef.current?.focus(), 50);
                                }}
                            >
                                <DropdownMenuTrigger
                                    className={cn(
                                        'flex h-10 w-[105px] items-center justify-between gap-1 rounded-md border border-input bg-background px-3 text-sm text-gray-800 shadow-sm',
                                        'ltr:rounded-r-none rtl:rounded-l-none',
                                        'focus:outline-none focus:ring-2 focus:ring-ring',
                                        error && 'border-destructive',
                                    )}
                                >
                                    <span className="font-medium">+{selected?.dial_code ?? '966'}</span>
                                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" className="w-72 bg-white p-0">
                                    {/* Search input */}
                                    <div className="sticky top-0 z-10 border-b border-border bg-white px-2 py-2">
                                        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5 text-sm">
                                            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                            <input
                                                ref={searchRef}
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                                placeholder={locale === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
                                                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                                onKeyDown={e => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                    {/* Country list */}
                                    <div className="max-h-56 overflow-y-auto">
                                        {(() => {
                                            const q = search.trim().toLowerCase();
                                            const filtered = q
                                                ? COUNTRIES.filter(c =>
                                                    c.name.toLowerCase().includes(q) ||
                                                    c.name_ar.includes(q) ||
                                                    c.dial_code.includes(q)
                                                )
                                                : COUNTRIES;
                                            return filtered.length > 0 ? (
                                                filtered.map(c => (
                                                    <DropdownMenuItem
                                                        key={c.code}
                                                        onClick={() => {
                                                            onChange(c.code);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground">
                                                            +{c.dial_code}
                                                        </span>
                                                        <span className="truncate text-sm">
                                                            {locale === 'ar' ? c.name_ar : c.name}
                                                        </span>
                                                    </DropdownMenuItem>
                                                ))
                                            ) : (
                                                <p className="py-6 text-center text-sm text-muted-foreground">
                                                    {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                                                </p>
                                            );
                                        })()}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <FormMessage className="mt-0.5 ltr:text-left rtl:text-right" />
                        </FormItem>
                    );
                }}
            />

            <InputController
                dir="ltr"
                name={phoneNumberName}
                placeholder={placeholder}
                inputClassName="ltr:rounded-l-none rtl:rounded-r-none"
                formItemClassName="flex-grow mt-5 "
            />
        </div>
    );
}

export default PhoneFieldController;
