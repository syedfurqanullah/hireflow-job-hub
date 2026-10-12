const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

const ApplicationCard = ({ applications = [] }) => (
  <section
    id="application-tracking"
    className="scroll-mt-28 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-900"
  >
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-bold text-slate-900 dark:text-slate-100">Your applications</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {applications.length
            ? `${applications.length} application${applications.length === 1 ? "" : "s"} saved on this device.`
            : "Applications you save will appear here."}
        </p>
      </div>
      <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        {applications.length}
      </span>
    </div>

    {applications.length > 0 ? (
      <div className="mt-5 space-y-3">
        {applications.map((application) => (
          <article
            key={application.id}
            className="rounded-xl border border-blue-100 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                  {application.jobTitle}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {application.company} · {application.location}
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
                {application.status === "Submitted" ? "Prepared" : application.status}
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Applied {formatDate(application.appliedAt)} ·{" "}
              {application.resumeName}
            </p>
            {application.contactEmail && (
              <details className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <summary className="w-fit cursor-pointer font-medium text-blue-700 dark:text-blue-300">
                  View saved details
                </summary>
                <div className="mt-2 space-y-1 break-words">
                  <p>{application.applicantName}</p>
                  <p>{application.contactEmail}</p>
                  {application.phone && <p>{application.phone}</p>}
                  {application.portfolio && <p>{application.portfolio}</p>}
                  {application.coverLetter && (
                    <p className="whitespace-pre-wrap">{application.coverLetter}</p>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400">Saved locally; not sent to the employer.</p>
                </div>
              </details>
            )}
          </article>
        ))}
      </div>
    ) : null}
  </section>
);

export default ApplicationCard;
