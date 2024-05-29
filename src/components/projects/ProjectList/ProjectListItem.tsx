import React from "react";
import { Avatar, Chip } from "@/components/core";
import { ProjectListItem as ProjectListItemType } from "@/utils/api/dto/projects";

interface ProjectListItemProps {
  item: ProjectListItemType;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="border-t border-border last:border-b p-4 flex justify-between gap-4 items-center"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <a className="link text-xl" href={`/projects/${item.id}`}>
            {item.name}
          </a>
          <Chip>{item.code}</Chip>
        </div>
        <p className="text-foreground-dark">{item.description}</p>
      </div>
      <Avatar user={item.createdBy}></Avatar>
    </div>
  );
};
