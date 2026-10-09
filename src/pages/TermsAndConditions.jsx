import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Using HireFlow",
    body: "HireFlow helps job seekers discover opportunities and manage their applications. You agree to use the platform honestly, lawfully, and for genuine career or hiring purposes.",
  },
  {
    title: "Your account",
    body: "Please provide accurate information when creating an account and keep your login details secure. You are responsible for activity carried out through your account. If you believe your account has been misused, contact us promptly.",
  },
  {
    title: "Job listings and applications",
    body: "Job listings come from employers and third-party sources. We work to keep information useful and current, but we cannot guarantee that every listing, salary, requirement, or company detail is complete, accurate, or still available. Please verify important details with the employer before applying or making a decision.",
  },
  {
    title: "Respectful conduct",
    body: "Do not use HireFlow to submit misleading information, impersonate another person, distribute harmful content, interfere with the service, or contact people in a way that is abusive, discriminatory, or unlawful. We may restrict access when necessary to protect the community and the platform.",
  },
  {
    title: "Content you provide",
    body: "You retain responsibility for the resumes, profiles, messages, and other information you submit. By sharing content with HireFlow, you confirm that you have the right to share it and allow us to use it to provide and improve the service.",
  },
  {
    title: "Service availability",
    body: "We aim to keep HireFlow reliable, but the service may occasionally change, become unavailable, or contain errors. HireFlow is provided on an as-available basis, and we are not responsible for decisions made solely on the basis of information found on the platform.",
  },
  {
    title: "Updates to these terms",
    body: "We may update these Terms and Conditions as HireFlow evolves. When changes are important, we will make reasonable efforts to bring them to your attention. Continuing to use HireFlow after an update means you accept the revised terms.",
  },
];

const TermsAndConditions = () => (
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
          Terms and Conditions
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
          A straightforward guide to using HireFlow responsibly and making the
          most of the platform.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          Last updated: October 9, 2026
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          <CheckCircle2 className="mt-0.5 shrink-0 text-blue-600" size={18} />
          <p>
            By creating an account or using HireFlow, you confirm that you have
            read and agree to these Terms and Conditions.
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
            If you have a question about these terms or need help with your
            account, please contact the HireFlow team through the Contact page.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Contact HireFlow
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default TermsAndConditions;
