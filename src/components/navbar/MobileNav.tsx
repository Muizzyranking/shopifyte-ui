import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { MenuItem } from "@/types/nav.types";

interface MobileNavigationProps {
  menuItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ menuItems, isOpen, onClose }: MobileNavigationProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-gray-50 md:hidden">
      <div className="container py-4 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <div key={item.href}>
              {item.dropdown ? (
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                    {item.title}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-2 pl-4">
                    {item.dropdown.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href!}
                  className="text-sm font-medium hover:text-primary"
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
