import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { TileCard } from "@/components/tile-card";
import { dashboardTiles, projects } from "@/lib/data";

const proofPoints = [
  "4+ AI/ML & Data Projects",
  "Internship at Bajaj Auto (HR Analytics)",
  "Google Data Analytics Certified",
  "Strong foundation in Python, SQL & Machine Learning",
];

export default function HomePage() {
  return (
    <DashboardShell
      eyebrow="Nahush Hirolikar portfolio"
      title="AI/ML Engineer | Data Scientist | Data Analyst"
      description="I build data-driven systems that predict outcomes, uncover insights, and enable intelligent decision-making across business workflows."
      centered
      headerContent={
        <div className="space-y-5">
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Focused on building practical AI systems that bridge data, machine learning, and real-world business impact.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {proofPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100"
              >
                {`✔ ${point}`}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_24px_rgba(97,195,255,0.2)] transition duration-300 ease-in-out hover:scale-105 hover:from-emerald-200 hover:to-cyan-200 hover:shadow-[0_0_28px_rgba(97,195,255,0.32)]"
            >
              View Projects
            </Link>
            <Link
              href="https://drive.google.com/file/d/1yXJ8KqsmZFyBnYuBcy0YnuEXbB9NA1jD/view?usp=sharing"
              target="_blank"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:scale-105 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:shadow-[0_0_24px_rgba(97,195,255,0.18)]"
            >
              Download Resume
            </Link>
          </div>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardTiles.map((tile) => (
          <TileCard
            key={tile.title}
            {...tile}
            external={tile.href.startsWith("http")}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Portfolio Pulse
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Current focus areas
              </h2>
            </div>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-emerald-100">
              Building
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Applied ML Systems</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Turning predictive models into decision-ready interfaces.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Automation Design</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Removing repetitive reporting and document-processing tasks.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Dashboard Delivery</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Shipping interfaces that help teams trust and act on data.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Featured Builds
          </p>
          <div className="mt-5 space-y-4">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.slug}
                className="rounded-[22px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold text-white">{project.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {project.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] p-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
          Let&apos;s Build
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          🚀 Ready to build real-world AI/ML and data-driven solutions that create impact.

Let’s connect and build something meaningful.
        </h2>
        <p className="mt-3 text-base text-slate-300">Let&apos;s connect.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_24px_rgba(97,195,255,0.2)] transition duration-300 ease-in-out hover:scale-105 hover:from-emerald-200 hover:to-cyan-200 hover:shadow-[0_0_28px_rgba(97,195,255,0.32)]"
          >
            Contact Me
          </Link>
          <Link
            href="https://drive.google.com/file/d/1yXJ8KqsmZFyBnYuBcy0YnuEXbB9NA1jD/view?usp=sharing"
            target="_blank"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:scale-105 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:shadow-[0_0_24px_rgba(97,195,255,0.18)]"
          >
            Download Resume
          </Link>
        </div>
      </section>
    </DashboardShell>
  );
}
