import React, { DragEventHandler } from "react";
import { Avatar } from "@/components/core";
import { Story, SubStory } from "@/utils/api/dto/story";
import { StoryTypeIcon } from "./StoryTypeIcon";
import { useProjectDetail } from "@/context";

interface StoryCardProps {
  item: Story | SubStory;
  onStartDrag: () => void;
  onStopDrag: (e: DragEventHandler<HTMLButtonElement>) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  item,
  onStartDrag,
  onStopDrag
}) => {
  const { detail } = useProjectDetail();

  return (
    <button
      className="bg-default-800 p-3 flex flex-col gap-1.5 text-left"
      draggable
      onClick={() => detail.setStory(item)}
      onDragStart={onStartDrag}
      // @ts-ignore
      onDragEnd={onStopDrag}
    >
      <div>
        <b>{item.code}</b>
      </div>
      <p>{item.name}</p>
      <div className="flex gap-4 mt-8 items-center justify-between w-full">
        <StoryTypeIcon type={item.type} isSubstory={!("substories" in item)} />
        <Avatar user={item.assignedTo} />
      </div>
    </button>
  );
};
