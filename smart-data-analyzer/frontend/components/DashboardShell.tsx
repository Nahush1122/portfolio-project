"use client";

import { useState } from "react";
import { analyzeDataset, uploadDataset } from "@/lib/api";
import { AnalysisResponse, DashboardAnalysis, DatasetPreview, VisualizationResponse } from "@/lib/types";
import { DatasetPreview as DatasetPreviewTable } from "@/components/DatasetPreview";
import { InsightsSummary } from "@/components/InsightsSummary";
import { StatsPanel } from "@/components/StatsPanel";
import { UploadSection } from "@/components/UploadSection";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { CorrelationHeatmap } from "@/components/charts/CorrelationHeatmap";
import { HistogramCard } from "@/components/charts/HistogramCard";
import { ScatterCard } from "@/components/charts/ScatterCard";

export function DashboardShell() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [preview, setPreview] = useState<DatasetPreview | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [visualization, setVisualization] = useState<VisualizationResponse | null>(null);

  const dashboardAnalysis: DashboardAnalysis | null = analysis
    ? {
        shape: analysis.summary.shape,
        column_types: analysis.columns.types,
        summary_statistics: analysis.summary.summary_statistics,
        missing_values: analysis.summary.missing_values,
        correlation_matrix: analysis.summary.correlation_matrix,
        insights: analysis.insights
      }
    : null;

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      // Upload once, then fan out to analysis and visualization endpoints in parallel.
      const uploadResult = await uploadDataset(selectedFile);
      setFilename(uploadResult.filename);
      setPreview(uploadResult.preview);

      const analysisResult = await analyzeDataset(uploadResult.dataset_id);
      setAnalysis(analysisResult);
      setVisualization(analysisResult.charts);
    } catch (uploadError) {
      const message =
        uploadError instanceof TypeError
          ? "Failed to fetch"
          : uploadError instanceof Error
            ? uploadError.message
            : "Failed to fetch";
      setError(message);
      setAnalysis(null);
      setVisualization(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-grid bg-[size:40px_40px] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-10 text-white shadow-panel md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">Smart Data Analyzer</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Turn raw CSV files into readable insights and visual stories.
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
                This dashboard uploads your dataset, profiles its structure, detects missing values, highlights numeric relationships, and creates chart-ready summaries for quick exploration.
              </p>
            </div>
            <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-sm text-slate-400">Included analysis</p>
                <p className="mt-2 text-lg font-semibold">Shape, types, stats, missing values, correlations, and automated chart data</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-white/10 px-3 py-4">
                  <p className="text-2xl font-semibold">CSV</p>
                  <p className="mt-1 text-slate-300">Input</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-4">
                  <p className="text-2xl font-semibold">Pandas</p>
                  <p className="mt-1 text-slate-300">Analysis</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-4">
                  <p className="text-2xl font-semibold">React</p>
                  <p className="mt-1 text-slate-300">Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6">
          <UploadSection
            selectedFile={selectedFile}
            loading={loading}
            onFileChange={setSelectedFile}
            onUpload={handleUpload}
          />

          {error && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          <DatasetPreviewTable filename={filename} preview={preview} />
          <StatsPanel analysis={dashboardAnalysis} />
          <InsightsSummary insights={analysis?.insights ?? []} />

          <section className="grid gap-6 xl:grid-cols-2">
            <CorrelationHeatmap data={visualization?.correlation_heatmap ?? []} />
            <ScatterCard scatter={visualization?.scatter_relationship ?? null} />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            {(visualization?.histograms ?? []).map((chart) => (
              <HistogramCard key={chart.column} chart={chart} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            {(visualization?.categorical_bars ?? []).map((chart) => (
              <CategoryBarChart key={chart.column} chart={chart} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
