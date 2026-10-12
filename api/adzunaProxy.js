const ADZUNA_API_BASE_URL = "https://api.adzuna.com/v1/api";

export default async function proxyAdzunaRequest(
  request,
  response,
  { segments, queryKey, isValidPath },
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const serverEnv = globalThis.process?.env || {};
  const appId = serverEnv.ADZUNA_APP_ID || serverEnv.VITE_ADZUNA_APP_ID;
  const appKey = serverEnv.ADZUNA_APP_KEY || serverEnv.VITE_ADZUNA_APP_KEY;

  if (!appId || !appKey) {
    console.error("Adzuna proxy credentials are missing.");
    return response.status(500).json({
      error: "Live job listings are temporarily unavailable. Please try again shortly.",
    });
  }

  if (!isValidPath(segments)) {
    return response.status(400).json({ error: "Invalid Adzuna endpoint." });
  }

  const upstreamUrl = new URL(`${ADZUNA_API_BASE_URL}/${segments.join("/")}`);
  upstreamUrl.searchParams.set("app_id", appId);
  upstreamUrl.searchParams.set("app_key", appKey);

  Object.entries(request.query || {}).forEach(([key, value]) => {
    if (key === queryKey || value === undefined || value === null) return;
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
  } catch (error) {
    console.error("Could not reach the Adzuna service:", error);
    return response.status(502).json({
      error: "We couldn't load live job listings. Please try again shortly.",
    });
  }
}
