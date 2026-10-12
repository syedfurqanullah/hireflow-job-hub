import proxyAdzunaRequest from "./adzunaProxy.js";

export default function handler(request, response) {
  const endpoint = String(request.query?.endpoint || "");
  const segments = endpoint.split("/").filter(Boolean);

  return proxyAdzunaRequest(request, response, {
    segments,
    queryKey: "endpoint",
    isValidPath: (path) =>
      path[0] === "jobs" &&
      Boolean(path[1]) &&
      !path.some((segment) => segment === "." || segment === ".."),
  });
}
