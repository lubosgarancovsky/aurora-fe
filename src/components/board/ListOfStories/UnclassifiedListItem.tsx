"use client";

import React, { DragEventHandler, useState } from "react";
import { ChevronIcon } from "@/components";
import { cn } from "@/utils";
import { Story, StoryState } from "@/utils/api/dto/story";
import { StoryCard } from "./StoryCard";

interface UnclassifiedListItemProps {
  items: Story[];
  states: StoryState[];
  onStartDrag: () => void;
  onStopDrag: (story: Story, e: DragEventHandler<HTMLButtonElement>) => void;
}

export const UnclassifiedListItem: React.FC<UnclassifiedListItemProps> = ({
  items,
  states,
  onStartDrag,
  onStopDrag
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center w-full">
        <button
          className="hover:bg-default-800 p-2 rounded"
          onClick={() => setIsOpen((p) => !p)}
        >
          <ChevronIcon className={cn("w-3 h-3", { "rotate-90": isOpen })} />
        </button>
        <b>Other stories</b>
      </div>
      {isOpen && (
        <div className="my-3 flex justify-between w-full gap-4">
          {states.map((state) => (
            <div
              key={state.id}
              className="bg-default rounded-md min-h-[8rem] w-full p-3 flex flex-col gap-3"
            >
              {items.map((story) => {
                if (story.state.id === state.id) {
                  return (
                    <StoryCard
                      key={story.id}
                      item={story}
                      onStartDrag={onStartDrag}
                      onStopDrag={(e) => onStopDrag(story, e)}
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
