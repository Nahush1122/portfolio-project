"use client";

import { useEffect, useState } from "react";

export function useChartReady() {
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    setIsChartReady(true);
  }, []);

  return isChartReady;
}

export function ChartPlaceholder({ heightClass }: { heightClass: string }) {
  return (
    <div
      className={`${heightClass} flex w-full items-center justify-center rounded-[20px] border border-dashed border-white/10 bg-white/5 text-sm text-slate-500`}
    >
      Preparing chart...
    </div>
  );
}
