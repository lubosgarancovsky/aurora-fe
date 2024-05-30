"use client";

import React from "react";
import { useBoard } from "./useBoard";

interface BoardProps {
  projectId: string;
}

export const Board: React.FC<BoardProps> = ({ projectId }) => {
  const { data, status } = useBoard(projectId);
  return (
    <div>
      <div className="flex gap-3">
        {status === "success" &&
          data?.data.items.map((column, index) => (
            <div key={index} className="w-full bg-default rounded-md p-3 ">
              <div className="mb-3">
                <span>{column.name}</span>
              </div>
              <div>
                <div className="w-full h-[12rem] rounded bg-default-800"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
