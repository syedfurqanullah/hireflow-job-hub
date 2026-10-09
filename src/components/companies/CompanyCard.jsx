import { BriefcaseBusiness, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => (
  <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
    <div className="flex items-start justify-between gap-4">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
        {company.companyLogo ? (
          <img
            src={company.companyLogo}
            alt={`${company.name} logo`}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          company.name.charAt(0).toUpperCase()
        )}
      </div>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
        {company.industry}
      </span>
    </div>
    <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-blue-600">
      {company.name}
    </h3>
    <div className="mt-5 space-y-3 border-t pt-5">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <MapPin size={17} />
        {company.location}
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <BriefcaseBusiness size={17} />
        {company.adzunaOpenJobs || company.openJobs} open jobs
      </div>
    </div>
    <Link
      to={`/companies/${company.id}`}
      className="mt-7 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
    >
      View Company
    </Link>
  </article>
);

export default CompanyCard;
