import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home/Home";
import Header from "./components/Layout/Header";
import Register from "./components/pages/Authentication/Register";
import Login from "./components/pages/Authentication/Login";
import Contact from "./components/pages/Contact";
import Community from "./components/pages/Community/Community";
import Footer from "./components/Layout/Footer";
import UserDashboard from "./components/pages/Dashboard/UserDashboard";
import AllCourses from "./components/pages/Courses/AllCourses";
import { useEffect } from "react";
import { loadUser } from "./services/app/actions/auth.action";
import { useAppDispatch } from "./hooks";
import CourseUpload from "./components/instructor/CourseUpload";

import Courses from "./components/instructor/Courses";
import { ToastContainer } from "react-toastify";

// Instructor Routes

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />

          <Route path="/add/course" element={<CourseUpload />} />
          <Route path="/instructor/courses" element={<Courses />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
