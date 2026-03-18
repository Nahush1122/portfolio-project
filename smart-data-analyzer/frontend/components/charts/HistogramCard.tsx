"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HistogramChart } from "@/lib/types";

type HistogramCardProps = {
  chart: HistogramChart;
};

export function HistogramCard({ chart }: HistogramCardProps) {
  return (
    <section className="panel p-5">
      <h4 className="text-lg font-semibold text-ink">{chart.column} Distribution</h4>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey="label" angle={-20} textAnchor="end" interval={0} height={60} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
