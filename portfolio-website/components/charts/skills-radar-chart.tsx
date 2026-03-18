"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ChartPlaceholder, useChartReady } from "@/components/charts/chart-ready";

type SkillsRadarChartProps = {
  data: {
    area: string;
    score: number;
  }[];
};

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  const isChartReady = useChartReady();

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Capability Radar</h3>
        <p className="text-sm text-slate-400">
          Balanced strengths across analytics, deployment, and ML engineering.
        </p>
      </div>
      <div className="h-72 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.16)" />
              <PolarAngleAxis dataKey="area" tick={{ fill: "#d9e8f8", fontSize: 12 }} />
              <Radar
                name="Skill Score"
                dataKey="score"
                stroke="#1ef2b1"
                fill="#1ef2b1"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-72" />
        )}
      </div>
    </div>
  );
}
