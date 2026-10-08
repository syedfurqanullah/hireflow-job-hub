// =========================================================
// HireFlow - Job Service
// ---------------------------------------------------------
// Converts JobDataPool responses into one stable frontend
// job shape.
//
// React pages/components should consume this normalized shape
// instead of depending directly on external API field names.
// =========================================================

import { apiGet } from "./api";

const JOBS_ENDPOINT = "/v1/jobs";

// ---------------------------------------------------------
// Request/cache configuration
// ---------------------------------------------------------

const DEFAULT_LIMIT = 10;
const CACHE_DURATION = 60 * 1000;

let jobsCache = {
  data: [],
  timestamp: 0,
};

// ---------------------------------------------------------
// IT keyword dictionary
// ---------------------------------------------------------
// JobDataPool may classify jobs differently across records.
// We therefore use a second client-side check so the portal
// remains focused on technology/IT opportunities.
// ---------------------------------------------------------

const IT_KEYWORDS = [
  "software",
  "developer",
  "development",
  "engineer",
  "engineering",
  "frontend",
  "front-end",
  "backend",
  "back-end",
  "full stack",
  "full-stack",
  "react",
  "javascript",
  "typescript",
  "node",
  "python",
  "java",
  "php",
  "golang",
  "ruby",
  "mobile",
  "android",
  "ios",
  "devops",
  "cloud",
  "aws",
  "azure",
  "gcp",
  "data",
  "database",
  "sql",
  "machine learning",
  "artificial intelligence",
  "ai",
  "cyber",
  "security",
  "qa",
  "quality assurance",
  "automation",
  "technical",
  "technology",
  "it support",
  "information technology",
  "systems",
  "network",
  "solution architect",
  "product manager",
  "ui/ux",
  "ux",
  "ui designer",
];

const safeString = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return String(value).trim();
};

const firstValue = (...values) =>
  values.find((value) => safeString(value) !== "") ?? "";

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        if (typeof item === "string") {
          return item.split(",");
        }

        if (item && typeof item === "object") {
          return [
            firstValue(item.name, item.title, item.label, item.value),
          ];
        }

        return [];
      })
      .map(safeString)
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[,|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const extractJobs = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.jobs)) {
    return response.jobs;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
};

const getCompanyLogo = (job) =>
  firstValue(
    job.company_logo,
    job.company_logo_url,
    job.logo,
    job.logo_url,
    job.company?.logo,
    job.company?.logo_url,
  );

const getCompanyWebsite = (job) =>
  firstValue(
    job.source_business_url,
    job.company_website,
    job.company?.website,
    job.company?.url,
  );

const normalizeJobType = (value) => {
  const type = safeString(value);

  if (!type) {
    return "Not specified";
  }

  const normalized = type.toLowerCase();

  if (normalized.includes("full")) return "Full-time";
  if (normalized.includes("part")) return "Part-time";
  if (normalized.includes("contract")) return "Contract";
  if (normalized.includes("intern")) return "Internship";
  if (normalized.includes("temporary")) return "Temporary";

  return type;
};

const formatPostedDate = (value) => {
  if (!value) {
    return "Recently posted";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return safeString(value) || "Recently posted";
  }

  const diff = Date.now() - date.getTime();
  const days = Math.max(0, Math.floor(diff / 86400000));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);

  if (months === 1) return "1 month ago";

  return `${months} months ago`;
};

const getSearchableJobText = (job) =>
  [
    job.job_title,
    job.company_name,
    job.job_location,
    job.job_industries,
    job.job_summary,
    job.job_description,
    job.skills,
    job.certifications,
    job.job_employment_type,
    job.job_seniority_level,
  ]
    .flatMap(normalizeList)
    .join(" ")
    .toLowerCase();

const isITJob = (job) => {
  const searchableText = getSearchableJobText(job);

  return IT_KEYWORDS.some((keyword) =>
    searchableText.includes(keyword.toLowerCase()),
  );
};

const normalizeJob = (job, index) => {
  const title = firstValue(
    job.job_title,
    job.title,
    job.name,
  );

  const companyName = firstValue(
    job.company_name,
    job.company?.name,
    job.employer_name,
    job.company,
    "Company",
  );

  const location = firstValue(
    job.job_location,
    job.location,
    job.job_city,
    job.city,
    "Location not specified",
  );

  const industries = normalizeList(
    firstValue(job.job_industries, job.industries, job.industry),
  );

  const skills = normalizeList(
    firstValue(job.skills, job.job_skills),
  );

  const certifications = normalizeList(
    firstValue(job.certifications, job.job_certifications),
  );

  const description = firstValue(
    job.job_summary,
    job.job_description,
    job.description,
    "Job description is available on the original listing.",
  );

  const postedDate = firstValue(
    job.job_posted_date,
    job.posted_date,
    job.date_posted,
    job.created_at,
  );

  const salary = firstValue(
    job.job_base_pay_range,
    job.salary,
    job.pay_range,
    "Salary not specified",
  );

  const rawId = firstValue(
    job.job_id,
    job.id,
    job.uuid,
    job.job_key,
  );

  const id =
    rawId ||
    `${title || "job"}-${companyName || "company"}-${index}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return {
    id,
    title: title || "Untitled IT Opportunity",
    company: companyName,
    companyName,
    companyLogo: getCompanyLogo(job),
    companyWebsite: getCompanyWebsite(job),
    location,
    countryCode: safeString(
      firstValue(job.country_code, job.countryCode),
    ),
    category: industries[0] || "Information Technology",
    categories: industries,
    type: normalizeJobType(
      firstValue(
        job.job_employment_type,
        job.employment_type,
        job.job_type,
      ),
    ),
    salary,
    description,
    posted: formatPostedDate(postedDate),
    postedDate,
    url: firstValue(job.url, job.job_url, job.source_url),
    applyUrl: firstValue(
      job.apply_link,
      job.apply_url,
      job.application_url,
      job.url,
    ),
    experience: firstValue(
      job.job_seniority_level,
      job.experience,
      "Not specified",
    ),
    skills,
    certifications,
    competitivenessScore: firstValue(
      job.competitiveness_score,
    ),
    ingestionDate: firstValue(job.ingestion_date),
    validatedOn: firstValue(job.validated_on),
    listingClosed: Boolean(job.listing_closed),
    raw: job,
  };
};

// ---------------------------------------------------------
// Fetch jobs
// ---------------------------------------------------------
// The API request is intentionally centralized here. Pages
// should not call fetch() directly.
// ---------------------------------------------------------

export const getJobs = async ({
  limit = DEFAULT_LIMIT,
  countryCode = "",
  industries = "Software",
  forceRefresh = false,
} = {}) => {
  const cacheIsFresh =
    jobsCache.data.length > 0 &&
    Date.now() - jobsCache.timestamp < CACHE_DURATION;

  if (cacheIsFresh && !forceRefresh) {
    return jobsCache.data;
  }

  const response = await apiGet(JOBS_ENDPOINT, {
    limit: Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), 50),
    country_code: countryCode,
    industries,
  });

  const rawJobs = extractJobs(response);

  const jobs = rawJobs
    .filter(isITJob)
    .map((job, index) => normalizeJob(job, index))
    .filter((job) => !job.listingClosed);

  jobsCache = {
    data: jobs,
    timestamp: Date.now(),
  };

  return jobs;
};

// ---------------------------------------------------------
// Job details
// ---------------------------------------------------------
// JobDataPool does not provide a dependable dedicated detail
// endpoint in the current integration, so details are resolved
// from the cached/fetched listing collection.
// ---------------------------------------------------------

export const getJobById = async (id) => {
  if (!id) {
    return null;
  }

  const cachedJob = jobsCache.data.find(
    (job) => String(job.id) === String(id),
  );

  if (cachedJob) {
    return cachedJob;
  }

  const jobs = await getJobs({
    forceRefresh: true,
  });

  return (
    jobs.find((job) => String(job.id) === String(id)) || null
  );
};

// ---------------------------------------------------------
// Client-side search
// ---------------------------------------------------------
// API quota is limited, so filtering already fetched IT jobs
// on the client avoids unnecessary network requests.
// ---------------------------------------------------------

export const searchJobs = (jobs, { query = "", location = "" } = {}) => {
  const normalizedQuery = safeString(query).toLowerCase();
  const normalizedLocation = safeString(location).toLowerCase();

  return jobs.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.category,
      job.categories.join(" "),
      job.description,
      job.skills.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      !normalizedQuery ||
      searchableText.includes(normalizedQuery);

    const matchesLocation =
      !normalizedLocation ||
      job.location.toLowerCase().includes(normalizedLocation);

    return matchesQuery && matchesLocation;
  });
};

export const clearJobsCache = () => {
  jobsCache = {
    data: [],
    timestamp: 0,
  };
};

export const getCachedJobs = () => jobsCache.data;
