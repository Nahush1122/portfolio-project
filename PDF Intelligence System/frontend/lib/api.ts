const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8001";

type SummaryResponse = {
  summary: string[];
};

type TopicsResponse = {
  topics: string[];
};

type AskResponse = {
  answer: string;
  evidence: string[];
};

export type UploadResponse = {
  document_id: string;
  filename: string;
  page_count: number;
  character_count: number;
  message: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail ?? "Something went wrong while contacting the API.";
    throw new Error(message);
  }

  return data as T;
}

function formatApiError(error: unknown): Error {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (
      message.includes("failed to fetch") ||
      message.includes("networkerror") ||
      message.includes("load failed")
    ) {
      return new Error("Server not running or failed to fetch.");
    }
    return error;
  }

  return new Error("Server not running or failed to fetch.");
}

export async function uploadPdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    return parseResponse<UploadResponse>(response);
  } catch (error) {
    throw formatApiError(error);
  }
}

export async function getSummary(documentId: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ document_id: documentId })
    });

    const data = await parseResponse<SummaryResponse>(response);
    return data.summary;
  } catch (error) {
    throw formatApiError(error);
  }
}

export async function getTopics(documentId: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ document_id: documentId })
    });

    const data = await parseResponse<TopicsResponse>(response);
    return data.topics;
  } catch (error) {
    throw formatApiError(error);
  }
}

export async function askQuestion(
  documentId: string,
  question: string
): Promise<AskResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ document_id: documentId, question })
    });

    return parseResponse<AskResponse>(response);
  } catch (error) {
    throw formatApiError(error);
  }
}
