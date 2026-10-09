import { useSearchParams } from "react-router-dom";
import Jobs from "../pages/Jobs";

const JobsRoute = () => {
  const [searchParams] = useSearchParams();
  return <Jobs key={searchParams.toString()} />;
};

export default JobsRoute;
