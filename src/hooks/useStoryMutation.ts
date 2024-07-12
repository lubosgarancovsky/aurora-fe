import {
  Story,
  StoryRequest,
  SubStory,
  SubStoryRequest
} from "@/utils/api/dto/story";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/utils/api/axios/client";

type PartOfStoryRequest = PartOf<StoryRequest>;
type PartOfSubstoryRequest = PartOf<SubStoryRequest>;

const isStory = (obj: Story | SubStory): obj is Story => {
  return "inBoard" in obj;
};

const _createBody = (
  story: Story | SubStory
): StoryRequest | SubStoryRequest => {
  return {
    name: story.name,
    description: story.description,
    inBoard: isStory(story) ? story.inBoard : undefined,
    typeId: story.type.id,
    stateId: story.state.id,
    assigneeId: story.assignedTo?.id || null
  };
};

export const useStoryMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateStory"],
    mutationFn: ({ path, ...body }: any) => ApiClient.put(path, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stories"] })
  });

  const update = (
    story: Story | SubStory,
    request: PartOfStoryRequest | PartOfSubstoryRequest
  ) => {
    const base = _createBody(story);
    const requestBody = { ...base, ...request };
    const path = isStory(story)
      ? `/v1/stories/${story.id}`
      : `/v1/stories/${story.parentId}/substories/${story.id}`;
    mutate({ path, ...requestBody });
  };

  return { update };
};
