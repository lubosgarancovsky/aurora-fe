import React from "react";
import { BookmarkFilledIcon, BugIcon } from "@/components/icons";
import { cn } from "@/utils";
import { StoryType } from "@/utils/api/dto/story";

interface StoryTypeIconProps {
  type: StoryType;
  isSubstory?: boolean;
}

export const StoryTypeIcon: React.FC<StoryTypeIconProps> = ({
  type,
  isSubstory = false
}) => {
  return (
    <div
      className={cn("rounded p-1 w-fit", {
        "bg-red-600": type.code === "bug",
        "bg-green-600": type.code === "story" && !isSubstory,
        "bg-blue-500": type.code === "story" && isSubstory
      })}
    >
      {type.code === "story" ? (
        <BookmarkFilledIcon className="w-4" />
      ) : (
        <BugIcon className="w-4" />
      )}
    </div>
  );
};
