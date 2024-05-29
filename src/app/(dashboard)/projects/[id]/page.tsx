interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({
  params: { id }
}: ProjectDetailPageProps) {
  return <div>{id}</div>;
}
