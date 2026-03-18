import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { ServerStatusChart } from "@/components/charts/server-status-chart";
import { serverStatus } from "@/lib/data";

export default function ServerStatusPage() {
  return (
    <DashboardShell
      eyebrow="Server Status"
      title="Operational telemetry for portfolio infrastructure."
      description="These values are mocked for now, but the layout is ready to connect to a monitoring API or status endpoint later."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Status" value={serverStatus.status} hint="Last checked moments ago" tone="success" />
        <MetricCard label="Uptime" value={serverStatus.uptime} hint="30-day average" />
        <MetricCard label="CPU Usage" value={serverStatus.cpuUsage} hint="Healthy operating range" tone="warning" />
        <MetricCard label="Memory" value={serverStatus.memoryUsage} hint="Within target threshold" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <ServerStatusChart data={serverStatus.chartData} />

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Service Notes
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[22px] border border-emerald-300/20 bg-emerald-300/10 p-4">
              <p className="text-sm font-semibold text-emerald-100">API Layer</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Core endpoints healthy with no degraded service flags.
              </p>
            </div>
            <div className="rounded-[22px] border border-cyan-300/20 bg-cyan-300/10 p-4">
              <p className="text-sm font-semibold text-cyan-100">Deployment</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Mock environment configured for fast swap to real metrics.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Next Step</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Connect a small `/api/status` endpoint or third-party monitoring feed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
