import React from "react";
import Home from "./pages/Home";
import Login from "./Form/Login";
import Register from "./Form/Register";
import Forgot from "./Form/Forgot";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DashBoardPage from './dashboard/DashBoardPage'
import Staff from "./dashboard/Staff/Staff";
import AddStaff from "./dashboard/Staff/AddStaff";
import Customers from "./dashboard/Customers/Customers";
import AddCustomer from "./dashboard/Customers/AddCustomer";
import LeadCategory from "./dashboard/Lead Category/LeadCategory";
import Leads from "./dashboard/Leads/Leads";
import AddLead from "./dashboard/Leads/AddLead";
import FollowUP from "./dashboard/Lead Follow-UP/FollowUP";
import Deals from "./dashboard/Deals/Deals";
import Report from "./dashboard/Reportss/Report";
import AddLeadCategory from "./dashboard/Lead Category/AddLeadCategory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
// import LeadList from "./dashboard/leadlist/LeadList";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />


          <Route path="/dasboardpage" element={<DashBoardPage />}>
            {/* <Route index element={<DashBoard />} /> */}
            <Route path="/dashboard/Staff" element={<Staff />} />
            <Route path="/dashboard/Staff/AddStaff" element={<AddStaff/>} />
            <Route path="/dashboard/Customers" element={<Customers />} />
            <Route path="/dashboard/Customers/AddCustomer" element={<AddCustomer />} />
            <Route path="/dashboard/LeadCategory" element={<LeadCategory />} />
            <Route path="/dashboard/LeadCategory/AddLeadCategory" element={<AddLeadCategory/>} />
            <Route path="/dashboard/Leads" element={<Leads />} />
            <Route path="/dashboard/Leads/AddLead" element={<AddLead />} />
            <Route path="/dashboard/FollowUP" element={<FollowUP />} />
            <Route path="/dashboard/Deals" element={<Deals />} />
            <Route path="/dashboard/Reports" element={<Report />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;