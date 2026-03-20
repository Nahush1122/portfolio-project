export async function requestJson<T>(
  baseUrl: string | undefined,
  path: string,
  init: RequestInit,
): Promise<T> {
  if (!baseUrl) {
    throw new Error("API URL not configured");
  }

  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, init);
  } catch {
    throw new Error("Server not responding");
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

async function getErrorMessage(response: Response) {
  if (response.status >= 500) {
    return "Server not responding";
  }

  try {
    const data = (await response.json()) as { detail?: string };
    return data.detail ?? "Failed to fetch data";
  } catch {
    return "Failed to fetch data";
  }
}
