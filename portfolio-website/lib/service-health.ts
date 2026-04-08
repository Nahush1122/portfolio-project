import { withRequestTimeout } from "@/lib/with-request-timeout";

const healthPaths = ["/health", "/ping", "/"];

export async function wakeBackendService(baseUrl: string | undefined) {
  if (!baseUrl) {
    throw new Error("API URL not configured");
  }

  try {
    return await withRequestTimeout(async (signal) => {
      while (true) {
        for (const path of healthPaths) {
          try {
            const response = await fetch(`${baseUrl}${path}`, {
              method: path === "/" ? "HEAD" : "GET",
              signal,
              cache: "no-store",
            });

            if (response.ok) {
              return true;
            }
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              throw error;
            }
          }
        }

        await new Promise((resolve) => window.setTimeout(resolve, 3000));
      }
    }, Number.POSITIVE_INFINITY);
  } catch {
    throw new Error("Unable to start server. Please try again.");
  }
}
