import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/loign";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/Admin-View/layout";
import AdminDashboard from "./pages/Admin-View/dashboard";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth/unauthpage";
import ManageLoans from "./pages/Admin-View/manage_loans";
import LoansPage from "./pages/Admin-View/LoanPage";
import { checkAuth } from "./store/auth-slice";

function App() {
  const { isAuthenticated, user, hasCheckedAuth  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

useEffect(() => {
  // Always ask backend if user is authenticated
  dispatch(checkAuth());
}, [dispatch]);

  if (!hasCheckedAuth) {
  return <div>Loading...</div>; // prevent redirect flicker
}

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Root → always redirect to login */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-loans" element={<ManageLoans />} />
          <Route path="add-loans" element={<LoansPage />} />
          <Route path="edit-loan/:id" element={<LoansPage />} />
        </Route>

        {/* Fallback & Unauthorized */}
        <Route path="unauthorized" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
