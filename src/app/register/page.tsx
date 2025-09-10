import { GalleryVerticalEnd } from "lucide-react";
import RegistrationForm from "@/components/registerationForm";

export default function RegisterationPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md md:max-w-lg lg:max-w-xl flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Shopifyte
        </a>
        <RegistrationForm />
      </div>
    </div>
  );
}
