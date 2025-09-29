"use client";
import { useId } from "react";
import { FormField } from "@/components/FormField";
import { PasswordField } from "@/components/PasswordField";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { SubmitButton } from "@/components/ui/submit-button";
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
    <div className={cn("space-y-6", className)} {...props}>
      <SocialLoginButton signIn={true} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            id={emailId}
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
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
            placeholder="Choose a unique username"
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
              placeholder="Enter your first name"
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
              placeholder="Enter your last name"
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
            placeholder="Enter your phone number"
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

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Creating Account..."
          text="Create Account"
          className="w-full"
        />
      </form>

      <PrivacyPolicy />
    </div>
  );
}
