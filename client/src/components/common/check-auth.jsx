import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
        return <Navigate to="/auth/login" />
    }
    if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
        if(user?.role === "teacher"){
            return <Navigate to="/teacher/dashboard" />
        }else{
            return <Navigate to="/student/home" />
        }
    }
    if(isAuthenticated && user?.role !== "teacher" && location.pathname.includes("teacher")){
        return <Navigate to="/unauth-page" />
    }
    if(isAuthenticated && user?.role === "teacher" && location.pathname.includes("student")){
        return <Navigate to="/teacher/dashboard" />
    }

    return <>
    {children}
    </>
}

export default CheckAuth;