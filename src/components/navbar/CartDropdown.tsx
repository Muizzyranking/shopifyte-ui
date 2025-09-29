import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CartDropdownProps {
  cartCount: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDropdown({ cartCount, isOpen, onOpenChange }: CartDropdownProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              {cartCount > 99 ? "99+" : cartCount}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4 text-center text-sm text-muted-foreground">Your cart is empty</div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button className="w-full" size="sm" disabled>
            View Cart
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
