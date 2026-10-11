const PROXY_API_BASE_URL = "/api/adzuna";

const getErrorMessage = (status, payload) => {
  const upstreamMessage = payload?.display || payload?.exception || payload?.error;

  if (status === 401 || status === 403) {
    return "Adzuna credentials are invalid or missing from the server configuration.";
  }

  if (status === 429) {
    return "Adzuna request limit reached. Please wait a moment and try again.";
  }

  return upstreamMessage || `Adzuna request failed with status ${status}.`;
};

const apiGetThroughProxy = async (endpoint, params = {}) => {
  const url = new URL(PROXY_API_BASE_URL, window.location.origin);
  url.searchParams.set("endpoint", endpoint.replace(/^\/+/, ""));

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim()) {
      url.searchParams.set(key, String(value));
    }
  });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getErrorMessage(response.status, payload));
    }

    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Adzuna request timed out. Please try again.", {
        cause: error,
      });
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Could not reach the Adzuna service. Check your connection and try again.",
        { cause: error },
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
};

const apiGetOnce = (endpoint, params = {}) => apiGetThroughProxy(endpoint, params);

export const apiGet = async (endpoint, params = {}) => {
  try {
    return await apiGetOnce(endpoint, params);
  } catch (error) {
    const isTemporaryNetworkError = /timed out|could not load adzuna/i.test(
      error?.message || "",
    );
    if (!isTemporaryNetworkError) throw error;

    await new Promise((resolve) => window.setTimeout(resolve, 800));
    return apiGetOnce(endpoint, params);
  }
};
