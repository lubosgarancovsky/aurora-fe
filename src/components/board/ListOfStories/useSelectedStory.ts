import { Story, SubStory } from "@/utils/api/dto/story";
import { useState } from "react";

export const useSelectedStory = () => {
  const [story, setStory] = useState<Story | SubStory | null>(null);

  return {
    story,
    setStory
  };
};
