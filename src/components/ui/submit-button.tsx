import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export function SubmitButton({
  isLoading,
  loadingText,
  text,
  disabled,
  variant = "default",
  size = "default",
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : text}
    </Button>
  );
}
