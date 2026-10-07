import { Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   Top Companies
   Purpose:
   - Home page par popular/top hiring companies show karta hai
   - Company data props se receive karta hai
   - Future API integration ke liye reusable structure
========================================================= */

const TopCompanies = ({ companies = [] }) => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Trusted Employers
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Top Companies
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore opportunities from companies hiring talented
              professionals across different industries.
            </p>
          </div>

          {/* Companies page link */}
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View all companies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/companies/${company.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              {/* Company Logo */}
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <Building2 className="h-6 w-6 text-slate-400" />
                )}
              </div>

              {/* Company Information */}
              <div className="mt-5">
                <h3 className="truncate text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                  {company.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {company.jobCount} open positions
                </p>
              </div>

              {/* Company Industry */}
              <p className="mt-4 text-xs font-medium text-slate-400">
                {company.industry}
              </p>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {companies.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
            <Building2 className="mx-auto h-8 w-8 text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No companies available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Companies will appear here when company data is available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCompanies;