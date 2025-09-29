import { Heart, LogIn, LogOut, Package, Settings, Store, User, UserPlus } from "lucide-react";
import type { AvatarMenuItem, MenuItem } from "@/types/nav.types";

const menuItems: MenuItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Categories",
    dropdown: {
      items: [
        {
          title: "Electronics",
          href: "/categories/electronics",
          description: "Phones, laptops, and gadgets",
        },
        {
          title: "Fashion",
          href: "/categories/fashion",
          description: "Clothing and accessories",
        },
        {
          title: "Home & Garden",
          href: "/categories/home-garden",
          description: "Furniture and home decor",
        },
        {
          title: "Sports",
          href: "/categories/sports",
          description: "Sports equipment and gear",
        },
      ],
    },
  },
  {
    title: "Deals",
    dropdown: {
      megaMenu: true,
      items: [
        {
          title: "Flash Sales",
          href: "/deals/flash-sales",
          description: "Limited time offers",
        },
        {
          title: "Daily Deals",
          href: "/deals/daily",
          description: "New deals every day",
        },
        {
          title: "Clearance",
          href: "/deals/clearance",
          description: "Up to 70% off selected items",
        },
        {
          title: "Bundle Offers",
          href: "/deals/bundles",
          description: "Buy more, save more",
        },
        {
          title: "Seasonal Sale",
          href: "/deals/seasonal",
          description: "Special seasonal discounts",
        },
        {
          title: "Member Exclusive",
          href: "/deals/member",
          description: "Exclusive deals for members",
        },
      ],
    },
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const loggedInAvatarItems: AvatarMenuItem[] = [
  {
    title: "My Account",
    href: "/account",
    icon: User,
  },
  {
    title: "My Shop",
    href: "/shop",
    icon: Store,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Package,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    separator: true,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];

const loggedOutAvatarItems: AvatarMenuItem[] = [
  {
    title: "Sign In",
    href: "/login",
    icon: LogIn,
  },
  {
    title: "Sign Up",
    href: "/register",
    icon: UserPlus,
  },
];

function getAvartarMenuItems(isLoggedIn: boolean): AvatarMenuItem[] {
  return isLoggedIn ? loggedInAvatarItems : loggedOutAvatarItems;
}

export { menuItems, getAvartarMenuItems };
