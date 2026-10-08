// =========================================================
// HireFlow - API Client
// ---------------------------------------------------------
// Centralized GET client for public API requests.
//
// Responsibilities:
// - Build API URLs from Vite environment configuration
// - Send consistent JSON requests
// - Normalize API errors for UI/service layers
// - Keep networking logic outside React components
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_JOB_API_BASE_URL ||
  "https://api.jobdatapool.com";

/* ---------------------------------------------------------
   Generic GET request
--------------------------------------------------------- */
export const apiGet = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      url.searchParams.set(key, String(value));
    }
  });

  let response;

  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the job service. Please check your internet connection.",
    );
  }

  if (!response.ok) {
    let message = `Job service request failed with status ${response.status}.`;

    try {
      const errorData = await response.json();

      if (typeof errorData?.message === "string") {
        message = errorData.message;
      } else if (typeof errorData?.error === "string") {
        message = errorData.error;
      }
    } catch {
      // Keep the default HTTP error message when the body is not JSON.
    }

    if (response.status === 429) {
      message =
        "Job service rate limit reached. Please try again in a moment.";
    }

    throw new Error(message);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Job service returned an invalid response format.");
  }

  return response.json();
};

export const API_URL = API_BASE_URL;
