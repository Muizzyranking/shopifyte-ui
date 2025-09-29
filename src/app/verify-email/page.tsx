"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmailVerificationPage from "./EmailVerificationPage";

export default function EmailVerification() {
  const searchParams = useSearchParams();
  const [verificationState, setVerificationState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setVerificationState("error");
      setErrorMessage("Invalid verification link. Token is missing.");
      return;
    }
    const verifyEmail = async (token: string) => {
      try {
        const response = await fetch("/api/verify-email/", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setVerificationState("success");
        } else {
          const errorData = await response.json();
          setVerificationState("error");
          setErrorMessage(errorData.message || "Email verification failed. Please try again.");
        }
      } catch (_) {
        setVerificationState("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    };
    if (tokenParam) {
      verifyEmail(tokenParam);
    } else {
      setVerificationState("error");
      setErrorMessage("Invalid verification link. Token is missing.");
    }
  }, [searchParams]);

  return <EmailVerificationPage state={verificationState} errorMessage={errorMessage} />;
}
