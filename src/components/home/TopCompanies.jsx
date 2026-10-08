import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   HireFlow - Top Companies
   Purpose:
   - Homepage par popular companies show karna
   - Clean, premium company cards
   - Existing Company Details page se connect karna
   - Abhi mock data use ho raha hai
   - Future mein API se dynamic companies aa sakti hain
========================================================= */

/* =========================================================
   Top Companies Data
========================================================= */

const companies = [
  {
    id: "technova-solutions",
    name: "TechNova Solutions",
    industry: "Technology",
    location: "Karachi, Pakistan",
    jobs: 24,
    logo: "T",
    logoBg: "bg-blue-100",
    logoText: "text-blue-600",
  },
  {
    id: "cloudstack-technologies",
    name: "CloudStack Technologies",
    industry: "Cloud & Software",
    location: "Lahore, Pakistan",
    jobs: 18,
    logo: "C",
    logoBg: "bg-purple-100",
    logoText: "text-purple-600",
  },
  {
    id: "pixelcraft-studio",
    name: "PixelCraft Studio",
    industry: "Design & Creative",
    location: "Islamabad, Pakistan",
    jobs: 12,
    logo: "P",
    logoBg: "bg-pink-100",
    logoText: "text-pink-600",
  },
  {
    id: "cloudbridge-systems",
    name: "CloudBridge Systems",
    industry: "IT & Cloud",
    location: "Karachi, Pakistan",
    jobs: 16,
    logo: "C",
    logoBg: "bg-cyan-100",
    logoText: "text-cyan-600",
  },
  {
    id: "neuralworks-ai",
    name: "NeuralWorks AI",
    industry: "Artificial Intelligence",
    location: "Remote",
    jobs: 9,
    logo: "N",
    logoBg: "bg-indigo-100",
    logoText: "text-indigo-600",
  },
  {
    id: "insighthub",
    name: "InsightHub",
    industry: "Data & Analytics",
    location: "Karachi, Pakistan",
    jobs: 11,
    logo: "I",
    logoBg: "bg-emerald-100",
    logoText: "text-emerald-600",
  },
  {
    id: "datacore-technologies",
    name: "DataCore Technologies",
    industry: "Software & Data",
    location: "Lahore, Pakistan",
    jobs: 14,
    logo: "D",
    logoBg: "bg-orange-100",
    logoText: "text-orange-600",
  },
  {
    id: "appforge-technologies",
    name: "AppForge Technologies",
    industry: "Mobile Development",
    location: "Remote",
    jobs: 8,
    logo: "A",
    logoBg: "bg-violet-100",
    logoText: "text-violet-600",
  },
];

/* =========================================================
   Company Card
========================================================= */

const CompanyCard = ({ company }) => {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      {/* =====================================================
          Company Header
      ====================================================== */}

      <div className="flex items-start justify-between gap-4">
        {/* Company Logo */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${company.logoBg} ${company.logoText} text-xl font-bold`}
        >
          {company.logo}
        </div>

        {/* Company Icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          <Building2 size={17} />
        </div>
      </div>

      {/* =====================================================
          Company Information
      ====================================================== */}

      <div className="mt-5">
        <Link
          to={`/companies/${company.id}`}
          className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors hover:text-blue-600"
        >
          {company.name}
        </Link>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {company.industry}
        </p>
      </div>

      {/* =====================================================
          Location
      ====================================================== */}

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <MapPin size={16} className="shrink-0 text-slate-400" />

        <span className="truncate">
          {company.location}
        </span>
      </div>

      {/* =====================================================
          Jobs Count
      ====================================================== */}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness
            size={16}
            className="text-blue-500"
          />

          <span className="text-sm font-semibold text-slate-700">
            {company.jobs} Open Jobs
          </span>
        </div>

        {/* View Company */}
        <Link
          to={`/companies/${company.id}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all group-hover:bg-blue-50 group-hover:text-blue-600"
          aria-label={`View ${company.name}`}
        >
          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
};

/* =========================================================
   Top Companies Section
========================================================= */

const TopCompanies = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ===================================================
            Section Header
        ==================================================== */}

        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Top Companies
            </h2>

            {/* Reference Style Underline */}
            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore opportunities from companies that are hiring
              talented professionals.
            </p>
          </div>

          {/* View All Companies */}
          <Link
            to="/companies"
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
            Companies Grid

            Mobile  : 1 column
            Tablet  : 2 columns
            Desktop : 4 columns
            Large   : 4 columns
        ==================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}
        </div>

        {/* ===================================================
            Mobile CTA
        ==================================================== */}

        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Explore All Companies
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;