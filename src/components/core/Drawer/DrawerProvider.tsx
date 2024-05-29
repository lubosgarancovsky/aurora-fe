"use client";
import { createContext, useContext, useState } from "react";

interface DrawerContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerContext = createContext<DrawerContextProps | null>(null);

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);

  if (!ctx) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return ctx;
};

export const DrawerProvider: React.FC<any> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
