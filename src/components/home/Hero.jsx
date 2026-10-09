import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  Sparkles,
  BriefcaseBusiness,
  Building2,
  Users,
  Star,
  CheckCircle2,
} from "lucide-react";

import heroImage from "../../assets/hireflow-hero.png";

/* =========================================================
   HireFlow Hero Section

   Purpose:
   - Premium HireFlow homepage hero
   - Reference design ke according layout
   - Background visual src/assets se import hota hai
   - Search real React form hai
   - Search Jobs page par navigate karta hai
   - Fully responsive
   - Mobile / Tablet / Desktop / Large Screen friendly

   IMPORTANT:
   Hero image sirf visual background hai.
   Heading, search, tags aur stats actual React UI hain.
========================================================= */

function Hero() {
  const navigate = useNavigate();

  /* =========================================================
     Search State
  ========================================================= */

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const heroStats = [
    { label: "Active Jobs", value: "50K+", Icon: BriefcaseBusiness, boxClass: "bg-blue-500/15", iconClass: "text-blue-300" },
    { label: "Companies", value: "10K+", Icon: Building2, boxClass: "bg-cyan-500/15", iconClass: "text-cyan-300" },
    { label: "Job Seekers", value: "5M+", Icon: Users, boxClass: "bg-violet-500/15", iconClass: "text-violet-300" },
    { label: "User Rating", value: "4.8/5", Icon: Star, boxClass: "bg-amber-500/15", iconClass: "fill-amber-300 text-amber-300" },
  ];

  /* =========================================================
     Search Handler
  ========================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const queryString = params.toString();

    navigate(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  /* =========================================================
     Popular Search Handler
  ========================================================= */

  const handlePopularSearch = (value) => {
    setSearchTerm(value);

    const params = new URLSearchParams();

    params.set("search", value);

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#061a3a] text-white">

      {/* =====================================================
          HERO BACKGROUND IMAGE

          Generated HireFlow visual:
          - Developer
          - Laptop
          - Blue office
          - Floating UI elements
          - No main heading/search text
      ===================================================== */}

      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* =====================================================
          GLOBAL DARK OVERLAY

          Text readability improve karta hai.
      ===================================================== */}

      <div className="absolute inset-0 -z-20 bg-[#031632]/45" />

      {/* =====================================================
          LEFT DARK GRADIENT

          Left side content ko readable rakhta hai.
      ===================================================== */}

      <div className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-[#031936] via-[#061a3a]/90 to-transparent lg:w-[76%]" />

      {/* =====================================================
          BOTTOM GRADIENT

          Stats area ko image ke against clear karta hai.
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 -z-10 h-48 bg-gradient-to-t from-[#031936] via-[#031936]/70 to-transparent" />

      {/* =====================================================
          BLUE GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="relative grid min-h-[650px] items-center lg:min-h-[680px]">

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="relative z-10 max-w-3xl py-16 sm:py-20 lg:py-24">

            {/* =================================================
                BADGE
            ================================================= */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-lg backdrop-blur-md sm:text-sm">
              <Sparkles className="h-4 w-4 text-cyan-300" />

              <span>Your Next Opportunity Awaits</span>
            </div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">

              Find Your{" "}

              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-400 bg-clip-text text-transparent">
                Dream Job
              </span>

              <br />

              with HireFlow
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base lg:text-lg">
              Discover thousands of job opportunities from top companies.
              Build your career with the right opportunity.
            </p>

            {/* =================================================
                SEARCH BOX
            ================================================= */}

            <form
              onSubmit={handleSearch}
              className="mt-8 max-w-3xl rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-black/30 sm:p-2.5"
            >
              <div className="grid gap-2 md:grid-cols-[1fr_0.82fr_auto]">

                {/* =================================================
                    JOB TITLE / KEYWORD
                ================================================= */}

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">

                  <Search className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Job title, skills, or company..."
                    className="min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">

                  <MapPin className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    placeholder="City or location"
                    className="min-w-0 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                {/* =================================================
                    SEARCH BUTTON
                ================================================= */}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 md:px-7"
                >
                  Search Jobs

                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* =================================================
                POPULAR SEARCHES
            ================================================= */}

            <div className="mt-5 flex flex-wrap items-center gap-2.5">

              <span className="mr-1 text-xs font-semibold text-slate-300 sm:text-sm">
                Popular:
              </span>

              {[
                "React Developer",
                "UI/UX Designer",
                "Data Analyst",
                "DevOps Engineer",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePopularSearch(item)}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-sm transition hover:border-blue-300/40 hover:bg-blue-500/20 hover:text-white sm:text-sm"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* =================================================
                TRUST POINTS
            ================================================= */}

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-300 sm:text-sm">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified opportunities
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Trusted companies
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Free for job seekers
              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            STATS BAR
        ===================================================== */}

        <div className="relative z-10 border-t border-white/10 py-7 sm:py-8 lg:py-9">

          <div className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {heroStats.map(({ label, value, Icon, boxClass, iconClass }) => (
              <div key={label} className="flex items-center justify-center gap-3 sm:px-6">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${boxClass}`}>
                  <Icon className={`h-5 w-5 ${iconClass}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold sm:text-3xl">{value}</p>
                  <p className="mt-1 text-xs text-slate-300 sm:text-sm">{label}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
