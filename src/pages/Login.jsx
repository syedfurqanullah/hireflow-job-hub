import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* =========================================================
   HireFlow Login Page
   Purpose:
   - User login UI
   - Frontend-only demo authentication
   - Redirect user to dashboard after successful login
   - Responsive design for mobile, tablet and desktop

   NOTE:
   Real authentication/API baad mein connect ki jayegi.
========================================================= */

const Login = () => {
  const navigate = useNavigate();

  // Login form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI states
  const [showPassword, setShowPassword] = useState(false);
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

    // User dobara type kare to previous error remove ho jaye
    if (error) {
      setError("");
    }
  };

  /* =========================================================
     Handle login submit

     Abhi frontend-only demo authentication hai.
     Kisi bhi valid-looking email/password se login
     dashboard par redirect hoga.
  ========================================================= */
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    /*
      Fake loading delay rakha gaya hai taake UI
      real login experience jaisi feel kare.
    */
    setTimeout(() => {
      /*
        Temporary user session.

        Real API authentication aane par ye localStorage
        logic API response/token se replace hoga.
      */
      const user = {
        name: formData.email.split("@")[0],
        email: formData.email,
        role: "job-seeker",
      };

      localStorage.setItem("hireflow_user", JSON.stringify(user));
      localStorage.setItem("hireflow_is_authenticated", "true");

      // Login ke baad User Dashboard
      navigate("/dashboard");

      setIsLoading(false);
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        {/* =================================================
            Login Card
        ================================================= */}
        <div className="w-full max-w-md">

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
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your HireFlow account.
            </p>
          </div>

          {/* =================================================
              Form Card
          ================================================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

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

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                    onClick={() => {
                      // Forgot password functionality baad mein add hogi.
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* =================================================
                Register Link
            ================================================= */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Create an account
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

export default Login;