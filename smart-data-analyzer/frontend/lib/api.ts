import { AnalysisResponse, UploadResponse, VisualizationResponse } from "@/lib/types";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

function getApiUrl(path: string) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Failed to fetch" }));
    throw new Error(error.error ?? error.detail ?? "Failed to fetch");
  }

  return response.json() as Promise<T>;
}

export async function uploadDataset(file: File): Promise<UploadResponse> {
  if (!file.name.toLowerCase().endsWith(".csv")) {
    throw new Error("Please upload a valid CSV file.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(getApiUrl("/upload"), {
    method: "POST",
    body: formData
  });

  return parseResponse<UploadResponse>(response);
}

export async function analyzeDataset(datasetId: string): Promise<AnalysisResponse> {
  const response = await fetch(getApiUrl("/analyze"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ dataset_id: datasetId })
  });

  return parseResponse<AnalysisResponse>(response);
}

export async function visualizeDataset(datasetId: string): Promise<VisualizationResponse> {
  const response = await fetch(getApiUrl("/visualize"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ dataset_id: datasetId })
  });

  const result = await parseResponse<{ dataset_id: string; charts: VisualizationResponse }>(response);
  return result.charts;
}
