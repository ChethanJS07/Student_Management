import React, { useEffect } from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status){
        if(result.data.role === 'admin'){
          navigate('/dashboard')
        }else{
          navigate('/studentDetail/'+result.data.id)
        }
      }
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-4 rounded-4 w-25 shadow-lg loginForm bg-white">
        <h2 className="text-center mb-4 fw-bold">Welcome</h2>
        <p className="text-center fs-5" >Student Database Management System</p>
        <h3 className="text-center mt-4 mb-3">Login As</h3>
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-gradient-primary w-45 px-4 py-2 rounded-3"
            type="button"
            onClick={() => {navigate('/studentlogin')}}
          >
            Student
          </button>
          <button
            className="btn btn-gradient-success w-45 px-4 py-2 rounded-3"
            type="button"
            onClick={() => {navigate('/adminlogin')}}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
