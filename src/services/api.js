const API_BASE_URL = "https://api.adzuna.com/v1/api";

const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

const apiGetOnce = async (endpoint, params = {}) => {
  if (!APP_ID || !APP_KEY) {
    throw new Error(
      "Adzuna API credentials are missing. Add VITE_ADZUNA_APP_ID and VITE_ADZUNA_APP_KEY to .env, then restart the dev server.",
    );
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.set("app_id", APP_ID);
  url.searchParams.set("app_key", APP_KEY);
  // Adzuna documents JSONP for browser-only/static integrations. This avoids
  // browsers blocking direct cross-origin fetches when CORS is unavailable.
  url.searchParams.set("content-type", "application/jsonp");
  const callbackName = `hireFlowAdzuna_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  url.searchParams.set("callback", callbackName);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim()) {
      url.searchParams.set(key, String(value));
    }
  });

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(
        new Error(
          "Adzuna request timed out. Check your internet connection and try again.",
        ),
      );
    }, 20000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (data) => {
      cleanup();
      if (data?.exception || data?.error) {
        const code = String(data.exception || data.error).toUpperCase();
        const message = code.includes("UNSUPPORTED_COUNTRY")
          ? "Adzuna does not support the selected country. Choose a supported country in the job API settings."
          : data.display || data.exception || data.error;
        reject(new Error(message));
        return;
      }
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(
        new Error(
          "Could not load Adzuna. Check your connection, API credentials, and browser network access.",
        ),
      );
    };
    script.src = url.toString();
    document.head.appendChild(script);
  });
};

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
