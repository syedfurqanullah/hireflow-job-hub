// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// /* =========================================================
//    HireFlow Navbar
//    Purpose:
//    - Main website navigation
//    - Desktop navigation
//    - Responsive mobile navigation
//    - Login / Register actions
// ========================================================= */

// function Navbar() {
//   // Mobile menu ki open/close state
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Main navigation links
//   const navLinks = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     {
//       name: "Jobs",
//       path: "/jobs",
//     },
//     {
//       name: "Companies",
//       path: "/companies",
//     },
//     {
//       name: "About",
//       path: "/about",
//     },
//     {
//       name: "Contact",
//       path: "/contact",
//     },
//   ];

//   // Mobile menu close karne ke liye
//   const closeMobileMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* =================================================
//             Main Navbar
//         ================================================= */}
//         <div className="flex h-16 items-center justify-between">

//           {/* =================================================
//               HireFlow Logo
//           ================================================= */}
//           <Link
//             to="/"
//             onClick={closeMobileMenu}
//             className="flex items-center gap-2"
//             aria-label="HireFlow home"
//           >
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
//               H
//             </div>

//             <span className="text-xl font-bold tracking-tight text-slate-900">
//               Hire<span className="text-blue-600">Flow</span>
//             </span>
//           </Link>

//           {/* =================================================
//               Desktop Navigation
//           ================================================= */}
//           <nav className="hidden items-center gap-8 md:flex">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `text-sm font-medium transition ${
//                     isActive
//                       ? "text-blue-600"
//                       : "text-slate-600 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* =================================================
//               Desktop Authentication
//           ================================================= */}
//           <div className="hidden items-center gap-3 md:flex">
//             <Link
//               to="/login"
//               className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
//             >
//               Login
//             </Link>

//             <Link
//               to="/register"
//               className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
//             >
//               Sign Up
//             </Link>
//           </div>

//           {/* =================================================
//               Mobile Menu Button
//           ================================================= */}
//           <button
//             type="button"
//             onClick={() => setIsMenuOpen((previous) => !previous)}
//             className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
//             aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
//             aria-expanded={isMenuOpen}
//           >
//             {isMenuOpen ? (
//               /* Close Icon */
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.8}
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18 18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               /* Hamburger Icon */
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.8}
//                 stroke="currentColor"
//                 className="h-6 w-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* =================================================
//             Mobile Navigation
//             md se neeche visible hoga
//         ================================================= */}
//         {isMenuOpen && (
//           <div className="border-t border-slate-100 py-4 md:hidden">

//             {/* Mobile Links */}
//             <nav className="flex flex-col gap-1">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.path}
//                   to={link.path}
//                   onClick={closeMobileMenu}
//                   className={({ isActive }) =>
//                     `rounded-lg px-3 py-3 text-sm font-medium transition ${
//                       isActive
//                         ? "bg-blue-50 text-blue-600"
//                         : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
//             </nav>

//             {/* Mobile Authentication Buttons */}
//             <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">

//               <Link
//                 to="/login"
//                 onClick={closeMobileMenu}
//                 className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 onClick={closeMobileMenu}
//                 className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
//               >
//                 Sign Up
//               </Link>

//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

/* =========================================================
   HireFlow Navbar
   Purpose:
   - Main website navigation
   - Desktop navigation
   - Responsive mobile navigation
   - Login / Register actions
   - Active route highlighting
========================================================= */

function Navbar() {
  // Mobile menu ki open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("hireflow_is_authenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(localStorage.getItem("hireflow_is_authenticated") === "true");
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("hireflow-auth-change", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("hireflow-auth-change", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hireflow_user");
    localStorage.removeItem("hireflow_is_authenticated");
    localStorage.removeItem("hireflow_remember_me");
    setIsAuthenticated(false);
    closeMobileMenu();
    navigate("/");
  };

  /*
    Public website ke main navigation links.

    Dashboard intentionally yahan nahi hai.
    Dashboard login ke baad user ko accessible hoga.
  */
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Jobs",
      path: "/jobs",
    },
    {
      name: "Companies",
      path: "/companies",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // Mobile menu close karne ke liye
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            Main Navbar
        ================================================= */}
        <div className="flex h-16 items-center justify-between">

          {/* =================================================
              HireFlow Logo
          ================================================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
            aria-label="HireFlow home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <BriefcaseBusiness size={18} />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Hire<span className="text-blue-600">Flow</span>
            </span>
          </Link>

          {/* =================================================
              Desktop Navigation
          ================================================= */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* =================================================
              Desktop Authentication
          ================================================= */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <button type="button" onClick={handleLogout} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Logout
              </button>
            ) : (
              <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md">
                Sign Up
              </Link>
            )}
          </div>

          {/* =================================================
              Mobile Menu Button
          ================================================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              /* Close Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* =================================================
            Mobile Navigation
            md se neeche visible hoga
        ================================================= */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-100 py-4 md:hidden"
          >
            {/* Mobile Links */}
            <nav
              className="flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* =================================================
                Mobile Authentication Buttons
            ================================================= */}
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              {isAuthenticated ? (
                <button type="button" onClick={handleLogout} className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
                  Logout
                </button>
              ) : (
                <Link to="/register" onClick={closeMobileMenu} className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
