import { DashboardAnalysis } from "@/lib/types";

type StatsPanelProps = {
  analysis: DashboardAnalysis | null;
};

export function StatsPanel({ analysis }: StatsPanelProps) {
  if (!analysis) {
    return (
      <section className="panel p-6">
        <h3 className="text-xl font-semibold text-ink">Statistics</h3>
        <p className="mt-3 text-sm text-slate-500">Summary metrics will appear after analysis.</p>
      </section>
    );
  }

  const topMissing = [...analysis.missing_values]
    .sort((first, second) => second.missing - first.missing)
    .slice(0, 5);

  return (
    <section className="panel p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-cyan-50 p-5">
          <p className="text-sm text-slate-500">Rows</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{analysis.shape.rows}</p>
        </div>
        <div className="rounded-3xl bg-orange-50 p-5">
          <p className="text-sm text-slate-500">Columns</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{analysis.shape.columns}</p>
        </div>
        <div className="rounded-3xl bg-lime-50 p-5">
          <p className="text-sm text-slate-500">Numeric Summaries</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{analysis.summary_statistics.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Column Types</h4>
          <div className="mt-3 space-y-2">
            {Object.entries(analysis.column_types).map(([column, type]) => (
              <div key={column} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-ink">{column}</span>
                <span className="rounded-full bg-white px-3 py-1 text-slate-600">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Missing Values</h4>
          <div className="mt-3 space-y-2">
            {topMissing.map((item) => (
              <div key={item.column} className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{item.column}</span>
                  <span className="text-slate-500">{item.missing} missing</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-coral"
                    style={{ width: `${Math.min(item.missing_percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {analysis.summary_statistics.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Summary Statistics</h4>
          <table className="mt-3 min-w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr>
                {["Column", "Mean", "Std", "Min", "Median", "Max"].map((header) => (
                  <th key={header} className="rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analysis.summary_statistics.map((item) => (
                <tr key={item.column}>
                  <td className="rounded-2xl bg-white px-4 py-3 font-medium text-ink">{item.column}</td>
                  <td className="rounded-2xl bg-white px-4 py-3 text-slate-600">{item.mean?.toFixed?.(2) ?? "-"}</td>
                  <td className="rounded-2xl bg-white px-4 py-3 text-slate-600">{item.std?.toFixed?.(2) ?? "-"}</td>
                  <td className="rounded-2xl bg-white px-4 py-3 text-slate-600">{item.min?.toFixed?.(2) ?? "-"}</td>
                  <td className="rounded-2xl bg-white px-4 py-3 text-slate-600">{item["50%"]?.toFixed?.(2) ?? "-"}</td>
                  <td className="rounded-2xl bg-white px-4 py-3 text-slate-600">{item.max?.toFixed?.(2) ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
