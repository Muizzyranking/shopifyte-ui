"use client";
import { Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors?: string[];
  hasSuccess: boolean;
  disabled?: boolean;
  required?: boolean;
  children?: React.ReactNode;
  showLabel?: boolean;
  inputClassName?: string;
  className?: string;
}

export function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  errors = [],
  hasSuccess = false,
  disabled = false,
  required = false,
  children,
  showLabel = true,
  inputClassName,
  className,
}: FormFieldProps) {
  const hasError = errors && errors.length > 0;

  const baseClasses =
    "form-input appearance-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors";

  // rounded-lg and rounded-l-... is not merging properly
  const hasCustomBorderRadius =
    inputClassName &&
    (inputClassName.includes("rounded-") || inputClassName.includes("border-radius-"));

  const merged = cn(
    baseClasses,
    inputClassName,
    !hasCustomBorderRadius && "rounded-lg",
    hasError && "border-red-500 focus:ring-red-500 focus:border-red-500",
    hasSuccess && "border-green-500 focus:ring-green-500 focus:border-green-500",
    disabled && "opacity-50 cursor-not-allowed",
  );
  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <Label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={merged}
        />

        {hasSuccess && !children && (
          <Check className="absolute right-3 top-3 h-5 w-5 text-green-500" />
        )}

        {children}
      </div>

      {hasError && (
        <div className="space-y-1">
          {errors.map((error, _) => (
            <div key={`${name}-${error}`} className="flex items-center gap-2 text-sm text-red-600">
              <X className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
