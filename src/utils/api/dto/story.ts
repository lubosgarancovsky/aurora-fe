import { PublicUser } from "./user";

export interface StoryState {
  id: string;
  name: string;
  code: string;
}

export interface StoryType {
  id: string;
  name: string;
  code: string;
}

export interface SubStory {
  id: string;
  name: string;
  parentId: string;
  description: string;
  code: string;
  createdBy: PublicUser;
  assignedTo: PublicUser | null;
  createdAt: string;
  state: StoryState;
  type: StoryType;
}

export interface Story extends SubStory {
  inBoard: boolean;
  substories: SubStory[];
}

export interface StoryRequest {
  name: string;
  description: string;
  inBoard: boolean;
  typeId: string;
  stateId: string;
  assigneeId: string | null;
}

export interface SubStoryRequest {
  name: string;
  description: string;
  typeId: string;
  stateId: string;
  assigneeId: string | null;
}
