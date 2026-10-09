import { Component } from "react";

class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("HireFlow UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-12">
          <section
            role="alert"
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              HireFlow Job Hub
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              This page hit a problem
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Reload the page to try again. Your saved jobs remain in this
              browser.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              Reload page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
