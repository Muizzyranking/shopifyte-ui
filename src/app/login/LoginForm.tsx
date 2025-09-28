"use client";

import { useId } from "react";
import { FormField } from "@/components/FormField";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useLoginForm } from "@/hooks/useLoginForm";
import { cn } from "@/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const emailId = useId();
  const passwordId = useId();
  const { formData, isSubmitting, handleInputChange, handleSubmit } = useLoginForm();
  return (
    <div className={cn("w-full max-w-md space-y-8", className)} {...props}>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          Welcome back
        </h2>
      </div>

      <SocialLoginButton />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="">
          <FormField
            id={emailId}
            name="email"
            label="Email address"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => {}}
            errors={[]}
            hasSuccess={false}
            disabled={isSubmitting}
            showLabel={false}
            inputClassName="rounded-t-lg py-4"
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
            showLabel={false}
            inputClassName="rounded-b-lg py-4"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a
              className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
              href="/forgot-password"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <SubmitButton
            isLoading={isSubmitting}
            loadingText="Logging in..."
            text="Login"
            className="w-full"
          />
        </div>
      </form>

      <div className="text-sm text-center">
        <span className="text-muted-foreground">Don't have an account? </span>
        <a
          className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
          href="/register"
        >
          Sign up
        </a>
      </div>
      <PrivacyPolicy />
    </div>
  );
}
