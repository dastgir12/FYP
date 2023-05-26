import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Sidebar, ThemeSetting } from "./components";
import Home from "./pages/Home";
import Login from "./Form/Login";
import Register from "./Form/Register";
import Forgot from "./Form/Forgot";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import {
  Staff,
  AddStaff,
  Customers,
  AddCustomer,
  Leads,
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
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const { activeMenu, setActiveMenu } = useStateContext();
  const [AppPathName, setAppPathName] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setActiveMenu(false);

    const pathname = window.location.pathname; // "/path"
    setAppPathName(pathname);

    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              )}
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <Sidebar />
              )}
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              {AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <Sidebar />
              )}
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              {
              AppPathName === "/" ||
              AppPathName === "/login" ||
              AppPathName === "/register" ||
              AppPathName === "/forgot" ||
              AppPathName === "/about" ||
              AppPathName === "/contact" ? (
                <></>
              ) : (
                <></>
              )
              }

              {
              AppPathName === "/dashboard" 
              ? (
                <Navbar />
              ) : (
                <div>
                404 error page is not found   
                </div>
              )}
            </div>
            <div>
              {themeSettings && <ThemeSetting />}

              <Routes>
                {/* Main Website */}
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/forgot" element={<Forgot />} />
                <Route exact path="/about" element={<AboutUs />} />
                <Route exact path="/contact" element={<ContactUs />} />

                {/* Dashboard  */}
                {/* <Route path="/dashboard" element={<Staff />} /> */}
                <Route exact path="/dashboard/staff" element={<Staff />} />
                <Route
                  exact
                  path="/dashboard/customers"
                  element={<Customers />}
                />
                <Route
                  exact
                  path="/dashboard/lead_category"
                  element={<LeadCategory />}
                />

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
                  path="/dashboard/lead_category"
                  element={<LeadCategory />}
                />
                 <Route
                  exact
                  path="/dashboard/lead_category/AddLeadCategory"
                  element={<AddLeadCategory />}
                />
                <Route exact path="/dashboard/leads" element={<Leads />} />
                <Route
                  exact
                  path="/dashboard/Leads/AddLead"
                  element={<AddLead />}
                />
                <Route
                  exact
                  path="/dashboard/leads_follow_UP"
                  element={<FollowUP />}
                />
                <Route exact path="/dashboard/deals" element={<Deals />} />
                <Route exact path="/dashboard/reports" element={<Reportss />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
