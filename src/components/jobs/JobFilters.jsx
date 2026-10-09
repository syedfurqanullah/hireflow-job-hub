const JOB_TYPE_OPTIONS = [
  "All",
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Remote",
];
const EXPERIENCE_LEVEL_OPTIONS = [
  "All",
  "Entry Level",
  "Mid Level",
  "Senior Level",
];

const FilterSelect = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="text-sm font-semibold text-slate-800">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const JobFilters = ({
  idPrefix,
  category,
  categoryOptions,
  setCategory,
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  salaryMinInput,
  setSalaryMinInput,
  salaryMaxInput,
  setSalaryMaxInput,
  locationInput,
  setLocationInput,
}) => (
  <div className="space-y-5">
    <FilterSelect
      id={`${idPrefix}-category`}
      label="Category"
      value={category}
      onChange={setCategory}
      options={categoryOptions}
    />
    <FilterSelect
      id={`${idPrefix}-job-type`}
      label="Job Type"
      value={jobType}
      onChange={setJobType}
      options={JOB_TYPE_OPTIONS}
    />
    <FilterSelect
      id={`${idPrefix}-experience`}
      label="Experience Level"
      value={experienceLevel}
      onChange={setExperienceLevel}
      options={EXPERIENCE_LEVEL_OPTIONS}
    />
    <fieldset>
      <legend className="text-sm font-semibold text-slate-800">
        Salary Range (USD)
      </legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="sr-only" htmlFor={`${idPrefix}-salary-min`}>
          Minimum salary
        </label>
        <input
          id={`${idPrefix}-salary-min`}
          type="number"
          min="0"
          step="1000"
          value={salaryMinInput}
          onChange={(event) => setSalaryMinInput(event.target.value)}
          placeholder="Min"
          className="min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <label className="sr-only" htmlFor={`${idPrefix}-salary-max`}>
          Maximum salary
        </label>
        <input
          id={`${idPrefix}-salary-max`}
          type="number"
          min="0"
          step="1000"
          value={salaryMaxInput}
          onChange={(event) => setSalaryMaxInput(event.target.value)}
          placeholder="Max"
          className="min-w-0 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </fieldset>
    <div>
      <label
        htmlFor={`${idPrefix}-location`}
        className="text-sm font-semibold text-slate-800"
      >
        Location
      </label>
      <input
        id={`${idPrefix}-location`}
        type="search"
        value={locationInput}
        onChange={(event) => setLocationInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
        placeholder="City or remote"
        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  </div>
);

export default JobFilters;
