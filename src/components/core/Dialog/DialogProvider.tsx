import { createContext, useContext, useEffect, useState } from "react";
import { DialogProps } from "./Dialog";

export const DialogContext = createContext<any>(null);

export const useDialogContext = () => {
  const ctx = useContext(DialogContext);

  if (!ctx) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return ctx;
};

export const DialogProvider: React.FC<DialogProps> = ({
  children,
  isOpen: isOpenProp,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(!!isOpenProp);

  useEffect(() => {
    setIsOpen(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen, onClose }}>
      {children}
    </DialogContext.Provider>
  );
};
