import { ArrowRight, Building2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanies, getTopCompanies } from "../../services/jobService";
import CompanyLogo from "../common/CompanyLogo";

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([getTopCompanies().catch(() => []), getCompanies()])
      .then(([leaders, directory]) => {
        if (!active) return;
        if (!leaders.length) {
          setCompanies(directory.slice(0, 6));
          return;
        }
        const detailsByName = new Map(
          directory.map((company) => [
            company.name.trim().toLowerCase(),
            company,
          ]),
        );
        const items = leaders
          .map((leader) => {
            const name = leader.canonical_name?.trim();
            if (!name) return null;
            const details = detailsByName.get(name.toLowerCase());
            return details
              ? {
                  ...details,
                  adzunaOpenJobs: Number(leader.count) || details.openJobs,
                  averageSalary: Number(leader.average_salary) || null,
                }
              : {
                  id: encodeURIComponent(name.toLowerCase()),
                  name,
                  industry: "Top employer",
                  location: "Not specified",
                  companyLogo: "",
                  openJobs: Number(leader.count) || 0,
                  adzunaOpenJobs: Number(leader.count) || 0,
                  averageSalary: Number(leader.average_salary) || null,
                  jobs: [],
                  searchOnly: true,
                };
          })
          .filter(Boolean);
        setCompanies(items);
      })
      .catch((requestError) => {
        if (active)
          setError(requestError?.message || "Unable to load companies.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Top Companies
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
            <p className="mt-3 text-sm text-slate-500">
              Companies hiring from live job listings.
            </p>
          </div>
          <Link
            to="/companies"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl border bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <p
            role="alert"
            className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800"
          >
            Live companies unavailable: {error}
          </p>
        ) : companies.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <article
                key={company.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <CompanyLogo
                    name={company.name}
                    src={company.companyLogo}
                    className="h-12 w-12 text-lg"
                  />
                  <Building2 size={18} className="text-slate-400" />
                </div>
                <h3 className="mt-4 truncate font-bold text-slate-900">
                  {company.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {company.industry}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className="flex min-w-0 items-center gap-1.5 truncate text-slate-500">
                    <MapPin size={15} />
                    {company.location}
                  </span>
                  <span className="shrink-0 font-semibold text-blue-700">
                    {company.adzunaOpenJobs || company.openJobs} jobs
                  </span>
                </div>
                <Link
                  to={
                    company.searchOnly
                      ? `/jobs?search=${encodeURIComponent(company.name)}`
                      : `/companies/${company.id}`
                  }
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View company <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-500">
            No companies in the current job feed.
          </p>
        )}
      </div>
    </section>
  );
};

export default TopCompanies;
