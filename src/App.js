import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import UserTable from './components/UserManagement/UserTable';
import UserForm from './components/UserManagement/UserForm';
import RoleTable from './components/RoleManagement/RoleTable';
import RoleForm from './components/RoleManagement/RoleForm';


function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" />
      <BrowserRouter>
        <Appheader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* User Management Routes */}
          <Route path="/usermanagement" element={<UserTable />} />
          <Route path="/edit-user/:userId" element={<UserForm />} />
          {/* Role Management Routes */}
          <Route path="/roles" element={<RoleTable />} />
          <Route path="/edit-role/:roleId" element={<RoleForm />} />
          {/* Page Not Found Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
