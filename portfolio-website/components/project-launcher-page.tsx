import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import type { ProjectLauncher } from "@/lib/project-launchers";

type ProjectLauncherPageProps = {
  project: ProjectLauncher;
};

export function ProjectLauncherPage({ project }: ProjectLauncherPageProps) {
  return (
    <DashboardShell
      eyebrow={project.eyebrow}
      title={project.title}
      description={project.description}
    >
      {/* Showcase header and launch CTA */}
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Project Overview
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-200">
            This portfolio page acts as a showcase and external launcher only. The
            application UI itself is not embedded or redesigned here, so the original
            experience remains unchanged.
          </p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Demo Access
          </p>
          <div className="mt-4 rounded-[24px] border border-cyan-300/15 bg-cyan-300/10 p-5">
            <p className="text-sm font-semibold text-cyan-100">Running application</p>
            <p className="mt-2 break-all text-sm text-slate-200">{project.launchUrl}</p>
          </div>

          <Link
            href={project.launchUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            {project.launchLabel}
          </Link>
        </div>
      </section>

      {/* Architecture and technology stack */}
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Architecture Overview
          </p>
          <div className="mt-5 space-y-3">
            {project.architecture.map((item, index) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Layer 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item}</p>
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
              Key Features
            </p>
            <div className="mt-5 space-y-3">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
