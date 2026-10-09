const DashboardStats = ({ stats, loading }) => (
  <section
    id="dashboard-stats"
    className="scroll-mt-28 grid grid-cols-2 gap-3 lg:grid-cols-4"
  >
    {stats.map(({ label, value, Icon }) => (
      <article
        key={label}
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {loading ? "—" : value.toLocaleString()}
            </p>
          </div>
          <Icon size={19} className="text-blue-600" />
        </div>
      </article>
    ))}
  </section>
);

export default DashboardStats;
