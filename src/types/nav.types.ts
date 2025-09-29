export interface DropdownItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

export interface MenuItem {
  title: string;
  href?: string;
  dropdown?: {
    items: DropdownItem[];
    megaMenu?: boolean;
  };
}

export interface AvatarMenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  separator?: boolean;
}

export interface NavbarProps {
  isLoggedIn?: boolean;
  cartCount?: number;
  className?: string;
}
