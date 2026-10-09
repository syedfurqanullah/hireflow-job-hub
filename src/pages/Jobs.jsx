import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getJobs, JOB_CATEGORIES } from "../services/jobService";
import JobSearch from "../components/jobs/JobSearch";
import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";

/* =========================================================
   JOB CARD

   Purpose:
   - Reusable card for each job.
   - Responsive layout for mobile, tablet and desktop.
========================================================= */

/* =========================================================
   JOBS PAGE
========================================================= */

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") || "All";
  const [jobs, setJobs] = useState([]);
  const [apiError, setApiError] = useState("");

  /* =======================================================
     SEARCH INPUT STATES

     Search button ke baad actual filters apply honge.
     Isse API connect karne par bhi unnecessary requests
     nahi jayengi.
  ======================================================= */

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [locationInput, setLocationInput] = useState(searchParams.get("location") || "");

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  /* =======================================================
     FILTER STATES
  ======================================================= */

  const [category, setCategory] = useState(requestedCategory);
  const [jobType, setJobType] = useState("All");
  const [experienceLevel, setExperienceLevel] = useState("All");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryMinInput, setSalaryMinInput] = useState("");
  const [salaryMaxInput, setSalaryMaxInput] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  /* Mobile filter drawer */
  const [showFilters, setShowFilters] = useState(false);

  /* Loading state */
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let active = true;
    getJobs({
      category: category === "All" ? "" : category,
      search,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
    })
      .then((items) => {
        if (active) {
          setJobs(items);
          setApiError("");
        }
      })
      .catch((error) => {
        if (active) setApiError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [category, search, location, jobType, experienceLevel, salaryMin, salaryMax]);

  const changeCategory = (nextCategory) => {
    setApiError("");
    setLoading(true);
    setCurrentPage(1);
    setCategory(nextCategory);
  };

  const changeJobType = (nextJobType) => {
    setLoading(true);
    setCurrentPage(1);
    setJobType(nextJobType);
  };

  const changeExperienceLevel = (nextExperienceLevel) => {
    setLoading(true);
    setCurrentPage(1);
    setExperienceLevel(nextExperienceLevel);
  };


  /* =======================================================
     SEARCH HANDLER
  ======================================================= */

  const handleSearch = () => {
    if (salaryMinInput && salaryMaxInput && Number(salaryMinInput) > Number(salaryMaxInput)) {
      setApiError("Minimum salary must be less than or equal to maximum salary.");
      return;
    }
    setApiError("");
    setLoading(true);
    setSearch(searchInput.trim());
    setLocation(locationInput.trim());
    setSalaryMin(salaryMinInput.trim());
    setSalaryMax(salaryMaxInput.trim());
    setCurrentPage(1);
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
    const categories = jobs
      .map((job) => job.category)
      .filter(Boolean);

    return ["All", ...new Set([...JOB_CATEGORIES, category === "All" ? "" : category, ...categories].filter(Boolean))];
  }, [jobs, category]);

  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredJobs = useMemo(() => {

    const normalizedSearch = search.toLowerCase();
    const normalizedLocation = location.toLowerCase();

    const result = jobs.filter((job) => {

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
          category.toLowerCase() ||
        job.categories.some((item) => item.toLowerCase() === category.toLowerCase()) ||
        (["it", "it technology", "technology"].includes(category.toLowerCase()) &&
          ["it technology", "technology"].includes(job.category.toLowerCase()));

      return (
        searchMatch &&
        locationMatch &&
        categoryMatch
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
     * API listings are sorted by their published date.
     */
    return result;

  }, [
    search,
    jobs,
    location,
    category,
    sortBy,
  ]);


  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const visibleJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const resetFilters = () => {
    setLoading(true);
    setCurrentPage(1);
    setSearchInput("");
    setLocationInput("");

    setSearch("");
    setLocation("");

    changeCategory("All");
    setJobType("All");
    setExperienceLevel("All");
    setSalaryMin("");
    setSalaryMax("");
    setSalaryMinInput("");
    setSalaryMaxInput("");
    setSortBy("Latest");
  };


  /* =======================================================
     PAGE UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50">
      {apiError && (
        <p role="status" className="mx-auto max-w-7xl px-4 pt-4 text-sm text-amber-700">
          Live job feed unavailable. {apiError}
        </p>
      )}

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

          <JobSearch searchInput={searchInput} setSearchInput={setSearchInput} locationInput={locationInput} setLocationInput={setLocationInput} onSearch={handleSearch} onKeyDown={handleSearchKeyDown} loading={loading} />

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


            <div className="mt-7">
              <JobFilters
                idPrefix="desktop-filter"
                category={category}
                categoryOptions={categoryOptions}
                setCategory={changeCategory}
                jobType={jobType}
                setJobType={changeJobType}
                experienceLevel={experienceLevel}
                setExperienceLevel={changeExperienceLevel}
                salaryMinInput={salaryMinInput}
                setSalaryMinInput={setSalaryMinInput}
                salaryMaxInput={salaryMaxInput}
                setSalaryMaxInput={setSalaryMaxInput}
                locationInput={locationInput}
                setLocationInput={setLocationInput}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>


            {/* Active filters */}
            {(category !== "All" ||
              jobType !== "All" ||
              experienceLevel !== "All" ||
              salaryMin || salaryMax ||
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

                  {experienceLevel !== "All" && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {experienceLevel}
                    </span>
                  )}

                  {(salaryMin || salaryMax) && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      ${salaryMin || "0"} – ${salaryMax || "Any"}
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
              {loading && <Loader text="Loading live jobs..." className="min-h-40 rounded-2xl bg-white" />}


              {/* Job cards */}
              {!loading &&
                filteredJobs.length > 0 &&
                visibleJobs.map((job) => (
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
                      {apiError ? "Could not load jobs" : "No jobs found"}
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      {apiError || "We could not find any opportunities matching your current search and filters. Try different keywords or clear the filters."}
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

            {!loading && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-7" />}

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


            <div className="mt-8">
              <JobFilters
                idPrefix="mobile-filter"
                category={category}
                categoryOptions={categoryOptions}
                setCategory={changeCategory}
                jobType={jobType}
                setJobType={changeJobType}
                experienceLevel={experienceLevel}
                setExperienceLevel={changeExperienceLevel}
                salaryMinInput={salaryMinInput}
                setSalaryMinInput={setSalaryMinInput}
                salaryMaxInput={salaryMaxInput}
                setSalaryMaxInput={setSalaryMaxInput}
                locationInput={locationInput}
                setLocationInput={setLocationInput}
              />
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
                onClick={() => {
                  handleSearch();
                  setShowFilters(false);
                }}
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
