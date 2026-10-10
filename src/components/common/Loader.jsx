const Loader = ({
  size = "md",
  text = "",
  fullScreen = false,
  className = "",
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
      className={[
        "flex flex-col items-center justify-center gap-3",
        fullScreen ? "min-h-screen w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          spinnerSize,
          "animate-spin rounded-full border-blue-600 border-t-transparent",
        ].join(" ")}
      />

      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}

      {!text && <span className="sr-only">Loading...</span>}
    </div>
  );
};

export default Loader;
