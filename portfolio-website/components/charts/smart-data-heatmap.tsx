"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChartPlaceholder, useChartReady } from "@/components/charts/chart-ready";
import type { CorrelationPoint } from "@/lib/smart-data-analyzer";

type SmartDataHeatmapProps = {
  data: CorrelationPoint[];
};

function getCellColor(value: number) {
  if (value >= 0.75) return "#1ef2b1";
  if (value >= 0.35) return "#61c3ff";
  if (value <= -0.75) return "#ff6b88";
  if (value <= -0.35) return "#ffb24d";
  return "#6f86a4";
}

function HeatCell(props: {
  cx?: number;
  cy?: number;
  payload?: CorrelationPoint;
}) {
  const { cx = 0, cy = 0, payload } = props;
  const fill = payload ? getCellColor(payload.value) : "#6f86a4";

  return (
    <rect
      x={cx - 18}
      y={cy - 18}
      width={36}
      height={36}
      rx={10}
      fill={fill}
      fillOpacity={0.9}
      stroke="rgba(255,255,255,0.18)"
    />
  );
}

export function SmartDataHeatmap({ data }: SmartDataHeatmapProps) {
  const isChartReady = useChartReady();
  const columns = [...new Set(data.map((point) => point.x))];
  const rows = [...new Set(data.map((point) => point.y))];

  const chartData = data.map((point) => ({
    ...point,
    xIndex: columns.indexOf(point.x),
    yIndex: rows.indexOf(point.y),
  }));

  return (
    <div className="glass-panel rounded-[28px] p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Correlation Heatmap</h3>
        <p className="text-sm text-slate-400">
          Numeric feature relationships from the FastAPI analysis service.
        </p>
      </div>

      <div className="h-80 w-full">
        {isChartReady ? (
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 20, right: 12, bottom: 30, left: 12 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis
                type="number"
                dataKey="xIndex"
                domain={[-0.5, Math.max(columns.length - 0.5, 0)]}
                ticks={columns.map((_, index) => index)}
                tickFormatter={(value) => columns[value] ?? ""}
                stroke="#7f93af"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={70}
              />
              <YAxis
                type="number"
                dataKey="yIndex"
                domain={[-0.5, Math.max(rows.length - 0.5, 0)]}
                ticks={rows.map((_, index) => index)}
                tickFormatter={(value) => rows[value] ?? ""}
                stroke="#7f93af"
                interval={0}
                width={110}
              />
              <ZAxis type="number" dataKey="value" range={[150, 150]} />
              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.12)" }}
                formatter={(value) => [Number(value ?? 0).toFixed(3), "Correlation"]}
                labelFormatter={(_, payload) => {
                  const point = payload?.[0]?.payload as CorrelationPoint | undefined;
                  return point ? `${point.y} vs ${point.x}` : "";
                }}
                contentStyle={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(7,17,31,0.95)",
                }}
              />
              <Scatter data={chartData} shape={<HeatCell />} />
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder heightClass="h-80" />
        )}
      </div>
    </div>
  );
}
