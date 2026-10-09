import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
<<<<<<< HEAD

/* =========================================================
   Temporary Job Data

   NOTE:
   - Ye temporary UI data hai.
   - Real API integration ke waqt isi structure ko API response
     se replace kiya jayega.
========================================================= */

const jobsData = [
  {
    id: 1,
    title: "Frontend React Developer",
    company: "TechNova",
    location: "Karachi, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 150K - 220K",
    posted: "2 days ago",
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "Lahore, Pakistan",
    type: "Full Time",
    experience: "Mid Level",
    salary: "PKR 120K - 180K",
    posted: "3 days ago",
    category: "Design",
  },
  {
    id: 3,
    title: "Backend Node.js Developer",
    company: "CodeCraft",
    location: "Islamabad, Pakistan",
    type: "Full Time",
    experience: "Senior Level",
    salary: "PKR 200K - 300K",
    posted: "5 days ago",
    category: "Development",
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    company: "GrowthHub",
    location: "Remote",
    type: "Full Time",
    experience: "Entry Level",
    salary: "PKR 80K - 120K",
    posted: "1 week ago",
    category: "Marketing",
  },
];
=======
import { useSearchParams } from "react-router-dom";
import { getJobs, JOB_CATEGORIES } from "../services/jobService";
import JobSearch from "../components/jobs/JobSearch";
import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)

/* =========================================================
   Job Card

   Purpose:
   - Individual job ko reusable card mein show karta hai.
========================================================= */

<<<<<<< HEAD
const JobCard = ({ job }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        {/* Job Information */}
        <div className="flex gap-4">

          {/* Company Logo Placeholder */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
            {job.company.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {job.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-600">
              {job.company}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">

              <span className="inline-flex items-center gap-1">
                <MapPin size={15} />
                {job.location}
              </span>

              <span className="inline-flex items-center gap-1">
                <BriefcaseBusiness size={15} />
                {job.type}
              </span>

              <span className="inline-flex items-center gap-1">
                <Clock3 size={15} />
                {job.posted}
              </span>

            </div>
          </div>
        </div>

        {/* Salary */}
        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          {job.salary}
        </span>

      </div>

      {/* Bottom Row */}
      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {job.category}
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {job.experience}
          </span>
        </div>

        <button
          type="button"
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          View Details
        </button>

      </div>
    </article>
  );
};

=======
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
/* =========================================================
   Jobs Page
========================================================= */

const Jobs = () => {
<<<<<<< HEAD
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  /* =======================================================
     Filtering Logic

     Search:
     - Job title
     - Company
     - Location

     Category:
     - Development
     - Design
     - Marketing

     Job Type:
     - Full Time
     ======================================================= */

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
=======
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

>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const locationMatch =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const categoryMatch =
<<<<<<< HEAD
        category === "All" || job.category === category;

      const typeMatch =
        jobType === "All" || job.type === jobType;
=======
        category === "All" ||
        job.category.toLowerCase() ===
          category.toLowerCase() ||
        job.categories.some((item) => item.toLowerCase() === category.toLowerCase()) ||
        (["it", "it technology", "technology"].includes(category.toLowerCase()) &&
          ["it technology", "technology"].includes(job.category.toLowerCase()));
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)

      return (
        searchMatch &&
        locationMatch &&
        categoryMatch
      );
    });
  }, [search, location, category, jobType]);

<<<<<<< HEAD
  /* =========================================================
     Reset Filters
  ========================================================= */
=======

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
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const visibleJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const resetFilters = () => {
<<<<<<< HEAD
    setSearch("");
    setLocation("");
    setCategory("All");
    setJobType("All");
=======
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
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {apiError && (
        <p role="status" className="mx-auto max-w-7xl px-4 pt-4 text-sm text-amber-700">
          Live job feed unavailable. {apiError}
        </p>
      )}

      {/* =====================================================
          Page Header
      ===================================================== */}
      <section className="bg-slate-950 px-4 py-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Find Your Next Opportunity
            </p>

            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Find Jobs That Match
              <span className="text-blue-500"> Your Future</span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
              Explore opportunities from growing startups and leading
              companies.
            </p>
          </div>

          {/* Search Area */}
          <div className="mt-8 grid gap-3 rounded-2xl bg-white p-3 shadow-xl md:grid-cols-[1fr_1fr_auto]">

<<<<<<< HEAD
            {/* Keyword Search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <Search size={19} className="text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or company"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Location Search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4">
              <MapPin size={19} className="text-slate-400" />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search Jobs
            </button>

          </div>
=======
          {/* =================================================
              SEARCH PANEL
          ================================================= */}

          <JobSearch searchInput={searchInput} setSearchInput={setSearchInput} locationInput={locationInput} setLocationInput={setLocationInput} onSearch={handleSearch} onKeyDown={handleSearchKeyDown} loading={loading} />

>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
        </div>
      </section>

      {/* =====================================================
          Jobs Content
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Mobile Filter Button */}
        <div className="mb-5 lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* =================================================
              Desktop Filter Sidebar
          ================================================= */}
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Reset
              </button>
            </div>

<<<<<<< HEAD
            {/* Category */}
            <div className="mt-7">
              <label className="text-sm font-semibold text-slate-800">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>All</option>
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-800">
                Job Type
              </label>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>All</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
              </select>
            </div>

=======

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

>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
          </aside>

          {/* =================================================
              Jobs List
          ================================================= */}
          <div>

            {/* Results Header */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Latest Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredJobs.length} opportunities found
                </p>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"
              >
                Sort by
                <ChevronDown size={16} />
              </button>

            </div>

            {/* Job Cards */}
            <div className="space-y-4">

<<<<<<< HEAD
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
=======
              {/* Loading skeleton */}
              {loading && <Loader text="Loading live jobs..." className="min-h-40 rounded-2xl bg-white" />}


              {/* Job cards */}
              {!loading &&
                filteredJobs.length > 0 &&
                visibleJobs.map((job) => (
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)
                  <JobCard
                    key={job.id}
                    job={job}
                  />
<<<<<<< HEAD
                ))
              ) : (
                /* Empty State */
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
=======
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
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <Search size={24} className="text-slate-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    No jobs found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Try changing your search or filters to find more
                    opportunities.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
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
          Mobile Filter Drawer
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
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">

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

<<<<<<< HEAD
            {/* Category */}
            <div className="mt-8">
              <label className="text-sm font-semibold text-slate-800">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option>All</option>
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>

            {/* Job Type */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-800">
                Job Type
              </label>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option>All</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                resetFilters();
                setShowFilters(false);
              }}
              className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Apply Filters
            </button>
=======

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
>>>>>>> 3a81420 (feat: Update My HireFlow Job Hub)

          </div>
        </div>
      )}

    </main>
  );
};

export default Jobs;
