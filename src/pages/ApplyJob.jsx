import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// HireFlow - Job Application Page
// Includes responsive form, resume validation and frontend feedback.
// Real application submission requires a backend API.

const ApplyJob = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Update the input values.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // Validate the resume file type and size.
  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    const isAllowedType = /\.(pdf|doc|docx)$/i.test(file.name);
    const isAllowedSize = file.size <= 5 * 1024 * 1024;

    if (!isAllowedType) {
      setResume(null);
      setError("Upload your resume in PDF, DOC or DOCX format.");
      event.target.value = "";
      return;
    }

    if (!isAllowedSize) {
      setResume(null);
      setError("Resume size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setResume(file);
    setError("");
  };

  // Validate required information before showing confirmation.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !resume
    ) {
      setError("Please complete all required fields and upload your resume.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-4xl">

        {/* Return to the selected job */}
        <Link
          to={id ? `/jobs/${id}` : "/jobs"}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Jobs
        </Link>

        {/* Page heading */}
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            HireFlow Job Hub
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Job Application
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Share your details and upload your resume to prepare your application.
          </p>
        </header>

        {/* Selected job reference */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Selected Job
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Job reference: {id || "Not specified"}
          </p>
        </section>

        {/* Application form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {success ? (
            <div className="py-8 text-center" role="status">
              <div className="text-4xl font-bold text-emerald-600">
                &#10003;
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                Form validated successfully
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                This is a frontend confirmation only. Your application
                has not been sent to an employer because backend submission
                is not connected yet.
              </p>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Edit Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fields marked with * are required.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Full name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name *
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Optional portfolio */}
                <div>
                  <label
                    htmlFor="portfolio"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Portfolio / LinkedIn
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    value={form.portfolio}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Resume upload */}
              <div className="mt-8 border-t border-slate-100 pt-7">
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Resume / CV *
                </label>

                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleResumeChange}
                  className="block w-full rounded-xl border border-slate-300 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Accepted formats: PDF, DOC, DOCX. Maximum size: 5 MB.
                </p>

                {resume && (
                  <p className="mt-2 break-all text-sm text-emerald-700">
                    Selected file: {resume.name}
                  </p>
                )}
              </div>

              {/* Optional cover letter */}
              <div className="mt-7">
                <label
                  htmlFor="coverLetter"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Cover Letter (Optional)
                </label>

                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={5}
                  value={form.coverLetter}
                  onChange={handleChange}
                  placeholder="Explain why you are suitable for this role..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Validation feedback */}
              {error && (
                <p
                  role="alert"
                  className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Form actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                <Link
                  to={id ? `/jobs/${id}` : "/jobs"}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Validate Application
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default ApplyJob;
