// =========================================================
// HireFlow - Job Search
// ---------------------------------------------------------
// Reusable search component for the homepage.
//
// Current responsibility:
// - Collect job keyword
// - Collect location
// - Handle search submission
// - Navigate user to the Jobs page
//
// Later this component can be connected directly to the
// real jobs API without changing the visual structure.
// =========================================================

import { useState } from "react"

import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import { useNavigate } from "react-router-dom"

const JobSearch = () => {
  // -------------------------------------------------------
  // Form state
  // -------------------------------------------------------

  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  // -------------------------------------------------------
  // React Router navigation
  // -------------------------------------------------------

  const navigate = useNavigate()

  // -------------------------------------------------------
  // Search submit handler
  // -------------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault()

    // Remove unnecessary spaces before navigating.
    const cleanKeyword = keyword.trim()
    const cleanLocation = location.trim()

    // Build query parameters only when values exist.
    const params = new URLSearchParams()

    if (cleanKeyword) {
      params.set("q", cleanKeyword)
    }

    if (cleanLocation) {
      params.set("location", cleanLocation)
    }

    // Navigate to the Jobs page.
    navigate(`/jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-xl
        shadow-slate-200/60

        sm:rounded-3xl
        sm:p-3
      "
    >
      {/* -------------------------------------------------
          Search fields wrapper

          Mobile:
          Fields stack vertically.

          Desktop:
          Fields become one horizontal search bar.
      -------------------------------------------------- */}

      <div
        className="
          flex
          flex-col
          gap-2

          lg:flex-row
          lg:items-center
          lg:gap-0
        "
      >
        {/* -------------------------------------------------
            Job / keyword field
        -------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3

            lg:border-0
            lg:bg-transparent
          "
        >
          <BriefcaseBusiness
            className="h-5 w-5 shrink-0 text-slate-400"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="job-keyword"
              className="
                block
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              What
            </label>

            <input
              id="job-keyword"
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Job title, skill or company"
              className="
                mt-0.5
                w-full
                bg-transparent
                text-sm
                font-medium
                text-slate-900
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* Desktop divider */}

        <div
          aria-hidden="true"
          className="
            hidden
            h-10
            w-px
            bg-slate-200
            lg:block
          "
        />

        {/* -------------------------------------------------
            Location field
        -------------------------------------------------- */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3

            lg:border-0
            lg:bg-transparent
          "
        >
          <MapPin
            className="h-5 w-5 shrink-0 text-slate-400"
          />

          <div className="min-w-0 flex-1">
            <label
              htmlFor="job-location"
              className="
                block
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              Where
            </label>

            <input
              id="job-location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City, country or remote"
              className="
                mt-0.5
                w-full
                bg-transparent
                text-sm
                font-medium
                text-slate-900
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* -------------------------------------------------
            Search button
        -------------------------------------------------- */}

        <button
          type="submit"
          className="
            inline-flex
            min-h-12
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            text-sm
            font-bold
            text-white
            shadow-sm
            transition-all
            duration-200

            hover:bg-blue-700
            hover:shadow-md

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2

            active:scale-[0.98]

            lg:min-w-36
          "
        >
          <Search className="h-4 w-4" />

          <span>Search Jobs</span>
        </button>
      </div>

      {/* -------------------------------------------------
          Popular searches
      -------------------------------------------------- */}

      <div
        className="
          mt-2
          flex
          flex-wrap
          items-center
          gap-2
          px-2
          pb-1
          pt-1
          text-xs
          text-slate-500

          sm:px-3
        "
      >
        <span className="font-medium">
          Popular:
        </span>

        {[
          "Frontend Developer",
          "Product Designer",
          "Remote",
          "Marketing",
        ].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKeyword(item)}
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              font-medium
              text-slate-600
              transition-colors
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            {item}
          </button>
        ))}
      </div>
    </form>
  )
}

export default JobSearch