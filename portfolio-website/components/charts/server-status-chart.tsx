"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartPlaceholder, useChartReady } from "@/components/charts/chart-ready";

type ServerStatusChartProps = {
  data: {
    metric: string;
    value: number;
  }[];
};

export function ServerStatusChart({ data }: ServerStatusChartProps) {
  const isChartReady = useChartReady();

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Resource Utilization</h3>
        <p className="text-sm text-slate-400">
          Mocked telemetry for the demo dashboard, ready for API integration later.
        </p>
      </div>

      <div className="h-72 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="metric" stroke="#7f93af" />
              <YAxis stroke="#7f93af" domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${Number(value ?? 0)}%`, "Usage"]}
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(7,17,31,0.95)",
                }}
              />
              <Bar dataKey="value" fill="#61c3ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-72" />
        )}
      </div>
    </div>
  );
}
