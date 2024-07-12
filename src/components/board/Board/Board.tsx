"use client";

import React from "react";
import { Button, TabNavigation, TabNavigationItem } from "@/components/core";
import { AddColumn, PlusIcon } from "@/components/icons";
import { BoardStructureDialog } from "../BoardStructureDialog";
import { ListOfStories } from "../ListOfStories";
import { NewStoryDialog } from "../NewStoryDialog/NewStoryDialog";
import { Backlog } from "../Backlog";
import { useProjectDetail } from "@/context";
import { StoryState } from "@/utils/api/dto/story";

export const Board: React.FC = () => {
  const {
    projectId,
    board: { data, status, tab, setTab }
  } = useProjectDetail();

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
        <div className="flex items-center gap-3">
          <BoardStructureDialog
            board={data?.data.items || []}
            projectId={projectId}
          >
            <Button
              startContent={<AddColumn />}
              iconOnly
              variant="outline"
            ></Button>
          </BoardStructureDialog>
          <NewStoryDialog>
            <Button startContent={<PlusIcon />}>New story</Button>
          </NewStoryDialog>
        </div>
      </div>
      {tab === "board" && (
        <div className="flex gap-3 w-full">
          {status === "success" && (
            <div className="w-full">
              <div className="flex gap-4 w-full justify-between mb-4">
                {data?.data.items.map((state: StoryState) => (
                  <div
                    key={state.id}
                    className="bg-default p-3 rounded-md w-full border border-border"
                  >
                    <b>{state.name}</b>
                  </div>
                ))}
              </div>
              <ListOfStories
                projectId={projectId}
                states={data?.data.items || []}
              />
            </div>
          )}
        </div>
      )}
      {tab === "backlog" && <Backlog projectId={projectId} />}
    </div>
  );
};
