import React from "react";

interface ChipProps {
  children: string;
}

export const Chip: React.FC<ChipProps> = ({ children }) => {
  return (
    <div className="text-xs rounded-full px-2 py-0.5 border border-border w-fit bg-default font-semibold">
      {children}
    </div>
  );
};
