import React from "react";
import {
  Input,
  Dialog,
  DialogTrigger,
  Button,
  DialogBody,
  DialogHeader,
  Avatar
} from "@/components/core";
import { PlusIcon } from "@/components/icons";
import { PublicUser } from "@/utils/api/dto/user";

interface InvitationDialogProps {
  inputRef: React.RefObject<HTMLInputElement>;
  users: PublicUser[];
  inviteFn: (user: PublicUser) => void;
  usersFn: () => void;
}

export const InvitationDialog: React.FC<InvitationDialogProps> = ({
  users,
  inputRef,
  inviteFn,
  usersFn
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          startContent={<PlusIcon />}
          variant="outline"
          className="rounded-full p-2"
          iconOnly
        ></Button>
      </DialogTrigger>

      <DialogBody>
        <DialogHeader title="Invite collaborator">
          Search for a user by his name or email and invite him to collaborate
          on your project
        </DialogHeader>

        <div className="flex items-end gap-3 w-full">
          <Input ref={inputRef} placeholder="Name or e-mail" />
          <Button onClick={usersFn}>Search</Button>
        </div>

        {!!users.length && (
          <div className="mt-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <Avatar user={user} showName showEmail />
                <Button color="success" onClick={() => inviteFn(user)}>
                  Invite
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};
