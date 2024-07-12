import React from "react";

export interface DropdownProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export interface DropdownContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = React.createContext<DropdownContext | null>(null);

export const useDropdown = () => {
  const ctx = React.useContext(DropdownContext);

  if (!ctx) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }

  return ctx;
};

export const DropdownProvider: React.FC<DropdownProps> = ({
  children,
  isOpen: isOpenProp
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(!!isOpenProp);

  React.useEffect(() => {
    setIsOpen(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};
