import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Home from './components/Home';
import Student from './components/Student';
import Category from './components/Category';
import Profile from './components/Profile'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddCategory from './components/AddCategory';
import AddStudent from './components/AddStudent';
import Dashboard from './components/Dashboard';
import EditStudent from './components/EditStudent';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/student' element={<Student />}></Route>
          <Route path='/dashboard/department' element={<Category />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/addDepartment' element={<AddCategory />}></Route>
          <Route path='/dashboard/addStudent' element={<AddStudent />}></Route>
          <Route path='/dashboard/editStudent/:id' element={<EditStudent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
