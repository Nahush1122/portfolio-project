import { SMART_ANALYZER_API_URL } from "@/lib/runtime-config";

export const SMART_DATA_ANALYZER_API_BASE_URL = SMART_ANALYZER_API_URL;

export type DatasetPreview = {
  columns: string[];
  rows: Record<string, string | number | null>[];
  shape: {
    rows: number;
    columns: number;
  };
};

export type UploadResponse = {
  dataset_id: string;
  filename: string;
  preview: DatasetPreview;
};

export type SummaryStatistic = {
  column: string;
  count?: number | null;
  mean?: number | null;
  std?: number | null;
  min?: number | null;
  "25%"?: number | null;
  "50%"?: number | null;
  "75%"?: number | null;
  max?: number | null;
};

export type MissingValueRecord = {
  column: string;
  missing: number;
  missing_percentage: number;
};

export type CorrelationPoint = {
  x: string;
  y: string;
  value: number;
};

export type AnalysisResponse = {
  shape: {
    rows: number;
    columns: number;
  };
  column_types: Record<string, string>;
  summary_statistics: SummaryStatistic[];
  missing_values: MissingValueRecord[];
  correlation_matrix: CorrelationPoint[];
  insights: string[];
};

export type HistogramSeries = {
  column: string;
  data: {
    label: string;
    count: number;
  }[];
};

export type CategoricalBarSeries = {
  column: string;
  data: {
    label: string;
    count: number;
  }[];
};

export type ScatterRelationship = {
  x_axis: string;
  y_axis: string;
  data: {
    x: number;
    y: number;
  }[];
} | null;

export type VisualizationResponse = {
  correlation_heatmap: CorrelationPoint[];
  histograms: HistogramSeries[];
  categorical_bars: CategoricalBarSeries[];
  scatter_relationship: ScatterRelationship;
};

export async function uploadDataset(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return requestJson<UploadResponse>("/upload", {
    method: "POST",
    body: formData,
  });
}

export async function analyzeDataset(datasetId: string): Promise<AnalysisResponse> {
  return requestJson<AnalysisResponse>("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dataset_id: datasetId }),
  });
}

export async function visualizeDataset(
  datasetId: string,
): Promise<VisualizationResponse> {
  return requestJson<VisualizationResponse>("/visualize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dataset_id: datasetId }),
  });
}

async function requestJson<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${SMART_DATA_ANALYZER_API_BASE_URL}${path}`, init);
  } catch {
    throw new Error("Server unavailable");
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

async function getErrorMessage(response: Response) {
  if (response.status >= 500) {
    return "Server unavailable";
  }

  try {
    const data = (await response.json()) as { detail?: string };
    return data.detail ?? "Failed to fetch data";
  } catch {
    return "Failed to fetch data";
  }
}
