import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
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
      axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        if (result.data.loginStatus) {
          navigate('/dashboard');
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
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input 
              className='form-control rounded-0'
              type="email"
              name="email"
              autoComplete='email' // Updated to help with browser autofill
              placeholder='Enter Email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              value={values.email} // Ensure controlled component behavior
            />
            {errors.email && <div className='text-danger error-message'>{errors.email}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input 
              className='form-control rounded-0 mb-2'
              type="password"
              name="password"
              autoComplete='current-password' // Updated to help with browser autofill
              placeholder='Enter Password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              value={values.password} // Ensure controlled component behavior
            />
            {errors.password && <div className='text-danger error-message'>{errors.password}</div>}
          </div>
          <button className='btn btn-success w-100 rounded-0 ma-5'>Login</button>
        </form>
        <div className='text-danger error-message-bottom'>
          {error && error}
        </div>
      </div>
    </div>
  );
};

export default Login;
