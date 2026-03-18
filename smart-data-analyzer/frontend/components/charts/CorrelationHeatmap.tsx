"use client";

import { Fragment } from "react";
import { CorrelationPoint } from "@/lib/types";

type CorrelationHeatmapProps = {
  data: CorrelationPoint[];
};

function getCellColor(value: number) {
  if (value > 0.7) return "bg-emerald-500 text-white";
  if (value > 0.3) return "bg-emerald-200 text-ink";
  if (value < -0.7) return "bg-rose-500 text-white";
  if (value < -0.3) return "bg-rose-200 text-ink";
  return "bg-slate-100 text-slate-700";
}

export function CorrelationHeatmap({ data }: CorrelationHeatmapProps) {
  if (data.length === 0) {
    return (
      <section className="panel p-5">
        <h4 className="text-lg font-semibold text-ink">Correlation Heatmap</h4>
        <p className="mt-3 text-sm text-slate-500">At least two numeric columns are needed for correlation analysis.</p>
      </section>
    );
  }

  const labels = Array.from(new Set(data.map((point) => point.x)));

  return (
    <section className="panel p-5">
      <h4 className="text-lg font-semibold text-ink">Correlation Heatmap</h4>
      <div className="mt-4 overflow-x-auto">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `120px repeat(${labels.length}, minmax(84px, 1fr))`
          }}
        >
          <div />
          {labels.map((label) => (
            <div key={label} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {label}
            </div>
          ))}
          {labels.map((rowLabel) => (
            <Fragment key={rowLabel}>
              <div className="flex items-center justify-end px-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                {rowLabel}
              </div>
              {labels.map((columnLabel) => {
                const cell = data.find((point) => point.x === columnLabel && point.y === rowLabel);
                const value = cell?.value ?? 0;

                return (
                  <div
                    key={`${rowLabel}-${columnLabel}`}
                    className={`rounded-2xl px-2 py-4 text-center text-sm font-semibold ${getCellColor(value)}`}
                  >
                    {value.toFixed(2)}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
