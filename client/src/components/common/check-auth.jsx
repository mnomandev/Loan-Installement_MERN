import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Agar login/register page pe nahi ho aur login bhi nahi hai → redirect to login
  if (
    !isAuthenticated &&
    location.pathname !== "/auth/login" &&
    location.pathname !== "/auth/register"
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Agar already login hai aur login/register page pe jaye → redirect to dashboard
  if (
    isAuthenticated &&
    (location.pathname === "/auth/login" ||
      location.pathname === "/auth/register")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Agar login hai lekin role admin nahi hai → unauthorized
  if (isAuthenticated && user?.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}

CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  children: PropTypes.node,
};

export default CheckAuth;
