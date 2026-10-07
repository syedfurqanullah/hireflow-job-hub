import Hero from "../components/home/Hero"
import Categories from "../components/home/Categories";
import FeaturedJobs from "../components/home/FeaturedJobs";
import TopCompanies from "../components/home/TopCompanies";

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
      {/* Featured Jobs */}
      <FeaturedJobs />
      {/* Top Companies */}
      <TopCompanies />

    </main>
    
  )
}



export default Home