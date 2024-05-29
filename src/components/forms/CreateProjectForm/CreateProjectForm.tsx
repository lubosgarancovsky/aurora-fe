"use client";

import React, { useState } from "react";
import ApiClient from "@/utils/api/axios/client";
import { Divider, Button, Input } from "@/components/core";
import { PairsList } from "@/components/core/PairsList";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProjectRequest } from "@/utils/api/dto/projects";

export const CreateProjectForm: React.FC = () => {
  const [links, setLinks] = useState<Record<string, string>>({});
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["createProject"],
    onSuccess: () => router.replace("/projects"),
    mutationFn: ({ name, description, code, links }: ProjectRequest) =>
      ApiClient.post("v1/projects", {
        name,
        description,
        code,
        links
      })
  });

  const mapLinks = () => {
    return Object.entries(links).map(([key, value]) => {
      return { name: key, url: value };
    });
  };

  const handleCreateProject = (data: FormData) => {
    const requestBody: ProjectRequest = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      code: data.get("code") as string,
      links: mapLinks()
    };

    mutate(requestBody);
  };

  return (
    <form className="flex flex-col gap-4" action={handleCreateProject}>
      <Input label="Project name" name="name" required />
      <Input label="Description" name="description" fullWidth optional />
      <div>
        <Input
          label="Code"
          className="uppercase"
          name="code"
          required
          minLength={3}
          maxLength={5}
        />
        <p className="text-foreground-dark mt-1.5">
          Project code has to be between 3 and 5 characters.
        </p>
      </div>
      <PairsList label="Links" onChange={(items) => setLinks(items)} />
      <Divider />
      <Button color="success" className="ml-auto" type="submit">
        Create project
      </Button>
    </form>
  );
};
