import { DashboardShell } from "@/components/dashboard-shell";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <DashboardShell
      eyebrow="Projects"
      title="Selected analytics and machine learning products."
      description="These case studies show how I approach problem framing, architecture design, stakeholder usability, and production-minded implementation across data-heavy applications."
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </DashboardShell>
  );
}
