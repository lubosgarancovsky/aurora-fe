"use client";

import React, { useState } from "react";
import ApiClient from "@/utils/api/axios/client";
import { Page } from "@/utils/api/dto/page";
import { ProjectListItem as ProjectListItemType } from "@/utils/api/dto/projects";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Button, Input } from "@/components/core";
import { PlusIcon } from "@/components/icons";
import { ProjectListItem } from "./ProjectListItem";

interface ProjectListProps {}

const PAGE_SIZE = 50;

export const ProjectList: React.FC<ProjectListProps> = ({}) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data, status, error } = useQuery<
    AxiosResponse<Page<ProjectListItemType>>
  >({
    queryKey: ["projects", page, search],
    queryFn: () =>
      ApiClient.get("/v1/projects", {
        params: {
          page,
          "page-size": PAGE_SIZE,
          ...(search
            ? {
                filter: `name=like="*${search}*"`
              }
            : {})
        }
      })
  });

  return (
    <div className="h-full">
      <div className="my-3 flex items-center gap-3">
        <Input
          placeholder="Search for project..."
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          color="success"
          startContent={<PlusIcon />}
          href="/projects/new"
        >
          New
        </Button>
      </div>
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error</p>}
      {status === "success" && (
        <div className="flex flex-col gap-1.5">
          {data.data.items.map((item) => (
            <ProjectListItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
