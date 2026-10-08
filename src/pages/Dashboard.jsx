import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  MapPin,
  Search,
  Settings,
  UserRound,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

/*
 * Temporary dashboard data.
 *
 * Ye data sirf frontend UI development ke liye hai.
 * Baad mein real user/account API se replace kiya jayega.
 */

const stats = [
  {
    label: "Applied Jobs",
    value: "24",
    icon: FileText,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    label: "Saved Jobs",
    value: "12",
    icon: Bookmark,
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    label: "Interviews",
    value: "05",
    icon: CalendarDays,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Job Alerts",
    value: "08",
    icon: Bell,
    iconStyle: "bg-orange-50 text-orange-600",
  },
];

const recentApplications = [
  {
    id: "hf-frontend-001",
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "Karachi, Pakistan",
    applied: "2 days ago",
    status: "Interview",
  },
  {
    id: "hf-backend-002",
    title: "Backend Engineer",
    company: "CloudStack Technologies",
    location: "Islamabad, Pakistan",
    applied: "5 days ago",
    status: "Under Review",
  },
  {
    id: "hf-fullstack-003",
    title: "Full Stack Developer",
    company: "DigitalPeak Labs",
    location: "Lahore, Pakistan",
    applied: "1 week ago",
    status: "Applied",
  },
  {
    id: "hf-devops-005",
    title: "DevOps Engineer",
    company: "CloudBridge Systems",
    location: "Remote",
    applied: "1 week ago",
    status: "Rejected",
  },
];

const savedJobs = [
  {
    id: "hf-uiux-004",
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "Karachi, Pakistan",
    salary: "$1,500 - $2,400",
  },
  {
    id: "hf-python-006",
    title: "Python Developer",
    company: "DataCore Technologies",
    location: "Islamabad, Pakistan",
    salary: "$1,800 - $3,000",
  },
  {
    id: "hf-ai-010",
    title: "Machine Learning Engineer",
    company: "NeuralWorks AI",
    location: "Remote",
    salary: "$2,500 - $4,500",
  },
];

const recommendedJobs = [
  {
    id: "hf-mobile-008",
    title: "Mobile App Developer",
    company: "AppForge Technologies",
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "$1,800 - $3,000",
  },
  {
    id: "hf-data-009",
    title: "Data Analyst",
    company: "InsightHub",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "$1,500 - $2,500",
  },
];

/*
 * Application status ke according visual style return karta hai.
 */
const getStatusStyle = (status) => {
  switch (status) {
    case "Interview":
      return "bg-emerald-50 text-emerald-700";

    case "Under Review":
      return "bg-amber-50 text-amber-700";

    case "Rejected":
      return "bg-red-50 text-red-700";

    default:
      return "bg-blue-50 text-blue-700";
  }
};

/*
 * Status ke according icon return karta hai.
 */
const getStatusIcon = (status) => {
  switch (status) {
    case "Interview":
      return CheckCircle2;

    case "Rejected":
      return XCircle;

    default:
      return Clock3;
  }
};

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* =========================================================
          DASHBOARD HEADER
          ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Welcome message */}
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Welcome back 👋
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Good morning, Zain
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Track your applications and discover your next opportunity.
              </p>
            </div>

            {/* Dashboard actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Bell size={20} />

                <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600" />
              </button>

              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Search size={18} />
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DASHBOARD CONTENT
          ========================================================= */}
      <section className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          {/* =====================================================
              DASHBOARD SIDEBAR
              ===================================================== */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              {/* Main navigation */}
              <nav className="space-y-1">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
                >
                  <BriefcaseBusiness size={18} />
                  Dashboard
                </Link>

                <Link
                  to="/jobs"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Search size={18} />
                  Find Jobs
                </Link>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <FileText size={18} />
                  Applications
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Bookmark size={18} />
                  Saved Jobs
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Bell size={18} />
                  Job Alerts
                </button>
              </nav>

              {/* Divider */}
              <div className="my-3 border-t border-slate-100" />

              {/* Account navigation */}
              <nav className="space-y-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <UserRound size={18} />
                  My Profile
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings size={18} />
                  Settings
                </button>
              </nav>

              {/* Profile completion card */}
              <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white">
                <p className="text-sm font-semibold">Complete your profile</p>

                <p className="mt-1 text-xs leading-5 text-slate-300">
                  A complete profile helps recruiters find you faster.
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[75%] rounded-full bg-blue-500" />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Profile strength</span>
                  <span className="font-semibold">75%</span>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================
              MAIN DASHBOARD AREA
              ===================================================== */}
          <div className="min-w-0 space-y-6">
            {/* Mobile navigation */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-semibold text-white"
              >
                <BriefcaseBusiness size={16} />
                Dashboard
              </Link>

              <Link
                to="/jobs"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700"
              >
                <Search size={16} />
                Jobs
              </Link>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700"
              >
                <FileText size={16} />
                Applied
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700"
              >
                <Bookmark size={16} />
                Saved
              </button>
            </div>

            {/* ===================================================
                STATS
                =================================================== */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">
                          {stat.label}
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                          {stat.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                      >
                        <Icon size={21} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===================================================
                RECENT APPLICATIONS
                =================================================== */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Applications
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Keep track of your latest job applications.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  View all
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Desktop application table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Job
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Location
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Applied
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentApplications.map((application) => {
                      const StatusIcon = getStatusIcon(application.status);

                      return (
                        <tr
                          key={application.id}
                          className="transition hover:bg-slate-50/70"
                        >
                          <td className="px-6 py-5">
                            <Link
                              to={`/jobs/${application.id}`}
                              className="group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                                  {application.company.charAt(0)}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-slate-900 group-hover:text-blue-600">
                                    {application.title}
                                  </p>

                                  <p className="mt-1 text-sm text-slate-500">
                                    {application.company}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </td>

                          <td className="px-6 py-5">
                            <span className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin size={16} />
                              {application.location}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span className="text-sm text-slate-600">
                              {application.applied}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                application.status,
                              )}`}
                            >
                              <StatusIcon size={14} />
                              {application.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile application cards */}
              <div className="divide-y divide-slate-100 md:hidden">
                {recentApplications.map((application) => {
                  const StatusIcon = getStatusIcon(application.status);

                  return (
                    <Link
                      key={application.id}
                      to={`/jobs/${application.id}`}
                      className="block p-5 transition hover:bg-slate-50"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {application.company.charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-semibold text-slate-900">
                                {application.title}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {application.company}
                              </p>
                            </div>

                            <ChevronRight
                              size={18}
                              className="shrink-0 text-slate-400"
                            />
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {application.location}
                            </span>

                            <span>{application.applied}</span>
                          </div>

                          <span
                            className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              application.status,
                            )}`}
                          >
                            <StatusIcon size={14} />
                            {application.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ===================================================
                SAVED JOBS + JOB ALERT
                =================================================== */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
              {/* Saved jobs */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Saved Jobs
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Jobs you saved for later.
                    </p>
                  </div>

                  <Bookmark
                    size={20}
                    className="text-violet-600"
                  />
                </div>

                <div className="divide-y divide-slate-100">
                  {savedJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="block p-5 transition hover:bg-slate-50 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-600">
                          {job.company.charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-slate-900 transition group-hover:text-blue-600">
                                {job.title}
                              </h3>

                              <p className="mt-1 text-sm text-slate-500">
                                {job.company}
                              </p>
                            </div>

                            <Heart
                              size={18}
                              className="shrink-0 fill-violet-50 text-violet-600"
                            />
                          </div>

                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {job.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <DollarSignIcon />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Job alert card */}
              <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <Bell size={22} />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Create a Job Alert
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Get notified when new jobs matching your skills and
                  preferences are posted.
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Current alert
                  </p>

                  <p className="mt-1 font-semibold">
                    Frontend Developer
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Karachi · Remote · Full-time
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Manage Alerts
                </button>
              </section>
            </div>

            {/* ===================================================
                RECOMMENDED JOBS
                =================================================== */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Recommended for You
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Opportunities based on your interests.
                  </p>
                </div>

                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Browse jobs
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                {recommendedJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                        {job.company.charAt(0)}
                      </div>

                      <Bookmark
                        size={18}
                        className="text-slate-400 transition group-hover:text-blue-600"
                      />
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900 transition group-hover:text-blue-600">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {job.company}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>

                      <span>{job.type}</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-semibold text-slate-900">
                        {job.salary}
                      </span>

                      <span className="text-sm font-semibold text-blue-600">
                        View Job
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

/*
 * Small reusable icon component for salary metadata.
 * Isko direct DollarSign import ke bajaye yahan use kiya gaya
 * taake saved-job section ka icon lightweight rahe.
 */
const DollarSignIcon = () => (
  <span className="font-semibold text-slate-400">$</span>
);

export default Dashboard;