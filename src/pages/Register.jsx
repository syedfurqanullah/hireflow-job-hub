import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startDemoSession } from "../services/auth";

/* =========================================================
   HireFlow Register Page
   Purpose:
   - New user registration UI
   - Job Seeker / Employer account selection
   - Frontend-only demo registration
   - Temporary user data localStorage mein save
   - Successful registration ke baad Dashboard redirect

   NOTE:
   Real API/database authentication baad mein connect hogi.
========================================================= */

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Registration form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "job-seeker",
  });

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     Handle input changes
  ========================================================= */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Input change hone par previous error remove
    if (error) {
      setError("");
    }
  };

  /* =========================================================
     Handle registration submit
  ========================================================= */
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const {
      fullName,
      email,
      password,
      confirmPassword,
      role,
    } = formData;

    // Required fields validation
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Minimum password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    /*
      Temporary frontend-only registration.

      Real backend/API aane par yahan:
      - API request
      - database account creation
      - authentication token/session
      use hoga.
    */
    setTimeout(() => {
      const user = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        role,
      };

      // Temporary local session
      try {
        startDemoSession(user);
        navigate(location.state?.from || "/dashboard", { replace: true });
      } catch (sessionError) {
        setError(sessionError.message);
      } finally {
        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        {/* =================================================
            Register Card
        ================================================= */}
        <div className="w-full max-w-lg">

          {/* Brand / Heading */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                H
              </span>

              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Hire<span className="text-blue-600">Flow</span>
              </span>
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join HireFlow and take the next step in your career.
            </p>
          </div>

          {/* =================================================
              Form Card
          ================================================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <p className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
              Frontend demo: your profile is saved in this browser only. No server account is created.
            </p>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* =================================================
                  Account Type
              ================================================= */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  I want to
                </label>

                <div className="grid gap-3 sm:grid-cols-2">

                  {/* Job Seeker */}
                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.role === "job-seeker"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="job-seeker"
                      checked={formData.role === "job-seeker"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          formData.role === "job-seeker"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {/* Briefcase icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.073a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V14.15m16.5 0a2.25 2.25 0 0 0-1.08-1.93l-3.75-2.25a2.25 2.25 0 0 0-1.16-.32H9.74c-.409 0-.811.111-1.162.32l-3.75 2.25a2.25 2.25 0 0 0-1.078 1.93m16.5 0H3.75m16.5 0v-1.5a2.25 2.25 0 0 0-2.25-2.25h-3.75m-10.5 3.75v-1.5A2.25 2.25 0 0 1 6 10.4h3.75m4.5 0V7.9a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v2.5m4.5 0h-4.5"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Find a Job
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Discover jobs and build your career.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Employer */}
                  <label
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      formData.role === "employer"
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={formData.role === "employer"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          formData.role === "employer"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {/* Building icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 21h16.5M5.25 21V5.25a1.5 1.5 0 0 1 1.5-1.5h4.5a1.5 1.5 0 0 1 1.5 1.5V21m-7.5 0h7.5m3 0V9.75a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5V21m-4.5-9h3m-3 3h3m-10.5-7.5h3m-3 3h3m-3 3h3"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Hire Talent
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Find talented professionals for your company.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
                >
                  I agree to HireFlow's{" "}
                  <Link
                    to="/"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* =================================================
                Login Link
            ================================================= */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                state={location.state}
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
