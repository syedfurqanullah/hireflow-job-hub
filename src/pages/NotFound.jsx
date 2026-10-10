import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16 sm:px-6">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-50 sm:h-36 sm:w-36">
          <span className="text-5xl font-extrabold tracking-tight text-blue-600 sm:text-6xl">
            404
          </span>
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Page Not Found
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Oops! Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          The page you are looking for may have been moved, removed, or the URL
          might be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Back to Home
          </Link>

          <Link
            to="/jobs"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Browse Jobs
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-400">
          HireFlow Job Hub · Find your next opportunity
        </p>
      </section>
    </main>
  );
};

export default NotFound;
