import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   Footer Component

   Purpose:
   - Website ka common footer
   - HireFlow branding
   - Navigation links
   - Job seeker links
   - Contact information
   - Responsive layout
========================================================= */

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* =====================================================
          Main Footer
      ===================================================== */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              Brand
          ================================================= */}
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="HireFlow Home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                H
              </div>

              <span className="text-xl font-bold text-white">
                Hire<span className="text-blue-500">Flow</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Find your dream job, connect with top companies, and build
              your future with HireFlow Job Hub.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 items-center justify-center rounded-full border border-slate-800 px-4 text-sm transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 items-center justify-center rounded-full border border-slate-800 px-4 text-sm transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 items-center justify-center rounded-full border border-slate-800 px-4 text-sm transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                LinkedIn
              </a>

            </div>
          </div>

          {/* =================================================
              Quick Links
          ================================================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm transition hover:text-blue-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/jobs"
                  className="text-sm transition hover:text-blue-400"
                >
                  Find Jobs
                </a>
              </li>

              <li>
                <a
                  href="/companies"
                  className="text-sm transition hover:text-blue-400"
                >
                  Companies
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-sm transition hover:text-blue-400"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-sm transition hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* =================================================
              Job Seekers
          ================================================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Job Seekers
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="/jobs"
                  className="inline-flex items-center gap-1 text-sm transition hover:text-blue-400"
                >
                  Browse Jobs
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm transition hover:text-blue-400"
                >
                  Create Profile
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm transition hover:text-blue-400"
                >
                  Career Resources
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm transition hover:text-blue-400"
                >
                  Job Alerts
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm transition hover:text-blue-400"
                >
                  Resume Builder
                </a>
              </li>

            </ul>
          </div>

          {/* =================================================
              Contact
          ================================================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <ul className="mt-5 space-y-4">

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <a
                  href="mailto:hello@hireflow.com"
                  className="text-sm transition hover:text-blue-400"
                >
                  syedfurqanullahh@gmail.com
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <a
                  href="tel:+923001234567"
                  className="text-sm transition hover:text-blue-400"
                >
                  +92 3196976917
                </a>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span className="text-sm leading-6">
                  Karachi, Pakistan
                </span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* =====================================================
          Copyright
      ===================================================== */}
      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p className="text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} HireFlow Job Hub.
            All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-blue-400"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-sm text-slate-500 transition hover:text-blue-400"
            >
              Terms & Conditions
            </a>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;