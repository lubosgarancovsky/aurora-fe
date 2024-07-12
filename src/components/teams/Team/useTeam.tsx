import ApiClient from "@/utils/api/axios/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Team as TeamDto } from "@/utils/api/dto/teams";
import { PublicUser } from "@/utils/api/dto/user";
import { useMemo, useRef } from "react";
import { Page } from "@/utils/api/dto/page";
import { useSession } from "next-auth/react";

export const useTeam = (projectId: string) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const { data, status } = useQuery<AxiosResponse<TeamDto>>({
    queryKey: ["team"],
    queryFn: () => ApiClient.get(`/v1/projects/${projectId}/teams`, {})
  });

  const { data: users, refetch } = useQuery<AxiosResponse<Page<PublicUser>>>({
    enabled: false,
    queryKey: ["usersByName"],
    queryFn: () =>
      ApiClient.get("/v1/users", {
        params: {
          filter: `name=like="*${inputRef.current?.value}*",email=like="*${inputRef.current?.value}*"`
        }
      })
  });

  const { mutate: create } = useMutation({
    mutationKey: ["createTeam"],
    mutationFn: () => ApiClient.post(`/v1/projects/${projectId}/teams`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team"] })
  });

  const { mutate: invite } = useMutation({
    mutationKey: ["invite"],
    mutationFn: (user: PublicUser) =>
      ApiClient.post(`/v1/invitations`, {
        recipientId: user.id,
        teamId: data?.data.id
      })
  });

  const team = useMemo(() => {
    const user = session?.user;
    const teamData = data?.data;
    if (status === "success" && teamData && user) {
      const membersArr = teamData.members.filter(
        (member) => member.id !== user.id
      );

      const publicUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture || null,
        color: user.color
      };

      return { ...teamData, members: [publicUser, ...membersArr] };
    }

    return null;
  }, [data, status]);

  return {
    team: {
      data: team,
      status,
      create
    },
    users: {
      input: inputRef,
      data: users?.data.items || [],
      invite,
      refetch
    }
  };
};
