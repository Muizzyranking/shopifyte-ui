"use client";

import { useSearchParams } from "next/navigation";
import RegistrationSuccessPage from "./RegisterationSuccessPage";

export default function RegisterationSuccess() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return <RegistrationSuccessPage email={email || undefined} />;
}
