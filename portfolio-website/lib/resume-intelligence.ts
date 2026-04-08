import { requestJson } from "@/lib/api-client";
import { RESUME_ANALYZER_API_URL } from "@/lib/runtime-config";

export type ResumeUploadResponse = {
  filename: string;
  text: string;
};

export type ResumeAnalyzeResponse = {
  detected_skills: string[];
  experience_estimation: string | number;
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

export async function uploadResume(
  file: File,
  signal?: AbortSignal,
): Promise<ResumeUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return requestJson<ResumeUploadResponse>(RESUME_ANALYZER_API_URL, "/upload", {
    method: "POST",
    body: formData,
    signal,
  });
}

export async function analyzeResume(
  text: string,
  signal?: AbortSignal,
): Promise<ResumeAnalyzeResponse> {
  return requestJson<ResumeAnalyzeResponse>(RESUME_ANALYZER_API_URL, "/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
    signal,
  });
}
