const PROXY_API_BASE_URL = "/api/adzuna";
const API_CACHE_KEY = "hireflow:adzuna-api-cache:v1";
const API_CACHE_DURATION = 5 * 60 * 1000;
const API_STALE_DURATION = 24 * 60 * 60 * 1000;

const getApiCacheKey = (endpoint, params) =>
  `${endpoint.replace(/^\/+/, "")}?${new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
      .sort(([first], [second]) => first.localeCompare(second)),
  ).toString()}`;

const readApiCache = () => {
  try {
    return JSON.parse(sessionStorage.getItem(API_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeApiCache = (cache) => {
  try {
    const recentEntries = Object.entries(cache).slice(-15);
    sessionStorage.setItem(
      API_CACHE_KEY,
      JSON.stringify(Object.fromEntries(recentEntries)),
    );
  } catch {
    // Storage can be disabled or full; requests still work without this cache.
  }
};

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
      const error = new Error(getErrorMessage(response.status, payload));
      error.status = response.status;
      throw error;
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

export const apiGet = async (endpoint, params = {}) => {
  const cache = readApiCache();
  const cacheKey = getApiCacheKey(endpoint, params);
  const cached = cache[cacheKey];
  const cacheAge = cached ? Date.now() - cached.timestamp : Infinity;

  if (cached && cacheAge < API_CACHE_DURATION) return cached.payload;

  const isRetryableError = (error) =>
    error?.status === 429 ||
    [502, 503, 504].includes(error?.status) ||
    /timed out|could not reach the adzuna service/i.test(error?.message || "");

  const savePayload = (payload) => {
    delete cache[cacheKey];
    cache[cacheKey] = { timestamp: Date.now(), payload };
    writeApiCache(cache);
    return payload;
  };

  const canUseStaleCache = (error) =>
    cached &&
    Date.now() - cached.timestamp < API_STALE_DURATION &&
    isRetryableError(error);

  try {
    return savePayload(await apiGetThroughProxy(endpoint, params));
  } catch (error) {
    const isTemporaryNetworkError =
      /timed out|could not reach the adzuna service/i.test(error?.message || "");
    if (!isTemporaryNetworkError) {
      if (canUseStaleCache(error)) return cached.payload;
      throw error;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 800));
    try {
      return savePayload(await apiGetThroughProxy(endpoint, params));
    } catch (retryError) {
      if (canUseStaleCache(retryError)) return cached.payload;
      throw retryError;
    }
  }
};
