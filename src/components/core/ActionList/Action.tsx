import React, { AnchorHTMLAttributes } from "react";

interface ActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  children: string;
}

export const Action: React.FC<ActionProps> = ({ icon, children, ...props }) => {
  return (
    <a
      className="w-full hover:bg-default-800 duration-100 rounded-md text-left flex gap-2 p-2 items-center"
      {...props}
    >
      {icon &&
        React.isValidElement(icon) &&
        React.cloneElement(icon, { className: "w-5 h-5" })}
      {children}
    </a>
  );
};
