import { PublicUser } from "./user";

export interface Invitation {
  id: string;
  teamId: string;
  sender: PublicUser;
  recipient: PublicUser;
  projectId: string;
  projectName: string;
  createdAt: string;
}
