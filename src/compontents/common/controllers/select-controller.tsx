"use client";

import { useFormContext, Path, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { cn } from "@/src/utils/utils";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export interface SelectControllerProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: React.ReactNode;
  placeholder?: string;
  formItemClassName?: string;
  optional?: boolean;
  disabled?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function SelectController<TFormValues extends FieldValues>({
  name,
  label,
  placeholder = "Select...",
  formItemClassName,
  optional,
  disabled,
  options,
}: SelectControllerProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();
  const t = useTranslations("common");
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem
          className={cn("group/select-container w-full", formItemClassName)}
        >
          {label && (
            <FormLabel className="mb-1.5 block">
              {label}
              {optional && (
                <span className="text-muted-foreground ms-1">
                  ({t("optional")})
                </span>
              )}
            </FormLabel>
          )}

          <Select
            key={field.value || ''}
            onValueChange={(val) => field.onChange(val)}
            value={field.value ?? ""}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={cn(!!error && "border-destructive", "rounded-md rtl:flex-row-reverse")}>
                <SelectValue placeholder={placeholder}>
                  {options.find((opt) => opt.value === (field.value ?? ""))?.label || undefined}
                </SelectValue>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
