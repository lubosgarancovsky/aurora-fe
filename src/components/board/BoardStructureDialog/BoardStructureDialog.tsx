"use client";
import React, { useEffect, useState } from "react";
import ApiClient from "@/utils/api/axios/client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTrigger
} from "@/components/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Page } from "@/utils/api/dto/page";
import { StoryState } from "@/utils/api/dto/story";
import { cn } from "@/utils";

interface BoardStructureDialogProps {
  children: React.ReactElement;
  projectId: string;
  board: StoryState[];
}

export const BoardStructureDialog: React.FC<BoardStructureDialogProps> = ({
  children,
  projectId,
  board
}) => {
  const [current, setCurrent] = useState<string[]>(
    board.map((item) => item.id)
  );

  const queryClient = useQueryClient();

  const { data, status } = useQuery<AxiosResponse<Page<StoryState>>>({
    queryKey: ["allStates"],
    queryFn: () => ApiClient.get("/v1/states")
  });

  const { mutate } = useMutation({
    mutationKey: ["board"],
    mutationFn: (data: string[]) =>
      ApiClient.put(`/v1/projects/${projectId}/board`, { items: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["board"] })
  });

  useEffect(() => {
    setCurrent(board.map((item) => item.id));
  }, [board]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogBody>
        <DialogHeader title="Board">
          Select columns that should be displayed
        </DialogHeader>
        <div className="w-full min-h-[24rem] bg-default rounded flex gap-4 justify-between items-center p-4">
          {status === "success" &&
            data?.data.items.map((column, index) => (
              <button
                key={index}
                className={cn(
                  "px-3 py-1.5 bg-default-800 w-fit h-fit text-center rounded",
                  {
                    "bg-transparent border border-border border-dashed text-foreground-dark":
                      !current.includes(column.id)
                  }
                )}
                onClick={() => {
                  if (current.includes(column.id)) {
                    setCurrent(current.filter((id) => id !== column.id));
                  } else {
                    setCurrent([...current, column.id]);
                  }
                }}
              >
                {column.name}
              </button>
            ))}
        </div>
        <div className="mt-4 ml-auto w-fit">
          <Button onClick={() => mutate(current)}>Save</Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};
