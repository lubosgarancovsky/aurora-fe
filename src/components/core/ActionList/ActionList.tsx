import React from "react";

interface ActionListProps {
  children: React.ReactNode;
}

export const ActionList: React.FC<ActionListProps> = ({ children }) => {
  return <ul>{children}</ul>;
};
