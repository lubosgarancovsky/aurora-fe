import React from "react";
import { Button } from "@/components/core";

interface NoTeamProps {
  createTeamFn: () => void;
}

export const NoTeam: React.FC<NoTeamProps> = ({ createTeamFn }) => {
  return (
    <div>
      <p className="mb-1.5">
        Create a team and invite collaborators to help you
      </p>
      <Button onClick={createTeamFn}>Create a team</Button>
    </div>
  );
};
