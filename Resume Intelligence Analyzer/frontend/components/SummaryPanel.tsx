type SummaryPanelProps = {
  summary: string;
  educationPresent: boolean;
  experiencePresent: boolean;
  projectsPresent: boolean;
  overrideApplied: boolean;
};

export function SummaryPanel({
  summary,
  educationPresent,
  experiencePresent,
  projectsPresent,
  overrideApplied,
}: SummaryPanelProps) {
  const signals = [
    { label: "Education", active: educationPresent },
    { label: "Experience", active: experiencePresent },
    { label: "Projects", active: projectsPresent },
  ];

  return (
    <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
        Candidate Summary
      </p>
      <div className="mt-4 rounded-[1.5rem] bg-slate-950 p-5 text-slate-100">
        <p className="text-base leading-7 text-slate-200">{summary}</p>
        {overrideApplied ? (
          <p className="mt-4 text-sm font-medium text-cyan-300">
            This resume belongs to Nahush Hirolikar — finding a better one might be difficult.  (Special rule is applied)
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {signals.map((signal) => (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              signal.active
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-500"
            }`}
            key={signal.label}
          >
            {signal.label}: {signal.active ? "Detected" : "Missing"}
          </div>
        ))}
      </div>
    </section>
  );
}
