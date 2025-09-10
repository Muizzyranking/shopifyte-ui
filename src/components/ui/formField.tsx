"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  errors,
  hasSuccess,
  disabled,
  required,
  children,
  className,
}: FormFieldProps) {
  const hasError = errors && errors.length > 0;

  return (
    <div className={cn("grid gap-3", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            hasError && "border-red-500 focus-visible:ring-red-500",
            hasSuccess && "border-green-500",
          )}
          required={required}
        />
        {hasSuccess && !children && (
          <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
        )}
        {children}
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          hasError ? "max-h-32 mt-2" : "max-h-0 mt-0",
        )}
      >
        {hasError && (
          <div className="space-y-1">
            {errors.map((error, _) => (
              <p key={`${name}-${error}`} className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3 flex-shrink-0" />
                <span>{error}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
