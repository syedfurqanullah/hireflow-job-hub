import { Navigate, useLocation } from "react-router-dom";
import { hasRole, isAuthenticated } from "../services/auth";

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequireAuth;
