import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* =========================================================
   HireFlow Hero Section

   Purpose:
   - Premium landing-page hero
   - Strong HireFlow branding
   - Job search functionality
   - Popular search shortcuts
   - Trust/stat indicators
   - Responsive layout for mobile -> large screens

   Important:
   - This component works with the current repo structure.
   - No new dependency is required.
   - Existing Home.jsx can continue using <Hero />.
========================================================= */

function Hero() {
  const navigate = useNavigate();

  // Search form state
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  /* =========================================================
     Search Handler

     User ko Jobs page par query parameters ke saath bhejta hai.
     Example:
     /jobs?q=React+Developer&location=Remote&type=Full-time
  ========================================================= */
  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (jobType) {
      params.set("type", jobType);
    }

    const queryString = params.toString();

    navigate(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  /* =========================================================
     Popular Searches

     In future these can come from API.
  ========================================================= */
  const popularSearches = [
    "Frontend Developer",
    "React Developer",
    "UI/UX Designer",
    "Product Manager",
  ];

  /* =========================================================
     Hero Statistics
  ========================================================= */
  const stats = [
    {
      value: "50K+",
      label: "Active Jobs",
    },
    {
      value: "10K+",
      label: "Top Companies",
    },
    {
      value: "1M+",
      label: "Job Seekers",
    },
    {
      value: "4.8/5",
      label: "User Satisfaction",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#061B3A] text-white">
      {/* =====================================================
          Background Decoration

          These shapes give the hero depth without requiring
          another image or external dependency.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[-5rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-16rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-3xl"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* =====================================================
          Main Hero Container
      ===================================================== */}

      <div className="relative mx-auto max-w-[1440px] px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8 lg:pb-12 lg:pt-14 xl:px-10 2xl:px-12">
        {/* ===================================================
            Main Hero Content

            Desktop:
            Left = Text
            Right = Visual

            Mobile:
            Everything stacks vertically.
        =================================================== */}

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-12">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-10 max-w-3xl">
            {/* Opportunity Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 backdrop-blur-md sm:text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
              </span>

              Your Next Opportunity Awaits
            </div>

            {/* Main Heading */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Dream Job
              </span>
              <br />
              with HireFlow
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm leading-6 text-blue-100/80 sm:text-base sm:leading-7 lg:text-lg">
              Discover thousands of job opportunities from top companies.
              Search smarter, find the right role, and take the next step in
              your career with HireFlow.
            </p>

            {/* =================================================
                Small Trust Indicators
            ================================================= */}

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-blue-100/80 sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  ✓
                </span>
                Verified companies
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  ✓
                </span>
                Fresh job listings
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  ✓
                </span>
                Easy applications
              </div>
            </div>

            {/* =================================================
                Desktop Quick CTA

                Hidden on very small screens because the search
                panel below is the primary action.
            ================================================= */}

            <div className="mt-8 hidden items-center gap-5 sm:flex">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#082451] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#061B3A]"
              >
                Browse All Jobs
                <span className="ml-2 text-lg">→</span>
              </Link>

              <span className="text-sm text-blue-100/60">
                No registration required
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL AREA

              This area is intentionally image-ready.

              Replace the inner visual later with your actual
              professional hero image from src/assets/images.
          ================================================= */}

          <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto">
            {/* Glow behind visual */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
            />

            {/* Main Visual Frame */}
            <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/20 via-white/5 to-cyan-400/10 shadow-2xl shadow-black/20 sm:min-h-[390px] lg:min-h-[450px]">
              {/* Decorative circles */}
              <div className="absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute bottom-[-5rem] left-[-5rem] h-56 w-56 rounded-full border border-white/10" />

              {/* Placeholder visual silhouette */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <div className="relative h-[290px] w-[240px] sm:h-[350px] sm:w-[290px] lg:h-[410px] lg:w-[340px]">
                  {/* Person head */}
                  <div className="absolute left-1/2 top-7 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 shadow-xl sm:h-28 sm:w-28" />

                  {/* Hair */}
                  <div className="absolute left-1/2 top-5 h-12 w-24 -translate-x-1/2 rounded-t-full bg-slate-950 sm:w-28" />

                  {/* Body / Jacket */}
                  <div className="absolute bottom-[-1rem] left-1/2 h-64 w-56 -translate-x-1/2 rounded-t-[6rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 shadow-2xl sm:h-72 sm:w-64" />

                  {/* Shirt */}
                  <div className="absolute bottom-0 left-1/2 h-56 w-24 -translate-x-1/2 bg-white/10" />

                  {/* Laptop */}
                  <div className="absolute bottom-12 left-1/2 z-20 w-56 -translate-x-1/2 sm:w-64">
                    <div className="h-28 rounded-xl border border-slate-300/30 bg-slate-800/90 p-2 shadow-2xl backdrop-blur sm:h-32">
                      <div className="flex h-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-300/10">
                        <div className="text-center">
                          <div className="text-2xl font-black tracking-tight text-white">
                            Hire<span className="text-cyan-300">Flow</span>
                          </div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-blue-200/60">
                            Find your future
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-auto h-2 w-[115%] rounded-b-full bg-slate-300/30 blur-[1px]" />
                  </div>
                </div>
              </div>

              {/* Floating Job Card */}
              <div className="absolute left-4 top-5 w-[190px] rounded-2xl border border-white/15 bg-white/10 p-3 shadow-xl backdrop-blur-xl sm:left-6 sm:top-8 sm:w-[220px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-blue-600 shadow-sm">
                    G
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-white">
                      Frontend Developer
                    </p>

                    <p className="mt-0.5 text-[11px] text-blue-100/60">
                      Remote · Full-time
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-[10px] text-emerald-300">
                    New opportunity
                  </span>

                  <span className="text-[10px] font-semibold text-white">
                    $120K+
                  </span>
                </div>
              </div>

              {/* Floating Success Card */}
              <div className="absolute bottom-5 right-4 w-[175px] rounded-2xl border border-white/15 bg-white/10 p-3 shadow-xl backdrop-blur-xl sm:bottom-8 sm:right-6 sm:w-[195px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      1M+ Job Seekers
                    </p>

                    <p className="mt-0.5 text-[10px] text-blue-100/60">
                      Building better careers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SEARCH PANEL

            White floating card inspired by the reference design.
        ===================================================== */}

        <div className="relative z-20 mt-8 lg:-mt-2 xl:mt-2">
          <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-4 lg:rounded-3xl lg:p-5"
          >
            <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_0.85fr_auto] lg:items-center">
              {/* Job Search */}
              <div className="group flex min-h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-slate-400 group-focus-within:text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                  />
                </svg>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="hero-job-search"
                    className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400"
                  >
                    What are you looking for?
                  </label>

                  <input
                    id="hero-job-search"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Job title, skills, or company"
                    className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="group flex min-h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-slate-400 group-focus-within:text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                  />

                  <circle cx="12" cy="9" r="2.5" />
                </svg>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="hero-location"
                    className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400"
                  >
                    Location
                  </label>

                  <input
                    id="hero-location"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City or remote"
                    className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="group flex min-h-[58px] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-slate-400 group-focus-within:text-blue-600"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                  />

                  <path
                    strokeLinecap="round"
                    d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"
                  />
                </svg>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="hero-job-type"
                    className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400"
                  >
                    Job Type
                  </label>

                  <select
                    id="hero-job-type"
                    value={jobType}
                    onChange={(event) => setJobType(event.target.value)}
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-medium text-slate-700 outline-none"
                  >
                    <option value="">Any type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="min-h-[58px] rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/25 active:translate-y-0"
              >
                Search Jobs
              </button>
            </div>
          </form>
        </div>

        {/* =====================================================
            POPULAR SEARCHES
        ===================================================== */}

        <div className="relative z-10 mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
          <span className="shrink-0 font-medium text-blue-100/60">
            Popular searches:
          </span>

          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSearchTerm(item)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-100/80 backdrop-blur transition hover:border-blue-300/30 hover:bg-white/10 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            HERO STATS

            Four columns desktop.
            Two columns mobile.
        ===================================================== */}

        <div className="relative z-10 mt-9 border-t border-white/10 pt-7 sm:mt-10 sm:pt-8">
          <div className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center sm:px-5 ${
                  index !== 0 ? "sm:border-l sm:border-white/10" : ""
                }`}
              >
                <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] font-medium text-blue-100/55 sm:text-xs lg:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;