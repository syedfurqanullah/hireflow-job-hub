import { useTheme } from "../../context/theme/useTheme";

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

const ApplicationCard = ({ applications = [] }) => {
  const { theme } = useTheme();
  const textColors =
    theme === "dark"
      ? { title: "#f1f5f9", body: "#cbd5e1", muted: "#94a3b8", count: "#93c5fd" }
      : { title: "#0f172a", body: "#475569", muted: "#64748b", count: "#1d4ed8" };

  return (
    <section
    id="application-tracking"
    className="scroll-mt-28 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-900"
  >
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="application-card-title font-bold" style={{ color: "#000000" }}>Your applications</h2>
        <p className="application-card-body mt-1 text-sm font-medium" style={{ color: textColors.title }}>
          {applications.length
            ? `${applications.length} application${applications.length === 1 ? "" : "s"} saved on this device.`
            : "Applications you save will appear here."}
        </p>
      </div>
      <span className="application-card-count text-2xl font-bold" style={{ color: textColors.count }}>
        {applications.length}
      </span>
    </div>

    {applications.length > 0 ? (
      <div className="mt-5 space-y-3">
        {applications.map((application) => (
          <article
            key={application.id}
            className="rounded-xl border border-blue-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="application-card-title break-words font-semibold [overflow-wrap:anywhere]" style={{ color: textColors.title }}>
                  {application.jobTitle}
                </h3>
                <p className="application-card-body mt-1 text-sm" style={{ color: textColors.body }}>
                  {application.company} · {application.location}
                </p>
              </div>
              <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
                {application.status === "Submitted" ? "Prepared" : application.status}
              </span>
            </div>
            <p className="application-card-muted mt-3 text-xs" style={{ color: textColors.muted }}>
              Applied {formatDate(application.appliedAt)} ·{" "}
              {application.resumeName}
            </p>
            {application.contactEmail && (
              <details className="application-card-body mt-3 text-sm" style={{ color: textColors.body }}>
                <summary className="application-card-count w-fit cursor-pointer font-medium" style={{ color: textColors.count }}>
                  View saved details
                </summary>
                <div className="mt-2 space-y-1 break-words [overflow-wrap:anywhere]">
                  <p>{application.applicantName}</p>
                  <p>{application.contactEmail}</p>
                  {application.phone && <p>{application.phone}</p>}
                  {application.portfolio && <p>{application.portfolio}</p>}
                  {application.coverLetter && (
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{application.coverLetter}</p>
                  )}
                  <p className="application-card-muted text-xs" style={{ color: textColors.muted }}>Saved locally; not sent to the employer.</p>
                </div>
              </details>
            )}
          </article>
        ))}
      </div>
    ) : null}
    </section>
  );
};

export default ApplicationCard;
