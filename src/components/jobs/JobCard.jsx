import { useState } from "react";
import { BriefcaseBusiness, Bookmark, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";
import { isJobSaved, toggleSavedJob } from "../../services/savedJobs";
import useToast from "../../context/toast/useToast";

const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(() => isJobSaved(job.id));
  const { showToast } = useToast();

  const handleSave = () => {
    try {
      const next = toggleSavedJob(job);
      const isSaved = next.some((item) => item.id === job.id);
      setSaved(isSaved);
      showToast({
        type: "success",
        message: isSaved
          ? "Job saved successfully."
          : "Job removed from your saved jobs.",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message || "Could not update saved jobs.",
      });
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <CompanyLogo
            name={job.company}
            src={job.companyLogo}
            className="h-12 w-12 text-lg"
          />
          <div className="min-w-0">
            <Link
              to={`/jobs/${job.id}`}
              className="block text-lg font-bold text-slate-900 transition hover:text-blue-600"
            >
              {job.title}
            </Link>
            <p className="mt-1 text-sm font-medium text-slate-600">
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
        <div className="flex shrink-0 items-center gap-2">
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            {job.salary}
          </span>
          <button
            type="button"
            onClick={handleSave}
            aria-label={
              saved
                ? `Remove ${job.title} from saved jobs`
                : `Save ${job.title}`
            }
            aria-pressed={saved}
            className={`rounded-lg border p-2 transition ${saved ? "border-blue-200 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-400 hover:bg-blue-50 hover:text-blue-600"}`}
          >
            <Bookmark size={17} className={saved ? "fill-current" : ""} />
          </button>
        </div>
      </div>
      <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
        {job.description}
      </p>
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
