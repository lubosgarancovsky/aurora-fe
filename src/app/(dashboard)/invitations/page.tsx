"use client";

import { MailOpenIcon } from "@/components";
import {
  VerticalNavigation,
  VerticalNavigationButton
} from "@/components/core/VerticalNavigation";
import { InvitationsList } from "@/components/invitations/InvitationsList";
import { useState } from "react";

export default function InvitationsPage() {
  const [tab, setTab] = useState<"sent" | "received">("received");

  return (
    <main className="p-8 gap-8 grid grid-cols-6">
      <VerticalNavigation>
        <VerticalNavigationButton
          icon={<MailOpenIcon />}
          isActive={tab === "received"}
          onClick={() => setTab("received")}
        >
          Received
        </VerticalNavigationButton>
        <VerticalNavigationButton
          icon={<MailOpenIcon />}
          isActive={tab === "sent"}
          onClick={() => setTab("sent")}
        >
          Sent
        </VerticalNavigationButton>
      </VerticalNavigation>
      <div className="col-span-4">
        <InvitationsList variant={tab} />
      </div>
      <div className="col-span-2"></div>
    </main>
  );
}
