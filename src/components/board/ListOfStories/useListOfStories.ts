import ApiClient from "@/utils/api/axios/client";
import { Page } from "@/utils/api/dto/page";
import { Story, StoryState, SubStory } from "@/utils/api/dto/story";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo, useState } from "react";

export const useListOfStories = (projectId: string) => {
  const [isDragging, setIsDragging] = useState(false);
  const queryClient = useQueryClient();

  const { data, status } = useQuery<AxiosResponse<Page<Story>>>({
    queryKey: ["stories"],
    queryFn: () =>
      ApiClient.get(`/v1/stories`, {
        params: {
          filter: `inBoard==true;projectId==${projectId}`,
          page: 1,
          "page-size": "50",
          sort: "createdAt:"
        }
      })
  });

  const { mutate: updateStory } = useMutation({
    mutationKey: ["updateStory"],
    mutationFn: ({ storyId, data }: any) =>
      ApiClient.put(`/v1/stories/${storyId}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stories"] })
  });

  const { mutate: updateSubstory } = useMutation({
    mutationKey: ["updateSubStory"],
    mutationFn: ({ storyId, substoryId, data }: any) =>
      ApiClient.put(`/v1/stories/${storyId}/substories/${substoryId}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stories"] })
  });

  const [withSub, noSub] = useMemo(() => {
    if (status === "success" && data.data) {
      const subStories: Story[] = [];
      const noSubStories: Story[] = [];

      data.data.items.forEach((story) => {
        if (story.substories.length > 0) {
          subStories.push(story);
        } else {
          noSubStories.push(story);
        }
      });

      return [subStories, noSubStories];
    }
    return [[], []];
  }, [data, status]);

  const onStartDrag = () => {
    setIsDragging(true);
  };

  const onStopDrag = (story: Story | SubStory, state: StoryState) => {
    setIsDragging(false);

    if (story.state.id !== state.id) {
      if ("substories" in story) {
        updateStory({
          storyId: story.id,
          data: {
            name: story.name,
            description: story.description,
            typeId: story.type.id,
            stateId: state.id,
            assigneeId: story.assignedTo?.id || null,
            inBoard: story.inBoard
          }
        });
      } else {
        updateSubstory({
          storyId: story.parentId,
          substoryId: story.id,
          data: {
            name: story.name,
            description: story.description,
            typeId: story.type.id,
            stateId: state.id,
            assigneeId: story.assignedTo?.id || null
          }
        });
      }
    }
  };

  return {
    data: [withSub, noSub],
    status,
    onStartDrag,
    onStopDrag,
    isDragging
  };
};
