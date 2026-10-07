import categories from "../../data/categories";

/* =========================================================
   Popular Categories Section
   Purpose:
   - Users ko popular job categories quickly explore karwana.
   - Reusable category cards display karna.
========================================================= */

function Categories() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            Section Heading
        ================================================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore Opportunities
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Popular Job Categories
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore opportunities across the most in-demand career
              categories and find the role that fits your skills.
            </p>
          </div>

          {/* View All Button */}
          <button
            type="button"
            className="w-fit text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all categories →
          </button>
        </div>

        {/* =================================================
            Category Cards
        ================================================= */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              {/* Category Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">
                {category.icon}
              </div>

              {/* Category Name */}
              <h3 className="mt-5 text-sm font-bold text-slate-900">
                {category.name}
              </h3>

              {/* Available Jobs */}
              <p className="mt-1 text-xs text-slate-500">
                {category.jobs} jobs
              </p>
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Categories;