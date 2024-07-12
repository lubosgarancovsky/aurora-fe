"use client";

import React, { DragEventHandler, useState } from "react";
import { Story, StoryState, SubStory } from "@/utils/api/dto/story";
import { Chip } from "@/components/core";
import { ChevronIcon } from "@/components/icons";
import { cn } from "@/utils";
import { StoryCard } from "./StoryCard";
import { StoryTypeIcon } from "./StoryTypeIcon";
import { useProjectDetail } from "@/context";

interface StoryListItemProps {
  item: Story;
  states: StoryState[];
  onStartDrag: () => void;
  onStopDrag: (
    story: Story | SubStory,
    e: DragEventHandler<HTMLButtonElement>
  ) => void;
}

export const StoryListItem: React.FC<StoryListItemProps> = ({
  item,
  states,
  onStartDrag,
  onStopDrag
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { detail } = useProjectDetail();

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center w-full">
        <button
          className="hover:bg-default-800 p-2 rounded"
          onClick={() => setIsOpen((p) => !p)}
        >
          <ChevronIcon className={cn("w-3 h-3", { "rotate-90": isOpen })} />
        </button>
        <StoryTypeIcon type={item.type} />
        <button
          className="hover:underline"
          onClick={() => detail.setStory(item)}
        >
          <b>{item.code}</b>
        </button>
        <p>{item.name}</p>
        <Chip>{item.state.name}</Chip>
      </div>
      {isOpen && (
        <div className="my-3 flex justify-between w-full gap-4">
          {states.map((state) => (
            <div
              key={state.id}
              className="bg-default rounded-md min-h-[8rem] w-full p-3 flex flex-col gap-3"
            >
              {item.substories.map((substory) => {
                if (substory.state.id === state.id) {
                  return (
                    <StoryCard
                      key={substory.id}
                      item={substory}
                      onStartDrag={onStartDrag}
                      onStopDrag={(e) => onStopDrag(substory, e)}
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
