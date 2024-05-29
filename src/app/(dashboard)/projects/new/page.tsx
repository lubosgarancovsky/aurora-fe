import { Column, Divider } from "@/components";
import { CreateProjectForm } from "@/components/forms/CreateProjectForm/CreateProjectForm";

export default function NewProjectPage() {
  return (
    <main className="py-8">
      <Column>
        <h2>Create new project</h2>
        <p className="text-foreground-dark">Start managing new project</p>
        <Divider />

        <CreateProjectForm />
      </Column>
    </main>
  );
}
