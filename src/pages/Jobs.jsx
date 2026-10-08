import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import JobCard from "../components/jobs/JobCard";
import { getJobs, searchJobs } from "../services/jobService";

// =========================================================
// HireFlow - Jobs Page
// ---------------------------------------------------------
// Data flow:
// API -> jobService -> normalized jobs -> local filters -> UI
//
// The page does not know JobDataPool field names. This keeps
// the component maintainable if the external API changes.
// =========================================================

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------------------------------------------------------
  // Search state
  // ---------------------------------------------------------

  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchInput, setSearchInput] = useState(initialQuery);
  const [locationInput, setLocationInput] = useState(initialLocation);

  const [search, setSearch] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  // ---------------------------------------------------------
  // Filter state
  // ---------------------------------------------------------

  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");

  const [showFilters, setShowFilters] = useState(false);

  // ---------------------------------------------------------
  // API state
  // ---------------------------------------------------------

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // Fetch real IT jobs
  // ---------------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getJobs({
          limit: 10,
          industries: "Software",
        });

        if (isMounted) {
          setJobs(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.message ||
              "Unable to load jobs right now.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------------------------------------------------------
  // Search submit
  // ---------------------------------------------------------

  const handleSearch = () => {
    const cleanQuery = searchInput.trim();
    const cleanLocation = locationInput.trim();

    setSearch(cleanQuery);
    setLocation(cleanLocation);

    const nextParams = new URLSearchParams();

    if (cleanQuery) {
      nextParams.set("q", cleanQuery);
    }

    if (cleanLocation) {
      nextParams.set("location", cleanLocation);
    }

    setSearchParams(nextParams);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // ---------------------------------------------------------
  // Dynamic filter options from real API data
  // ---------------------------------------------------------

  const categoryOptions = useMemo(() => {
    const values = jobs
      .flatMap((job) => job.categories)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [jobs]);

  const jobTypeOptions = useMemo(() => {
    const values = jobs
      .map((job) => job.type)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [jobs]);

  // ---------------------------------------------------------
  // Apply search, filters and sorting locally
  // ---------------------------------------------------------

  const filteredJobs = useMemo(() => {
    let result = searchJobs(jobs, {
      query: search,
      location,
    });

    if (category !== "All") {
      result = result.filter((job) =>
        job.categories.some(
          (item) =>
            item.toLowerCase() === category.toLowerCase(),
        ),
      );
    }

    if (jobType !== "All") {
      result = result.filter(
        (job) =>
          job.type.toLowerCase() === jobType.toLowerCase(),
      );
    }

    if (sortBy === "Company") {
      result = [...result].sort((a, b) =>
        a.company.localeCompare(b.company),
      );
    }

    if (sortBy === "Title") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }

    return result;
  }, [jobs, search, location, category, jobType, sortBy]);

  // ---------------------------------------------------------
  // Reset local filters
  // ---------------------------------------------------------

  const resetFilters = () => {
    setSearchInput("");
    setLocationInput("");
    setSearch("");
    setLocation("");
    setCategory("All");
    setJobType("All");
    setSortBy("Latest");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          PAGE HEADER + SEARCH
      ===================================================== */}
      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
              IT & Technology Jobs
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find Your Next
              <span className="text-blue-500"> Opportunity</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Explore live technology opportunities from the connected
              job data source and discover your next career move.
            </p>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl bg-white p-3 shadow-2xl md:grid-cols-[1fr_1fr_auto]">
            {/* Keyword search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500">
              <Search size={19} className="shrink-0 text-slate-400" />

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

            {/* Location search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-blue-500">
              <MapPin size={19} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={locationInput}
                onChange={(event) =>
                  setLocationInput(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
                placeholder="City, country or remote"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Search size={17} />
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          LISTING AREA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
            {loading ? "Loading..." : `${filteredJobs.length} jobs`}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* =================================================
              DESKTOP FILTERS
          ================================================= */}
          <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Filters</h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>

            <FilterControls
              category={category}
              setCategory={setCategory}
              categoryOptions={categoryOptions}
              jobType={jobType}
              setJobType={setJobType}
              jobTypeOptions={jobTypeOptions}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>

          {/* =================================================
              RESULTS
          ================================================= */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {loading
                    ? "Loading IT jobs..."
                    : `${filteredJobs.length} IT jobs found`}
                </p>

                {!loading && !error && (
                  <p className="mt-1 text-xs text-slate-500">
                    Results are filtered from the current API response.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown size={16} className="text-slate-400" />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
                >
                  <option value="Latest">Latest</option>
                  <option value="Company">Company</option>
                  <option value="Title">Title</option>
                </select>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="grid gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <JobSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Jobs could not be loaded
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <Search size={24} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  No matching jobs
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try another keyword, location or filter.
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

            {/* Job results */}
            {!loading && !error && filteredJobs.length > 0 && (
              <div className="grid gap-5">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <aside className="absolute right-0 top-0 h-full w-[min(88%,380px)] overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <FilterControls
              category={category}
              setCategory={setCategory}
              categoryOptions={categoryOptions}
              jobType={jobType}
              setJobType={setJobType}
              jobTypeOptions={jobTypeOptions}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

// =========================================================
// Filter Controls
// ---------------------------------------------------------
// Shared between desktop sidebar and mobile drawer.
// =========================================================

const FilterControls = ({
  category,
  setCategory,
  categoryOptions,
  jobType,
  setJobType,
  jobTypeOptions,
  sortBy,
  setSortBy,
}) => (
  <div className="mt-7 space-y-6">
    <div>
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
          onChange={(event) => setCategory(event.target.value)}
          className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {categoryOptions.map((item) => (
            <option key={item} value={item}>
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

    <div>
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
          onChange={(event) => setJobType(event.target.value)}
          className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {jobTypeOptions.map((item) => (
            <option key={item} value={item}>
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

    <div>
      <label
        htmlFor="sort-filter"
        className="text-sm font-semibold text-slate-800"
      >
        Sort results
      </label>

      <div className="relative">
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="Latest">Latest</option>
          <option value="Company">Company</option>
          <option value="Title">Title</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  </div>
);

// =========================================================
// Loading skeleton
// =========================================================

const JobSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex gap-4">
      <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

      <div className="min-w-0 flex-1">
        <div className="h-5 w-3/5 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-2/5 rounded bg-slate-200" />

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-200" />
        </div>
      </div>
    </div>

    <div className="mt-5 space-y-2">
      <div className="h-3 w-full rounded bg-slate-200" />
      <div className="h-3 w-4/5 rounded bg-slate-200" />
    </div>

    <div className="mt-5 flex justify-between border-t border-slate-100 pt-5">
      <div className="h-7 w-32 rounded-full bg-slate-200" />
      <div className="h-10 w-28 rounded-xl bg-slate-200" />
    </div>
  </div>
);

export default Jobs;
