import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

// =====================================================
// HireFlow Job Hub - Reusable Modal Component
// Supports title, content, close button, and custom footer.
// =====================================================

const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Modal width options.
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const modalSize = sizes[size] || sizes.md;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        ref={dialogRef}
        className={[
          "w-full overflow-hidden rounded-2xl bg-white shadow-2xl",
          modalSize,
        ].join(" ")}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          {title && (
            <h2 id={titleId} className="text-lg font-semibold text-slate-900">
              {title}
            </h2>
          )}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        {/* Modal content */}
        <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>

        {/* Optional footer actions */}
        {footer && (
          <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
            {footer}
          </div>
        )}
      </section>
    </div>
  );
};

export default Modal;
