import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Temporary data structure.
// Baad mein isi structure ko API response se replace karenge.
const jobsData = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechNova Solutions",
    location: "Karachi, Pakistan",
    type: "Full-time",
    salary: "$2,000 - $3,000",
    experience: "3+ Years",
    posted: "2 days ago",
    description:
      "We are looking for a skilled Senior React Developer to join our growing engineering team. You will work on modern web applications and collaborate with designers, backend developers, and product teams.",
    responsibilities: [
      "Build and maintain modern React applications.",
      "Create reusable and scalable UI components.",
      "Collaborate with designers and backend developers.",
      "Improve application performance and user experience.",
      "Write clean, maintainable, and well-tested code.",
    ],
    requirements: [
      "3+ years of experience with React.js.",
      "Strong knowledge of JavaScript ES6+.",
      "Experience with Tailwind CSS.",
      "Good understanding of REST APIs.",
      "Experience with Git and GitHub.",
    ],
    benefits: [
      "Competitive salary",
      "Flexible working environment",
      "Professional growth opportunities",
      "Health benefits",
      "Paid time off",
    ],
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Creative Labs",
    location: "Lahore, Pakistan",
    type: "Full-time",
    salary: "$1,500 - $2,500",
    experience: "2+ Years",
    posted: "4 days ago",
    description:
      "Creative Labs is looking for a Frontend Developer to create beautiful and responsive web experiences.",
    responsibilities: [
      "Develop responsive frontend interfaces.",
      "Work closely with UI/UX designers.",
      "Build reusable React components.",
      "Optimize frontend performance.",
    ],
    requirements: [
      "2+ years frontend development experience.",
      "Strong JavaScript knowledge.",
      "React.js experience.",
      "Tailwind CSS knowledge.",
    ],
    benefits: [
      "Remote-friendly environment",
      "Learning opportunities",
      "Flexible hours",
    ],
  },
];

const JobDetails = () => {
  const { id } = useParams();

  // Find the selected job from the current route ID.
  const job = jobsData.find((item) => item.id === id);

  // Show a clean not-found state if the job does not exist.
  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Job Not Found
          </h1>

          <p className="mt-3 text-slate-600">
            The job you are looking for does not exist or may have been removed.
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      {/* Job header section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                {job.company.charAt(0)}
              </div>

              <p className="font-semibold text-blue-600">{job.company}</p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>

              {/* Basic job information */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={17} />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness size={17} />
                  {job.type}
                </span>

                <span className="inline-flex items-center gap-2">
                  <DollarSign size={17} />
                  {job.salary}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={17} />
                  {job.experience}
                </span>
              </div>
            </div>

            {/* Primary application CTA */}
            <button
              type="button"
              className="w-full rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Main job content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left content */}
          <div className="space-y-8">
            {/* About the job */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                About the Job
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {job.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <ul className="mt-5 space-y-4">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-slate-600"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-4">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-slate-600"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Benefits
              </h2>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {job.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <CheckCircle2 size={18} className="text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <BriefcaseBusiness className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Job Type</p>
                    <p className="font-semibold text-slate-900">
                      {job.type}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-semibold text-slate-900">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <DollarSign className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Salary</p>
                    <p className="font-semibold text-slate-900">
                      {job.salary}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CalendarDays className="text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Posted</p>
                    <p className="font-semibold text-slate-900">
                      {job.posted}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Apply for this Job
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default JobDetails;