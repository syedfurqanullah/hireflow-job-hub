import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startDemoSession } from "../services/auth";

// =========================================================
// HireFlow - Login Page
// Purpose:
// - Existing users ke liye login interface
// - Frontend-only authentication for now
// - Successful login ke baad Dashboard
// - Real authentication/API later connect hogi
// =========================================================

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =======================================================
  // Handle input changes
  // =======================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =======================================================
  // Frontend validation
  // =======================================================
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  // =======================================================
  // Login submit
  // Temporary frontend-only authentication.
  // Real API authentication will be connected later.
  // =======================================================
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = {
        name: formData.email.split("@")[0],
        email: formData.email.trim().toLowerCase(),
        role: "job-seeker",
      };

      try {
        startDemoSession(user, rememberMe);
        navigate(location.state?.from || "/dashboard", { replace: true });
      } catch (sessionError) {
        setError(sessionError.message);
      } finally {
        setLoading(false);
      }
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">
        {/* =================================================
            Left Branding Panel
            Desktop only
            ================================================= */}
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl"
          />

          <div className="relative p-10 xl:p-14">
            {/* Brand */}
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="HireFlow home"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-950/30">
                H
              </div>

              <div>
                <span className="block text-xl font-extrabold tracking-tight text-white">
                  Hire<span className="text-blue-400">Flow</span>
                </span>

                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Job Hub
                </span>
              </div>
            </Link>

            <div className="mt-24 max-w-xl xl:mt-32">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
                <ShieldCheck size={15} />
                <span>Trusted Career Platform</span>
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Your next opportunity is{" "}
                <span className="text-blue-400">closer than you think.</span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-slate-400">
                Sign in to manage your applications, save jobs, track
                interviews, and discover opportunities made for your career.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                {[
                  "Track your job applications",
                  "Save jobs for later",
                  "Discover personalized opportunities",
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

          {/* Bottom text */}
          <div className="relative border-t border-white/5 px-10 py-6 xl:px-14">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} HireFlow Job Hub
            </p>
          </div>
        </section>

        {/* =================================================
            Login Panel
            ================================================= */}
        <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-8 text-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5"
                aria-label="HireFlow home"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-100">
                  H
                </div>

                <div className="text-left">
                  <span className="block text-xl font-extrabold tracking-tight text-slate-900">
                    Hire<span className="text-blue-600">Flow</span>
                  </span>

                  <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    Job Hub
                  </span>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Sign in to HireFlow
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your account details to continue to your dashboard.
              </p>
            </div>

            {/* Error */}
            <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
              Frontend demo: this sign-in creates a local browser session; it does not verify an account with a server.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-7 space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
                    onClick={() =>
                      setError(
                        "Password reset will be connected with authentication API later."
                      )
                    }
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                state={location.state}
                className="font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                Create Account
              </Link>
            </div>

            {/* Back home */}
            <Link
              to="/"
              className="mx-auto mt-6 inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-700"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
