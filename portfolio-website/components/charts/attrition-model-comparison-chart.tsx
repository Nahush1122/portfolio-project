"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartPlaceholder, useChartReady } from "@/components/charts/chart-ready";

type AttritionModelComparisonChartProps = {
  data: {
    model: string;
    accuracy: number;
    f1: number;
  }[];
};

const highlightColor = "#1ef2b1";
const baseColor = "#61c3ff";

export function AttritionModelComparisonChart({
  data,
}: AttritionModelComparisonChartProps) {
  const isChartReady = useChartReady();

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Model Comparison</h3>
        <p className="text-sm text-slate-400">
          M1 binary-classification comparison from the internship presentation.
        </p>
      </div>

      <div className="h-80 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 30 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="model"
                stroke="#7f93af"
                angle={-18}
                textAnchor="end"
                interval={0}
                height={70}
              />
              <YAxis stroke="#7f93af" />
              <Tooltip
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(7,17,31,0.95)",
                }}
              />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy (%)" radius={[10, 10, 0, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={`${entry.model}-accuracy`}
                    fill={entry.model === "XGBoost" ? highlightColor : baseColor}
                  />
                ))}
              </Bar>
              <Bar dataKey="f1" name="F1 Score (%)" fill="#ffb24d" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-80" />
        )}
      </div>
    </div>
  );
}
