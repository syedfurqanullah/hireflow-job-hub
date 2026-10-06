import { useState } from "react";
import { Link } from "react-router-dom";

/* =========================================================
   HireFlow Hero Section
   Purpose:
   - Main landing section
   - Strong headline
   - Job search functionality
   - Quick job discovery
   - Responsive design
========================================================= */

function Hero() {
  // Search input ki value store karne ke liye state
  const [searchTerm, setSearchTerm] = useState("");

  // Location input ki value store karne ke liye state
  const [location, setLocation] = useState("");

  // Search form submit handle karna
  const handleSearch = (event) => {
    event.preventDefault();

    console.log({
      searchTerm,
      location,
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* =================================================
          Decorative Background Elements
          Purpose:
          - Hero ko premium visual feel dena
      ================================================= */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

      {/* =================================================
          Hero Content Container
      ================================================= */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">

        {/* =================================================
            Small Badge
        ================================================= */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Find opportunities that match your ambition
          </div>
        </div>

        {/* =================================================
            Main Heading
        ================================================= */}
        <div className="mx-auto max-w-4xl text-center">

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Your
            <span className="text-blue-600"> Dream Job</span>
            <br className="hidden sm:block" />
            with HireFlow
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover thousands of opportunities from growing startups
            and leading companies. Search smarter and take the next
            step in your career.
          </p>
        </div>

        {/* =================================================
            Job Search Form
        ================================================= */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/60 sm:p-4"
        >
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">

            {/* =================================================
                Job / Keyword Input
            ================================================= */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-400 focus-within:bg-white">

              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
                />
              </svg>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Job title, skill or company"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* =================================================
                Location Input
            ================================================= */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-400 focus-within:bg-white">

              {/* Location Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5 shrink-0 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                />

                <circle
                  cx="12"
                  cy="9"
                  r="2.5"
                />
              </svg>

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or location"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* =================================================
                Search Button
            ================================================= */}
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search Jobs
            </button>

          </div>
        </form>

        {/* =================================================
            Popular Searches
        ================================================= */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">

          <span className="mr-1 text-slate-500">
            Popular:
          </span>

          {["React Developer", "UI/UX Designer", "Data Analyst", "Marketing"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSearchTerm(item)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {item}
              </button>
            )
          )}

        </div>

        {/* =================================================
            Hero Bottom Stats
        ================================================= */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4">

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              10K+
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Active Jobs
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              2.5K+
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Companies
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              50K+
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Candidates
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              95%
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Success Rate
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;