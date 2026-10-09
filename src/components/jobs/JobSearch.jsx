import { MapPin, Search } from "lucide-react";
import Button from "../common/Button";

const JobSearch = ({
  searchInput,
  setSearchInput,
  locationInput,
  setLocationInput,
  onSearch,
  onKeyDown,
  loading = false,
}) => (
  <div className="mt-8 grid gap-3 rounded-2xl bg-white p-3 shadow-2xl md:grid-cols-[1fr_1fr_auto]">
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-blue-500">
      <Search size={19} className="shrink-0 text-slate-400" />
      <input
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Job title, skill or company"
        className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        aria-label="Search job title, skill or company"
      />
    </label>
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-blue-500">
      <MapPin size={19} className="shrink-0 text-slate-400" />
      <input
        type="search"
        value={locationInput}
        onChange={(event) => setLocationInput(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="City or remote"
        className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        aria-label="Search by location"
      />
    </label>
    <Button
      type="button"
      onClick={onSearch}
      loading={loading}
      loadingText="Searching..."
      className="min-h-12 px-6 active:scale-[0.98]"
    >
      <Search size={17} />
      Search Jobs
    </Button>
  </div>
);

export default JobSearch;
