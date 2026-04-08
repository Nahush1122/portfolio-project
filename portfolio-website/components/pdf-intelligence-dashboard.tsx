"use client";

import { useState } from "react";
import { BackendLoadingCard } from "@/components/backend-loading-card";
import { MetricCard } from "@/components/metric-card";
import { ServerWakeControl } from "@/components/server-wake-control";
import { PDF_INTELLIGENCE_API_URL } from "@/lib/runtime-config";
import { summarizePdf, uploadPdf } from "@/lib/pdf-intelligence";
import { wakeBackendService } from "@/lib/service-health";
import { withRequestTimeout } from "@/lib/with-request-timeout";

type PdfState = {
  filename: string;
  pageCount: number;
  characterCount: number;
  summary: string;
};

export function PdfIntelligenceDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<PdfState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerReady, setIsServerReady] = useState(false);
  const [isWakingServer, setIsWakingServer] = useState(false);
  const [serverStatus, setServerStatus] = useState<string | null>(null);

  const handleWakeServer = async () => {
    setServerStatus("Waking server...");
    setError(null);
    setIsWakingServer(true);

    try {
      await wakeBackendService(PDF_INTELLIGENCE_API_URL);
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

  const handleSummarize = async () => {
    if (!isServerReady) {
      setError("Please wake the server before summarizing.");
      return;
    }

    if (!selectedFile) {
      setError("Invalid file");
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Invalid file");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await withRequestTimeout(async (signal) => {
        const upload = await uploadPdf(selectedFile, signal);
        const summary = await summarizePdf(upload.document_id, signal);

        return {
          filename: upload.filename,
          pageCount: upload.page_count,
          characterCount: upload.character_count,
          summary: summary.summary,
        };
      });

      setResult(response);
    } catch (requestError) {
      setResult(null);
      setError(
        requestError instanceof Error ? requestError.message : "Failed to fetch data",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            PDF Intelligence
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Summarize PDF content</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Upload a PDF and generate a concise summary directly inside the portfolio
            dashboard while keeping the same visual system as the rest of the site.
          </p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            API Endpoint
          </p>
          <div className="mt-4 rounded-[22px] border border-cyan-300/15 bg-cyan-300/10 p-4">
            <p className="break-all text-sm text-slate-200">
              {PDF_INTELLIGENCE_API_URL ?? "API URL not configured"}
            </p>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[28px] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              File Upload
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Wake the server once, then upload a PDF and generate a concise summary.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSummarize}
                disabled={isLoading || isWakingServer || !isServerReady}
                className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_24px_rgba(97,195,255,0.2)] transition duration-300 ease-in-out hover:scale-105 hover:from-emerald-200 hover:to-cyan-200 hover:shadow-[0_0_28px_rgba(97,195,255,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Summarizing..." : "Summarize"}
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
          title="Preparing PDF intelligence service"
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
        <BackendLoadingCard title="Preparing PDF intelligence workflow" />
      ) : null}

      {result ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Document" value={result.filename} hint="Uploaded PDF" />
            <MetricCard
              label="Pages"
              value={String(result.pageCount)}
              hint="Detected count"
              tone="success"
            />
            <MetricCard
              label="Characters"
              value={result.characterCount.toLocaleString()}
              hint="Extracted text volume"
            />
          </section>

          <section className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Summary Output
            </p>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-8 text-slate-200">{result.summary}</p>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
