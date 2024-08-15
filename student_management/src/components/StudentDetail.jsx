import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./StudentDetails.css";
import Cookies from 'js-cookie';


const StudentDetail = () => {
  const [student, setStudent] = useState([]);
  const {id} = useParams()
  const token = Cookies.get('token'); 
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/student/detail/" + id)
      .then((result) => {
        console.log(result.data);
        setStudent(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get("http://localhost:3000/student/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Student Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          className="student_det_image"
          src="https://e0.pxfuel.com/wallpapers/968/480/desktop-wallpaper-luffy-kid-luffy-child-thumbnail.jpg"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {student.name}</h3>
          <h3>Email: {student.email}</h3>
          <h3>Department: {student.department}</h3>
        </div>
        <div>
        <Link className="btn btn-info btn-sm me-2" to={`/reset_password/${id}/${token}`}>Reset Password</Link>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
