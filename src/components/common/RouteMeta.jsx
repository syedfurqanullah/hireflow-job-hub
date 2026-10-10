import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeMeta = [
  {
    match: /^\/$/,
    title: "Find Your Next Opportunity",
    description:
      "Explore current job openings, companies, and career opportunities with HireFlow Job Hub.",
  },
  {
    match: /^\/jobs\/?$/,
    title: "Browse Jobs",
    description:
      "Search current job listings by category, location, experience, and job type.",
  },
  {
    match: /^\/jobs\/[^/]+\/apply\/?$/,
    title: "Job Application",
    description: "Review and prepare your job application in HireFlow Job Hub.",
  },
  {
    match: /^\/jobs\/[^/]+\/?$/,
    title: "Job Details",
    description:
      "Review the job description, skills, requirements, and employer listing.",
  },
  {
    match: /^\/companies\/?$/,
    title: "Companies",
    description:
      "Explore companies represented in the current HireFlow job feed.",
  },
  {
    match: /^\/companies\/[^/]+\/?$/,
    title: "Company Details",
    description:
      "Review company details and job listings available in the HireFlow feed.",
  },
  {
    match: /^\/dashboard\/?$|^\/profile\/?$/,
    title: "Dashboard",
    description: "Manage saved jobs and review your HireFlow workspace.",
  },
  {
    match: /^\/login\/?$/,
    title: "Sign In",
    description: "Open your local HireFlow demo session.",
  },
  {
    match: /^\/register\/?$/,
    title: "Create Account",
    description: "Create a local HireFlow demo profile.",
  },
  {
    match: /^\/about\/?$/,
    title: "About HireFlow",
    description: "Learn about HireFlow Job Hub.",
  },
  {
    match: /^\/contact\/?$/,
    title: "Contact",
    description: "Contact the HireFlow Job Hub team.",
  },
  {
    match: /^\/terms-and-conditions\/?$/,
    title: "Terms and Conditions",
    description:
      "Review the terms for using HireFlow Job Hub and its job discovery features.",
  },
  {
    match: /^\/privacy-policy\/?$/,
    title: "Privacy Policy",
    description:
      "Learn how HireFlow Job Hub handles information in its browser-based demo.",
  },
];

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
};

const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = routeMeta.find(({ match }) => match.test(pathname));
    const title = page?.title || "Page Not Found";
    const description =
      page?.description ||
      "The requested page could not be found on HireFlow Job Hub.";

    document.title = `${title} | HireFlow Job Hub`;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', document.title);
    setMetaContent('meta[property="og:description"]', description);
  }, [pathname]);

  return null;
};

export default RouteMeta;
