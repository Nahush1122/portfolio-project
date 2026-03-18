"use client";

import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { ScatterRelationship } from "@/lib/types";

type ScatterCardProps = {
  scatter: ScatterRelationship;
};

export function ScatterCard({ scatter }: ScatterCardProps) {
  if (!scatter) {
    return (
      <section className="panel p-5">
        <h4 className="text-lg font-semibold text-ink">Scatter Relationship</h4>
        <p className="mt-3 text-sm text-slate-500">At least two numeric columns are needed to build a scatterplot.</p>
      </section>
    );
  }

  return (
    <section className="panel p-5">
      <h4 className="text-lg font-semibold text-ink">
        Relationship: {scatter.x_axis} vs {scatter.y_axis}
      </h4>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis type="number" dataKey="x" name={scatter.x_axis} fontSize={12} />
            <YAxis type="number" dataKey="y" name={scatter.y_axis} fontSize={12} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={scatter.data} fill="#65a30d" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
