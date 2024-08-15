import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const validate = () => {
    let valid = true;
    let errors = { email: '', password: '' };

    if (!values.email) {
      errors.email = 'This field is required';
      valid = false;
    }
    if (!values.password) {
      errors.password = 'This field is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      axios.post('http://localhost:3000/student/studentlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true)
          navigate('/studentDetail/'+result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input 
              className='form-control rounded-0'
              type="email"
              name="email"
              autoComplete='email' 
              placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              value={values.email} 
            />
            {errors.email && <div className='text-danger error-message'>{errors.email}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input 
              className='form-control rounded-0 mb-2'
              type="password"
              name="password"
              autoComplete='current-password'
              placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              value={values.password}
            />
            {errors.password && <div className='text-danger error-message'>{errors.password}</div>}
          </div>
          <button className="btn btn-gradient-success w-100 px-4 py-2 rounded-3">Login</button>
        </form>
        <div className='text-danger error-message-bottom'>
          {error && error}
        </div>
      </div>
    </div>
  )
}

export default StudentLogin