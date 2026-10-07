import { ArrowRight, BriefcaseBusiness, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   Career CTA Section
   Purpose:
   - Homepage ke end par strong call-to-action provide karta hai
   - Job seekers ko jobs explore karne ke liye encourage karta hai
   - Companies explore karne ka secondary option deta hai
   - Fully responsive: mobile, tablet, desktop aur large screens
========================================================= */

const CareerCTA = () => {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            Main CTA Card
        ===================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 shadow-xl sm:px-10 lg:px-16 lg:py-16">

          {/* Decorative background shapes */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

          {/* =====================================================
              CTA Content
          ===================================================== */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">

            {/* CTA Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
              <BriefcaseBusiness className="h-8 w-8 text-white" />
            </div>

            {/* Small Label */}
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Your Next Opportunity
            </p>

            {/* Main Heading */}
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Find Your Dream Job?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Take the next step in your career. Discover exciting
              opportunities, connect with leading companies, and find a
              position that matches your skills and ambitions.
            </p>

            {/* =====================================================
                CTA Buttons
            ===================================================== */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              {/* Primary CTA */}
              <Link
                to="/jobs"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Find Jobs

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/companies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-slate-500 hover:bg-white/10"
              >
                <Building2 className="h-4 w-4" />
                Explore Companies
              </Link>
            </div>

            {/* Supporting Text */}
            <p className="mt-6 text-xs text-slate-500 sm:text-sm">
              Discover opportunities from companies looking for talented
              professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerCTA;