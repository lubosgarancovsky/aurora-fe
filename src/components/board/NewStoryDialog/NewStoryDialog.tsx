import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogTrigger,
  Input,
  Select,
  TextArea
} from "@/components/core";
import { useTeam } from "@/components/teams/Team/useTeam";
import { useProjectDetail } from "@/context";

interface NewStoryDialogProps {
  children: React.ReactElement;
}

export const NewStoryDialog: React.FC<NewStoryDialogProps> = ({ children }) => {
  const { projectId } = useProjectDetail();
  const { team } = useTeam(projectId);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogBody>
        <DialogHeader title="New story">
          Create new user story for this project
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <Input label="Title" name="title" required />
          <TextArea label="Description" name="description" required rows={8} />
          <Select label="Type" name="type">
            <option>Story</option>
            <option>Bug</option>
          </Select>
          <Select label="Assign to" name="type">
            <option>Unassigned</option>
            {team.status === "success" &&
              team.data?.members.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </Select>
          <Button type="submit" className="ml-auto">
            Create
          </Button>
        </form>
      </DialogBody>
    </Dialog>
  );
};
