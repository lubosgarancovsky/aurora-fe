"use client";
import React from "react";
import { Avatar } from "@/components/core";
import { useTeam } from "./useTeam";
import { NoTeam } from "./NoTeam";
import { InvitationDialog } from "./InvitationDialog";
import { useProjectDetail } from "@/context";
import { PublicUser } from "@/utils/api/dto/user";

export const Team: React.FC = () => {
  const { projectId } = useProjectDetail();
  const { team, users } = useTeam(projectId);

  return (
    <div className="flex flex-col">
      <h3>Team</h3>
      <div className="flex gap-2">
        {team.status === "success" &&
          team.data?.members.map((item: PublicUser) => (
            <button key={item.id} onClick={() => {}}>
              <Avatar user={item} />
            </button>
          ))}

        {team.status === "success" && (
          <InvitationDialog
            inputRef={users.input}
            users={users.data}
            inviteFn={users.invite}
            usersFn={() => {
              if (users.input.current && users.input.current.value)
                users.refetch();
            }}
          />
        )}

        {team.status === "error" && <NoTeam createTeamFn={team.create} />}
      </div>
    </div>
  );
};
