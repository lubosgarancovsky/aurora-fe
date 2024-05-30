import { cn } from "@/utils";
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type OtherAttributes = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends OtherAttributes {
  fullWidth?: boolean;
  color?: "primary" | "danger" | "success";
  startContent?: React.ReactNode;
  variant?: "solid" | "outline";
  iconOnly?: boolean;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      children,
      className,
      startContent,
      fullWidth = false,
      iconOnly = false,
      color = "primary",
      variant = "solid",
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "bg-primary px-3 py-1 rounded-md text-foreground-light w-fit flex gap-1.5 items-center justify-center duration-200",
      {
        "w-full": fullWidth,
        "bg-primary hover:bg-primary-light":
          variant === "solid" && color === "primary",
        "bg-danger hover:bg-danger-light":
          variant === "solid" && color === "danger",
        "bg-success hover:bg-success-light":
          variant === "solid" && color === "success",
        "border border-border text-foreground bg-neutral hover:bg-neutral-800 text-foreground-dark":
          variant === "outline",
        "text-danger hover:text-foreground-light hover:bg-danger":
          color === "danger" && variant === "outline",
        "p-1.5": iconOnly
      },
      className
    );

    const Component = props.href ? "a" : "button";

    return (
      <Component ref={ref} className={classes} {...props}>
        {startContent &&
          React.isValidElement(startContent) &&
          React.cloneElement(startContent as any, { className: "w-5 h-5" })}
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
