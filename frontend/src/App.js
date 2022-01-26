import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import VendorDash from "./components/Dashboard/dashboardvendor"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Logout = () => {
  sessionStorage.clear()
  window.location.href = "/";
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Home />} />
          <Route path ="logout" element = {<Logout />}/>
          <Route path = "vdashboard" element = {<VendorDash />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
