import React, { ButtonHTMLAttributes } from "react";
import {
  DropdownProps,
  DropdownProvider,
  useDropdown
} from "./DropdownProvider";

interface DropdownTriggerProps {
  children: React.ReactElement;
}

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children
}) => {
  const { setIsOpen } = useDropdown();
  return React.isValidElement(children)
    ? React.cloneElement(children as any, {
        onClick: () => setIsOpen((p) => !p)
      })
    : null;
};

export const DropdownBody: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isOpen } = useDropdown();
  return (
    <>
      {isOpen && (
        <ul className="absolute rounded bg-default-800 w-max mt-3 right-0 overflow-hidden border border-border">
          {children}
        </ul>
      )}
    </>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  ...props
}) => {
  return (
    <li className="w-full">
      <button
        className="px-3 py-1.5 hover:bg-default-700 w-full text-left min-w-[10rem]"
        {...props}
      >
        {children}
      </button>
    </li>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  return (
    <DropdownProvider>
      <div className="relative">{children}</div>
    </DropdownProvider>
  );
};
