"use client";
import { AlertCircle, ArrowRight, CheckCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmailVerificationProps {
  state: "loading" | "success" | "error";
  errorMessage?: string;
  className?: string;
}

export default function EmailVerificationPage({
  state,
  errorMessage = "",
  className,
  ...props
}: EmailVerificationProps) {
  const getIcon = () => {
    switch (state) {
      case "loading":
        return <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />;
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />;
    }
  };

  const getIconBg = () => {
    switch (state) {
      case "loading":
        return "bg-blue-100 dark:bg-blue-900";
      case "success":
        return "bg-green-100 dark:bg-green-900";
      case "error":
        return "bg-red-100 dark:bg-red-900";
    }
  };

  const getTitle = () => {
    switch (state) {
      case "loading":
        return "Verifying Your Email...";
      case "success":
        return "Email Verified Successfully!";
      case "error":
        return "Verification Failed";
    }
  };

  const getDescription = () => {
    switch (state) {
      case "loading":
        return "Please wait while we verify your email address.";
      case "success":
        return "Your email has been successfully verified. You can now sign in to your account.";
      case "error":
        return "We encountered an issue while verifying your email address.";
    }
  };

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
          <div
            className={cn(
              "mx-auto flex items-center justify-center h-16 w-16 rounded-full",
              getIconBg(),
            )}
          >
            {getIcon()}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {getTitle()}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{getDescription()}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              {state === "loading" && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Processing verification
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    We're confirming your email address. This should only take a moment.
                  </p>
                </>
              )}

              {state === "success" && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Welcome to Shopwise!
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Your email address has been verified and your account is now active. You can
                    start using all features of Shopwise.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Account activated!</strong> You can now sign in with your credentials.
                    </p>
                  </div>
                </>
              )}

              {state === "error" && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Verification unsuccessful
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {errorMessage || "The verification link may have expired or been used already."}
                  </p>
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Need help?</strong> Contact our support team or try registering again.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {state === "success" && (
            <Button className="w-full" asChild>
              <a href="/login">
                Sign In to Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}

          {state === "error" && (
            <>
              <Button className="w-full" variant="outline" asChild>
                <a href="/resend-verification">
                  Resend Verification email
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/support">
                  Contact Support
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </>
          )}

          {state === "loading" && (
            <Button className="w-full" variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </Button>
          )}

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            {state === "success"
              ? "Your account is ready to use"
              : state === "error"
                ? "Having trouble? We're here to help"
                : "This process is automatic"}
          </p>
        </div>
      </div>
    </div>
  );
}
