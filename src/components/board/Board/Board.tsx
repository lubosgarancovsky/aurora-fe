"use client";

import React from "react";
import { useBoard } from "./useBoard";
import { Button, TabNavigation, TabNavigationItem } from "@/components/core";
import { PlusIcon } from "@/components/icons";

interface BoardProps {
  projectId: string;
}

export const Board: React.FC<BoardProps> = ({ projectId }) => {
  const { data, status, tab, setTab } = useBoard(projectId);
  return (
    <div>
      <div className="py-3 flex justify-between items-center">
        <TabNavigation>
          <TabNavigationItem
            isActive={tab === "board"}
            onClick={() => setTab("board")}
          >
            Board
          </TabNavigationItem>
          <TabNavigationItem
            isActive={tab === "backlog"}
            onClick={() => setTab("backlog")}
          >
            Backlog
          </TabNavigationItem>
        </TabNavigation>
        <Button startContent={<PlusIcon />}>New story</Button>
      </div>
      {tab === "board" && (
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
      )}
    </div>
  );
};
