import { cn } from "@/utils";
import React from "react";

interface TabNavigationProps {
  children: React.ReactNode;
}
interface TabNavigationItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

export const TabNavigationItem: React.FC<TabNavigationItemProps> = ({
  children,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn("px-3 py-2 hover:bg-default-800", {
        "border-b-2 border-primary text-primary": isActive,
        "border-b-2 border-transparent hover:border-default-700": !isActive
      })}
    >
      {children}
    </button>
  );
};

export const TabNavigation: React.FC<TabNavigationProps> = ({ children }) => {
  return <div className="flex">{children}</div>;
};
