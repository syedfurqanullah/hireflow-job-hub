import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

const BrandLogo = ({ onClick, dark = false, className = "" }) => (
  <Link
    to="/"
    onClick={onClick}
    className={`inline-flex items-center gap-2 ${className}`}
    aria-label="HireFlow home"
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
      <BriefcaseBusiness size={18} aria-hidden="true" />
    </span>
    <span
      className={`text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}
    >
      Hire<span className={dark ? "text-blue-400" : "text-blue-600"}>Flow</span>
    </span>
  </Link>
);

export default BrandLogo;
