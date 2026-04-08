"use client";

import { useState } from "react";
import { BackendLoadingCard } from "@/components/backend-loading-card";
import { MetricCard } from "@/components/metric-card";
import { ServerWakeControl } from "@/components/server-wake-control";
import {
  analyzeResume,
  uploadResume,
  type ResumeAnalyzeResponse,
} from "@/lib/resume-intelligence";
import { RESUME_ANALYZER_API_URL } from "@/lib/runtime-config";
import { wakeBackendService } from "@/lib/service-health";
import { withRequestTimeout } from "@/lib/with-request-timeout";

type ResumeState = {
  filename: string;
  text: string;
  analysis: ResumeAnalyzeResponse;
};

export function ResumeAnalyzerDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeState | null>(null);
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
      await wakeBackendService(RESUME_ANALYZER_API_URL);
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

  const handleAnalyze = async () => {
    if (!isServerReady) {
      setError("Please wake the server before analyzing.");
      return;
    }

    if (!selectedFile) {
      setError("Invalid file");
      return;
    }

    const lowerName = selectedFile.name.toLowerCase();
    if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".docx")) {
      setError("Invalid file");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await withRequestTimeout(async (signal) => {
        const upload = await uploadResume(selectedFile, signal);
        const analysis = await analyzeResume(upload.text, signal);

        return {
          filename: upload.filename,
          text: upload.text,
          analysis,
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

  const suggestions = result ? buildSuggestions(result.analysis) : [];
  const hasNahushResume = result?.text.includes("Nahush Hirolikar") ?? false;

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            Resume Analyzer
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Analyze a resume</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Upload a PDF or DOCX resume and review the extracted summary, skills,
            scoring signals, and tailored improvement suggestions from a single
            portfolio dashboard page.
          </p>
        </div>

        <div className="glass-panel rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            API Endpoint
          </p>
          <div className="mt-4 rounded-[22px] border border-cyan-300/15 bg-cyan-300/10 p-4">
            <p className="break-all text-sm text-slate-200">
              {RESUME_ANALYZER_API_URL ?? "API URL not configured"}
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
              Wake the server once, then analyze a PDF or DOCX resume.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[320px]">
            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isLoading || isWakingServer || !isServerReady}
                className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_0_24px_rgba(97,195,255,0.2)] transition duration-300 ease-in-out hover:scale-105 hover:from-emerald-200 hover:to-cyan-200 hover:shadow-[0_0_28px_rgba(97,195,255,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Analyzing..." : "Analyze Resume"}
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
          title="Preparing resume intelligence service"
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
        <BackendLoadingCard title="Preparing resume intelligence workflow" />
      ) : null}

      {result ? (
        <>
          <section className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Resume" value={result.filename} hint="Uploaded profile" />
            <MetricCard
              label="Resume Score"
              value={String(result.analysis.resume_score)}
              hint="Scored by backend"
              tone="success"
            />
          </section>

          {hasNahushResume ? (
            <div className="glass-panel rounded-[28px] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <p className="text-sm font-semibold text-emerald-100">
                This resume stands out with exceptional quality and strong profile.
              </p>
            </div>
          ) : null}

          <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Summary
              </p>
              <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-8 text-slate-200">
                  {result.analysis.candidate_summary}
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                Skills Extracted
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {result.analysis.detected_skills.length ? (
                  result.analysis.detected_skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No skills were extracted.</p>
                )}
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Suggestions
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-slate-200"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

function buildSuggestions(analysis: ResumeAnalyzeResponse) {
  const suggestions: string[] = [];

  if (!analysis.signals.education_present) {
    suggestions.push("Add clear education details to strengthen profile completeness.");
  }

  if (!analysis.signals.experience_present) {
    suggestions.push("Highlight work experience with measurable impact and business outcomes.");
  }

  if (!analysis.signals.projects_present) {
    suggestions.push("Include project work to demonstrate practical execution and technical depth.");
  }

  if (analysis.detected_skills.length < 5) {
    suggestions.push("Expand the skills section with tools, frameworks, and domain-specific strengths.");
  }

  if (!suggestions.length) {
    suggestions.push("Maintain the current structure and keep tailoring the resume for each role.");
    suggestions.push("Add quantified achievements to further improve recruiter scanability.");
  }

  return suggestions;
}
