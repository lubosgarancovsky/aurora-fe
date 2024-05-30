import { cn } from "@/utils";
import React, { ButtonHTMLAttributes } from "react";

interface VerticalNavigationProps {
  children: React.ReactNode;
}

interface VerticalNavigationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export const VerticalNavigationButton: React.FC<
  VerticalNavigationButtonProps
> = ({ children, className, icon, isActive = false, ...props }) => {
  return (
    <li>
      <button
        className={cn(
          "flex gap-1.5 items-center px-3 py-2 hover:bg-default-800 rounded-md w-full text-foreground-light",
          { "bg-primary hover:bg-primary-light": isActive },
          className
        )}
        {...props}
      >
        {icon &&
          React.isValidElement(icon) &&
          React.cloneElement(icon as any, { className: "w-4 h-4" })}
        {children}
      </button>
    </li>
  );
};

export const VerticalNavigation: React.FC<VerticalNavigationProps> = ({
  children
}) => {
  return <ul className="flex flex-col gap-2">{children}</ul>;
};
