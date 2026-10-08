import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   HireFlow - Featured Jobs
   Purpose:
   - Homepage par selected / featured jobs show karna
   - Reference design ke mutabiq clean job cards
   - Desktop par 3 cards
   - Tablet par 2 cards
   - Mobile par 1 card
   - Abhi mock data use ho raha hai
   - Future mein API data yahan easily connect hoga
========================================================= */

/* =========================================================
   Featured Jobs Data
========================================================= */

const featuredJobs = [
  {
    id: "hf-frontend-001",
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "Karachi, Pakistan",
    type: "Full Time",
    salary: "$2,000 - $3,500",
    posted: "2 days ago",
    category: "Technology",
    logo: "T",
    logoBg: "bg-blue-100",
    logoText: "text-blue-600",
  },
  {
    id: "hf-backend-002",
    title: "Backend Developer",
    company: "CloudStack Technologies",
    location: "Lahore, Pakistan",
    type: "Full Time",
    salary: "$2,200 - $3,800",
    posted: "3 days ago",
    category: "Technology",
    logo: "C",
    logoBg: "bg-purple-100",
    logoText: "text-purple-600",
  },
  {
    id: "hf-uiux-004",
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "Remote",
    type: "Remote",
    salary: "$1,500 - $2,800",
    posted: "1 day ago",
    category: "Design",
    logo: "P",
    logoBg: "bg-pink-100",
    logoText: "text-pink-600",
  },
  {
    id: "hf-devops-005",
    title: "DevOps Engineer",
    company: "CloudBridge Systems",
    location: "Islamabad, Pakistan",
    type: "Full Time",
    salary: "$2,500 - $4,000",
    posted: "4 days ago",
    category: "Technology",
    logo: "C",
    logoBg: "bg-cyan-100",
    logoText: "text-cyan-600",
  },
  {
    id: "hf-ai-010",
    title: "AI / Machine Learning Engineer",
    company: "NeuralWorks AI",
    location: "Remote",
    type: "Full Time",
    salary: "$3,000 - $5,000",
    posted: "5 days ago",
    category: "Technology",
    logo: "N",
    logoBg: "bg-indigo-100",
    logoText: "text-indigo-600",
  },
  {
    id: "hf-data-009",
    title: "Data Analyst",
    company: "InsightHub",
    location: "Karachi, Pakistan",
    type: "Full Time",
    salary: "$1,800 - $3,000",
    posted: "6 days ago",
    category: "Technology",
    logo: "I",
    logoBg: "bg-emerald-100",
    logoText: "text-emerald-600",
  },
];

/* =========================================================
   Featured Job Card
========================================================= */

const FeaturedJobCard = ({ job }) => {
  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      {/* =====================================================
          Featured Badge + Bookmark
      ====================================================== */}

      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
          Featured
        </span>

        <button
          type="button"
          aria-label={`Save ${job.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Bookmark size={17} />
        </button>
      </div>

      {/* =====================================================
          Company Logo + Job Information
      ====================================================== */}

      <div className="flex gap-4">
        {/* Company Logo */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${job.logoBg} ${job.logoText} text-lg font-bold`}
        >
          {job.logo}
        </div>

        {/* Job Content */}
        <div className="min-w-0">
          <Link
            to={`/jobs/${job.id}`}
            className="line-clamp-2 text-base font-bold text-slate-900 transition-colors hover:text-blue-600"
          >
            {job.title}
          </Link>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {job.company}
          </p>
        </div>
      </div>

      {/* =====================================================
          Job Meta Information
      ====================================================== */}

      <div className="mt-5 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="shrink-0 text-slate-400" />
          <span className="truncate">{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <BriefcaseBusiness
            size={16}
            className="shrink-0 text-slate-400"
          />
          <span>{job.type}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={16} className="shrink-0 text-slate-400" />
          <span>{job.posted}</span>
        </div>
      </div>

      {/* =====================================================
          Salary + Category
      ====================================================== */}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm font-bold text-slate-900">
            {job.salary}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            per year
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
          {job.category}
        </span>
      </div>

      {/* =====================================================
          View Details
      ====================================================== */}

      <Link
        to={`/jobs/${job.id}`}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        View Details
        <ArrowRight size={16} />
      </Link>
    </article>
  );
};

/* =========================================================
   Featured Jobs Section
========================================================= */

const FeaturedJobs = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ===================================================
            Section Header
        ==================================================== */}

        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Jobs
            </h2>

            {/* Reference Style Blue Underline */}
            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
          </div>

          {/* View All */}
          <Link
            to="/jobs"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:text-base"
          >
            View All
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ===================================================
            Jobs Grid

            Mobile  : 1 column
            Tablet  : 2 columns
            Desktop : 3 columns
            Large   : 3 balanced cards
        ==================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredJobs.map((job) => (
            <FeaturedJobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>

        {/* ===================================================
            Bottom CTA
            Mobile users ke liye bhi easy access
        ==================================================== */}

        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Explore All Jobs
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;