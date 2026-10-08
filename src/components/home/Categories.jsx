import {
  Code2,
  Palette,
  Megaphone,
  TrendingUp,
  Landmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   HireFlow - Popular Job Categories
   Purpose:
   - Homepage par popular job categories show karna
   - Reference design ke mutabiq 6 compact cards
   - Desktop par 6 cards ek row mein
   - Mobile / tablet par responsive grid
   - Abhi job counts demo/mock data hain
   - Future mein API se dynamic data aa sakta hai
========================================================= */

/* =========================================================
   Category Data
========================================================= */

const categories = [
  {
    id: 1,
    name: "Technology",
    jobs: "12,480",
    query: "Technology",
    icon: Code2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Design",
    jobs: "4,230",
    query: "Design",
    icon: Palette,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Marketing",
    jobs: "3,760",
    query: "Marketing",
    icon: Megaphone,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    name: "Sales",
    jobs: "2,560",
    query: "Sales",
    icon: TrendingUp,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    id: 5,
    name: "Finance",
    jobs: "2,340",
    query: "Finance",
    icon: Landmark,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    id: 6,
    name: "Cyber Security",
    jobs: "1,850",
    query: "Cyber Security",
    icon: ShieldCheck,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
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
      {/* Category Icon */}
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg}`}
      >
        <Icon
          size={24}
          strokeWidth={2}
          className={category.iconColor}
        />
      </div>

      {/* Category Name */}
      <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
        {category.name}
      </h3>

      {/* Job Count */}
      <p className="mt-1 text-sm font-medium text-slate-500">
        {category.jobs} jobs
      </p>
    </Link>
  );
};

/* =========================================================
   Categories Section
========================================================= */

const Categories = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            Section Header
        ================================================== */}

        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            {/* Section Title */}
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Popular Job Categories
            </h2>

            {/* Blue Underline - Reference Style */}
            <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
          </div>

          {/* View All Jobs */}
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
            Desktop : 6 columns

            Is tarah reference jaisa desktop par
            6 cards ek hi row mein nazar aayenge.
        ================================================== */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;