"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartPlaceholder, useChartReady } from "@/components/charts/chart-ready";

type ProjectImpactChartProps = {
  data: {
    phase: string;
    score: number;
  }[];
};

export function ProjectImpactChart({ data }: ProjectImpactChartProps) {
  const isChartReady = useChartReady();

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Impact Curve</h3>
        <p className="text-sm text-slate-400">
          Snapshot of the delivery impact across the project lifecycle.
        </p>
      </div>

      <div className="h-72 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="impactGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#61c3ff" stopOpacity={0.75} />
                  <stop offset="95%" stopColor="#61c3ff" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="phase" stroke="#7f93af" />
              <YAxis stroke="#7f93af" />
              <Tooltip
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(7,17,31,0.95)",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#61c3ff"
                strokeWidth={3}
                fill="url(#impactGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-72" />
        )}
      </div>
    </div>
  );
}
