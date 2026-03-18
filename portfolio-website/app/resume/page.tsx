import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { resumeData } from "@/lib/data";

export default function ResumePage() {
  return (
    <DashboardShell
      eyebrow="Resume"
      title="Nahush Hirolikar Resume"
      description="This section provides an overview of my professional background, including my profile summary, certifications, education, and experience. It highlights the knowledge, skills, and practical exposure I have gained while working on projects and exploring data and artificial intelligence."
    >
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Profile Summary
          </p>
          <p className="mt-4 text-base leading-8 text-slate-200">
            {resumeData.summary}
          </p>

          <Link
            href="/resume.pdf"
            className="mt-6 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            Download Resume PDF
          </Link>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Certifications
          </p>
          <div className="mt-4 space-y-3">
            {resumeData.certifications.map((certification) => (
              <div
                key={certification}
                className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                {certification}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Education
          </p>
          <div className="mt-5 space-y-4">
            {resumeData.education.map((item) => (
              <div
                key={item.degree}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-lg font-semibold text-white">{item.degree}</p>
                <p className="mt-1 text-sm text-slate-300">{item.institution}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                  {item.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Experience
          </p>
          <div className="mt-5 space-y-4">
            {resumeData.experience.map((item) => (
              <div
                key={`${item.company}-${item.role}`}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.role}</p>
                    <p className="text-sm text-slate-300">{item.company}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                    {item.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
