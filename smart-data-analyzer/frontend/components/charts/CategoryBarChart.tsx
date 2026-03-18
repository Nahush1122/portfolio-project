"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CategoryBarChart as CategoryBarChartType } from "@/lib/types";

type CategoryBarChartProps = {
  chart: CategoryBarChartType;
};

export function CategoryBarChart({ chart }: CategoryBarChartProps) {
  return (
    <section className="panel p-5">
      <h4 className="text-lg font-semibold text-ink">{chart.column} Categories</h4>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey="label" interval={0} angle={-12} textAnchor="end" height={50} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
