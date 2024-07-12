"use client";
import React from "react";
import ApiClient from "@/utils/api/axios/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Page } from "@/utils/api/dto/page";
import { Story } from "@/utils/api/dto/story";

interface BacklogProps {
  projectId: string;
}

export const Backlog: React.FC<BacklogProps> = ({ projectId }) => {
  const { data, status } = useQuery<AxiosResponse<Page<Story>>>({
    queryKey: ["backlog"],
    queryFn: () =>
      ApiClient.get(`/v1/stories`, {
        params: {
          filter: `inBoard==false;projectId==${projectId}`
        }
      })
  });

  return (
    <div>
      <div>
        {status === "success" &&
          data.data &&
          data.data.items.map((item) => <div key={item.id}>{item.code}</div>)}
      </div>
    </div>
  );
};
