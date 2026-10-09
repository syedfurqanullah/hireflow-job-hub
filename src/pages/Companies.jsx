import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  RefreshCw,
} from "lucide-react";

import {
  getCompanies,
} from "../services/jobService";
import CompanySearch from "../components/companies/CompanySearch";
import CompanyCard from "../components/companies/CompanyCard";

// =========================================================
// HireFlow - Companies
// ---------------------------------------------------------
// Companies are derived from real IT jobs returned by API.
// =========================================================

const Companies = () => {
  const [companies, setCompanies] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    getCompanies()
      .then((data) => {
        if (active) setCompanies(data);
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError?.message || "Unable to load companies.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const loadCompanies = () => {
    setLoading(true);
    setError("");
    getCompanies()
      .then(setCompanies)
      .catch((requestError) => {
        setError(requestError?.message || "Unable to load companies.");
      })
      .finally(() => setLoading(false));
  };

  const filteredCompanies =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return companies;
      }

      return companies.filter(
        (company) =>
          company.name
            .toLowerCase()
            .includes(query) ||
          company.industry
            .toLowerCase()
            .includes(query) ||
          company.location
            .toLowerCase()
            .includes(query),
      );
    }, [companies, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Explore Companies
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Discover Great Companies
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Discover companies hiring for real IT
            opportunities.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="-mt-7 px-4 sm:px-6 lg:px-8">
        <CompanySearch value={search} onChange={setSearch} />
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-slate-900">
            Hiring Companies
          </h2>

          {!loading && (
            <p className="mt-1 text-sm text-slate-500">
              {filteredCompanies.length} companies found
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl bg-white p-6"
                >
                  <div className="h-14 w-14 rounded-2xl bg-slate-200" />
                  <div className="mt-6 h-5 w-2/3 rounded bg-slate-200" />
                  <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
                </div>
              ),
            )}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl bg-white p-12 text-center">
            <AlertCircle
              className="mx-auto text-red-500"
              size={36}
            />

            <h3 className="mt-4 font-bold">
              Unable to load companies
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              onClick={loadCompanies}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Company cards */}
        {!loading &&
          !error &&
          filteredCompanies.length >
            0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCompanies.map((company) => <CompanyCard key={company.id} company={company} />)}
            </div>
          )}

        {!loading &&
          !error &&
          filteredCompanies.length ===
            0 && (
            <div className="rounded-3xl bg-white p-12 text-center">
              <Building2
                className="mx-auto text-slate-400"
                size={40}
              />

              <h3 className="mt-4 font-bold">
                No companies found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search.
              </p>
            </div>
          )}
      </section>
    </main>
  );
};

export default Companies;
