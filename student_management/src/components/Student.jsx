import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Student = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/student")
      .then((result) => {
        if (result.data.Status) {
          setStudent(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Students List</h3>
      </div>
      <Link to="/dashboard/addStudent" className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Register No</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.regno}</td>
                <td>{s.department}</td>
                <td>
                  <Link
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <Link className="btn btn-warning btn-sm">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
