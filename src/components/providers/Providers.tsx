"use client";

import React, { useRef } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  session: any;
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ session, children }) => {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};
