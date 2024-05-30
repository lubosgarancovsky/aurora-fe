import { Board, Team } from "@/components";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({
  params: { id }
}: ProjectDetailPageProps) {
  return (
    <main className="p-8">
      <Team projectId={id} />
      <Board projectId={id} />
    </main>
  );
}
