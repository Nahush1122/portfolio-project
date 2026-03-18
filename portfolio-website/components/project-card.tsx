import Link from "next/link";
import type { Project } from "@/lib/data";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-panel rounded-[28px] p-6">
      <div className="flex h-full flex-col gap-5">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
            {project.category}
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {project.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            View Details
          </Link>
          <Link
            href={project.codeUrl}
            target="_blank"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            View Code
          </Link>
        </div>
      </div>
    </article>
  );
}
