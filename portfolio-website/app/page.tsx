import { DashboardShell } from "@/components/dashboard-shell";
import { TileCard } from "@/components/tile-card";
import { dashboardTiles, projects } from "@/lib/data";

export default function HomePage() {
  return (
    <DashboardShell
      eyebrow="Analytics Portfolio"
      title="Nahush Hirolikar - A Personal Hub for Projects, AI Exploration, and Innovation"
      description="This portfolio showcases my work in data and artificial intelligence, where I build and experiment with AI-driven systems. It highlights projects and practical implementations that explore intelligent solutions, data insights, and innovative approaches to solving real-world problems."
    >
      {/* Primary navigation tiles */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardTiles.map((tile) => (
          <TileCard
            key={tile.title}
            {...tile}
            external={tile.href.startsWith("http")}
          />
        ))}
      </section>

      {/* Supporting dashboard insights */}
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
                  {project.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
