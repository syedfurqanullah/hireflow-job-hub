import { useEffect, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobService";
import { getSavedJobs, toggleSavedJob } from "../services/savedJobs";
import { useToast } from "../context/ToastContext";
import CompanyLogo from "../components/common/CompanyLogo";
import DashboardStats from "../components/dashboard/DashboardStats";
import SavedJobCard from "../components/dashboard/SavedJobCard";
import ApplicationCard from "../components/dashboard/ApplicationCard";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState(getSavedJobs);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getJobs()
      .then((items) => {
        if (active) setJobs(items);
      })
      .catch((requestError) => {
        if (active)
          setError(requestError?.message || "Unable to load live jobs.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    const syncSaved = () => setSavedJobs(getSavedJobs());
    window.addEventListener("storage", syncSaved);
    return () => {
      active = false;
      window.removeEventListener("storage", syncSaved);
    };
  }, []);

  const companies = new Set(jobs.map((job) => job.companyName).filter(Boolean))
    .size;
  const stats = [
    { label: "Live jobs loaded", value: jobs.length, Icon: BriefcaseBusiness },
    { label: "Companies in feed", value: companies, Icon: Building2 },
    { label: "Saved jobs", value: savedJobs.length, Icon: Bookmark },
    {
      label: "Job categories",
      value: new Set(jobs.map((job) => job.category)).size,
      Icon: Search,
    },
  ];

  const handleToggleSaved = (job) => {
    try {
      const next = toggleSavedJob(job);
      setSavedJobs(next);
      showToast({
        type: "success",
        message: next.some((item) => item.id === job.id)
          ? "Job saved successfully."
          : "Job removed from your saved jobs.",
      });
    } catch (storageError) {
      setError(storageError.message);
      showToast({
        type: "error",
        message:
          storageError.message ||
          "Something went wrong on our end. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              HireFlow dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Your job workspace
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Live job listings and the jobs you save in this browser.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Search size={17} /> Find jobs
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
          >
            {error}
          </p>
        )}

        <div className="dashboard-layout mt-6 grid grid-cols-1 gap-6 md:items-start lg:gap-8">
          <Sidebar />
          <div className="min-w-0 space-y-10">
            <DashboardStats stats={stats} loading={loading} />

            <section id="saved-jobs" className="scroll-mt-28">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Saved jobs
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Saved on this browser for quick access.
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {savedJobs.length} saved
                </span>
              </div>
              {savedJobs.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {savedJobs.map((job) => (
                    <SavedJobCard
                      key={job.id}
                      job={job}
                      onRemove={handleToggleSaved}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <Bookmark className="mx-auto text-slate-400" />
                  <p className="mt-3 font-semibold text-slate-800">
                    No saved jobs yet
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Use the bookmark button on a listing to save it here.
                  </p>
                  <Link
                    to="/jobs"
                    className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Browse live jobs
                  </Link>
                </div>
              )}
            </section>

            <section id="recommended-jobs" className="scroll-mt-28">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Recommended from the live feed
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent listings returned by Adzuna.
                </p>
              </div>
              {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-44 animate-pulse rounded-2xl bg-white"
                    />
                  ))}
                </div>
              ) : jobs.length ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {jobs.slice(0, 6).map((job) => (
                    <article
                      key={job.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          name={job.company}
                          src={job.companyLogo}
                          className="h-11 w-11 text-base"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/jobs/${job.id}`}
                            className="line-clamp-1 font-bold text-slate-900 hover:text-blue-600"
                          >
                            {job.title}
                          </Link>
                          <p className="mt-1 truncate text-sm text-slate-500">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={15} />
                        {job.location}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="truncate text-sm font-semibold text-slate-700">
                          {job.salary}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleSaved(job)}
                          aria-label={
                            savedJobs.some((item) => item.id === job.id)
                              ? "Remove saved job"
                              : "Save job"
                          }
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Bookmark
                            size={17}
                            className={
                              savedJobs.some((item) => item.id === job.id)
                                ? "fill-current"
                                : ""
                            }
                          />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                  {error || "No live jobs are available right now."}
                </p>
              )}
            </section>

            <ApplicationCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
