import {
  Code2,
  Palette,
  Megaphone,
  TrendingUp,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryCounts } from "../../services/jobService";

/* =========================================================
   HireFlow - Popular Job Categories
   Purpose:
   - Homepage par popular job categories show karna
   - Real API counts ke saath job category cards
   - Desktop par 5 cards ek row mein
   - Mobile / tablet par responsive grid
   - Live counts Adzuna search API se aate hain
========================================================= */

/* =========================================================
   Category Data
========================================================= */

const categoryCards = [
  {
    id: 1,
    name: "IT Technology",
    jobs: null,
    query: "IT Technology",
    icon: Code2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Designing",
    jobs: null,
    query: "Designing",
    icon: Palette,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Marketing",
    jobs: null,
    query: "Marketing",
    icon: Megaphone,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    name: "Sales",
    jobs: null,
    query: "Sales",
    icon: TrendingUp,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    id: 5,
    name: "Finance",
    jobs: null,
    query: "Finance",
    icon: Landmark,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

/* =========================================================
   Category Card
========================================================= */

const CategoryCard = ({ category }) => {
  const Icon = category.icon;

  return (
    <Link
      to={`/jobs?category=${encodeURIComponent(category.query)}`}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg}`}
      >
        <Icon size={24} strokeWidth={2} className={category.iconColor} />
      </div>

      <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
        {category.name}
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        {category.jobs === null
          ? "Loading jobs…"
          : category.jobs === undefined
            ? "Unavailable"
            : `${category.jobs.toLocaleString()} jobs`}
      </p>
    </Link>
  );
};

/* =========================================================
   Categories Section
========================================================= */

const Categories = () => {
  const [categories, setCategories] = useState(categoryCards);
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    getCategoryCounts()
      .then((results) => {
        if (!active) return;
        setCategories((current) =>
          current.map((item) => {
            const result = results.find(
              (entry) => entry.name === item.query || entry.name === item.name,
            );
            return result
              ? { ...item, jobs: result.count }
              : { ...item, jobs: undefined };
          }),
        );
      })
      .catch((error) => {
        if (active) {
          setLoadError(
            error?.message || "Could not load live category counts.",
          );
          setCategories((current) =>
            current.map((item) => ({ ...item, jobs: undefined })),
          );
        }
      });
    return () => {
      active = false;
    };
  }, [retryCount]);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            Section Header
        ================================================== */}

        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Popular Job Categories
            </h2>

            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
          </div>

          <Link
            to="/jobs"
            className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 sm:text-base"
          >
            View All
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =================================================
            Categories Grid

            Mobile  : 2 columns
            Tablet  : 3 columns
            Desktop : 5 columns

            Requested popular categories fit in one desktop row.
        ================================================== */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        {loadError && (
          <div
            className="mt-5 flex flex-wrap items-center gap-3 text-sm text-rose-600"
            role="alert"
          >
            <span>{loadError}</span>
            <button
              type="button"
              onClick={() => {
                setLoadError("");
                setCategories(categoryCards);
                setRetryCount((count) => count + 1);
              }}
              className="font-semibold underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
