import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";

const SavedJobCard = ({ job, onRemove }) => (
  <article className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <CompanyLogo name={job.company} src={job.companyLogo} className="h-12 w-12 text-base" />
    <div className="min-w-0 flex-1">
      <Link to={`/jobs/${job.id}`} className="line-clamp-1 font-semibold text-slate-900 hover:text-blue-600">{job.title}</Link>
      <p className="mt-1 truncate text-sm text-slate-500">{job.company} · {job.location}</p>
    </div>
    <button type="button" aria-label={`Remove ${job.title} from saved jobs`} onClick={() => onRemove(job)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={17} /></button>
  </article>
);

export default SavedJobCard;
