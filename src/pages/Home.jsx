import Hero from "../components/home/Hero"

// =========================================================
// Home Page
// Landing page composition.
// Additional sections will be added below Hero.
// =========================================================

const Home = () => {
  return (
    <main>
      {/* Main hero and job-search section */}
      <Hero />

      {/* Future sections:
          - PlatformStats
          - PopularCategories
          - FeaturedJobs
          - TopCompanies
          - CareerCTA
      */}
    </main>
  )
}

export default Home