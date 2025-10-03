"use client";
import { useId } from "react";
import { FormAlert } from "@/components/FormAlert";
import { FormField } from "@/components/FormField";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { SubmitButton } from "@/components/ui/submit-button";
import { useAuth } from "@/context/authContext";
import { useLoginForm } from "@/hooks/useLoginForm";
import { cn } from "@/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const emailId = useId();
  const passwordId = useId();
  const auth = useAuth();
  const { formData, isSubmitting, errorMessage, handleInputChange, handleSubmit, clearError } =
    useLoginForm((_, data) => {
      auth?.login(data?.user);
    });

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <SocialLoginButton />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormAlert message={errorMessage} type="error" onClose={clearError} />
        <div className="space-y-4">
          <FormField
            id={emailId}
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => {}}
            errors={[]}
            hasSuccess={false}
            disabled={isSubmitting}
            required
          />
          <FormField
            id={passwordId}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={() => {}}
            errors={[]}
            hasSuccess={false}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <a
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        <SubmitButton
          isLoading={isSubmitting}
          loadingText="Signing in..."
          text="Sign In"
          className="w-full"
        />
      </form>

      <PrivacyPolicy />
    </div>
  );
}
