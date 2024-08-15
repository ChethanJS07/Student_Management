import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Home from "./components/Home";
import Student from "./components/Student";
import Category from "./components/Category";
import Profile from "./components/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategory from "./components/AddCategory";
import AddStudent from "./components/AddStudent";
import Dashboard from "./components/Dashboard";
import EditStudent from "./components/EditStudent";
import Start from "./components/Start";
import StudentLogin from "./components/StudentLogin";
import StudentDetail from "./components/StudentDetail";
import PrivateRoute from "./components/PrivateRoute"
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route path="/studentDetail/:id" element={<StudentDetail />}></Route>
        <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/student" element={<Student />}></Route>
          <Route path="/dashboard/department" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/addDepartment"
            element={<AddCategory />}
          ></Route>
          <Route path="/dashboard/addStudent" element={<AddStudent />}></Route>
          <Route
            path="/dashboard/editStudent/:id"
            element={<EditStudent />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
