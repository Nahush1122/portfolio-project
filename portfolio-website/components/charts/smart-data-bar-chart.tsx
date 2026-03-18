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

type SmartDataBarChartProps = {
  title: string;
  description: string;
  data: {
    label: string;
    count: number;
  }[];
  color?: string;
};

export function SmartDataBarChart({
  title,
  description,
  data,
  color = "#61c3ff",
}: SmartDataBarChartProps) {
  const isChartReady = useChartReady();

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>

      <div className="h-72 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 30 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#7f93af"
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis stroke="#7f93af" />
              <Tooltip
                formatter={(value) => [Number(value ?? 0), "Count"]}
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(7,17,31,0.95)",
                }}
              />
              <Bar dataKey="count" fill={color} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-72" />
        )}
      </div>
    </div>
  );
}
