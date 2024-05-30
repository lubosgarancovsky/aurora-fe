import { PublicUser } from "./user";

export interface Team {
  id: string;
  projectId: string;
  createdBy: string;
  members: PublicUser[];
}
