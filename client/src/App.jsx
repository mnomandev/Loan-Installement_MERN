
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/loign'
import AuthRegister from './pages/auth/register'
import TeacherLayout from './components/Teacher-view/layout'
import TeacherDashboard from './pages/Teacher-view/dashboard'
import UploadCourses from './pages/Teacher-view/courses'
import TeacherFeatures from './pages/Teacher-view/features'
import CourseDetails from './pages/Teacher-view/details'
import StudentLayout from './components/student-view/layout'
import NotFound from './pages/not-found'
import StudentHomePage from './pages/student-view/home'
import StudentCourseListing from './pages/student-view/listing'
import StudentAccount from './pages/student-view/account'
import StudentCheckout from './pages/student-view/checkout'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth/unauthpage'
import { useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";


function App() {
  
  const {isAuthenticated, user, isLoading } = useSelector((state) => state.auth); 
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return <div>Loading...</div>

return(
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <AuthLayout />
        </CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/teacher" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <TeacherLayout />
        </CheckAuth>}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<UploadCourses />} />
          <Route path="features" element={<TeacherFeatures />} />
          <Route path="details" element={<CourseDetails />} />
        </Route>
        <Route path="/student" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} >
          <StudentLayout />
        </CheckAuth>}>
          <Route path="home" element={<StudentHomePage />} />
          <Route path="listing" element={<StudentCourseListing />} />
          <Route path="account" element={<StudentAccount />} />
          <Route path="checkout" element={<StudentCheckout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnAuthPage />} />
       
      </Routes>

    </div>
  )
}

export default App
