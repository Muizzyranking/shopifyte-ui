"use client";
import { ArrowRight, CheckCircle, Mail, RefreshCw } from "lucide-react";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResendVerificationPageProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  success: boolean;
  errors: string[];
  className?: string;
}

export default function ResendVerificationPage({
  email,
  onEmailChange,
  onEmailBlur,
  onSubmit,
  isLoading,
  success,
  errors,
  className,
  ...props
}: ResendVerificationPageProps) {
  if (success) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",
          className,
        )}
        {...props}
      >
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Verification Email Sent!
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Check your inbox for the verification link
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Check your email
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  We've sent a new verification email to{" "}
                  <span className="font-medium text-gray-900 dark:text-white">{email}</span>. Please
                  click the verification link in the email to activate your account.
                </p>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Didn't receive the email?</strong> Check your spam folder or wait a few
                    minutes before requesting another one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" variant="outline" asChild>
              <a href="/login">
                Go to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button className="w-full" variant="outline" onClick={() => window.location.reload()}>
              Send Another Email
              <RefreshCw className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              You can sign in once your email is verified
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Resend Verification Email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email address to receive a new verification link
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              errors={errors}
              hasSuccess={false}
              disabled={isLoading}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email || errors.length > 0}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Verification Email
                  <Mail className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Already verified?</strong> You can try signing in to your account directly.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full" variant="outline" asChild>
            <a href="/login">
              Back to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
