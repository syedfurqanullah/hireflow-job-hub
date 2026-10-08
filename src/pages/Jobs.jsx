import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  BriefcaseBusiness,
  Clock3,
  ChevronDown,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   DEVELOPMENT JOB DATA

   Purpose:
   - API ko temporarily side par rakha gaya hai.
   - Ye realistic IT/Software jobs frontend development ke
     liye use ho rahi hain.
   - Later isi structure ko real API response se replace
     kiya jayega.
========================================================= */

const MOCK_JOBS = [
  {
    id: "hf-frontend-001",
    title: "Frontend React Developer",
    company: "TechNova Solutions",
    location: "Karachi, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 180K - 250K",
    posted: "2 days ago",
    category: "Software Development",
    description:
      "Build modern and responsive web applications using React, JavaScript and Tailwind CSS.",
  },

  {
    id: "hf-backend-002",
    title: "Backend Node.js Developer",
    company: "CloudStack Technologies",
    location: "Lahore, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 200K - 300K",
    posted: "3 days ago",
    category: "Software Development",
    description:
      "Develop scalable backend services and REST APIs using Node.js and modern cloud technologies.",
  },

  {
    id: "hf-fullstack-003",
    title: "Full Stack JavaScript Developer",
    company: "DigitalPeak Labs",
    location: "Islamabad, Pakistan",
    type: "Full Time",
    experience: "Senior Level",
    salary: "PKR 250K - 400K",
    posted: "4 days ago",
    category: "Software Development",
    description:
      "Work across frontend and backend systems to deliver production-ready web applications.",
  },

  {
    id: "hf-uiux-004",
    title: "UI/UX Product Designer",
    company: "PixelCraft Studio",
    location: "Karachi, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 150K - 220K",
    posted: "5 days ago",
    category: "Design",
    description:
      "Design intuitive digital experiences and collaborate with product and engineering teams.",
  },

  {
    id: "hf-devops-005",
    title: "DevOps Engineer",
    company: "CloudBridge Systems",
    location: "Remote",
    type: "Full Time",
    experience: "Senior Level",
    salary: "PKR 300K - 450K",
    posted: "1 week ago",
    category: "DevOps & Cloud",
    description:
      "Manage cloud infrastructure, CI/CD pipelines and containerized production environments.",
  },

  {
    id: "hf-python-006",
    title: "Python Software Engineer",
    company: "DataCore Technologies",
    location: "Lahore, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 180K - 280K",
    posted: "1 week ago",
    category: "Software Development",
    description:
      "Build reliable Python services and applications for data-driven business products.",
  },

  {
    id: "hf-qa-007",
    title: "QA Automation Engineer",
    company: "QualityWorks",
    location: "Islamabad, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 160K - 240K",
    posted: "1 week ago",
    category: "Quality Assurance",
    description:
      "Create automated testing workflows and ensure product quality across web applications.",
  },

  {
    id: "hf-mobile-008",
    title: "React Native Mobile Developer",
    company: "AppForge Technologies",
    location: "Karachi, Pakistan",
    type: "Contract",
    experience: "Mid Level",
    salary: "PKR 180K - 260K",
    posted: "8 days ago",
    category: "Mobile Development",
    description:
      "Develop high-quality cross-platform mobile applications using React Native.",
  },

  {
    id: "hf-data-009",
    title: "Data Analyst",
    company: "InsightHub",
    location: "Remote",
    type: "Full Time",
    experience: "Entry Level",
    salary: "PKR 100K - 160K",
    posted: "10 days ago",
    category: "Data & AI",
    description:
      "Analyze business data and create actionable reports and dashboards for decision making.",
  },

  {
    id: "hf-ai-010",
    title: "Machine Learning Engineer",
    company: "NeuralWorks AI",
    location: "Islamabad, Pakistan",
    type: "Full Time",
    experience: "Senior Level",
    salary: "PKR 300K - 500K",
    posted: "12 days ago",
    category: "Data & AI",
    description:
      "Develop and deploy machine learning models for intelligent software products.",
  },
];


/* =========================================================
   JOB CARD

   Purpose:
   - Reusable card for each job.
   - Responsive layout for mobile, tablet and desktop.
========================================================= */

const JobCard = ({ job }) => {
  const companyInitial = job.company
    ? job.company.charAt(0).toUpperCase()
    : "H";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-6">

      {/* ===================================================
          TOP SECTION
      =================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        {/* Company + Job information */}
        <div className="flex min-w-0 gap-4">

          {/* Company logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
            {companyInitial}
          </div>

          {/* Job information */}
          <div className="min-w-0">

            {/* Job title */}
            <Link
              to={`/jobs/${job.id}`}
              className="block text-lg font-bold text-slate-900 transition hover:text-blue-600"
            >
              {job.title}
            </Link>

            {/* Company */}
            <p className="mt-1 text-sm font-medium text-slate-600">
              {job.company}
            </p>

            {/* Metadata */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">

              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {job.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness size={15} />
                {job.type}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />
                {job.posted}
              </span>

            </div>

          </div>

        </div>


        {/* Salary */}
        <span className="w-fit shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
          {job.salary}
        </span>

      </div>


      {/* ===================================================
          DESCRIPTION
      =================================================== */}

      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
        {job.description}
      </p>


      {/* ===================================================
          BOTTOM SECTION
      =================================================== */}

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Tags */}
        <div className="flex flex-wrap gap-2">

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {job.category}
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {job.experience}
          </span>

        </div>


        {/* Details */}
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          View Details
        </Link>

      </div>

    </article>
  );
};


/* =========================================================
   JOBS PAGE
========================================================= */

const Jobs = () => {

  /* =======================================================
     SEARCH INPUT STATES

     Search button ke baad actual filters apply honge.
     Isse API connect karne par bhi unnecessary requests
     nahi jayengi.
  ======================================================= */

  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  /* =======================================================
     FILTER STATES
  ======================================================= */

  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  /* Mobile filter drawer */
  const [showFilters, setShowFilters] = useState(false);

  /* Loading state */
  const [loading, setLoading] = useState(true);


  /* =======================================================
     DEVELOPMENT LOADING

     Real API ke time par ye loading API request ke saath
     control hogi.
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);


  /* =======================================================
     SEARCH HANDLER
  ======================================================= */

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setLocation(locationInput.trim());
  };


  /* =======================================================
     ENTER KEY SEARCH
  ======================================================= */

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const categoryOptions = useMemo(() => {
    const categories = MOCK_JOBS
      .map((job) => job.category)
      .filter(Boolean);

    return ["All", ...new Set(categories)];
  }, []);

  const jobTypeOptions = useMemo(() => {
    const types = MOCK_JOBS
      .map((job) => job.type)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, []);


  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredJobs = useMemo(() => {

    const normalizedSearch = search.toLowerCase();
    const normalizedLocation = location.toLowerCase();

    const result = MOCK_JOBS.filter((job) => {

      /* Search across title/company/category */
      const searchableText = [
        job.title,
        job.company,
        job.category,
        job.description,
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      /* Location filter */
      const locationMatch =
        !normalizedLocation ||
        job.location
          .toLowerCase()
          .includes(normalizedLocation);

      /* Category filter */
      const categoryMatch =
        category === "All" ||
        job.category.toLowerCase() ===
          category.toLowerCase();

      /* Job type filter */
      const typeMatch =
        jobType === "All" ||
        job.type.toLowerCase() ===
          jobType.toLowerCase();

      return (
        searchMatch &&
        locationMatch &&
        categoryMatch &&
        typeMatch
      );
    });


    /* =====================================================
       SORTING
    ===================================================== */

    if (sortBy === "Company") {
      return [...result].sort((a, b) =>
        a.company.localeCompare(b.company)
      );
    }

    if (sortBy === "Title") {
      return [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    /*
     * Default Latest:
     * MOCK_JOBS already arranged latest-first.
     */
    return result;

  }, [
    search,
    location,
    category,
    jobType,
    sortBy,
  ]);


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setSearchInput("");
    setLocationInput("");

    setSearch("");
    setLocation("");

    setCategory("All");
    setJobType("All");
    setSortBy("Latest");
  };


  /* =======================================================
     PAGE UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO / PAGE HEADER
      ===================================================== */}

      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Find Your Next Opportunity
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find Jobs That Match
              <span className="text-blue-500">
                {" "}Your Future
              </span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
              Explore the latest technology, software and
              digital opportunities from growing companies.
            </p>

          </div>


          {/* =================================================
              SEARCH PANEL
          ================================================= */}

          <div className="mt-8 grid gap-3 rounded-2xl bg-white p-3 shadow-2xl md:grid-cols-[1fr_1fr_auto]">

            {/* Keyword */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-blue-500">

              <Search
                size={19}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
                placeholder="Job title, skill or company"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

            </div>


            {/* Location */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-blue-500">

              <MapPin
                size={19}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={locationInput}
                onChange={(event) =>
                  setLocationInput(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
                placeholder="City or remote"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

            </div>


            {/* Search */}
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Search size={17} />
              Search Jobs
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Mobile toolbar */}
        <div className="mb-5 flex items-center justify-between lg:hidden">

          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <span className="text-sm font-medium text-slate-500">
            {loading
              ? "Loading..."
              : `${filteredJobs.length} jobs`}
          </span>

        </div>


        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">


          {/* =================================================
              DESKTOP FILTER SIDEBAR
          ================================================= */}

          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">

            <div className="flex items-center justify-between">

              <h2 className="font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Reset
              </button>

            </div>


            {/* Category */}
            <div className="mt-7">

              <label
                htmlFor="category-filter"
                className="text-sm font-semibold text-slate-800"
              >
                Category
              </label>

              <div className="relative">

                <select
                  id="category-filter"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categoryOptions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            {/* Job Type */}
            <div className="mt-6">

              <label
                htmlFor="job-type-filter"
                className="text-sm font-semibold text-slate-800"
              >
                Job Type
              </label>

              <div className="relative">

                <select
                  id="job-type-filter"
                  value={jobType}
                  onChange={(event) =>
                    setJobType(event.target.value)
                  }
                  className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {jobTypeOptions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            {/* Active filters */}
            {(category !== "All" ||
              jobType !== "All" ||
              search ||
              location) && (
              <div className="mt-7 rounded-xl bg-slate-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Active filters
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {search && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {search}
                    </span>
                  )}

                  {location && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {location}
                    </span>
                  )}

                  {category !== "All" && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {category}
                    </span>
                  )}

                  {jobType !== "All" && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {jobType}
                    </span>
                  )}

                </div>

              </div>
            )}

          </aside>


          {/* =================================================
              JOB RESULTS
          ================================================= */}

          <div className="min-w-0">

            {/* Results header */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Latest Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {loading
                    ? "Loading latest opportunities..."
                    : `${filteredJobs.length} opportunities found`}
                </p>

              </div>


              {/* Sort */}
              <div className="relative w-fit">

                <ArrowUpDown
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
                >
                  <option value="Latest">
                    Latest
                  </option>

                  <option value="Company">
                    Company
                  </option>

                  <option value="Title">
                    Job Title
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>


            {/* =================================================
                RESULTS
            ================================================= */}

            <div className="space-y-4">

              {/* Loading skeleton */}
              {loading && (
                <>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                    >

                      <div className="flex gap-4">

                        <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

                        <div className="flex-1">

                          <div className="h-5 w-2/3 rounded bg-slate-200" />

                          <div className="mt-3 h-4 w-1/3 rounded bg-slate-200" />

                          <div className="mt-4 h-4 w-1/2 rounded bg-slate-200" />

                          <div className="mt-5 h-10 w-full rounded bg-slate-100" />

                        </div>

                      </div>

                    </div>
                  ))}
                </>
              )}


              {/* Job cards */}
              {!loading &&
                filteredJobs.length > 0 &&
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}


              {/* Empty state */}
              {!loading &&
                filteredJobs.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                      <Search
                        size={24}
                        className="text-slate-400"
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      No jobs found
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      We could not find any opportunities
                      matching your current search and filters.
                      Try different keywords or clear the filters.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>

                  </div>
                )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 h-full w-full bg-slate-950/50"
          />


          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Refine Results
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Filters
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

            </div>


            {/* Category */}
            <div className="mt-8">

              <label
                htmlFor="mobile-category-filter"
                className="text-sm font-semibold text-slate-800"
              >
                Category
              </label>

              <select
                id="mobile-category-filter"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                {categoryOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>


            {/* Job type */}
            <div className="mt-6">

              <label
                htmlFor="mobile-job-type-filter"
                className="text-sm font-semibold text-slate-800"
              >
                Job Type
              </label>

              <select
                id="mobile-job-type-filter"
                value={jobType}
                onChange={(event) =>
                  setJobType(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                {jobTypeOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>


            {/* Mobile drawer actions */}
            <div className="mt-8 flex gap-3">

              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default Jobs;