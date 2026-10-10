import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { endDemoSession, isAuthenticated } from "../../services/auth";
import { useTheme } from "../../context/useTheme";
import useToast from "../../context/useToast";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const themeAction = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  useEffect(() => {
    const syncAuthState = () => setAuthenticated(isAuthenticated());

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("hireflow-auth-change", syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("hireflow-auth-change", syncAuthState);
    };
  }, []);

  const closeMobileMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    endDemoSession();
    setAuthenticated(false);
    closeMobileMenu();
    showToast({ type: "info", message: "You’ve been logged out successfully. See you again soon!" });
    navigate("/");
  };

  const renderNavigationLinks = (mobile = false) => (
    <nav
      aria-label={mobile ? "Mobile navigation" : "Main navigation"}
      className={mobile ? "flex flex-col gap-1" : "hidden items-center gap-8 md:ml-auto md:flex"}
    >
      {navigationLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/"}
          onClick={mobile ? closeMobileMenu : undefined}
          className={({ isActive }) => mobile
            ? `relative rounded-lg px-3 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:text-blue-600"}`
            : `relative text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 hover:text-blue-600 hover:after:scale-x-100 ${isActive ? "text-blue-600 after:scale-x-100" : "text-slate-600"}`}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <BrandLogo onClick={closeMobileMenu} />
          {renderNavigationLinks()}

          <div className="hidden items-center gap-3 md:ml-8 md:flex">
            <button type="button" onClick={toggleTheme} aria-label={themeAction} title={themeAction} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <ThemeIcon size={18} aria-hidden="true" />
            </button>
            {authenticated ? (
              <button type="button" onClick={handleLogout} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Logout</button>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</Link>
                <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</Link>
              </>
            )}
          </div>

          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden">
            {isMenuOpen ? (
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            ) : (
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="border-t border-slate-100 py-4 md:hidden">
            {renderNavigationLinks(true)}
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              {authenticated ? (
                <button type="button" onClick={handleLogout} className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMobileMenu} className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign In</Link>
                  <Link to="/register" onClick={closeMobileMenu} className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</Link>
                </>
              )}
              <button type="button" onClick={toggleTheme} aria-label={themeAction} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <ThemeIcon size={17} aria-hidden="true" />
                {theme === "dark" ? "Light theme" : "Dark theme"}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
