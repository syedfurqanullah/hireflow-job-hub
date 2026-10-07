import Hero from "../components/home/Hero"
import Categories from "../components/home/Categories";


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

       {/* Popular Job Categories */}
      <Categories />


    </main>
    
  )
}



export default Home