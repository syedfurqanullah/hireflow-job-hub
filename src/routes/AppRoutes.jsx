import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";

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