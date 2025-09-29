"use client";
import { useState } from "react";
import ResendVerificationPage from "./ResendVerificationPage";

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    if (!email) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email address");
    }
    return errors;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validationErrors = validateEmail(e.target.value);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateEmail(email);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setErrors([errorData.message || "Failed to send verification email. Please try again."]);
      }
    } catch (_) {
      setErrors(["Network error. Please check your connection and try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResendVerificationPage
      email={email}
      onEmailChange={handleEmailChange}
      onEmailBlur={handleEmailBlur}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      success={success}
      errors={errors}
    />
  );
}
