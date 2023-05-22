import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar, ThemeSetting } from "./components";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Login from "./Form/Login";
import Register from "./Form/Register";
import Forgot from "./Form/Forgot";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
// import DashBoardPage from './pages/dashboard/DashBoardPage';

import {
  Leads,
  Staff,
  AddStaff,
  Customers,
  AddCustomer,
  AddLead,
  AddLeadCategory,
  Deals,
  FollowUP,
  LeadCategory,
  Reportss,
} from "./pages/dashboard/index";

import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/dashboard" element={<Home />} /> */}

        {/* Main Website */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/contact" element={<ContactUs />} />

        {/* <Route path="/dashboard" element={<Dashboard />}> */}
          <Route path="dashboard/staff" element={<Staff />} />
          {/* <Route exact path="/dashboard/staff" element={<Customers />} /> */}
          <Route exact path="/dashboard/customers" element={<Customers />} />
          <Route
            exact
            path="/dashboard/lead_category"
            element={<LeadCategory />}
          />
          <Route exact path="/dashboard/leads" element={<Leads />} />
          <Route
            exact
            path="/dashboard/staff/AddStaff"
            element={<AddStaff />}
          />
          <Route
            exact
            path="/dashboard/customers/AddCustomer"
            element={<AddCustomer />}
          />
          <Route
            exact
            path="/dashboard/lead_category/AddLeadCategory"
            element={<AddLeadCategory />}
          />
          <Route exact path="/dashboard/leads/AddLead" element={<AddLead />} />
          <Route
            exact
            path="/dashboard/Leads/AddLead"
            element={<AddLeadCategory />}
          />
          <Route
            exact
            path="/dashboard/leads_follow_UP"
            element={<FollowUP />}
          />
          <Route exact path="/dashboard/deals" element={<Deals />} />
          <Route exact path="/dashboard/reports" element={<Reportss />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
