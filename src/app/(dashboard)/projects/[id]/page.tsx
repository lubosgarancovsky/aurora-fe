import { Board, StoryDetailDialog, Team } from "@/components";
import { ProjectDetailProvider } from "@/context";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({
  params: { id }
}: ProjectDetailPageProps) {
  return (
    <ProjectDetailProvider projectId={id}>
      <main className="p-8">
        <Team />
        <Board />
        <StoryDetailDialog />
      </main>
    </ProjectDetailProvider>
  );
}
