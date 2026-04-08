import { requestJson } from "@/lib/api-client";
import { PDF_INTELLIGENCE_API_URL } from "@/lib/runtime-config";

export type PdfUploadResponse = {
  document_id: string;
  filename: string;
  page_count: number;
  character_count: number;
  message: string;
};

export type PdfSummaryResponse = {
  document_id: string;
  summary: string;
};

export async function uploadPdf(
  file: File,
  signal?: AbortSignal,
): Promise<PdfUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return requestJson<PdfUploadResponse>(PDF_INTELLIGENCE_API_URL, "/upload", {
    method: "POST",
    body: formData,
    signal,
  });
}

export async function summarizePdf(
  documentId: string,
  signal?: AbortSignal,
): Promise<PdfSummaryResponse> {
  return requestJson<PdfSummaryResponse>(PDF_INTELLIGENCE_API_URL, "/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ document_id: documentId }),
    signal,
  });
}
