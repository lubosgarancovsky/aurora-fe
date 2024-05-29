"use client";

import React from "react";
import { DrawerProvider, useDrawer } from "./DrawerProvider";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "@/components/icons";

interface DrawerProps {
  children: React.ReactNode;
}

interface DrawerTriggerProps {
  children: React.ReactNode;
}

interface DrawerBodyProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children }) => {
  const { setIsOpen } = useDrawer();

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement(children, {
          onClick: () => setIsOpen((p) => !p)
        })}
    </>
  );
};

export const DrawerBody: React.FC<DrawerBodyProps> = ({ children, header }) => {
  const { isOpen, setIsOpen } = useDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/60 w-screen h-screen overflow-hidden fixed top-0 left-0 flex justify-end"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "linear",
              duration: 0.2
            }}
            className="h-screen bg-default-900 w-[24rem] p-4 border-l border-border"
          >
            <div className="flex justify-between">
              {header}
              <button
                className="hover:bg-default-800 w-7 h-7 flex justify-center items-center rounded-full duration-200"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-8">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
  return <DrawerProvider>{children}</DrawerProvider>;
};
