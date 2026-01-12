import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-secondary underline-offset-4 hover:underline",
        // Brand variants
        talent:
          "bg-talent text-primary-foreground shadow-md hover:bg-talent-hover hover:shadow-lg hover:shadow-talent/20 active:scale-[0.98]",
        restart:
          "bg-restart text-secondary-foreground shadow-md hover:bg-restart-hover hover:shadow-lg hover:shadow-restart/20 active:scale-[0.98]",
        "talent-outline":
          "border-2 border-talent text-talent bg-transparent hover:bg-talent hover:text-primary-foreground",
        "restart-outline":
          "border-2 border-restart text-restart bg-transparent hover:bg-restart hover:text-secondary-foreground",
        // Hero variants with extra emphasis
        "hero-primary":
          "bg-talent text-primary-foreground shadow-lg shadow-talent/30 hover:bg-talent-hover hover:shadow-xl hover:shadow-talent/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200",
        "hero-secondary":
          "bg-card border-2 border-restart text-restart shadow-lg hover:bg-restart hover:text-secondary-foreground hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
