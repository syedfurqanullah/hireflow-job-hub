import { apiGet } from "./api";

// =========================================================
// HireFlow - Job Service
// ---------------------------------------------------------
// Responsibilities:
// - Adzuna se jobs fetch karna
// - Multiple job categories fetch karke aik shared feed dena
// - API response normalize karna
// - Jobs cache karna
// - Company data jobs se derive karna
// - Company logo/source URL resolve karna
// =========================================================

const DEFAULT_COUNTRY =
  (import.meta.env.VITE_ADZUNA_COUNTRY || "us").toLowerCase();

const DEFAULT_LIMIT = 50;

// Public API ki limited quota ki wajah se short cache.
const CACHE_DURATION = 5 * 60 * 1000;
const CATEGORY_CACHE_DURATION = 10 * 60 * 1000;

const CATEGORY_SPECS = [
  { name: "IT Technology", apiLabel: "IT Jobs", fallbackTag: "it-jobs", aliases: ["IT", "Technology"] },
  { name: "Designing", apiLabel: "Creative & Design Jobs", fallbackTag: "creative-design-jobs" },
  { name: "Marketing", apiLabel: "PR, Advertising & Marketing Jobs", fallbackTag: "pr-advertising-marketing-jobs" },
  { name: "Sales", apiLabel: "Sales Jobs", fallbackTag: "sales-jobs" },
  { name: "Finance", apiLabel: "Accounting & Finance Jobs", fallbackTag: "accounting-finance-jobs" },
  { name: "Cyber Security", apiLabel: "IT Jobs", fallbackTag: "it-jobs", what: "cyber security", titleTerms: ["cyber", "information security", "infosec", "security engineer", "security analyst", "security architect"] },
  { name: "Software Engineer", apiLabel: "IT Jobs", fallbackTag: "it-jobs", what: "software engineer", titleTerms: ["software engineer", "software developer", "programmer", "application engineer", "backend engineer", "back-end engineer", "backend developer", "back-end developer", "devops"] },
  { name: "Web Development", apiLabel: "IT Jobs", fallbackTag: "it-jobs", what: "web developer", titleTerms: ["web developer", "web engineer", "web application", "website developer", "front end", "front-end", "frontend", "full stack", "full-stack", "react developer", "javascript developer"] },
  { name: "Mobile Development", apiLabel: "IT Jobs", fallbackTag: "it-jobs", what: "mobile developer", titleTerms: ["mobile developer", "mobile engineer", "android", "ios", "app developer", "application developer"] },
];

export const JOB_CATEGORIES = CATEGORY_SPECS.map(({ name }) => name);
const PRIMARY_FEED_CATEGORIES = CATEGORY_SPECS.slice(0, 5);
const POPULAR_CATEGORY_SPECS = CATEGORY_SPECS.slice(0, 5);

const jobsCache = new Map();
const jobsRequests = new Map();
let categoryCache = null;
let categoryCacheTimestamp = 0;
let categoryCountsCache = null;
let categoryCountsCacheTimestamp = 0;
let categoryCountsRequest = null;
let categoriesRequest = null;
const topCompaniesCache = new Map();
const topCompaniesRequests = new Map();

// =========================================================
// Basic helpers
// =========================================================

const safeString = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
};

const DETAIL_CACHE_KEY = "hireflow:job-details:v2";

const cacheJobsForDetails = (jobs) => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(DETAIL_CACHE_KEY) || "[]");
    const byId = new Map(cached.map((job) => [job.id, job]));
    jobs.forEach((job) => byId.set(job.id, { ...job, raw: undefined }));
    sessionStorage.setItem(DETAIL_CACHE_KEY, JSON.stringify(Array.from(byId.values()).slice(-250)));
  } catch {
    // Browser storage can be disabled or full; in-memory job data still works.
  }
};

const getPersistedJob = (id) => {
  try {
    return JSON.parse(sessionStorage.getItem(DETAIL_CACHE_KEY) || "[]")
      .find((job) => job.id === id) || null;
  } catch {
    return null;
  }
};

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => typeof item === "object" && item !== null
        ? safeString(item.name || item.label || item.value || item.text || item.skill)
        : safeString(item))
      .filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const cleanDescription = (value) => safeString(value)
  .replace(/<br\s*\/?\s*>/gi, "\n")
  .replace(/<\/(?:p|div|li|h[1-6])\s*>/gi, "\n")
  .replace(/<[^>]*>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/[ \t]+/g, " ")
  .replace(/ *\n */g, "\n")
  .trim();

const COMMON_SKILLS = ["JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Python", "Java", "C#", "C++", ".NET", "PHP", "Ruby", "Go", "SQL", "PostgreSQL", "MySQL", "MongoDB", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Git", "HTML", "CSS", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Excel", "Power BI", "Tableau", "Salesforce", "SEO", "Google Analytics", "Linux", "REST API", "GraphQL", "Machine Learning", "Artificial Intelligence", "Data Analysis", "Data Visualization", "Cybersecurity", "Information Security", "Project Management", "Agile", "Scrum", "UI/UX", "Copywriting", "Financial Analysis", "Bookkeeping", "QuickBooks", "Customer Service", "Lead Generation", "Negotiation", "Public Relations", "Content Marketing", "Social Media Marketing", "Market Research", "Business Development"];

const extractSkills = (description, apiSkills = []) => {
  const supplied = normalizeList(apiSkills);
  const text = description.toLowerCase();
  const mentioned = COMMON_SKILLS.filter((skill) => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9+#])${escaped.toLowerCase()}([^a-z0-9+#]|$)`, "i").test(text);
  });
  return [...new Set([...supplied, ...mentioned])].slice(0, 12);
};

const extractRequirements = (description, suppliedRequirements = []) => {
  const supplied = normalizeList(suppliedRequirements);
  const fragments = description.split(/\n+|(?<=[.!?])\s+/).map((fragment) => fragment.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim()).filter(Boolean);
  const requirementPhrases = fragments.map((fragment) => {
    const match = fragment.match(/\b(?:requirements?|qualifications?|what you(?:'ll| will) need|must have|must be|you (?:will )?need|experience (?:with|in|of|as)|knowledge of|proficient in|proficiency in|ability to|skilled in|minimum of|at least|bachelor(?:'s)?|master(?:'s)?|degree in|certification in|preferred qualification)[^.!?;]*/i);
    return match?.[0]?.trim();
  }).filter(Boolean);
  return [...new Set([...supplied, ...requirementPhrases])].slice(0, 8);
};

// =========================================================
// API response extraction
// =========================================================

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

const getAdzunaCategories = async (country) => {
  if (
    categoryCache &&
    categoryCache.country === country &&
    Date.now() - categoryCacheTimestamp < CATEGORY_CACHE_DURATION
  ) {
    return categoryCache.items;
  }
  if (categoriesRequest?.country === country) {
    return categoriesRequest.promise;
  }

  const promise = apiGet(`/jobs/${country}/categories`).then((response) => {
    const items = Array.isArray(response?.results) ? response.results : [];
    categoryCache = { country, items };
    categoryCacheTimestamp = Date.now();
    return items;
  });
  categoriesRequest = { country, promise };

  try {
    return await promise;
  } finally {
    if (categoriesRequest?.promise === promise) categoriesRequest = null;
  }
};

const resolveCategory = (requestedCategory, apiCategories) => {
  const normalized = safeString(requestedCategory).toLowerCase();
  if (!normalized || normalized === "all") return null;

  const spec = CATEGORY_SPECS.find(
    ({ name, apiLabel, aliases = [] }) =>
      name.toLowerCase() === normalized ||
      apiLabel.toLowerCase() === normalized ||
      aliases.some((alias) => alias.toLowerCase() === normalized),
  );

  if (spec) {
    const match = apiCategories.find(
      (item) => safeString(item?.label).toLowerCase() === spec.apiLabel.toLowerCase(),
    );
    return {
      name: spec.name,
      apiLabel: spec.apiLabel,
      tag: safeString(match?.tag) || spec.fallbackTag,
      what: spec.what || "",
      titleTerms: spec.titleTerms || [],
    };
  }

  const match = apiCategories.find(
    (item) => safeString(item?.label).toLowerCase() === normalized,
  );
  return match ? { name: match.label, apiLabel: match.label, tag: match.tag, what: "", titleTerms: [] } : null;
};

const matchesApiCategory = (job, category) => {
  const actualLabel = safeString(job?.category?.label).toLowerCase();
  if (actualLabel && actualLabel !== category.apiLabel.toLowerCase()) return false;

  if (!category.titleTerms?.length) return true;

  const title = safeString(job?.job_title || job?.title).toLowerCase();
  return category.titleTerms.some((term) => title.includes(term));
};

const inferITCategory = (title) => {
  const normalizedTitle = safeString(title).toLowerCase();
  const specializedCategories = CATEGORY_SPECS.slice(5).reverse();
  return specializedCategories.find(({ titleTerms = [] }) =>
    titleTerms.some((term) => normalizedTitle.includes(term)),
  )?.name || "IT Technology";
};

export const getCategoryCounts = async ({ countryCode = "" } = {}) => {
  const country = (countryCode || DEFAULT_COUNTRY).toLowerCase();
  if (categoryCountsCache?.country === country && Date.now() - categoryCountsCacheTimestamp < CATEGORY_CACHE_DURATION) {
    return categoryCountsCache.items;
  }
  if (categoryCountsRequest?.country === country) {
    return categoryCountsRequest.promise;
  }

  const promise = (async () => {
    const apiCategories = await getAdzunaCategories(country);
    const queryRequests = new Map();
    const counts = await Promise.all(
      POPULAR_CATEGORY_SPECS.map(async (spec) => {
        const category = resolveCategory(spec.name, apiCategories);
        const params = { results_per_page: 1 };
        if (category?.tag) params.category = category.tag;
        if (category?.what) params.what = category.what;
        const requestKey = `${params.category || ""}:${params.what || ""}`;

        if (!queryRequests.has(requestKey)) {
          queryRequests.set(
            requestKey,
            apiGet(`/jobs/${country}/search/1`, params),
          );
        }
        const result = await queryRequests.get(requestKey);
        return { ...spec, count: Number(result?.count) || 0 };
      }),
    );

    categoryCountsCache = { country, items: counts };
    categoryCountsCacheTimestamp = Date.now();
    return counts;
  })();

  categoryCountsRequest = { country, promise };
  try {
    return await promise;
  } finally {
    if (categoryCountsRequest?.promise === promise) categoryCountsRequest = null;
  }
};

export const getTopCompanies = async ({ countryCode = "", forceRefresh = false } = {}) => {
  const country = (countryCode || DEFAULT_COUNTRY).toLowerCase();
  const cached = topCompaniesCache.get(country);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CATEGORY_CACHE_DURATION) {
    return cached.items;
  }
  if (!forceRefresh && topCompaniesRequests.has(country)) {
    return topCompaniesRequests.get(country);
  }

  const request = apiGet(`/jobs/${country}/top_companies`).then((response) => {
    const items = Array.isArray(response?.leaderboard) ? response.leaderboard : [];
    topCompaniesCache.set(country, { items, timestamp: Date.now() });
    return items;
  });
  topCompaniesRequests.set(country, request);
  try {
    return await request;
  } finally {
    if (topCompaniesRequests.get(country) === request) topCompaniesRequests.delete(country);
  }
};

// =========================================================
// Company website / logo resolver
// ---------------------------------------------------------
// Adzuna listings usually provide a company name rather than a logo.
// =========================================================

const getCompanyWebsite = (job) => {
  return (
    safeString(job?.company_website) ||
    safeString(job?.company?.website) ||
    safeString(job?.company?.url)
  );
};

const getCompanyLogo = (job) => {
  const directLogo =
    safeString(job?.company_logo) ||
    safeString(job?.logo_url) ||
    safeString(job?.company?.logo);

  if (directLogo) return directLogo;

  const website = getCompanyWebsite(job);
  const token = import.meta.env.VITE_LOGO_DEV_TOKEN;

  if (token && website) {
    try {
      const hostname = new URL(website).hostname;
      return `https://img.logo.dev/${hostname}?token=${encodeURIComponent(token)}&size=128`;
    } catch {
      // Fall through to name lookup or favicon fallback.
    }
  }

  if (token && job?.company?.display_name) {
    return `https://img.logo.dev/name/${encodeURIComponent(job.company.display_name)}?token=${encodeURIComponent(token)}&size=128`;
  }

  if (!website) {
    return "";
  }

  try {
    const hostname = new URL(website).hostname;

    // Website favicon/icon.
    // This represents the company's actual web identity.
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return "";
  }
};

// =========================================================
// Date formatting
// =========================================================

const formatPostedDate = (value) => {
  const rawDate = safeString(value);

  if (!rawDate) {
    return "Recently posted";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }

  const now = new Date();
  const difference =
    now.getTime() - date.getTime();

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  );

  if (days <= 0) {
    return "Today";
  }

  if (days === 1) {
    return "1 day ago";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);

  if (days < 30) {
    return weeks === 1
      ? "1 week ago"
      : `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 30);

  return months === 1
    ? "1 month ago"
    : `${months} months ago`;
};

// =========================================================
// Job type
// =========================================================

const normalizeJobType = (value) => {
  const type = safeString(value);

  if (!type) {
    return "Not specified";
  }

  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
};

const getExperienceLevel = (job) => {
  const seniority = safeString(job?.job_seniority_level).toLowerCase();
  const title = safeString(job?.job_title || job?.title).toLowerCase();
  const titleText = `${seniority} ${title}`;

  if (/\b(senior|sr\.?|lead|principal|staff|director|vp|head of)\b/.test(titleText)) return "Senior Level";
  if (/\b(entry[- ]level|junior|jr\.?|intern(ship)?|trainee|graduate|new grad|early career)\b/.test(titleText)) return "Entry Level";
  if (/\b(mid[- ]level|intermediate)\b/.test(titleText)) return "Mid Level";

  const description = safeString(job?.job_summary || job?.description).toLowerCase();
  const years = [...description.matchAll(/(\d+)\s*\+?\s*(?:years|yrs)/g)].map((match) => Number(match[1]));
  if (years.some((year) => year >= 7)) return "Senior Level";
  if (years.some((year) => year <= 2)) return "Entry Level";
  return "Mid Level";
};

const getRemoteStatus = (job) => {
  const workplace = safeString(job?.workplace_type || job?.remote_type).toLowerCase();
  const details = `${safeString(job?.job_title || job?.title)} ${safeString(job?.job_summary || job?.description)} ${safeString(job?.job_location || job?.location?.display_name)}`.toLowerCase();
  return /\b(remote|remotely|work\s*[- ]?from\s*[- ]?home|fully distributed|telecommut(?:e|ing)|home[- ]based|work from anywhere)\b/.test(`${workplace} ${details}`);
};

const getSalaryValue = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const matchesJobFilters = (job, { jobType, experienceLevel, salaryMin, salaryMax }) => {
  const type = safeString(job.type).toLowerCase();
  const titleAndDescription = `${job.title} ${job.description}`.toLowerCase();

  if (jobType === "Full Time" && !/(full[ -]?time|permanent)/.test(type)) return false;
  if (jobType === "Part Time" && !/part[ -]?time/.test(type)) return false;
  if (jobType === "Contract" && !/(contract|temporary|fixed[ -]?term)/.test(type)) return false;
  if (jobType === "Internship" && !(/intern(ship)?/.test(`${type} ${titleAndDescription}`))) return false;
  if (jobType === "Remote" && !job.isRemote) return false;
  if (experienceLevel && job.experienceLevel !== experienceLevel) return false;

  const minimum = getSalaryValue(salaryMin);
  const maximum = getSalaryValue(salaryMax);
  const jobMinimum = job.salaryMinValue ?? job.salaryMaxValue;
  const jobMaximum = job.salaryMaxValue ?? job.salaryMinValue;
  if (minimum !== null && (jobMaximum === null || jobMaximum < minimum)) return false;
  if (maximum !== null && (jobMinimum === null || jobMinimum > maximum)) return false;

  return true;
};

// =========================================================
// Job normalization
// ---------------------------------------------------------
// Raw API response -> HireFlow job object.
// UI components only consume this normalized structure.
// =========================================================

const normalizeJob = (job) => {
  const industries = normalizeList(
    job?.job_industries ||
      job?.industries ||
      job?.category?.label,
  );

  const description = cleanDescription(job?.job_summary || job?.description);
  const skills = extractSkills(description, job?.skills || job?.job_skills || job?.required_skills || job?.job_required_skills);
  const requirements = extractRequirements(description, job?.requirements || job?.job_requirements || job?.qualifications || job?.job_qualifications || job?.key_requirements);

  const company =
    safeString(job?.company_name) ||
    safeString(job?.company?.display_name) ||
    "Company not specified";

  const companyWebsite =
    getCompanyWebsite(job);
  const apiCategory = safeString(job?.category?.label);
  const mappedCategory = CATEGORY_SPECS.find(
    (item) => item.apiLabel.toLowerCase() === apiCategory.toLowerCase(),
  )?.name;
  const inferredITCategory = apiCategory.toLowerCase() === "it jobs"
    ? inferITCategory(job?.job_title || job?.title)
    : "";
  const experienceLevel = getExperienceLevel(job);

  return {
    id:
      (job?.id !== undefined ? `${job?.__country || DEFAULT_COUNTRY}-${job.id}` : "") ||
      safeString(job?.url),

    title:
      safeString(job?.job_title) ||
      safeString(job?.title) ||
      "Untitled Position",

    company,
    companyName: company,

    companyLogo: getCompanyLogo(job),

    companyWebsite,

    location:
      safeString(job?.job_location) ||
      safeString(job?.location?.display_name) ||
      "Location not specified",

    countryCode:
      safeString(job?.country_code) || safeString(job?.__country).toUpperCase(),

    category:
      safeString(job?.__categoryLabel) || inferredITCategory || mappedCategory || industries[0] || "IT Jobs",

    categories: [...new Set([...industries, ...(job?.__categoryAliases || [])])],

    type: normalizeJobType(
      [job?.job_employment_type, job?.contract_time, job?.contract_type]
        .filter(Boolean)
        .join(" "),
    ),

    experience:
      experienceLevel,
    experienceLevel,

    salary:
      safeString(job?.job_base_pay_range) ||
      (job?.salary_min || job?.salary_max
        ? `${job?.salary_min || ""}${job?.salary_min && job?.salary_max ? " - " : ""}${job?.salary_max || ""}`
        : "Salary not specified"),
    salaryMinValue: getSalaryValue(job?.salary_min),
    salaryMaxValue: getSalaryValue(job?.salary_max),
    isRemote: getRemoteStatus(job),

    description: description || "No job description is available.",

    skills,
    requirements,

    certifications:
      normalizeList(job?.certifications),

    posted: formatPostedDate(
      job?.job_posted_date || job?.created,
    ),

    postedDate:
      safeString(job?.job_posted_date || job?.created),

    url: safeString(job?.url) || safeString(job?.redirect_url),

    applyUrl:
      safeString(job?.apply_link) ||
      safeString(job?.redirect_url) ||
      safeString(job?.url),

    competitivenessScore:
      job?.competitiveness_score ?? null,

    ingestionDate:
      safeString(job?.ingestion_date),

    validatedOn:
      safeString(job?.validated_on),

    listingClosed:
      job?.listing_closed === true ||
      job?.listing_closed === "true",

    // Keep original response for future features.
    raw: job,
  };
};

// =========================================================
// Get jobs from API
// =========================================================

export const getJobs = async ({
  limit = DEFAULT_LIMIT,
  countryCode = "",
  forceRefresh = false,
  category: requestedCategory = "",
  search = "",
  location = "",
  jobType = "All",
  experienceLevel = "All",
  salaryMin = "",
  salaryMax = "",
} = {}) => {
  const country = (countryCode || DEFAULT_COUNTRY).toLowerCase();
  const resultLimit = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), 50);
  const normalizedCategory = safeString(requestedCategory);
  const normalizedSearch = safeString(search);
  const normalizedLocation = safeString(location);
  const normalizedJobType = safeString(jobType) || "All";
  const normalizedExperienceLevel = safeString(experienceLevel) || "All";
  const normalizedSalaryMin = safeString(salaryMin);
  const normalizedSalaryMax = safeString(salaryMax);
  const salaryMinValue = getSalaryValue(normalizedSalaryMin);
  const salaryMaxValue = getSalaryValue(normalizedSalaryMax);
  if ((normalizedSalaryMin && salaryMinValue === null) || (normalizedSalaryMax && salaryMaxValue === null)) return [];
  if (salaryMinValue !== null && salaryMaxValue !== null && salaryMinValue > salaryMaxValue) return [];
  const cacheKey = `${country}:${normalizedCategory.toLowerCase()}:${normalizedSearch.toLowerCase()}:${normalizedLocation.toLowerCase()}:${normalizedJobType.toLowerCase()}:${normalizedExperienceLevel.toLowerCase()}:${normalizedSalaryMin}:${normalizedSalaryMax}`;
  const cached = jobsCache.get(cacheKey);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.jobs.slice(0, resultLimit);
  }
  if (!forceRefresh && jobsRequests.has(cacheKey)) {
    return jobsRequests.get(cacheKey).then((items) => items.slice(0, resultLimit));
  }

  const promise = (async () => {
    const apiCategories = await getAdzunaCategories(country);
    const requestedCategorySpec = resolveCategory(normalizedCategory, apiCategories);

    if (normalizedCategory && normalizedCategory.toLowerCase() !== "all" && !requestedCategorySpec) {
      return [];
    }

    const fetchCategoryJobs = async (category, requestLimit, { includeSpecializedIT = false } = {}) => {
      const params = { results_per_page: requestLimit, sort_by: "date" };
      if (category?.tag) params.category = category.tag;
      const whatTerms = [category?.what, normalizedSearch];
      if (normalizedJobType === "Internship") whatTerms.push("internship");
      if (normalizedJobType === "Remote") whatTerms.push("remote");
      const what = [...new Set(whatTerms.filter(Boolean))].join(" ");
      if (what) params.what = what;
      if (normalizedJobType === "Full Time") params.full_time = 1;
      if (normalizedJobType === "Part Time") params.part_time = 1;
      if (normalizedJobType === "Contract") params.contract = 1;
      if (salaryMinValue !== null) params.salary_min = salaryMinValue;
      if (salaryMaxValue !== null) params.salary_max = salaryMaxValue;
      if (normalizedLocation) params.where = normalizedLocation;

      const response = await apiGet(`/jobs/${country}/search/1`, params);
      const jobs = extractJobs(response)
        .filter((job) => !category || matchesApiCategory(job, category))
        .map((job) => {
          const title = job?.job_title || job?.title;
          const categoryName = category?.name === "IT Technology"
            ? inferITCategory(title)
            : category?.name || "";
          return {
            ...job,
            __country: country,
            __categoryLabel: categoryName,
            __categoryAliases: CATEGORY_SPECS.find((item) => item.name === categoryName)?.aliases || [],
          };
        });

      return category?.name === "IT Technology" && !includeSpecializedIT
        ? jobs.filter((job) => job.__categoryLabel === "IT Technology")
        : jobs;
    };

    let rawJobs;
    if (requestedCategorySpec) {
      rawJobs = await fetchCategoryJobs(requestedCategorySpec, 50);
    } else {
      const perCategoryLimit = 10;
      const categoryResults = await Promise.allSettled(
        PRIMARY_FEED_CATEGORIES.map((spec) => {
          const category = resolveCategory(spec.name, apiCategories);
          return fetchCategoryJobs(category, perCategoryLimit, { includeSpecializedIT: true });
        }),
      );
      const successfulResults = categoryResults.filter((result) => result.status === "fulfilled");
      if (successfulResults.length === 0) {
        throw categoryResults.find((result) => result.status === "rejected")?.reason || new Error("No job categories could be loaded.");
      }
      if (successfulResults.length < PRIMARY_FEED_CATEGORIES.length) {
        console.warn(`Adzuna loaded ${successfulResults.length}/${PRIMARY_FEED_CATEGORIES.length} job categories; failed categories will be retried on the next refresh.`);
      }
      rawJobs = successfulResults.flatMap((result) => result.value);
    }

    const normalizedJobs = rawJobs
      .map(normalizeJob)
      .filter((job) => !job.listingClosed)
      .filter((job) => job.id)
      .filter((job) => matchesJobFilters(job, {
        jobType: normalizedJobType === "All" ? "" : normalizedJobType,
        experienceLevel: normalizedExperienceLevel === "All" ? "" : normalizedExperienceLevel,
        salaryMin: normalizedSalaryMin,
        salaryMax: normalizedSalaryMax,
      }));

    const uniqueJobs = Array.from(new Map(normalizedJobs.map((job) => [job.id, job])).values());
    const jobs = uniqueJobs
      .sort((first, second) => (Date.parse(second.postedDate) || 0) - (Date.parse(first.postedDate) || 0))

    jobsCache.set(cacheKey, { jobs, timestamp: Date.now() });
    cacheJobsForDetails(jobs);
    return jobs;
  })();

  jobsRequests.set(cacheKey, promise);
  try {
    const jobs = await promise;
    return jobs.slice(0, resultLimit);
  } finally {
    if (jobsRequests.get(cacheKey) === promise) jobsRequests.delete(cacheKey);
  }
};

// =========================================================
// Get a single job
// =========================================================

export const getJobById = async (id) => {
  const requestedId = safeString(id);

  if (!requestedId) {
    return null;
  }

  // First search existing cache.
  if (jobsCache.size) {
    const cachedJob = Array.from(jobsCache.values())
      .flatMap((entry) => entry.jobs)
      .find((job) => job.id === requestedId);

    if (cachedJob) {
      return cachedJob;
    }
  }

  const persistedJob = getPersistedJob(requestedId);
  if (persistedJob) return persistedJob;

  // Direct URL access may not have cache yet.
  const jobs = await getJobs();

  return (
    jobs.find(
      (job) => job.id === requestedId,
    ) || null
  );
};

// =========================================================
// Search / filter
// =========================================================

export const searchJobs = (
  jobs,
  {
    search = "",
    location = "",
    category = "",
    jobType = "",
  } = {},
) => {
  const normalizedSearch =
    safeString(search).toLowerCase();

  const normalizedLocation =
    safeString(location).toLowerCase();

  const normalizedCategory =
    safeString(category).toLowerCase();

  const normalizedJobType =
    safeString(jobType).toLowerCase();

  return jobs.filter((job) => {
    const searchableText = [
      job.title,
      job.company,
      job.location,
      job.description,
      job.category,
      ...job.categories,
      ...job.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      searchableText.includes(
        normalizedSearch,
      );

    const matchesLocation =
      !normalizedLocation ||
      job.location
        .toLowerCase()
        .includes(normalizedLocation);

    const matchesCategory =
      !normalizedCategory ||
      job.category
        .toLowerCase()
        .includes(normalizedCategory) ||
      job.categories.some((item) =>
        item
          .toLowerCase()
          .includes(normalizedCategory),
      );

    const matchesType =
      !normalizedJobType ||
      job.type
        .toLowerCase()
        .includes(normalizedJobType);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesType
    );
  });
};

// =========================================================
// Company aggregation
// ---------------------------------------------------------
// There is no guaranteed separate company endpoint in the
// current API contract, so companies are derived from jobs.
// =========================================================

export const getCompanies = async ({
  countryCode = "",
  forceRefresh = false,
} = {}) => {
  const [jobs, topEmployers] = await Promise.all([
    getJobs({
    limit: DEFAULT_LIMIT,
    countryCode,
    forceRefresh,
    }),
    getTopCompanies({ countryCode, forceRefresh }).catch(() => []),
  ]);

  const topEmployerByName = new Map(
    topEmployers.map((employer) => [
      safeString(employer?.canonical_name).toLowerCase(),
      employer,
    ]),
  );

  const companyMap = new Map();

  jobs.forEach((job) => {
    const key =
      job.companyName
        .trim()
        .toLowerCase();

    if (!key) {
      return;
    }

    if (!companyMap.has(key)) {
      companyMap.set(key, {
        id: encodeURIComponent(
          key,
        ),

        name: job.companyName,

        industry:
          job.category ||
          "Technology",

        location:
          job.location ||
          "Not specified",

        companyLogo:
          job.companyLogo,

        website:
          job.companyWebsite,

        openJobs: 0,

        jobs: [],
        adzunaOpenJobs: Number(topEmployerByName.get(key)?.count) || null,
        averageSalary: Number(topEmployerByName.get(key)?.average_salary) || null,
      });
    }

    const company =
      companyMap.get(key);

    company.openJobs += 1;

    company.jobs.push(job);

    // Prefer a logo if a later job contains one.
    if (
      !company.companyLogo &&
      job.companyLogo
    ) {
      company.companyLogo =
        job.companyLogo;
    }

    // Prefer a website if available.
    if (
      !company.website &&
      job.companyWebsite
    ) {
      company.website =
        job.companyWebsite;
    }
  });

  return Array.from(
    companyMap.values(),
  ).sort(
    (first, second) =>
      (second.adzunaOpenJobs || second.openJobs) -
      (first.adzunaOpenJobs || first.openJobs),
  );
};

// =========================================================
// Single company
// =========================================================

export const getCompanyById = async (
  id,
) => {
  const companies =
    await getCompanies();

  let normalizedId = safeString(id);
  try {
    normalizedId = decodeURIComponent(normalizedId);
  } catch {
    // Keep the route parameter as-is if it is not valid URI encoding.
  }

  return (
    companies.find(
      (company) =>
        company.id === id || company.name.trim().toLowerCase() === normalizedId.trim().toLowerCase(),
    ) || null
  );
};

// =========================================================
// Cache utilities
// =========================================================

export const clearJobsCache = () => {
  jobsCache.clear();
  jobsRequests.clear();
  topCompaniesCache.clear();
  topCompaniesRequests.clear();
  categoryCache = null;
  categoryCountsCache = null;
  categoryCountsRequest = null;
  categoriesRequest = null;
};

export const getCachedJobs = () => {
  const entries = Array.from(jobsCache.values());
  return entries.at(-1)?.jobs || [];
};
