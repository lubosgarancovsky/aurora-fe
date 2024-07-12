"use client";
import { useBoard } from "@/components/board/Board/useBoard";
import { useSelectedStory } from "@/components/board/ListOfStories/useSelectedStory";
import { createContext, useContext } from "react";

const ProjectDetailContext = createContext<any>(null);

export const useProjectDetail = () => {
  const ctx = useContext(ProjectDetailContext);

  if (!ctx) {
    throw new Error(
      "useProjectDetail must be used within a ProjectDetailProvider"
    );
  }

  return ctx;
};

export const ProjectDetailProvider = ({
  children,
  projectId
}: {
  children: React.ReactNode;
  projectId: string;
}) => {
  const board = useBoard(projectId);
  const detail = useSelectedStory();

  return (
    <ProjectDetailContext.Provider
      value={{
        board,
        detail,
        projectId
      }}
    >
      {children}
    </ProjectDetailContext.Provider>
  );
};
