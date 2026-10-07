import { MapPin, BriefcaseBusiness, Clock3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   Featured Jobs
   Purpose:
   - Home page par featured job opportunities show karna
   - Jobs data props se receive karna
   - Future API integration ke liye component ko reusable rakhna
========================================================= */

const FeaturedJobs = ({ jobs = [] }) => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Latest Opportunities
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Jobs
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Discover top opportunities from companies looking for talented
              professionals like you.
            </p>
          </div>

          {/* All jobs link */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
            >
              {/* Top area */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  {/* Company logo */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <BriefcaseBusiness className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Job type badge */}
                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {job.type}
                </span>
              </div>

              {/* Job information */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {job.experience}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {job.postedAt}
                </span>
              </div>

              {/* Bottom area */}
              <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Salary</p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {job.salary}
                  </p>
                </div>

                <Link
                  to={`/jobs/${job.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  View Job
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {jobs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <BriefcaseBusiness className="mx-auto h-8 w-8 text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No featured jobs available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Featured jobs will appear here when job data is available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;