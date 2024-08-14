import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditStudent = () => {
  const {id} = useParams();
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const [student, setStudent] = useState({
    name: "",
    email: "",
    regno: "",
    dept_id: "",
  });

  useEffect(() => {
    axios.get('http://localhost:3000/auth/department')
    .then(result => {
      if(result.data.Status)
      {
        setCategory(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/student/'+id)
    .then(result => {
      setStudent({
        ...student,
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        regno: result.data.Result[0].regno,
        dept_id: result.data.Result[0].dept_id
      })
    }).catch((err) => console.log(err))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/editStudent/'+id,student)
    .then(result => {
      console.log(result.data)
      if(result.data.Status)
      {
        navigate('/dashboard/student')
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }
  
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center mb-4">Edit Student Details</h3>
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
              value={student.name}
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
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
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
              value={student.regno}
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
              value={student.dept_id}
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
              Update Student Details
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent