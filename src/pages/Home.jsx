import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedJobs from "../components/home/FeaturedJobs";
import TopCompanies from "../components/home/TopCompanies";
import CareerCTA from "../components/home/CareerCTA";

const Home = () => {
  return (
    <main>
      <Hero />

      <Categories />
      <FeaturedJobs />
      <TopCompanies />
      <CareerCTA />
    </main>
  );
};

export default Home;
