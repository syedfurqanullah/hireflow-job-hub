import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import JobsRoute from "./JobsRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ApplyJob from "../pages/ApplyJob";
import NotFound from "../pages/NotFound";
import RequireAuth from "./RequireAuth";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsRoute />} />
        <Route path="/jobs/:id/apply" element={<RequireAuth><ApplyJob /></RequireAuth>} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
