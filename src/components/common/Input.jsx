// =====================================================
// HireFlow Job Hub - Reusable Input Component
// Supports labels, placeholders, errors, and input types.
// =====================================================

const Input = ({
  label,
  id: providedId,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
  required = false,
  disabled = false,
  hint = "",
  className = "",
  ...props
}) => {
  const inputId = providedId || name;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full">
      {/* Input label */}
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* Input field */}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800",
          "outline-none transition placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
          "disabled:cursor-not-allowed disabled:bg-slate-100",
          error ? "border-red-500" : "border-slate-200",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {hint && !error && <p id={hintId} className="mt-1.5 text-sm text-slate-500">{hint}</p>}

      {/* Validation error */}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
