import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedJobs from "../components/home/FeaturedJobs";
import TopCompanies from "../components/home/TopCompanies";
import CareerCTA from "../components/home/CareerCTA";

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

      <Categories />
      <FeaturedJobs />
      <TopCompanies />
     <CareerCTA />
    </main>
  );
};

export default Home;
