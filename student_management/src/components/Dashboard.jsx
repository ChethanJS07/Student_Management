import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex flex-column align-items-center text-white text-decoration-none text-center mb-3 mt-md-3 me-md-auto"
            >
              <span className="fs-5 fw-bold">
                Admin
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-3 py-2 rounded hover-effect"
                >
                  <i className="fs-4 bi-speedometer2 me-2"></i>
                  <span className="d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/student"
                  className="nav-link text-white px-3 py-2 rounded hover-effect"
                >
                  <i className="fs-4 bi-people me-2"></i>
                  <span className="d-none d-sm-inline">Manage Students</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/department"
                  className="nav-link text-white px-3 py-2 rounded hover-effect"
                >
                  <i className="fs-4 bi-columns me-2"></i>
                  <span className="d-none d-sm-inline">Departments</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link text-white px-3 py-2 rounded hover-effect"
                >
                  <i className="fs-4 bi-person me-2"></i>
                  <span className="d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100 mt-auto">
                <Link
                  className="nav-link text-white px-3 py-2 rounded hover-effect"
                >
                  <i className="fs-4 bi-power me-2"></i>
                  <span className="d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-3 mb-3 bg-light shadow-sm rounded text-center">
            <h4 className="mb-0">Student Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
