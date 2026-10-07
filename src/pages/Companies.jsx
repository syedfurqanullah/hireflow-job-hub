import { useMemo, useState } from "react";
import {
  Building2,
  MapPin,
  Search,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";

// Temporary company data.
// API integration ke waqt isi structure ko API response se replace karenge.
const companiesData = [
  {
    id: "1",
    name: "TechNova Solutions",
    industry: "Technology",
    location: "Karachi, Pakistan",
    employees: "500+",
    openJobs: 12,
    description:
      "A technology company building modern digital products and scalable software solutions.",
  },
  {
    id: "2",
    name: "Creative Labs",
    industry: "Design & Technology",
    location: "Lahore, Pakistan",
    employees: "100+",
    openJobs: 8,
    description:
      "A creative technology company focused on digital experiences, design, and web applications.",
  },
  {
    id: "3",
    name: "FinCore",
    industry: "Finance",
    location: "Islamabad, Pakistan",
    employees: "250+",
    openJobs: 15,
    description:
      "A financial technology company developing innovative solutions for modern businesses.",
  },
  {
    id: "4",
    name: "HealthPlus",
    industry: "Healthcare",
    location: "Karachi, Pakistan",
    employees: "1,000+",
    openJobs: 20,
    description:
      "A healthcare organization using technology to improve healthcare experiences.",
  },
  {
    id: "5",
    name: "MarketPro",
    industry: "Marketing",
    location: "Lahore, Pakistan",
    employees: "200+",
    openJobs: 7,
    description:
      "A marketing company helping brands grow through digital strategy and creative solutions.",
  },
  {
    id: "6",
    name: "CloudWorks",
    industry: "Technology",
    location: "Remote",
    employees: "300+",
    openJobs: 18,
    description:
      "A cloud technology company creating scalable infrastructure and developer tools.",
  },
];

const Companies = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  // Generate unique industries from available company data.
  const industries = [
    "All",
    ...new Set(companiesData.map((company) => company.industry)),
  ];

  // Filter companies according to search and industry selection.
  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        company.name.toLowerCase().includes(searchText) ||
        company.industry.toLowerCase().includes(searchText) ||
        company.location.toLowerCase().includes(searchText);

      const matchesIndustry =
        industry === "All" || company.industry === industry;

      return matchesSearch && matchesIndustry;
    });
  }, [search, industry]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page hero */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Explore Companies
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Discover Great Companies
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Explore companies, discover their culture, and find your next
              career opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="-mt-7 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            {/* Company search */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search companies, industries or locations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Industry filter */}
            <select
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              {industries.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Industries" : item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Companies listing */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Results header */}
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Top Companies
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredCompanies.length} companies found
            </p>
          </div>
        </div>

        {/* Company cards */}
        {filteredCompanies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCompanies.map((company) => (
              <article
                key={company.id}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                {/* Company identity */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                    {company.name.charAt(0)}
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {company.industry}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                  {company.name}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {company.description}
                </p>

                {/* Company information */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin size={17} className="shrink-0 text-slate-400" />
                    {company.location}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Users size={17} className="shrink-0 text-slate-400" />
                    {company.employees} employees
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <BriefcaseBusiness
                      size={17}
                      className="shrink-0 text-slate-400"
                    />
                    {company.openJobs} open positions
                  </div>
                </div>

                {/* Company action */}
                <Link
                  to={`/companies/${company.id}`}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  View Company
                </Link>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Building2
              size={42}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No companies found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or industry filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setIndustry("All");
              }}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Companies;