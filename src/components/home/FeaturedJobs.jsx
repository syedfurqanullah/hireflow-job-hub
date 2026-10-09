import { ArrowRight, Bookmark, BriefcaseBusiness, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import CompanyLogo from "../common/CompanyLogo";
import { isJobSaved, toggleSavedJob } from "../../services/savedJobs";

const FeaturedJobCard = ({ job }) => {
  const [saved, setSaved] = useState(() => isJobSaved(job.id));
  const handleSave = () => {
    try {
      const next = toggleSavedJob(job);
      setSaved(next.some((item) => item.id === job.id));
    } catch {
      // Keep the current state if browser storage is unavailable.
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <CompanyLogo
          name={job.company}
          src={job.companyLogo}
          className="h-11 w-11 text-base"
        />
        <button
          type="button"
          onClick={handleSave}
          aria-label={saved ? "Remove saved job" : "Save job"}
          aria-pressed={saved}
          className={`rounded-lg p-2 ${saved ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"}`}
        >
          <Bookmark size={17} className={saved ? "fill-current" : ""} />
        </button>
      </div>
      <Link
        to={`/jobs/${job.id}`}
        className="mt-4 block line-clamp-2 min-h-12 font-bold text-slate-900 hover:text-blue-600"
      >
        {job.title}
      </Link>
      <p className="mt-1 truncate text-sm text-slate-500">{job.company}</p>
      <div className="mt-4 space-y-2 text-xs text-slate-500">
        <p className="flex items-center gap-2">
          <MapPin size={14} /> <span className="truncate">{job.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <BriefcaseBusiness size={14} /> {job.type}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="max-w-[70%] truncate text-sm font-bold text-slate-900">
          {job.salary}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          aria-label={`View ${job.title}`}
          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
        >
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
};

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getJobs({ limit: 8 })
      .then((items) => {
        if (active) setJobs(items.slice(0, 4));
      })
      .catch((requestError) => {
        if (active)
          setError(requestError?.message || "Unable to load live jobs.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Jobs
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
          </div>
          <Link
            to="/jobs"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl border bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <p
            role="alert"
            className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800"
          >
            Live job feed unavailable: {error}
          </p>
        ) : jobs.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            No jobs in the live feed right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
