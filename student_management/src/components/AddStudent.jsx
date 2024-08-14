import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    regno: "",
    department: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/department")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/addStudent", student)
      .then((result) => {
        navigate('/dashboard/student')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center mb-4">Student Details</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control border border-primary rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label mt-2">
              Email
            </label>
            <input
              type="email"
              className="form-control border border-primary rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border border-primary rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              style={{ marginTop: "-0.5rem", marginBottom: "0.5rem" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="regno" className="form-label mt-2">
              Register Number
            </label>
            <input
              type="text"
              className="form-control border border-primary rounded-0"
              id="regno"
              placeholder="Enter Register Number"
              onChange={(e) =>
                setStudent({ ...student, regno: e.target.value })
              }
              style={{ marginTop: "-0.5rem" }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label mt-3">
              Department
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setStudent({ ...student, dept_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
