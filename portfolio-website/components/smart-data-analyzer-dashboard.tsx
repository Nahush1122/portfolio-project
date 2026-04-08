"use client";

import { useState } from "react";
import { BackendLoadingCard } from "@/components/backend-loading-card";
import { MetricCard } from "@/components/metric-card";
import { ServerWakeControl } from "@/components/server-wake-control";
import {
  analyzeDataset,
  SMART_DATA_ANALYZER_API_BASE_URL,
  type AnalysisResponse,
  type DatasetPreview,
  type VisualizationResponse,
  uploadDataset,
  visualizeDataset,
} from "@/lib/smart-data-analyzer";
import { SmartDataBarChart } from "@/components/charts/smart-data-bar-chart";
import { SmartDataHeatmap } from "@/components/charts/smart-data-heatmap";
import { wakeBackendService } from "@/lib/service-health";
import { withRequestTimeout } from "@/lib/with-request-timeout";

type DashboardState = {
  datasetId: string;
  filename: string;
  preview: DatasetPreview;
  analysis: AnalysisResponse;
  visualizations: VisualizationResponse;
};

export function SmartDataAnalyzerDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dashboardState, setDashboardState] = useState<DashboardState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerReady, setIsServerReady] = useState(false);
  const [isWakingServer, setIsWakingServer] = useState(false);
  const [serverStatus, setServerStatus] = useState<string | null>(null);

  const handleWakeServer = async () => {
    setServerStatus("Waking server...");
    setError(null);
    setIsWakingServer(true);

    try {
      await wakeBackendService(SMART_DATA_ANALYZER_API_BASE_URL);
      setIsServerReady(true);
      setServerStatus("Server is ready");
    } catch (wakeError) {
      setIsServerReady(false);
      setServerStatus(
        wakeError instanceof Error
          ? wakeError.message
          : "Unable to start server. Please try again.",
      );
    } finally {
      setIsWakingServer(false);
    }
  };

  const handleUpload = async () => {
    if (!isServerReady) {
      setError("Please wake the server before starting analysis.");
      return;
    }

    if (!selectedFile) {
      setError("Please choose a CSV file before starting the analysis.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await withRequestTimeout(async (signal) => {
        const upload = await uploadDataset(selectedFile, signal);
        const [analysisResult, visualizations] = await Promise.all([
          analyzeDataset(upload.dataset_id, signal),
          visualizeDataset(upload.dataset_id, signal),
        ]);

        const analysis = {
          ...analysisResult,
          preview: analysisResult.preview ?? upload.preview,
        };

        return {
          datasetId: upload.dataset_id,
          filename: upload.filename,
          preview: upload.preview,
          analysis,
          visualizations,
        };
      });

      setDashboardState(response);
    } catch (uploadError) {
      setDashboardState(null);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Something went wrong while processing the dataset.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Project Header
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Smart Data Analyzer
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Upload a CSV file and explore a live analytics workflow powered by the
            FastAPI backend. The dashboard returns preview data, summary statistics,
            missing-value diagnostics, correlation insights, and chart-ready outputs.
          </p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Backend Service
          </p>
          <div className="mt-4 rounded-[22px] border border-emerald-300/20 bg-emerald-300/10 p-4">
            <p className="text-sm font-semibold text-emerald-100">FastAPI endpoint</p>
            <p className="mt-2 break-all text-sm text-slate-200">
              {SMART_DATA_ANALYZER_API_BASE_URL}
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            This page calls `POST /upload`, `POST /analyze`, and `POST /visualize`
            using the dataset id returned by the upload step.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              File Upload
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Analyze a dataset from the portfolio
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Wake the server once, then upload a CSV file and populate the
              analytics panels below.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={isLoading || isWakingServer || !isServerReady}
                className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_24px_rgba(97,195,255,0.2)] transition duration-300 ease-in-out hover:scale-105 hover:from-emerald-200 hover:to-cyan-200 hover:shadow-[0_0_28px_rgba(97,195,255,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Analyzing dataset..." : "Upload and Analyze"}
              </button>
              <ServerWakeControl
                isReady={isServerReady}
                isWaking={isWakingServer}
                statusMessage={serverStatus}
                onWake={handleWakeServer}
              />
            </div>
          </div>
        </div>

        {selectedFile ? (
          <p className="mt-4 text-sm text-slate-300">
            Selected file: <span className="font-medium text-white">{selectedFile.name}</span>
          </p>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}
      </section>

      {isWakingServer ? (
        <BackendLoadingCard
          title="Preparing analytics service"
          steps={[
            "Waking up server...",
            "Initializing backend services...",
            "Connecting to server...",
            "Preparing analysis engine...",
            "Almost ready...",
            "Still working, thanks for your patience...",
          ]}
          loopSteps
          showReassurance
        />
      ) : null}

      {isLoading ? (
        <BackendLoadingCard title="Preparing analytics workflow" />
      ) : null}

      {dashboardState ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Dataset" value={dashboardState.filename} hint="Uploaded CSV" />
            <MetricCard
              label="Rows"
              value={
                dashboardState.analysis?.preview?.shape?.rows?.toLocaleString() || "0"
              }
              hint="Parsed successfully"
              tone="success"
            />
            <MetricCard
              label="Columns"
              value={
                dashboardState.analysis?.preview?.shape?.columns?.toString() || "0"
              }
              hint="Detected fields"
            />
            <MetricCard
              label="Insights"
              value={dashboardState.analysis?.insights?.length?.toString() || "0"}
              hint="Generated automatically"
              tone="warning"
            />
          </section>

          <section className="glass-panel rounded-[28px] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Dataset Preview
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">First rows</h3>
              </div>
              <p className="text-sm text-slate-400">
                Shape: {dashboardState.analysis?.preview?.shape?.rows || "0"} x{" "}
                {dashboardState.analysis?.preview?.shape?.columns || "0"}
              </p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr>
                    {dashboardState.preview.columns.map((column) => (
                      <th key={column} className="px-3 py-2 font-medium text-slate-300">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dashboardState.preview.rows.map((row, index) => (
                    <tr key={`${dashboardState.datasetId}-${index}`}>
                      {dashboardState.preview.columns.map((column) => (
                        <td
                          key={`${index}-${column}`}
                          className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200"
                        >
                          {row[column] === null ? "null" : String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Summary Statistics
              </p>
              {dashboardState.analysis?.summary_statistics?.length ? (
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
                    <thead>
                      <tr>
                        {["column", "mean", "std", "min", "50%", "max"].map((header) => (
                          <th key={header} className="px-3 py-2 font-medium text-slate-300">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardState.analysis?.summary_statistics?.map((record) => (
                        <tr key={record.column}>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-white">
                            {record.column}
                          </td>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200">
                            {formatNumber(record.mean)}
                          </td>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200">
                            {formatNumber(record.std)}
                          </td>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200">
                            {formatNumber(record.min)}
                          </td>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200">
                            {formatNumber(record["50%"])}
                          </td>
                          <td className="rounded-[14px] border border-white/8 bg-white/5 px-3 py-3 text-slate-200">
                            {formatNumber(record.max)}
                          </td>
                        </tr>
                      )) || null}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState message="Summary statistics not available" />
              )}
            </div>

            <div className="space-y-4">
              <div className="glass-panel rounded-[28px] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Missing Values
                </p>
                <div className="mt-5 space-y-3">
                  {dashboardState.analysis?.missing_values?.map((item) => (
                    <div
                      key={item.column}
                      className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-medium text-white">{item.column}</p>
                        <p className="text-sm text-slate-300">
                          {item.missing} missing ({item.missing_percentage}%)
                        </p>
                      </div>
                    </div>
                  )) || <p className="text-sm text-slate-400">Missing values not available</p>}
                </div>
              </div>

              <div className="glass-panel rounded-[28px] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                  Correlation Insights
                </p>
                <div className="mt-5 space-y-3">
                  {dashboardState.analysis?.insights?.map((insight) => (
                    <div
                      key={insight}
                      className="rounded-[20px] border border-cyan-300/12 bg-cyan-300/10 px-4 py-3 text-sm leading-7 text-slate-100"
                    >
                      {insight}
                    </div>
                  )) || <p className="text-sm text-slate-400">Insights not available</p>}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4">
            {dashboardState.visualizations?.histograms?.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {dashboardState.visualizations?.histograms?.map((histogram) => (
                  <SmartDataBarChart
                    key={histogram.column}
                    title={`Histogram: ${histogram.column}`}
                    description="Distribution of values across backend-generated bins."
                    data={histogram.data}
                  />
                )) || null}
              </div>
            ) : null}

            {dashboardState.visualizations?.correlation_heatmap?.length ? (
              <SmartDataHeatmap
                data={dashboardState.visualizations.correlation_heatmap}
              />
            ) : (
              <EmptyState message="Correlation heatmap is available when at least two numeric columns exist." />
            )}

            {dashboardState.visualizations?.categorical_bars?.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {dashboardState.visualizations?.categorical_bars?.map((chart) => (
                  <SmartDataBarChart
                    key={chart.column}
                    title={`Category Distribution: ${chart.column}`}
                    description="Top categories returned by the visualization service."
                    data={chart.data}
                    color="#1ef2b1"
                  />
                )) || null}
              </div>
            ) : null}
          </section>
        </>
      ) : (
        <EmptyState message="Upload a CSV file to populate the preview, analysis results, and visualizations." />
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="glass-panel rounded-[28px] border border-dashed border-white/10 p-6">
      <p className="text-sm leading-7 text-slate-400">{message}</p>
    </div>
  );
}

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "--";
  }

  return Number(value).toFixed(2);
}
