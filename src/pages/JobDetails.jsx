import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  DollarSign,
  ExternalLink,
  MapPin,
  AlertCircle,
  RefreshCw,
  Bookmark,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getJobById, getJobs } from "../services/jobService";
import CompanyLogo from "../components/common/CompanyLogo";
import { isJobSaved, toggleSavedJob } from "../services/savedJobs";
import useToast from "../context/toast/useToast";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [similarJobs, setSimilarJobs] = useState([]);
  const [saved, setSaved] = useState(() => isJobSaved(id));
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;

    getJobs()
      .then((items) => {
        if (active)
          setSimilarJobs(items.filter((item) => item.id !== id).slice(0, 3));
      })
      .catch(() => {});

    getJobById(id)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setError("This job could not be found.");
          return;
        }
        setError("");
        setJob(data);
        setSaved(isJobSaved(data.id));
      })
      .catch(() => {
        if (active) {
          setError("We couldn’t load this job. Please try again.");
          showToast({
            type: "error",
            message: "We couldn’t load this job. Please try again.",
          });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, showToast]);

  const loadJob = () => {
    setLoading(true);
    setError("");
    getJobById(id)
      .then((data) => {
        if (!data) {
          setError("This job could not be found.");
          return;
        }
        setJob(data);
      })
      .catch(() => {
        setError("We couldn’t load this job. Please try again.");
        showToast({
          type: "error",
          message: "We couldn’t load this job. Please try again.",
        });
      })
      .finally(() => setLoading(false));
  };


  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-6 w-32 rounded bg-slate-200" />

          <div className="mt-10 h-12 w-2/3 rounded bg-slate-200" />

          <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />

          <div className="mt-10 h-72 rounded-3xl bg-white" />
        </div>
      </main>
    );
  }


  if (error || !job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <AlertCircle size={38} className="mx-auto text-red-500" />

          <h1 className="mt-5 text-2xl font-bold">Job unavailable</h1>

          <p className="mt-3 text-sm text-slate-500">{error}</p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={loadJob}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              <RefreshCw size={16} />
              Retry
            </button>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold"
            >
              <ArrowLeft size={17} />
              Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const skills = job.skills || [];

  const certifications = job.certifications || [];
  const requirements = job.requirements || [];
  const responsibilities = job.responsibilities || [];

  const applyUrl = job.applyUrl || job.url;

  const handleToggleSaved = () => {
    try {
      const next = toggleSavedJob(job);
      setSaved(next.some((item) => item.id === job.id));
      const isSaved = next.some((item) => item.id === job.id);
      setSaved(isSaved);
      showToast({
        type: "success",
        message: isSaved
          ? "Job saved successfully."
          : "Job removed from your saved jobs.",
      });
    } catch (storageError) {
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
      {/* =================================================
          Hero
      ================================================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <CompanyLogo
                name={job.company}
                src={job.companyLogo}
                className="h-16 w-16 rounded-2xl text-xl"
              />
              <p className="mt-5 font-semibold text-blue-600">{job.company}</p>

              <h1 className="mt-2 max-w-4xl text-3xl font-bold text-slate-900 sm:text-4xl">
                {job.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <MapPin size={17} />
                  {job.location}
                </span>

                <span className="flex items-center gap-2">
                  <BriefcaseBusiness size={17} />
                  {job.type}
                </span>

                <span className="flex items-center gap-2">
                  <DollarSign size={17} />
                  {job.salary}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={17} />
                  {job.experience}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleToggleSaved}
                aria-pressed={saved}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 font-semibold ${saved ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              >
                <Bookmark size={17} className={saved ? "fill-current" : ""} />
                {saved ? "Saved" : "Save Job"}
              </button>
              <Link
                to={`/jobs/${job.id}/apply`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Job details sections"
        className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {[["overview", "Description"]].map(([target, label]) => (
            <a
              key={target}
              href={`#${target}`}
              className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-semibold text-slate-500 hover:border-blue-600 hover:text-blue-600"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* =================================================
          Details
      ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <section
              id="overview"
              className="scroll-mt-36 rounded-3xl bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold">Description</h2>

              <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                {job.description}
              </p>
              <div className="mt-8 grid gap-8 border-t border-slate-100 pt-7 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Responsibilities
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Requirements
                  </h3>
                  {requirements.length ? (
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                      {requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">
                      Requirements were not separately listed by the job source.
                    </p>
                  )}
                </div>
              </div>
              {applyUrl && (
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View the complete job listing at its source{" "}
                  <ExternalLink size={15} />
                </a>
              )}
              <p className="mt-3 text-xs text-slate-500">
                The job source provides a short description here. Use the source
                link for the employer’s complete listing.
              </p>
              <div className="mt-7 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-bold text-slate-900">Company</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <CompanyLogo
                      name={job.company}
                      src={job.companyLogo}
                      className="h-11 w-11 text-sm"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {job.company}
                      </p>
                      <p className="text-sm text-slate-500">{job.location}</p>
                    </div>
                  </div>
                  {job.companyWebsite && (
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
                    >
                      Company website <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Company details</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {job.companyDetails?.industry || job.category} ·{" "}
                    {job.companyDetails?.location || job.location}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="font-bold text-slate-900">
                    Skills mentioned in listing
                  </h3>
                  {skills.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">
                      Not separately listed by the job source.
                    </p>
                  )}
                  {certifications.length > 0 && (
                    <>
                      <h3 className="mt-5 font-bold text-slate-900">
                        Certifications
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {certifications.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-36">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Job Overview</h2>

              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <BriefcaseBusiness className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Job Type</p>

                    <p className="font-semibold">{job.type}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Location</p>

                    <p className="font-semibold">{job.location}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <DollarSign className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Salary</p>

                    <p className="font-semibold">{job.salary}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock3 className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Experience</p>

                    <p className="font-semibold">{job.experience}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CalendarDays className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Posted</p>

                    <p className="font-semibold">{job.posted}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/jobs/${job.id}/apply`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white hover:bg-blue-700"
              >
                Apply for this Job
              </Link>
            </div>

            {similarJobs.length > 0 && (
              <section className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Similar jobs
                </h2>
                <div className="mt-4 space-y-4">
                  {similarJobs.map((item) => (
                    <Link
                      key={item.id}
                      to={`/jobs/${item.id}`}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50"
                    >
                      <CompanyLogo
                        name={item.company}
                        src={item.companyLogo}
                        className="h-10 w-10 text-sm"
                      />
                      <span className="min-w-0">
                        <span className="block line-clamp-1 text-sm font-semibold text-slate-800">
                          {item.title}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {item.company} · {item.location}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default JobDetails;
