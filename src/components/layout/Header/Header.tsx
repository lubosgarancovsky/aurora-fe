"use client";

import React from "react";
import { Avatar } from "@/components/core/Avatar";
import { signOut, useSession } from "next-auth/react";
import {
  Action,
  ActionList,
  ActionListDivider,
  Button,
  Drawer,
  DrawerBody,
  DrawerTrigger
} from "@/components/core";
import { publicUser } from "@/utils/user";
import {
  BoardIcon,
  BookmarkIcon,
  GearIcon,
  MailOpenIcon,
  PersonIcon,
  PlusIcon,
  TeamIcon
} from "@/components/icons";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data } = useSession();

  const user = publicUser(data?.user);

  return (
    <header className="p-4 bg-default flex justify-between border-b border-border">
      <span>Aurora</span>
      <div className="flex items-center gap-2">
        <Button
          startContent={<PlusIcon />}
          variant="outline"
          iconOnly
          href="/projects/new"
        ></Button>

        <Button
          startContent={<MailOpenIcon />}
          variant="outline"
          iconOnly
          href="/invitations"
        ></Button>

        <Drawer>
          <DrawerTrigger>
            <button>
              <Avatar user={user} />
            </button>
          </DrawerTrigger>
          <DrawerBody header={<Avatar user={user} showName showEmail />}>
            <ActionList>
              <Action icon={<PersonIcon />}>Profile</Action>
              <ActionListDivider />
              <Action icon={<BoardIcon />} href="/projects">
                Your projects
              </Action>
              <Action icon={<TeamIcon />}>Your teams</Action>
              <Action icon={<BookmarkIcon />}>Assigned work</Action>

              <ActionListDivider />
              <Action icon={<GearIcon />}>Settings</Action>
              <ActionListDivider />

              <Action onClick={() => signOut({ callbackUrl: "/login" })}>
                Sign out
              </Action>
            </ActionList>
          </DrawerBody>
        </Drawer>
      </div>
    </header>
  );
};
