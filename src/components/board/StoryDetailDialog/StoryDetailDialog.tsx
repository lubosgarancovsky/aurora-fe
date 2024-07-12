"use client";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogBody,
  DialogHeader
} from "@/components/core";
import { useProjectDetail } from "@/context";
import React from "react";
import { StoryTypeIcon } from "../ListOfStories/StoryTypeIcon";
import { StoryState, SubStory } from "@/utils/api/dto/story";
import {
  Dropdown,
  DropdownBody,
  DropdownTrigger
} from "@/components/core/Dropdown";
import { DropdownItem } from "@/components/core/Dropdown/Dropdown";
import { useStoryMutation } from "@/hooks/useStoryMutation";

export const StoryDetailDialog: React.FC = ({}) => {
  const {
    detail: { story, setStory },
    board: { data }
  } = useProjectDetail();

  const { update } = useStoryMutation();

  return (
    <Dialog isOpen={!!story} onClose={() => setStory(null)}>
      <DialogBody>
        {story && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <StoryTypeIcon
                type={story.type}
                isSubstory={!("substories" in story)}
              />
              <a href="#" className="hover:underline">
                <b>{story.code}</b>
              </a>
            </div>
            <div className="flex justify-between">
              <div>
                <h3>{story.name}</h3>
                <p>{story.description}</p>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button>{story.state.name}</Button>
                </DropdownTrigger>
                <DropdownBody>
                  {data?.data.items.map((state: StoryState) => (
                    <DropdownItem
                      key={state.id}
                      onClick={() => update(story, { stateId: state.id })}
                    >
                      {state.name}
                    </DropdownItem>
                  ))}
                </DropdownBody>
              </Dropdown>
            </div>
            <div className="flex items-center gap-16">
              <div>Created by</div>
              <div>Assigned to</div>
            </div>
            <div className="flex flex-col gap-1.5">
              {story.substories &&
                story.substories.map((substory: SubStory) => (
                  <div
                    key={substory.id}
                    className="bg-default-800 rounded p-2 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <StoryTypeIcon type={substory.type} isSubstory={true} />
                      <b>{substory.code}</b>
                    </div>
                    <Chip>{substory.state.name}</Chip>
                    <Avatar user={substory.assignedTo} small />
                  </div>
                ))}
            </div>
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};
