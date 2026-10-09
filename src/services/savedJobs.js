const STORAGE_KEY = "hireflow:saved-jobs:v1";

export const getSavedJobs = () => {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

export const isJobSaved = (jobId) => getSavedJobs().some((job) => job.id === jobId);

export const toggleSavedJob = (job) => {
  const current = getSavedJobs();
  const exists = current.some((item) => item.id === job.id);
  const next = exists ? current.filter((item) => item.id !== job.id) : [{ ...job, raw: undefined }, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error("Could not save this job in browser storage.");
  }
  return next;
};
