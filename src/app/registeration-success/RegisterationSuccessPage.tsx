"use client";

import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RegistrationSuccessProps {
  email?: string;
  className?: string;
}

export default function RegistrationSuccessPage({
  email,
  className,
  ...props
}: RegistrationSuccessProps) {
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
            Account Created Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Welcome to Shopwise</p>
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
                We've sent a verification email to{" "}
                {email ? (
                  <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                ) : (
                  "your email address"
                )}
                . Please click the verification link in the email to activate your account.
              </p>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Didn't receive the email?</strong> Check your spam folder or contact
                  support if you need help.
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
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            You can sign in once your email is verified
          </p>
        </div>
      </div>
    </div>
  );
}
