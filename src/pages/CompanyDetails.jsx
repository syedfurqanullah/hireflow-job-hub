import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getCompanyById } from "../services/jobService";
import CompanyLogo from "../components/common/CompanyLogo";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getCompanyById(id)
      .then((item) => {
        if (!active) return;
        if (!item)
          setError("This company is not present in the current live job feed.");
        else setCompany(item);
      })
      .catch((requestError) => {
        if (active)
          setError(requestError?.message || "Unable to load this company.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-slate-50 px-4 py-12">
        <div className="mx-auto h-72 max-w-5xl animate-pulse rounded-3xl bg-white" />
      </main>
    );
  }

  if (error || !company) {
    return (
      <main className="min-h-[60vh] bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Company unavailable
          </h1>
          <p className="mt-3 text-sm text-slate-500">{error}</p>
          <Link
            to="/companies"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} /> Back to companies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} /> All companies
          </Link>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
            <CompanyLogo
              name={company.name}
              src={company.companyLogo}
              className="h-20 w-20 rounded-2xl text-2xl"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-blue-600">
                {company.industry}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {company.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {company.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness size={16} />
                  {company.adzunaOpenJobs || company.openJobs} open jobs
                </span>
              </div>
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600"
              >
                Company website <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Open positions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current listings from the live job feed.
            </p>
          </div>
          <span className="text-sm font-semibold text-slate-500">
            Showing {company.jobs.length} listings
          </span>
        </div>
        <div className="space-y-3">
          {company.jobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <Link
                  to={`/jobs/${job.id}`}
                  className="font-bold text-slate-900 hover:text-blue-600"
                >
                  {job.title}
                </Link>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span>{job.category}</span>
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-sm font-semibold text-slate-700">
                  {job.salary}
                </span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  View job
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CompanyDetails;
