import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";

/* =========================================================
   Application Routes

   Purpose:
   - Website ke different URLs define karna
   - Har URL ko correct page/component ke saath connect karna
   - MainLayout ke andar public pages render karna
========================================================= */

function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          Public Website Layout
      ===================================================== */}
      <Route element={<MainLayout />}>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Jobs Listing */}
        <Route path="/jobs" element={<Jobs />} />

        {/* Job Details */}
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Companies */}
        <Route path="/companies" element={<Companies />} />

        {/* Company Details */}
      <Route path="/companies/:id" element={<CompanyDetails />} />

      {/* Dashboard*/}
        <Route path="/dashboard" element={<Dashboard />} />

      {/* About */}
      <Route path="/about" element={<About />} />

      {/* Contact */}
      <Route path="/contact" element={<Contact />} />

        {/* Companies */}
        <Route
          path="/companies"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">
                Companies
              </h1>

              <p className="mt-4 text-slate-600">
                Companies page coming next...
              </p>
            </div>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">
                About HireFlow
              </h1>

              <p className="mt-4 text-slate-600">
                Learn more about HireFlow Job Hub.
              </p>
            </div>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">
                Contact
              </h1>

              <p className="mt-4 text-slate-600">
                Get in touch with the HireFlow team.
              </p>
            </div>
          }
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;