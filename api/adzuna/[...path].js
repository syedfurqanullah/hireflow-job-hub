const ADZUNA_API_BASE_URL = "https://api.adzuna.com/v1/api";

const getPathSegments = (path) => {
  if (Array.isArray(path)) return path;
  return typeof path === "string" ? path.split("/").filter(Boolean) : [];
};

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const serverEnv = globalThis.process?.env || {};
  const appId = serverEnv.ADZUNA_APP_ID;
  const appKey = serverEnv.ADZUNA_APP_KEY;
  const path = getPathSegments(request.query?.path);

  if (!appId || !appKey) {
    return response.status(500).json({
      error: "Adzuna server credentials are not configured on Vercel.",
    });
  }

  if (path[0] !== "jobs" || !path[1]) {
    return response.status(400).json({ error: "Invalid Adzuna endpoint." });
  }

  const upstreamUrl = new URL(`${ADZUNA_API_BASE_URL}/${path.join("/")}`);
  upstreamUrl.searchParams.set("app_id", appId);
  upstreamUrl.searchParams.set("app_key", appKey);

  Object.entries(request.query || {}).forEach(([key, value]) => {
    if (key === "path" || value === undefined || value === null) return;
    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => upstreamUrl.searchParams.append(key, String(item)));
  });

  try {
    const upstreamResponse = await fetch(upstreamUrl);
    const payload = await upstreamResponse.json().catch(() => null);

    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return response.status(upstreamResponse.status).json(payload || {
      error: "Adzuna returned an empty response.",
    });
  } catch {
    return response.status(502).json({
      error: "Could not reach the Adzuna service from Vercel.",
    });
  }
}
