import { Search } from "lucide-react";

const CompanySearch = ({ value, onChange }) => (
  <div className="mx-auto max-w-7xl rounded-2xl bg-white p-4 shadow-lg">
    <label className="relative block">
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search companies, industries or locations..." aria-label="Search companies, industries or locations" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white" />
    </label>
  </div>
);

export default CompanySearch;
