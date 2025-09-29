import { Store } from "lucide-react";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <Store className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="hidden font-bold text-xl sm:inline-block">Shopwise</span>
      </Link>
    </div>
  );
}
