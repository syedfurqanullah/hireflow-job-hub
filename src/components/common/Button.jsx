// =====================================================
// HireFlow Job Hub - Reusable Button Component
// Supports different variants, sizes, and button types.
// =====================================================

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = "",
  loadingText = "Please wait...",
  ...props
}) => {
  // Shared styles applied to every button.
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50";

  // Visual styles for different button variants.
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-100",

    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-100",

    outline:
      "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-100",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-100",

    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-100",
  };

  // Consistent button sizes across the application.
  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  // Prevent invalid variant or size values from breaking styling.
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      className={[
        baseStyles,
        variantStyles,
        sizeStyles,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}

      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
