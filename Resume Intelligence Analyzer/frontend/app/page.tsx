"use client";

import type { ChangeEvent } from "react";
import { useState, useTransition } from "react";
import { ScoreGauge } from "../components/ScoreGauge";
import { SkillsDisplay } from "../components/SkillsDisplay";
import { SummaryPanel } from "../components/SummaryPanel";
import { UploadPanel } from "../components/UploadPanel";

type AnalysisResponse = {
  detected_skills: string[];
  experience_estimation: number | null;
  resume_score: number;
  score_message: string;
  candidate_summary: string;
  signals: {
    education_present: boolean;
    experience_present: boolean;
    projects_present: boolean;
  };
  override_applied: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8002";

function getApiErrorMessage(error: unknown) {
  if (error instanceof TypeError) {
    return "Server not running. Please start the Resume Analyzer backend on 127.0.0.1:8002.";
  }

  if (error instanceof Error) {
    if (error.message.toLowerCase().includes("failed to fetch")) {
      return "Failed to fetch. Please verify the Resume Analyzer backend is running on 127.0.0.1:8002.";
    }

    return error.message;
  }

  return "Something went wrong while processing the resume.";
}

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const runAnalysis = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await readJsonResponse(uploadResponse);
      if (!uploadResponse.ok) {
        throw new Error(
          (uploadData && "detail" in uploadData && typeof uploadData.detail === "string"
            ? uploadData.detail
            : null) || "Upload failed.",
        );
      }

      const analyzeResponse = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: uploadData?.text ?? "" }),
      });

      const analyzeData = await readJsonResponse(analyzeResponse);
      if (!analyzeResponse.ok) {
        throw new Error(
          (analyzeData && "detail" in analyzeData && typeof analyzeData.detail === "string"
            ? analyzeData.detail
            : null) || "Analysis failed.",
        );
      }

      setAnalysis(analyzeData as AnalysisResponse);
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError));
      setAnalysis(null);
    }
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setFileName(selectedFile.name);
    setError("");

    startTransition(() => {
      void runAnalysis(selectedFile);
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-[2.25rem] border border-white/60 bg-hero-grid px-6 py-8 shadow-panel sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-600">
            Resume Intelligence Analyzer
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Turn raw resumes into skill signals, experience insights, and profile scoring.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Upload a PDF or DOCX resume to extract text, detect common technical skills,
                estimate years of experience, and produce a quick recruiter-friendly profile summary.
              </p>
            </div>
            <div className="glass-panel rounded-[2rem] border border-white/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Analysis Flow
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>1. Upload resume</p>
                <p>2. Extract text from PDF or DOCX</p>
                <p>3. Detect skills, score profile, and summarize candidate</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <UploadPanel
            error={error}
            fileName={fileName}
            isLoading={isPending}
            onFileSelect={onFileSelect}
          />

          <div className="grid gap-6">
            <ScoreGauge
              message={analysis?.score_message ?? "Upload a resume to generate a profile score."}
              score={analysis?.resume_score ?? 0}
            />
            <SummaryPanel
              educationPresent={analysis?.signals.education_present ?? false}
              experiencePresent={analysis?.signals.experience_present ?? false}
              overrideApplied={analysis?.override_applied ?? false}
              projectsPresent={analysis?.signals.projects_present ?? false}
              summary={
                analysis?.candidate_summary ??
                "Candidate summary will appear here after the resume has been analyzed."
              }
            />
          </div>
        </div>

        <div className="mt-6">
          <SkillsDisplay
            experienceEstimation={analysis?.experience_estimation ?? null}
            skills={analysis?.detected_skills ?? []}
          />
        </div>
      </div>
    </main>
  );
}
