import {
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

// =========================================================
// HireFlow - Job Card
// ---------------------------------------------------------
// Reusable presentation component for normalized API jobs.
// It contains no API logic so the same card can be reused
// across listing and featured-job sections.
// =========================================================

const JobCard = ({ job }) => {
  const companyInitial =
    job.company?.charAt(0)?.toUpperCase() || "H";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6">
      {/* ---------------------------------------------------
          Job identity
      --------------------------------------------------- */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt=""
                className="h-full w-full object-contain p-2"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              companyInitial
            )}
          </div>

          <div className="min-w-0">
            <Link
              to={`/jobs/${job.id}`}
              className="block line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-blue-600"
            >
              {job.title}
            </Link>

            <p className="mt-1 truncate text-sm font-medium text-slate-600">
              {job.company}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {job.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness size={15} />
                {job.type}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} />
                {job.posted}
              </span>
            </div>
          </div>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          {job.salary}
        </span>
      </div>

      {/* ---------------------------------------------------
          Description
      --------------------------------------------------- */}
      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
        {job.description}
      </p>

      {/* ---------------------------------------------------
          Tags and action
      --------------------------------------------------- */}
      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {job.category}
          </span>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {job.experience}
          </span>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default JobCard;
