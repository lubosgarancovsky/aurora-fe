"use client";
import { CloseIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { DialogProvider, useDialogContext } from "./DialogProvider";
import { Divider } from "../Divider";

interface DialogProps {}

export const DialogTrigger = ({
  children
}: {
  children: React.ReactElement;
}) => {
  const { setIsOpen } = useDialogContext();
  return (
    React.isValidElement(children) &&
    React.cloneElement(children as any, { onClick: () => setIsOpen(true) })
  );
};

export const DialogBody = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useDialogContext();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 w-screen h-screen bg-black/60 backdrop-blur-sm grid place-items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: "20%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "20%" }}
            role="dialog"
            className="bg-default-900 p-4 rounded-md w-[48rem] border border-border "
          >
            <div className="ml-auto w-fit">
              <button
                className="hover:bg-default-700 p-1.5 rounded-full duration-200"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DialogHeader = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-4">
      <h4>{title}</h4>
      <p className="text-foreground-dark">{children}</p>
      <Divider />
    </div>
  );
};

export const Dialog: React.FC<DialogProps> = ({ children }) => {
  return <DialogProvider>{children}</DialogProvider>;
};
