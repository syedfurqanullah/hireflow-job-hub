const CompanyLogo = ({ name, src, className = "" }) => {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "C";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 font-bold text-blue-700 ${className}`}
      aria-label={`${name || "Company"} logo`}
    >
      <span>{initial}</span>
      {src && (
        <img
          src={src}
          alt={`${name || "Company"} logo`}
          className="absolute inset-0 h-full w-full bg-white object-contain p-1"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
};

export default CompanyLogo;
