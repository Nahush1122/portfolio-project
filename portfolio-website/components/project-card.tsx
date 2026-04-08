import Link from "next/link";
import type { Project } from "@/lib/data";
import { TagChip } from "@/components/tag-chip";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-[0_16px_40px_rgba(5,12,24,0.24)] transition duration-300 ease-in-out hover:scale-105 hover:border-cyan-300/30 hover:shadow-[0_28px_65px_rgba(8,18,36,0.34)]">
      <div className="flex h-full flex-col gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
              {project.category}
            </span>
            {project.cardTags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {project.shortDescription}
            </p>
          </div>
        </div>

        <div className="rounded-[20px] border border-emerald-300/15 bg-emerald-300/10 p-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-100/90">
            Why it matters
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-100">{project.whyItMatters}</p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/80">
              Problem
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{project.cardProblem}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/80">
                Impact
              </p>
              <div className="mt-2 space-y-2">
                {project.cardImpact.map((item) => (
                  <p key={item} className="text-sm leading-7 text-slate-300">
                    - {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/80">
                Output
              </p>
              <div className="mt-2 space-y-2">
                {project.cardOutput.map((item) => (
                  <p key={item} className="text-sm leading-7 text-slate-300">
                    - {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/80">
            Tech Stack
          </p>
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
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-950/30 transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-105 hover:shadow-[0_0_30px_rgba(97,195,255,0.32)]"
          >
            View Details
          </Link>
          <Link
            href={project.codeUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-slate-500/70 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 ease-in-out hover:border-cyan-300/45 hover:bg-slate-700/40 hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.51 2.32 1.08 2.89.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.03A9.55 9.55 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.3 2.74-1.03 2.74-1.03.55 1.4.2 2.44.1 2.69.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.69-4.58 4.94.36.31.68.91.68 1.84v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
            View Code
          </Link>
        </div>
      </div>
    </article>
  );
}
