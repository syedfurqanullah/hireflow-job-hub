import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import careerCtaImage from "../../assets/career-cta.png";

// =========================================================
// HireFlow - Career CTA Section
// Purpose:
// - Homepage ka final conversion section
// - Background image ke upar React content show karna
// - Image sirf visual/background ke liye use hogi
// - Text aur buttons React/Tailwind se responsive hain
// - Section height intentionally compact rakhi gayi hai
// =========================================================

const CareerCTA = () => {
  return (
    <section className="relative isolate min-h-[400px] overflow-hidden bg-slate-950 sm:min-h-[440px] lg:min-h-[480px]">
      {/* =====================================================
          Background Image
          ===================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${careerCtaImage})`,
        }}
      />

      {/* =====================================================
          Dark Gradient Overlay
          Text readability ke liye image ke upar overlay
          ===================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/30"
      />

      {/* Mobile readability overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-slate-950/20 sm:bg-transparent"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-slate-950/70 to-transparent"
      />

      {/* =====================================================
          Main Content
          ===================================================== */}
      <div className="mx-auto flex min-h-[400px] max-w-7xl items-center px-4 py-10 sm:min-h-[440px] sm:px-6 sm:py-14 lg:min-h-[480px] lg:px-8 lg:py-16">
        <div className="w-full max-w-3xl">
          {/* =================================================
              Small Badge
              ================================================= */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            <span>Build your future with HireFlow</span>
          </div>

          {/* =================================================
              Heading
              ================================================= */}
          <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Take the Next Step in Your{" "}
            <span className="text-blue-400">Career?</span>
          </h2>

          {/* =================================================
              Description
              ================================================= */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Discover exciting opportunities, connect with top companies, and
            find a role that takes your career to the next level.
          </p>

          {/* =================================================
              CTA Buttons
              ================================================= */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Browse Jobs */}
            <Link
              to="/jobs"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl sm:px-6"
            >
              <BriefcaseBusiness size={17} className="shrink-0" />

              <span>Browse Jobs</span>

              <ArrowRight
                size={16}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* Create Account */}
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 sm:px-6"
            >
              <UserPlus
                size={17}
                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
              />

              <span>Create Free Account</span>
            </Link>
          </div>

          {/* =================================================
              Trust Points
              ================================================= */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-200 sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-blue-400" />

              <span>Free to join</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-blue-400" />

              <span>Thousands of opportunities</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="shrink-0 text-blue-400" />

              <span>Top companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerCTA;
