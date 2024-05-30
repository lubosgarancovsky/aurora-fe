import { createContext, useContext, useState } from "react";

export const DialogContext = createContext<any>(null);

export const useDialogContext = () => {
  const ctx = useContext(DialogContext);

  if (!ctx) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }

  return ctx;
};

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
