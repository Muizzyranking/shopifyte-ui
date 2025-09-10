"use client";

import { Check, CheckCircle, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormField } from "./formField";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors: string[];
  disabled?: boolean;
  required?: boolean;
  showRequirements?: boolean;
  originalPassword?: string;
  isConfirmField?: boolean;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p) => /\d/.test(p) },
  { label: "Contains special character", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

interface PasswordRequirementsProps {
  password: string;
  requirements?: PasswordRequirement[];
}

function PasswordRequirements({
  password,
  requirements = passwordRequirements,
}: PasswordRequirementsProps) {
  if (!password) return null;

  const strengthChecks = requirements.map((req) => ({
    ...req,
    met: req.test(password),
  }));

  return (
    <div className="space-y-2 p-3 bg-muted/50 rounded-md">
      <p className="text-sm font-medium text-muted-foreground">Password requirements:</p>
      <div className="space-y-1">
        {strengthChecks.map((req, _) => (
          <div key={`requirement-${req.label}`} className="flex items-center gap-2 text-sm">
            {req.met ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            <span className={cn(req.met ? "text-green-600" : "text-red-600")}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function usePasswordValidation(password: string, requirements = passwordRequirements) {
  const strengthChecks = requirements.map((req) => ({
    ...req,
    met: req.test(password),
  }));

  return strengthChecks.every((req) => req.met);
}

export function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  errors,
  disabled = false,
  required = false,
  showRequirements = false,
  originalPassword,
  isConfirmField = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const allRequirementsMet = usePasswordValidation(value);

  const passwordsMatch = isConfirmField && originalPassword && value && originalPassword === value;
  const hasSuccess = isConfirmField ? passwordsMatch : value && allRequirementsMet;

  return (
    <div className="grid gap-3">
      <FormField
        id={id}
        name={name}
        label={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        errors={errors}
        hasSuccess={Boolean(hasSuccess)}
        disabled={disabled}
        required={required}
      >
        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
          {isConfirmField && passwordsMatch && (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </FormField>

      {showRequirements && <PasswordRequirements password={value} />}

      {isConfirmField && value && (
        <div className="flex items-center gap-2 text-sm">
          {passwordsMatch ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-600">Passwords match</span>
            </>
          ) : (
            <>
              <X className="h-4 w-4 text-red-500" />
              <span className="text-red-600">Passwords do not match</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
