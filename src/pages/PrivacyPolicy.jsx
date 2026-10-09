import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Information we collect",
    body: "When you use HireFlow, we may collect information you provide such as your name, email address, profile details, saved jobs, and application form data. We also receive job search and browsing information needed to operate the platform.",
  },
  {
    title: "How we use information",
    body: "We use information to provide job discovery features, maintain your demo account, save your preferences, improve the platform, respond to support requests, and protect HireFlow from misuse.",
  },
  {
    title: "Browser storage",
    body: "This frontend demo stores authentication details, saved jobs, theme preferences, and selected job details in your browser. These values are not synced to a server and can be removed by clearing your browser storage.",
  },
  {
    title: "Job and third-party services",
    body: "Job listings are provided through Adzuna and may include links to employer or third-party websites. Those services have their own privacy practices, and you should review their policies before sharing information with them.",
  },
  {
    title: "Data sharing and security",
    body: "HireFlow does not sell your personal information. We take reasonable steps to protect information handled by the demo, but no online service or browser storage mechanism can be guaranteed completely secure.",
  },
  {
    title: "Your choices",
    body: "You can update or remove locally stored demo data by signing out or clearing the site data in your browser. You can also contact us with questions about this policy or your information.",
  },
  {
    title: "Updates to this policy",
    body: "We may update this Privacy Policy as HireFlow changes. Important updates will be reflected on this page with a new revision date.",
  },
];

const PrivacyPolicy = () => (
  <main className="min-h-screen bg-slate-50">
    <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} /> Back to registration
        </Link>
        <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
          HireFlow Job Hub
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
          How HireFlow handles information while you discover jobs and use this
          browser-based demo.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          Last updated: October 9, 2026
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" size={18} />
          <p>
            By using HireFlow, you acknowledge this Privacy Policy and
            understand how information is handled in the current demo.
          </p>
        </div>
        <div className="mt-10 space-y-9">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-slate-900">
                {index + 1}. {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-10 border-t border-slate-100 pt-7">
          <p className="text-sm leading-7 text-slate-600">
            If you have a privacy question, please contact the HireFlow team
            through the Contact page.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact HireFlow
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default PrivacyPolicy;
