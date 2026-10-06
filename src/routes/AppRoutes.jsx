import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

/* =========================================================
   Application Routes
   Purpose:
   - Define all application URLs
   - Connect URLs with their pages
========================================================= */

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website Layout */}
      <Route element={<MainLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">
                HireFlow Job Hub
              </h1>

              <p className="mt-4 text-slate-600">
                Home page coming next...
              </p>
            </div>
          }
        />

        {/* Jobs */}
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
              <h1 className="text-4xl font-bold text-slate-900">About HireFlow</h1>
              <p className="mt-4 text-slate-600">Learn more about HireFlow Job Hub.</p>
            </div>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <div className="mx-auto max-w-7xl px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-slate-900">Contact</h1>
              <p className="mt-4 text-slate-600">Get in touch with the HireFlow team.</p>
            </div>
          }
        />

      </Route>

      {/* Authentication routes baad mein add karenge */}
    </Routes>
  );
}

export default AppRoutes;
