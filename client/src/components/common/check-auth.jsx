import { Navigate, useLocation } from "react-router-dom";



function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // If not logged in → redirect to login
  if (!isAuthenticated && location.pathname !== "/auth/login" && location.pathname !== "/auth/register") {
    return <Navigate to="/auth/login" />;
  }

  // If logged in and tries to go to login/register → redirect to admin dashboard
  if (isAuthenticated && (location.pathname === "/auth/login" || location.pathname === "/auth/register")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If logged in but role is not admin → block access
  if (isAuthenticated && user?.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
