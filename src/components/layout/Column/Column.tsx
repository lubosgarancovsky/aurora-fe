import React from "react";

interface ColumnProps {
  children: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = ({ children }) => {
  return <div className="mx-auto max-w-3xl p-4 w-full">{children}</div>;
};
