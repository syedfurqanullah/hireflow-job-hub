import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../components/common/BrandLogo";
import { startDemoSession } from "../services/auth";
import useToast from "../context/useToast";

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
  const { showToast } = useToast();

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

    const { fullName, email, password, confirmPassword, role } = formData;

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
        showToast({
          type: "success",
          message: `Welcome to HireFlow, ${user.name}! Your account has been created successfully.`,
        });
        navigate(location.state?.from || "/dashboard", { replace: true });
      } catch {
        setError("We couldn’t create your account. Please try again.");
        showToast({
          type: "error",
          message: "We couldn’t create your account. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between">
          <div
            aria-hidden="true"
            className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl"
          />
          <div className="relative p-10 xl:p-14">
            <BrandLogo dark />
            <div className="mt-24 max-w-xl xl:mt-32">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
                <ShieldCheck size={15} />
                <span>Trusted Career Platform</span>
              </div>
              <h2 className="mt-6 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Build your future with{" "}
                <span className="text-blue-400">HireFlow.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-400">
                Create your account to discover opportunities, manage
                applications, and take the next step in your career.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Discover relevant opportunities",
                  "Track your job applications",
                  "Build a profile employers notice",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-slate-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                      <ShieldCheck size={14} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative border-t border-white/5 px-10 py-6 xl:px-14">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} HireFlow Job Hub
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            {/* =================================================
            Register Card
        ================================================= */}
            <div className="w-full">
              {/* Brand / Heading */}
              <div className="mb-8">
                <div className="mb-8 text-center lg:hidden">
                  <BrandLogo />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Get Started
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Create your HireFlow account
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Join HireFlow and take the next step in your career.
                </p>
              </div>

              {/* =================================================
              Form Card
          ================================================= */}
              <div>
                <p className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
                  Frontend demo: your profile is saved in this browser only. No
                  server account is created.
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
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
                        to="/terms-and-conditions"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy-policy"
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
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      "Creating account..."
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
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
                  className="mx-auto inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-700"
                >
                  <ArrowLeft size={14} />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
