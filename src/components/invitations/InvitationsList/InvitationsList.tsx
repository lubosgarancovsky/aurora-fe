"use client";

import React from "react";
import ApiClient from "@/utils/api/axios/client";
import { Avatar, Button, Chip } from "@/components/core";
import { timeAgo } from "@/utils";
import { Invitation } from "@/utils/api/dto/invitations";
import { Page } from "@/utils/api/dto/page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

type ListVariant = "sent" | "received";

interface InvitationsListProps {
  variant: ListVariant;
}

const InvitationListItem = ({
  item,
  variant,
  onDelete,
  onAccept
}: {
  item: Invitation;
  variant: ListVariant;
  onDelete: (id: string) => void;
  onAccept: (id: string) => void;
}) => {
  return (
    <div
      key={item.id}
      className="border border-border rounded-md overflow-hidden"
    >
      <div className="bg-default-800 px-4 py-2">
        <p>{item.projectName}</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-foreground-dark">
            {variant === "sent"
              ? `You have invited ${item.recipient.name} to collaborate on ${item.projectName}`
              : `${item.sender.name} has invited you to collaborate on ${item.projectName}`}
          </p>

          <span className="text-sm text-foreground-dark">
            {timeAgo(item.createdAt)}
          </span>
        </div>

        <div className="flex justify-between">
          <Avatar
            user={variant === "sent" ? item.recipient : item.sender}
            showName
            showEmail
          />
          <div className="flex gap-3">
            {variant === "received" && (
              <Button color="success" onClick={() => onAccept(item.id)}>
                Accept
              </Button>
            )}
            <Button
              color="danger"
              variant="outline"
              onClick={() => onDelete(item.id)}
            >
              {variant === "sent" ? "Revoke" : "Decline"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InvitationsList: React.FC<InvitationsListProps> = ({
  variant
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const user = session?.user;

  const { data, status } = useQuery<AxiosResponse<Page<Invitation>>>({
    queryKey: ["invitations", variant],
    queryFn: () =>
      ApiClient.get("/v1/invitations", {
        params: {
          sort: "createdAt:",
          filter: `${variant === "sent" ? "senderId" : "recipientId"}==${
            user?.id
          }`
        }
      })
  });

  const { mutate: accept } = useMutation({
    mutationKey: ["revokeInvitation"],
    mutationFn: (id: string) => ApiClient.post(`/v1/invitations/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
  });

  const { mutate: remove } = useMutation({
    mutationKey: ["revokeInvitation"],
    mutationFn: (id: string) => ApiClient.delete(`/v1/invitations/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["invitations"] })
  });

  return (
    <div className="w-full flex flex-col gap-3">
      {status === "success" && (
        <>
          {data.data.items.length ? (
            data.data.items.map((item) => (
              <InvitationListItem
                key={item.id}
                item={item}
                variant={variant}
                onAccept={accept}
                onDelete={remove}
              />
            ))
          ) : (
            <div>
              <h2>No data</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};
