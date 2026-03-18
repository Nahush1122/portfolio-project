import { DashboardShell } from "@/components/dashboard-shell";
import { SkillsRadarChart } from "@/components/charts/skills-radar-chart";
import { skillGroups, skillRadarData } from "@/lib/data";

export default function SkillsPage() {
  return (
    <DashboardShell
      eyebrow="Skills"
      title="The stack behind analytics products and ML-driven interfaces."
      description="Grouped by discipline to make scanning easy for recruiters, collaborators, and clients while still showing how the toolset works together in practice."
    >
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="glass-panel rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {group.title}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SkillsRadarChart data={skillRadarData} />
      </section>
    </DashboardShell>
  );
}
