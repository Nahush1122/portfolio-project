type ScoreGaugeProps = {
  score: number;
  message: string;
};

export function ScoreGauge({ score, message }: ScoreGaugeProps) {
  const angle = Math.max(0, Math.min(score, 100)) * 3.6;

  return (
    <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
        Resume Score
      </p>
      <div className="mt-6 flex items-center gap-6">
        <div
          className="grid h-40 w-40 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#1d4ed8 0deg ${angle}deg, #bfdbfe ${angle}deg 360deg)`,
          }}
        >
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center shadow-inner">
            <div>
              <p className="text-4xl font-bold text-ink">{score}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">out of 100</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-ink">Profile Quality Signal</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        </div>
      </div>
    </section>
  );
}
