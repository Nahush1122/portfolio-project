import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { ProjectImpactChart } from "@/components/charts/project-impact-chart";
import { projects } from "@/lib/data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <DashboardShell
      eyebrow={project.category}
      title={project.title}
      description={project.shortDescription}
    >
      {/* Overview and visualization section */}
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Project Overview
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-200">{project.overview}</p>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Problem Statement</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {project.problemStatement}
            </p>
          </div>
        </div>

        <ProjectImpactChart data={project.impactData} />
      </section>

      {/* Architecture, stack, and demo details */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Architecture Explanation
          </p>
          <div className="mt-5 space-y-3">
            {project.architecture.map((step, index) => (
              <div
                key={step}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Stage 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Technology Stack
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Demo Section
            </p>
            <div className="mt-5 space-y-3">
              {project.demoHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href={project.codeUrl}
              target="_blank"
              className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
            >
              Open GitHub Repository
            </Link>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
