import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState()
  const [studentTotal, setStudentTotal] = useState()
  const [deptTotal, setDeptTotal] = useState()
  const [admins, setAdmins] = useState([])
  useEffect(() => {
    adminCount();
    studentCount();
    deptCount();
    adminRecords();
  },[])

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/adminCount')
    .then(result => {
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

  const studentCount = () => {
    axios.get('http://localhost:3000/auth/studentCount')
    .then(result => {
      if(result.data.Status){
        setStudentTotal(result.data.Result[0].student)
      }
    })
  }

  const deptCount = () => {
    axios.get('http://localhost:3000/auth/deptCount')
    .then(result => {
      if(result.data.Status){
        setDeptTotal(result.data.Result[0].department)
      }
    })
  }

  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/adminRecords')
    .then(result => {
      if(result.data.Status){
        setAdmins(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Students</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Departments</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{deptTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
          <h3>Admins :</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              admins.map(a => (
                <tr>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          </table>
        </div>
    </div>
  )
}

export default Home