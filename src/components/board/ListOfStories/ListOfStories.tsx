"use client";
import React, { DragEventHandler, useRef } from "react";
import { useListOfStories } from "./useListOfStories";
import { StoryListItem } from "./StoryListItem";
import { Story, StoryState, SubStory } from "@/utils/api/dto/story";
import { UnclassifiedListItem } from "./UnclassifiedListItem";
import { cn } from "@/utils";

interface ListOfStoriesProps {
  projectId: string;
  states: StoryState[];
}

export const ListOfStories: React.FC<ListOfStoriesProps> = ({
  projectId,
  states
}) => {
  const {
    data: [withSub, noSub],
    isDragging,
    onStartDrag,
    onStopDrag
  } = useListOfStories(projectId);

  const refs = useRef<HTMLDivElement[] | null[]>([]);

  const handleDragRelease = (
    story: Story | SubStory,
    e: DragEventHandler<HTMLButtonElement>
  ) => {
    const list = refs.current;

    let index = 0;
    for (const el of list) {
      if (el) {
        // @ts-ignore
        const { clientX, clientY } = e;
        const rect = el.getBoundingClientRect();
        if (
          rect.left < clientX &&
          rect.right > clientX &&
          rect.top < clientY &&
          rect.bottom > clientY
        ) {
          onStopDrag(story, states[index]);
          return;
        }
      }
      index++;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full relative">
      {withSub.map((item) => (
        <StoryListItem
          key={item.id}
          item={item}
          states={states}
          onStartDrag={onStartDrag}
          onStopDrag={handleDragRelease}
        />
      ))}

      {!!noSub.length && (
        <UnclassifiedListItem
          items={noSub}
          states={states}
          onStartDrag={onStartDrag}
          onStopDrag={handleDragRelease}
        />
      )}

      {isDragging && (
        <div className="absolute top-0 left-0 w-full h-full flex gap-4">
          {states.map((state, index) => (
            <div
              // @ts-ignore
              ref={(el) => (refs.current[index] = el)}
              key={state.id}
              className={cn(
                "bg-default-700/50 rounded-md w-full border-2 border-dashed border-default-600",
                {
                  "bg-green-500/50 border-green-400": state.code === "done"
                }
              )}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};
