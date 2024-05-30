import ApiClient from "@/utils/api/axios/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

export const useBoard = (projectId: string) => {
  const [tab, setTab] = useState<"board" | "backlog">("board");

  const { data, status } = useQuery<AxiosResponse<any>>({
    queryKey: ["board", projectId],
    queryFn: () => ApiClient.get(`/v1/projects/${projectId}/board`)
  });

  return { data, status, tab, setTab };
};
