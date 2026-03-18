import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { aiTools } from "@/lib/data";

export default function AiToolsLabPage() {
  return (
    <DashboardShell
      eyebrow="AI Tools Lab"
      title="A workspace for LLM-assisted analytics and automation, with new projects currently under development."
      description="This section is currently under development. Projects focused on LLM-assisted analytics and automation are being built and will be available here soon."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Agents" value="04" hint="Prompt-driven utilities" />
        <MetricCard label="Workflow Mode" value="Hybrid" hint="Human + AI decision loops" tone="success" />
        <MetricCard label="Expansion" value="Under Development" hint="Designed for future tool cards" tone="warning" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {aiTools.map((tool) => (
          <article key={tool.name} className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">AI Module</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{tool.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{tool.summary}</p>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
