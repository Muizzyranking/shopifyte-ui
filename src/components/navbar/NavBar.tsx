"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAvartarMenuItems, menuItems } from "@/config/nav.config";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "@/types/nav.types";
import { AvatarDropdown } from "./AvatarDropdown";
import { CartDropdown } from "./CartDropdown";
import { DesktopNavigation } from "./DesktopNav";
import { MobileNavigation } from "./MobileNav";
import { NavbarLogo } from "./NavbarLogo";

export default function Navbar({ isLoggedIn = false, cartCount = 0, className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const avatarItems = getAvartarMenuItems(isLoggedIn);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavbarLogo />

        <DesktopNavigation menuItems={menuItems} />

        <div className="flex items-center space-x-4">
          <CartDropdown cartCount={cartCount} isOpen={cartOpen} onOpenChange={setCartOpen} />

          <AvatarDropdown isLoggedIn={isLoggedIn} avatarItems={avatarItems} />

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      <MobileNavigation
        menuItems={menuItems}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
