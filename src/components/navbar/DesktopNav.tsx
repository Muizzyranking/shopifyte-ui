import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { DropdownItem, MenuItem } from "@/types/nav.types";
import { ListItem } from "./ListItem";

interface DesktopNavigationProps {
  menuItems: MenuItem[];
}

export function DesktopNavigation({ menuItems }: DesktopNavigationProps) {
  const renderDropdownContent = (items: DropdownItem[], megaMenu = false) => {
    if (megaMenu) {
      return (
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          {items.map((item) => (
            <ListItem key={item.href} title={item.title} href={item.href}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      );
    }

    return (
      <ul className="grid w-[300px] gap-2 p-2">
        {items.map((item) => (
          <li key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <div className="text-sm font-medium leading-none">{item.title}</div>
                </div>
                {item.description && (
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.dropdown ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderDropdownContent(item.dropdown.items, item.dropdown.megaMenu)}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.title}>{item.title}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
