import "./App.css";
import { Route,Routes } from "react-router-dom";
import {Navbar} from "./components/common/Navbar";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/forwardPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/about";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import Settings from "./components/core/Dashboard/Settings/index";
import Cart from "./components/core/Dashboard/Cart/index";  
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Categorypage from "././components/core/Catalog/Categorypage";
import CourseDetails from "./components/core/Catalog/CourseDetails";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

import ViewCourse from  "./pages/ViewCourse";
function App() {
   const { user } = useSelector((state) => state.profile)

  return (
    
    <div className="w-screen min-h-screen max-h-max bg-richblack-900 flex flex-col">
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
       <Route path="/catalog/:catalogName" element={<Categorypage/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="/login" element=
        {<OpenRoute>
        <Login/>
        </OpenRoute>}/>
        <Route path="/signup" element={
            <OpenRoute>
              <SignUp/>
            </OpenRoute>}/>
        <Route path="/forgot-password" element={
              <OpenRoute>
              <ForgotPassword/>
              </OpenRoute>}/>
          <Route path = "/reset-password/:id" element={
          <OpenRoute>
          <UpdatePassword/>
          </OpenRoute>}/>
           <Route path = "/verify-email" element={
          <OpenRoute>
          <VerifyEmail/>
          </OpenRoute>}/>
          <Route
            path="/about" element={
              <About/>
            }></Route>
          <Route  
              element={
              <PrivateRoute>
              <Dashboard/>
              </PrivateRoute>}>
              <Route path="dashboard/Settings" element={<Settings />} />
              <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
                </>
              )}
              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                        <Route path="dashboard/my-courses" element={<MyCourses />} />
                        <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                  </>
              )}
          </Route>
        <Route element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>
          
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
