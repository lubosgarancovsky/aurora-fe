import { PublicUser } from "./user";

export interface ProjectListItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  code: string;
  createdBy: PublicUser;
}

export interface ProjectLink {
  name: string;
  url: string;
}

export interface ProjectRequest {
  name: string;
  description: string;
  code: string;
  links: ProjectLink[];
}
