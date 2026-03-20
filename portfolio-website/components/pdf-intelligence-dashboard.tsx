"use client";

import { useState, useTransition } from "react";
import { MetricCard } from "@/components/metric-card";
import { PDF_INTELLIGENCE_API_URL } from "@/lib/runtime-config";
import { summarizePdf, uploadPdf } from "@/lib/pdf-intelligence";

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
  const [isPending, startTransition] = useTransition();

  const handleSummarize = () => {
    if (!selectedFile) {
      setError("Invalid file");
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Invalid file");
      return;
    }

    setError(null);

    startTransition(() => {
      void (async () => {
        try {
          const upload = await uploadPdf(selectedFile);
          const summary = await summarizePdf(upload.document_id);

          setResult({
            filename: upload.filename,
            pageCount: upload.page_count,
            characterCount: upload.character_count,
            summary: summary.summary,
          });
        } catch (requestError) {
          setResult(null);
          setError(
            requestError instanceof Error ? requestError.message : "Failed to fetch data",
          );
        }
      })();
    });
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
              File Upload and wait 30 sec
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Only PDF files are supported for this workflow.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
            />
            <button
              type="button"
              onClick={handleSummarize}
              disabled={isPending}
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/60"
            >
              {isPending ? "Summarizing..." : "Summarize"}
            </button>
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

      {isPending ? (
        <div className="glass-panel rounded-[28px] p-8">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
            Generating summary...
          </div>
        </div>
      ) : null}

      {result ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Document" value={result.filename} hint="Uploaded PDF" />
            <MetricCard label="Pages" value={String(result.pageCount)} hint="Detected count" tone="success" />
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
