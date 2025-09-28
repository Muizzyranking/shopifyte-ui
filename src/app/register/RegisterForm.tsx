"use client";

import { useId } from "react";
import { FormField } from "@/components/FormField";
import { PasswordField } from "@/components/PasswordField";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useRegistrationForm } from "@/hooks/useRegisteration";
import { cn } from "@/lib/utils";
import type { RegisterData } from "@/types/auth";

interface NewSignupFormProps {
  onSuccess?: (data: RegisterData) => void;
  className?: string;
}

export function RegisterForm({ onSuccess, className, ...props }: NewSignupFormProps) {
  const emailId = useId();
  const usernameId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const phoneNumberId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    getFieldSuccess,
  } = useRegistrationForm(onSuccess);

  return (
    <div className={cn("w-full max-w-md space-y-8", className)} {...props}>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <SocialLoginButton signIn={true} />

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            id={emailId}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("email")}
            hasSuccess={getFieldSuccess("email")}
            disabled={isSubmitting}
            required
          />

          {/* Username Field */}
          <FormField
            id={usernameId}
            name="username"
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("username")}
            hasSuccess={getFieldSuccess("username")}
            disabled={isSubmitting}
            required
          />

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id={firstNameId}
              name="firstName"
              label="First Name"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={getFieldError("firstName")}
              hasSuccess={getFieldSuccess("firstName")}
              disabled={isSubmitting}
              required
            />
            <FormField
              id={lastNameId}
              name="lastName"
              label="Last Name"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={getFieldError("lastName")}
              hasSuccess={getFieldSuccess("lastName")}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Phone Field */}
          <FormField
            id={phoneNumberId}
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("phoneNumber")}
            hasSuccess={getFieldSuccess("phoneNumber")}
            disabled={isSubmitting}
            required
          />

          {/* Password Field */}
          <PasswordField
            id={passwordId}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("password")}
            hasSuccess={getFieldSuccess("password")}
            disabled={isSubmitting}
            showRequirements={true}
            required
          />

          {/* Confirm Password Field */}
          <PasswordField
            id={confirmPasswordId}
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("confirmPassword")}
            hasSuccess={getFieldSuccess("confirmPassword")}
            disabled={isSubmitting}
            originalPassword={formData.password}
            isConfirmField={true}
            required
          />
        </div>

        <div>
          <SubmitButton
            isLoading={isSubmitting}
            loadingText="Creating Account..."
            text="Create Account"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </form>

      <div className="text-sm text-center">
        <span className="text-muted-foreground">Already have an account? </span>
        <a
          className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
          href="/login"
        >
          Login
        </a>
      </div>
      <PrivacyPolicy />
    </div>
  );
}
