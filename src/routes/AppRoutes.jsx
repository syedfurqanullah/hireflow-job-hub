import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

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

          Navbar MainLayout ke andar rahega.
          Child routes <Outlet /> ke through render honge.
      ===================================================== */}
      <Route element={<MainLayout />}>

        {/* ===================================================
            Home Page

            "/" open hone par Home.jsx render hoga.
            Home.jsx ke andar Hero.jsx already connected hai.
        =================================================== */}
        <Route path="/" element={<Home />} />

        {/* ===================================================
            Jobs Page
        =================================================== */}
        <Route
          path="/jobs"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">
                Jobs
              </h1>

              <p className="mt-4 text-slate-600">
                Jobs page coming next...
              </p>
            </div>
          }
        />

        {/* ===================================================
            Companies Page
        =================================================== */}
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

        {/* ===================================================
            About Page
        =================================================== */}
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

        {/* ===================================================
            Contact Page
        =================================================== */}
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