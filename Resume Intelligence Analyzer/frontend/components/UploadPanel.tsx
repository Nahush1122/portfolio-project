"use client";

import type { ChangeEvent } from "react";

type UploadPanelProps = {
  isLoading: boolean;
  fileName: string;
  error: string;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function UploadPanel({
  isLoading,
  fileName,
  error,
  onFileSelect,
}: UploadPanelProps) {
  return (
    <section className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Resume Upload
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Drop in a PDF or DOCX file
          </h2>
        </div>
        <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-slateblue">
          FastAPI + spaCy
        </div>
      </div>

      <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-sky-300 bg-gradient-to-br from-white to-sky-50 px-6 text-center transition hover:border-slateblue hover:bg-sky-100/60">
        <input
          accept=".pdf,.docx"
          className="hidden"
          disabled={isLoading}
          onChange={onFileSelect}
          type="file"
        />
        <span className="mb-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slateblue shadow-sm">
          {isLoading ? "Analyzing..." : "Choose Resume"}
        </span>
        <p className="max-w-md text-lg font-medium text-ink">
          Upload a candidate resume to extract skills, estimate experience, and generate a profile summary.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Supported formats: PDF, DOCX
        </p>
      </label>

      <div className="mt-5 min-h-12 rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-100">
        <span className="font-semibold text-cyan-300">Latest file:</span>{" "}
        {fileName || "No file analyzed yet"}
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
    </section>
  );
}
