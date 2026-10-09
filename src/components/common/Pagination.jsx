import { ChevronLeft, ChevronRight } from "lucide-react";

const getPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, index) => index + 1);

  if (currentPage <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
  if (currentPage >= totalPages - 3)
    return [
      1,
      "…",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [
    1,
    "…",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "…",
    totalPages,
  ];
};

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) => {
  const pageCount = Math.max(1, Math.floor(Number(totalPages) || 1));
  const page = Math.min(
    pageCount,
    Math.max(1, Math.floor(Number(currentPage) || 1)),
  );
  const changePage = (nextPage) => {
    if (nextPage !== page && nextPage >= 1 && nextPage <= pageCount)
      onPageChange?.(nextPage);
  };

  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-center gap-1.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
        className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>
      {getPageItems(page, pageCount).map((item, index) =>
        item === "…" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="px-2 text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => changePage(item)}
            aria-label={`Go to page ${item}`}
            aria-current={page === item ? "page" : undefined}
            className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${page === item ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => changePage(page + 1)}
        disabled={page === pageCount}
        aria-label="Go to next page"
        className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
