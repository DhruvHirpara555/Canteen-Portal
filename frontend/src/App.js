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
import OrderDash from "./components/Dashboard/Orderdash"
import BuyerDash from "./components/Dashboard/dashboardbuyer"
import BuyerOrder from "./components/Dashboard/buyerorders"

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
          <Route path = "orderdashboard" element = {<OrderDash />}/>
          <Route path = "bdashboard" element = {<BuyerDash />}/>
          <Route path = "buyerorders" element = {<BuyerOrder />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
