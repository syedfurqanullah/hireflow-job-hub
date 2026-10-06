import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

/* =========================================================
   Main Layout
   Purpose:
   - Common layout for public website pages
   - Navbar top par rahega
   - Outlet ke andar current page render hogi
========================================================= */

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Website Navbar */}
      <Navbar />

      {/* =================================================
          Page Content
          React Router yahan current child route render karega.
      ================================================= */}
      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;