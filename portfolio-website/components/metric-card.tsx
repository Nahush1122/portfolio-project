type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "success" | "warning";
};

const toneClasses = {
  default: "from-cyan-400/15 to-blue-400/5 text-cyan-100",
  success: "from-emerald-400/15 to-teal-400/5 text-emerald-100",
  warning: "from-amber-400/15 to-orange-400/5 text-amber-100",
};

export function MetricCard({
  label,
  value,
  hint,
  tone = "default",
}: MetricCardProps) {
  return (
    <div
      className={`glass-panel rounded-[24px] bg-gradient-to-br ${toneClasses[tone]} p-5`}
    >
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <p className="text-right text-xs text-slate-400">{hint}</p>
      </div>
    </div>
  );
}
