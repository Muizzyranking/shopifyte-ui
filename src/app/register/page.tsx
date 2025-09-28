"use client";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export default function RegisterationPage() {
  const router = useRouter();
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RegisterForm
          onSuccess={(e) => {
            router.push(
              `/registeration-success?${new URLSearchParams({ email: e.email }).toString()}`,
            );
          }}
        />
      </div>
    </div>
  );
}
