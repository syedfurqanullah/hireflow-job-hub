import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;