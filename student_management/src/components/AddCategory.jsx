import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/addDepartment', {category})
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/department')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h3>Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Department:</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter Department"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Department</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
