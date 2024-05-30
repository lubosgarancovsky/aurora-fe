"use client";
import React from "react";
import { Avatar } from "@/components/core";
import { useTeam } from "./useTeam";
import { NoTeam } from "./NoTeam";
import { InvitationDialog } from "./InvitationDialog";

interface TeamProps {
  projectId: string;
}

export const Team: React.FC<TeamProps> = ({ projectId }) => {
  const { team, users } = useTeam(projectId);

  return (
    <div className="flex flex-col">
      <h3>Team</h3>
      <div className="flex gap-2">
        {team.status === "success" &&
          team.data?.data.members.map((item) => (
            <button key={item.id}>
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
