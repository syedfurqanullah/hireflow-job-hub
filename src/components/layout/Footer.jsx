import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

// =========================================================
// HireFlow - Footer
// Purpose:
// - Global website footer
// - Light premium design
// - Responsive across mobile, tablet and desktop
// - Rendered globally through MainLayout
// =========================================================

const Footer = () => {
  // =======================================================
  // Quick Navigation
  // =======================================================

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Companies", path: "/companies" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // =======================================================
  // Job Seeker Links
  // =======================================================

  const jobSeekerLinks = [
    { label: "Browse Jobs", path: "/jobs" },
    { label: "Companies", path: "/companies" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Saved Jobs", path: "/dashboard#saved-jobs" },
  ];

  return (
    <footer className="mt-10 border-t border-slate-200 bg-white pb-16 text-slate-700 sm:mt-12 md:pb-0">
      {/* ===================================================
          Main Footer Content
          =================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* =================================================
              Brand Section
              ================================================= */}

          <div className="max-w-sm">
            {/* Logo */}
            <BrandLogo />

            {/* Description */}
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Find your dream job, connect with top companies, and build the
              career you deserve with HireFlow Job Hub.
            </p>
          </div>

          {/* =================================================
              Quick Links
              ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1 text-sm text-slate-500 transition-colors duration-200 hover:text-blue-600"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              Job Seekers
              ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Job Seekers
            </h3>

            <ul className="mt-5 space-y-3">
              {jobSeekerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1 text-sm text-slate-500 transition-colors duration-200 hover:text-blue-600"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              Contact
              ================================================= */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4">
              {/* Email */}
              <a
                href="mailto:syedfurqanullahh@gmail.com"
                className="group flex items-start gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <Mail size={16} />
                </span>

                <span className="pt-1 text-sm text-slate-500 transition-colors duration-200 group-hover:text-blue-600">
                  syedfurqanullahh@gmail.com
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/syed-furqan-ullah/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <span className="text-sm font-bold" aria-hidden="true">in</span>
                </span>

                <span className="pt-1 text-sm text-slate-500 transition-colors duration-200 group-hover:text-blue-600">
                  LinkedIn
                </span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin size={16} />
                </span>

                <span className="pt-1 text-sm leading-6 text-slate-500">
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          Bottom Bar
          =================================================== */}

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {/* Copyright */}
          <p className="text-center text-xs text-slate-500 md:text-left">
            © {new Date().getFullYear()} HireFlow Job Hub. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-5 text-xs text-slate-500 md:justify-end">
            <Link
              to="/privacy-policy"
              className="transition-colors duration-200 hover:text-blue-600"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="transition-colors duration-200 hover:text-blue-600"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
