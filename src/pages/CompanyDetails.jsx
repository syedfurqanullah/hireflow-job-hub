import { useMemo } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe2,
  MapPin,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Temporary data structure.
// Baad mein isi structure ko API response se replace karenge.
const companiesData = [
  {
    id: "1",
    name: "TechNova Solutions",
    industry: "Technology",
    location: "Karachi, Pakistan",
    employees: "500+",
    website: "technova.example.com",
    description:
      "TechNova Solutions is a technology company focused on building modern digital products, scalable software solutions, and reliable experiences for businesses.",
    about:
      "We bring together engineers, designers, and product specialists to build useful digital products. Our team focuses on innovation, quality, collaboration, and continuous improvement.",
    jobs: [
      {
        id: "1",
        title: "Senior React Developer",
        location: "Karachi, Pakistan",
        type: "Full-time",
        salary: "$2,000 - $3,000",
      },
      {
        id: "2",
        title: "Frontend Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$1,500 - $2,500",
      },
      {
        id: "3",
        title: "UI/UX Designer",
        location: "Karachi, Pakistan",
        type: "Full-time",
        salary: "$1,200 - $2,000",
      },
    ],
  },

  {
    id: "2",
    name: "Creative Labs",
    industry: "Design & Technology",
    location: "Lahore, Pakistan",
    employees: "100+",
    website: "creative.example.com",
    description:
      "Creative Labs creates digital experiences by combining technology, design, and creative thinking.",
    about:
      "Our multidisciplinary team works on digital products, branding, user experiences, and modern web applications for growing businesses.",
    jobs: [
      {
        id: "4",
        title: "Frontend Developer",
        location: "Lahore, Pakistan",
        type: "Full-time",
        salary: "$1,500 - $2,500",
      },
      {
        id: "5",
        title: "Product Designer",
        location: "Remote",
        type: "Full-time",
        salary: "$1,300 - $2,200",
      },
    ],
  },

  {
    id: "3",
    name: "FinCore",
    industry: "Finance",
    location: "Islamabad, Pakistan",
    employees: "250+",
    website: "fincore.example.com",
    description:
      "FinCore develops financial technology solutions that help businesses manage their financial operations.",
    about:
      "We build technology that simplifies financial processes and creates better experiences for businesses and their customers.",
    jobs: [
      {
        id: "6",
        title: "React Developer",
        location: "Islamabad, Pakistan",
        type: "Full-time",
        salary: "$1,800 - $2,800",
      },
      {
        id: "7",
        title: "Backend Developer",
        location: "Islamabad, Pakistan",
        type: "Full-time",
        salary: "$2,000 - $3,000",
      },
    ],
  },

  {
    id: "4",
    name: "HealthPlus",
    industry: "Healthcare",
    location: "Karachi, Pakistan",
    employees: "1,000+",
    website: "healthplus.example.com",
    description:
      "HealthPlus uses technology to create better healthcare experiences and digital solutions.",
    about:
      "Our teams work together to improve healthcare accessibility through reliable digital products and technology-driven solutions.",
    jobs: [
      {
        id: "8",
        title: "Frontend Engineer",
        location: "Karachi, Pakistan",
        type: "Full-time",
        salary: "$1,700 - $2,700",
      },
    ],
  },

  {
    id: "5",
    name: "MarketPro",
    industry: "Marketing",
    location: "Lahore, Pakistan",
    employees: "200+",
    website: "marketpro.example.com",
    description:
      "MarketPro helps brands grow through digital marketing, creative strategy, and technology.",
    about:
      "We combine marketing strategy, creative thinking, and technology to help companies build stronger digital brands.",
    jobs: [
      {
        id: "9",
        title: "Digital Marketing Specialist",
        location: "Lahore, Pakistan",
        type: "Full-time",
        salary: "$1,000 - $1,800",
      },
    ],
  },

  {
    id: "6",
    name: "CloudWorks",
    industry: "Technology",
    location: "Remote",
    employees: "300+",
    website: "cloudworks.example.com",
    description:
      "CloudWorks develops cloud infrastructure, developer tools, and scalable technology solutions.",
    about:
      "Our engineering teams build reliable cloud products that help developers and businesses scale their applications.",
    jobs: [
      {
        id: "10",
        title: "Cloud Engineer",
        location: "Remote",
        type: "Full-time",
        salary: "$2,200 - $3,500",
      },
      {
        id: "11",
        title: "DevOps Engineer",
        location: "Remote",
        type: "Full-time",
        salary: "$2,000 - $3,200",
      },
    ],
  },
];

const CompanyDetails = () => {
  const { id } = useParams();

  // Find the company according to the dynamic URL.
  const company = useMemo(
    () => companiesData.find((item) => item.id === id),
    [id],
  );

  // Show a clean error state when the company doesn't exist.
  if (!company) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <Building2 className="mx-auto text-slate-400" size={48} />

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Company Not Found
          </h1>

          <p className="mt-3 text-slate-600">
            The company you are looking for does not exist or may have been
            removed.
          </p>

          <Link
            to="/companies"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Back to Companies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Company hero/header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Back navigation */}
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Companies
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Company logo placeholder */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-3xl font-bold text-blue-600">
                {company.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {company.industry}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <BriefcaseBusiness size={16} />
                    {company.jobs.length} open jobs
                  </span>
                </div>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {company.name}
                </h1>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={17} />
                    {company.location}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Users size={17} />
                    {company.employees} employees
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Globe2 size={17} />
                    {company.website}
                  </span>
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Visit Website
            </a>
          </div>
        </div>
      </section>

      {/* Company content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <div className="space-y-8">
            {/* About company */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                About {company.name}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {company.description}
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                {company.about}
              </p>
            </section>

            {/* Open jobs */}
            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Open Positions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore current opportunities at {company.name}.
                  </p>
                </div>

                <span className="text-sm font-semibold text-blue-600">
                  {company.jobs.length} positions
                </span>
              </div>

              <div className="mt-7 space-y-4">
                {company.jobs.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={16} />
                            {job.location}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <BriefcaseBusiness size={16} />
                            {job.type}
                          </span>

                          <span>{job.salary}</span>
                        </div>
                      </div>

                      {/* Connect company job with existing Job Details page */}
                      <Link
                        to={`/jobs/${job.id}`}
                        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                      >
                        View Job
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Company Overview
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <Building2 className="shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Industry</p>
                    <p className="font-semibold text-slate-900">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-semibold text-slate-900">
                      {company.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Users className="shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Company Size</p>
                    <p className="font-semibold text-slate-900">
                      {company.employees}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <BriefcaseBusiness className="shrink-0 text-blue-600" />

                  <div>
                    <p className="text-sm text-slate-500">Open Positions</p>
                    <p className="font-semibold text-slate-900">
                      {company.jobs.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why this company card */}
            <div className="mt-6 rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
              <h2 className="text-xl font-bold">
                Why work with {company.name}?
              </h2>

              <ul className="mt-5 space-y-4">
                <li className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  Work with talented professionals.
                </li>

                <li className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  Build meaningful digital products.
                </li>

                <li className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  Grow your skills and career.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CompanyDetails;