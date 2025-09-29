"use client";

import { useEffect, useState } from "react";
import RegistrationSuccessPage from "./RegisterationSuccessPage";

export default function RegisterationSuccess() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const registeredEmail = sessionStorage.getItem("registeredEmail");
    if (registeredEmail) {
      setEmail(registeredEmail);
      sessionStorage.removeItem("registeredEmail");
    }
  });
  return <RegistrationSuccessPage email={email || undefined} />;
}
