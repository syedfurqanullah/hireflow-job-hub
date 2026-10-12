import proxyAdzunaRequest from "../adzunaProxy.js";

const getPathSegments = (path) => {
  if (Array.isArray(path)) return path;
  return typeof path === "string" ? path.split("/").filter(Boolean) : [];
};

export default function handler(request, response) {
  const path = getPathSegments(request.query?.path);

  return proxyAdzunaRequest(request, response, {
    segments: path,
    queryKey: "path",
    isValidPath: (segments) => segments[0] === "jobs" && Boolean(segments[1]),
  });
}
