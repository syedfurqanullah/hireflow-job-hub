import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Building2, BriefcaseBusiness, House, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

/* =========================================================
   Main Layout
   Purpose:
   - Public pages ka common layout
   - Navbar top par
   - Outlet ke andar current page
   - Footer bottom par
========================================================= */

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Website Navbar */}
      <Navbar />

      {/* Current Route Page */}
        <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Website Footer */}
      <Footer />

      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-6px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        {[
          { label: "Home", to: "/", Icon: House, end: true },
          { label: "Jobs", to: "/jobs", Icon: BriefcaseBusiness },
          { label: "Companies", to: "/companies", Icon: Building2 },
          { label: "Profile", to: "/dashboard", Icon: UserRound },
        ].map(({ label, to, Icon, end }) => (
          <NavLink key={label} to={to} end={end} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-lg py-1 text-[11px] font-medium ${isActive ? "text-blue-600" : "text-slate-500"}`}>
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
