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

/*
 * Temporary frontend job data.
 *
 * IMPORTANT:
 * Ye data sirf frontend development ke liye hai.
 * Baad mein isi structure ko real API response se replace
 * kiya jayega.
 *
 * IDs exactly Jobs.jsx ke mock job IDs ke saath match
 * karne chahiye taake listing se details page properly open ho.
 */
const jobsData = [
  {
    id: "hf-frontend-001",
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "Karachi, Pakistan",
    type: "Full-time",
    category: "Software Development",
    salary: "$2,000 - $3,000",
    experience: "3+ Years",
    posted: "2 days ago",

    description:
      "TechNova Solutions is looking for a Senior Frontend Developer to join its growing engineering team. You will build modern web applications, create reusable UI systems, and work closely with designers, backend engineers, and product teams.",

    responsibilities: [
      "Build and maintain modern React applications.",
      "Create reusable and scalable UI components.",
      "Collaborate with designers and backend developers.",
      "Improve application performance and user experience.",
      "Write clean, maintainable, and well-tested code.",
    ],

    requirements: [
      "3+ years of frontend development experience.",
      "Strong knowledge of React.js.",
      "Strong JavaScript ES6+ knowledge.",
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
    id: "hf-backend-002",
    title: "Backend Engineer",
    company: "CloudStack Technologies",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Software Development",
    salary: "$2,200 - $3,400",
    experience: "3+ Years",
    posted: "1 day ago",

    description:
      "CloudStack Technologies is hiring a Backend Engineer to design reliable APIs and scalable backend services. You will work with frontend engineers and product teams to build secure and high-performance applications.",

    responsibilities: [
      "Design and develop scalable backend services.",
      "Build and maintain REST APIs.",
      "Work with databases and data models.",
      "Improve application security and performance.",
      "Collaborate with frontend and DevOps teams.",
    ],

    requirements: [
      "3+ years of backend development experience.",
      "Strong knowledge of Node.js or similar backend technology.",
      "Experience building REST APIs.",
      "Good understanding of databases.",
      "Knowledge of authentication and authorization.",
      "Experience with Git and GitHub.",
    ],

    benefits: [
      "Competitive compensation",
      "Flexible working hours",
      "Learning and development budget",
      "Health benefits",
      "Paid annual leave",
    ],
  },

  {
    id: "hf-fullstack-003",
    title: "Full Stack Developer",
    company: "DigitalPeak Labs",
    location: "Lahore, Pakistan",
    type: "Full-time",
    category: "Software Development",
    salary: "$2,000 - $3,200",
    experience: "2+ Years",
    posted: "3 days ago",

    description:
      "DigitalPeak Labs is looking for a Full Stack Developer who can contribute across both frontend and backend development. You will help build modern products from initial concept to production.",

    responsibilities: [
      "Develop responsive frontend applications.",
      "Build and maintain backend APIs.",
      "Integrate frontend applications with APIs.",
      "Work with databases and application logic.",
      "Collaborate with designers and product managers.",
    ],

    requirements: [
      "2+ years of full stack development experience.",
      "Experience with React.js.",
      "Knowledge of Node.js and REST APIs.",
      "Understanding of SQL or NoSQL databases.",
      "Strong JavaScript ES6+ knowledge.",
      "Experience with Git.",
    ],

    benefits: [
      "Competitive salary",
      "Remote-friendly environment",
      "Professional development opportunities",
      "Flexible schedule",
    ],
  },

  {
    id: "hf-uiux-004",
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "Karachi, Pakistan",
    type: "Full-time",
    category: "Design",
    salary: "$1,500 - $2,400",
    experience: "2+ Years",
    posted: "4 days ago",

    description:
      "PixelCraft Studio is looking for a creative UI/UX Designer to design intuitive and visually polished digital experiences for web and mobile products.",

    responsibilities: [
      "Create user-friendly web and mobile interfaces.",
      "Develop wireframes and high-fidelity designs.",
      "Collaborate with developers and product teams.",
      "Create and maintain design systems.",
      "Conduct user research and usability improvements.",
    ],

    requirements: [
      "2+ years of UI/UX design experience.",
      "Strong knowledge of Figma.",
      "Understanding of responsive design.",
      "Strong visual design skills.",
      "Good understanding of UX principles.",
    ],

    benefits: [
      "Creative work environment",
      "Flexible working hours",
      "Professional growth opportunities",
      "Paid time off",
    ],
  },

  {
    id: "hf-devops-005",
    title: "DevOps Engineer",
    company: "CloudBridge Systems",
    location: "Remote",
    type: "Full-time",
    category: "DevOps & Cloud",
    salary: "$2,500 - $4,000",
    experience: "3+ Years",
    posted: "5 days ago",

    description:
      "CloudBridge Systems is seeking a DevOps Engineer to improve deployment workflows, cloud infrastructure, monitoring, and application reliability.",

    responsibilities: [
      "Manage cloud infrastructure and deployment pipelines.",
      "Automate development and deployment workflows.",
      "Monitor application performance and availability.",
      "Improve system security and reliability.",
      "Collaborate with development teams.",
    ],

    requirements: [
      "3+ years of DevOps experience.",
      "Experience with AWS, Azure, or Google Cloud.",
      "Knowledge of Docker and CI/CD.",
      "Understanding of Linux systems.",
      "Experience with monitoring and logging tools.",
    ],

    benefits: [
      "Remote work",
      "Competitive salary",
      "Cloud certification support",
      "Flexible working hours",
    ],
  },

  {
    id: "hf-python-006",
    title: "Python Developer",
    company: "DataCore Technologies",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    category: "Software Development",
    salary: "$1,800 - $3,000",
    experience: "2+ Years",
    posted: "6 days ago",

    description:
      "DataCore Technologies is hiring a Python Developer to build backend services, automation tools, and data-driven applications.",

    responsibilities: [
      "Develop Python-based backend services.",
      "Build and maintain REST APIs.",
      "Create automation scripts and internal tools.",
      "Work with databases and external APIs.",
      "Write clean and maintainable code.",
    ],

    requirements: [
      "2+ years of Python development experience.",
      "Experience with Django or FastAPI.",
      "Strong understanding of REST APIs.",
      "Database experience.",
      "Good knowledge of Git.",
    ],

    benefits: [
      "Competitive salary",
      "Learning opportunities",
      "Flexible working environment",
      "Health benefits",
    ],
  },

  {
    id: "hf-qa-007",
    title: "QA Automation Engineer",
    company: "QualityWorks",
    location: "Lahore, Pakistan",
    type: "Full-time",
    category: "Quality Assurance",
    salary: "$1,600 - $2,600",
    experience: "2+ Years",
    posted: "1 week ago",

    description:
      "QualityWorks is looking for a QA Automation Engineer to improve product quality through automated testing and reliable quality assurance processes.",

    responsibilities: [
      "Create and maintain automated test suites.",
      "Identify and document software defects.",
      "Work closely with developers to resolve issues.",
      "Perform regression and integration testing.",
      "Improve testing processes and coverage.",
    ],

    requirements: [
      "2+ years of QA experience.",
      "Experience with automated testing.",
      "Knowledge of API testing.",
      "Understanding of software testing methodologies.",
      "Experience with Git.",
    ],

    benefits: [
      "Professional development",
      "Flexible schedule",
      "Health benefits",
      "Paid time off",
    ],
  },

  {
    id: "hf-mobile-008",
    title: "Mobile App Developer",
    company: "AppForge Technologies",
    location: "Karachi, Pakistan",
    type: "Full-time",
    category: "Mobile Development",
    salary: "$1,800 - $3,000",
    experience: "2+ Years",
    posted: "1 week ago",

    description:
      "AppForge Technologies is searching for a Mobile App Developer to build high-quality mobile experiences for modern digital products.",

    responsibilities: [
      "Develop and maintain mobile applications.",
      "Build reusable mobile UI components.",
      "Integrate applications with REST APIs.",
      "Optimize application performance.",
      "Collaborate with designers and backend developers.",
    ],

    requirements: [
      "2+ years of mobile development experience.",
      "Experience with React Native or Flutter.",
      "Strong JavaScript or Dart knowledge.",
      "REST API integration experience.",
      "Understanding of mobile UI principles.",
    ],

    benefits: [
      "Competitive salary",
      "Flexible working hours",
      "Professional growth",
      "Paid leave",
    ],
  },

  {
    id: "hf-data-009",
    title: "Data Analyst",
    company: "InsightHub",
    location: "Lahore, Pakistan",
    type: "Full-time",
    category: "Data & AI",
    salary: "$1,500 - $2,500",
    experience: "2+ Years",
    posted: "8 days ago",

    description:
      "InsightHub is looking for a Data Analyst who can transform business data into useful insights and help teams make better decisions.",

    responsibilities: [
      "Analyze business and product data.",
      "Create dashboards and reports.",
      "Identify trends and actionable insights.",
      "Work with product and business teams.",
      "Maintain data quality and reporting processes.",
    ],

    requirements: [
      "2+ years of data analysis experience.",
      "Strong SQL knowledge.",
      "Experience with Excel or spreadsheet tools.",
      "Knowledge of Power BI or similar tools.",
      "Strong analytical and communication skills.",
    ],

    benefits: [
      "Learning opportunities",
      "Flexible working environment",
      "Professional growth",
      "Health coverage",
    ],
  },

  {
    id: "hf-ai-010",
    title: "Machine Learning Engineer",
    company: "NeuralWorks AI",
    location: "Remote",
    type: "Full-time",
    category: "Data & AI",
    salary: "$2,500 - $4,500",
    experience: "3+ Years",
    posted: "10 days ago",

    description:
      "NeuralWorks AI is looking for a Machine Learning Engineer to develop, deploy, and improve machine learning solutions for real-world products.",

    responsibilities: [
      "Develop and evaluate machine learning models.",
      "Prepare and process datasets.",
      "Build model deployment pipelines.",
      "Monitor model performance.",
      "Collaborate with software and data engineering teams.",
    ],

    requirements: [
      "3+ years of machine learning experience.",
      "Strong Python knowledge.",
      "Experience with machine learning frameworks.",
      "Understanding of data preprocessing.",
      "Knowledge of model deployment concepts.",
    ],

    benefits: [
      "Remote work",
      "Competitive salary",
      "Learning budget",
      "Flexible schedule",
      "Professional development",
    ],
  },
];

const JobDetails = () => {
  const { id } = useParams();

  /*
   * Route se received ID ko mock jobs ke against match kar rahe hain.
   *
   * Later API integration ke baad yahan:
   * GET /jobs/:id
   * ya equivalent API service call use ki ja sakti hai.
   */
  const job = jobsData.find((item) => item.id === id);

  /*
   * Agar invalid job ID aaye to clean 404-style state show hogi.
   */
  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <BriefcaseBusiness size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Job Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            The job you are looking for does not exist or may have been
            removed.
          </p>

          <Link
            to="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
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
      {/* =========================================================
          JOB HERO / HEADER
          ========================================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Back navigation */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Job identity */}
            <div className="min-w-0">
              {/* Company avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 shadow-sm">
                {job.company.charAt(0)}
              </div>

              {/* Company name */}
              <p className="mt-5 font-semibold text-blue-600">
                {job.company}
              </p>

              {/* Job title */}
              <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>

              {/* Category */}
              <p className="mt-3 text-sm font-medium text-slate-500">
                {job.category}
              </p>

              {/* Job meta information */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={17} className="text-blue-600" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness
                    size={17}
                    className="text-blue-600"
                  />
                  {job.type}
                </span>

                <span className="inline-flex items-center gap-2">
                  <DollarSign size={17} className="text-blue-600" />
                  {job.salary}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={17} className="text-blue-600" />
                  {job.experience}
                </span>
              </div>
            </div>

            {/* Primary application CTA */}
            <button
              type="button"
              className="w-full shrink-0 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* =====================================================
              LEFT CONTENT
              ===================================================== */}
          <div className="min-w-0 space-y-6 sm:space-y-8">
            {/* About the job */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                About the Job
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {job.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <ul className="mt-5 space-y-4">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-4">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Benefits
              </h2>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {job.benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-blue-600"
                    />

                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* =====================================================
              RIGHT SIDEBAR
              ===================================================== */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 space-y-6">
                {/* Job type */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BriefcaseBusiness size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Job Type</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {job.type}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MapPin size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <DollarSign size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Salary</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {job.salary}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Clock3 size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {job.experience}
                    </p>
                  </div>
                </div>

                {/* Posted date */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">Posted</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {job.posted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar application CTA */}
              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply for this Job
              </button>

              {/* Back link for mobile-friendly navigation */}
              <Link
                to="/jobs"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
                Browse More Jobs
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default JobDetails;